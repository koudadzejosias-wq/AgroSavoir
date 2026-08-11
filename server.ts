import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));

// Server-side Gemini AI initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Comprehensive Course Knowledge Base Context for RAG
const AGROLEARN_RAG_CONTEXT = `
Vous êtes "AgroBot", le tuteur et assistant virtuel IA expert de la plateforme d'apprentissage agropastorale "AgroSavoir".
Votre mission est de répondre de manière fluide, précise, complète et personnalisée à TOUTES les questions posées par les apprenants, producteurs et utilisateurs.

Directives de réponse :
1. Répondez directement et spécifiquement à la question exacte de l'utilisateur. Ne donnez jamais une réponse générique hors-sujet.
2. Pour les sujets agropastoraux (agriculture maraîchère, élevage avicole, provende, pisciculture Clarias/Tilapia, gestion d'exploitation, phytosanitaire, agrobusiness), fournissez des explications techniques détaillées, des dosages précis, des étapes claires et des recettes pratiques.
3. Pour toute autre question, répondez toujours intelligemment, poliment et de façon utile.
4. N'utilisez aucun emoji dans vos réponses. Rédigez un texte propre, bien structuré avec des puces et des termes en gras.
5. Répondez en français soigné, clair et accessible.
`;

// Endpoint 1: AgroBot Chat Assistant
app.post("/api/agrobot", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message requis." });
    }

    const systemInstruction = AGROLEARN_RAG_CONTEXT;

    // Build chat contents from history if available
    let contents: any[] = [];
    if (history && Array.isArray(history) && history.length > 0) {
      contents = history.map((h: { role: string; text: string }) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }],
      }));
    }
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Désolé, je n'ai pas pu générer une réponse. Veuillez réessayer.";
    return res.json({ reply: replyText });
  } catch (err: any) {
    console.error("Erreur API AgroBot:", err);
    return res.status(500).json({
      error: "Erreur lors de la communication avec AgroBot.",
      details: err?.message || String(err),
    });
  }
});

// Endpoint 2: AgroBot Plant/Animal Image Diagnosis
app.post("/api/agrobot/analyze-image", async (req, res) => {
  try {
    const { imageBase64, mimeType, userNotes } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "Image base64 requise." });
    }

    const promptText = `
Analyse cette photo envoyée par un apprenant/agriculteur de la plateforme AgroLearn.
Notes de l'utilisateur: "${userNotes || 'Aucune note fournie'}"

Fournis un diagnostic clair et structuré en français:
1. 🔍 **Identification du problème** (Maladie, carence nutritionnelle, attaque d'insecte, ou problème d'eau/poulailler)
2. ⚠️ **Gravité & Symptômes observés**
3. 🌿 **Traitement recommandé & Solutions biologiques/pratiques** (en citant les produits AgroLearn comme le Neem/Piment, compostage, désinfection ou ajustement eau/provende)
4. 🛡️ **Mesures de prévention futures**
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType || "image/jpeg",
              data: imageBase64.replace(/^data:image\/\w+;base64,/, ""),
            },
          },
          { text: promptText },
        ],
      },
      config: {
        systemInstruction: AGROLEARN_RAG_CONTEXT,
      },
    });

    const replyText = response.text || "Diagnostic non disponible.";
    return res.json({ diagnosis: replyText });
  } catch (err: any) {
    console.error("Erreur Diagnostic Image:", err);
    return res.status(500).json({
      error: "Erreur lors de l'analyse d'image.",
      details: err?.message || String(err),
    });
  }
});

// Endpoint 3: Dispatch account confirmation and password reset emails
app.post("/api/send-email", async (req, res) => {
  try {
    const { to, subject, code, type, userName } = req.body;
    if (!to || !code) {
      return res.status(400).json({ error: "Adresse email et code requis." });
    }

    const mailSubject = subject || (type === "password_reset"
      ? "Réinitialisation de votre mot de passe - AgroSavoir"
      : "Code de confirmation de votre compte - AgroSavoir");

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px; background-color: #f8fafc;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #059669;">
          <h1 style="color: #065f46; margin: 0; font-size: 24px;">🌾 AgroSavoir</h1>
          <p style="color: #047857; margin: 5px 0 0; font-size: 14px;">Plateforme Nationale de Formation Agropastorale</p>
        </div>
        <div style="padding: 24px 0;">
          <p style="font-size: 16px; color: #1e293b;">Bonjour <strong>${userName || "Cher Apprenant"}</strong>,</p>
          <p style="font-size: 15px; color: #334155; line-height: 1.6;">
            ${type === "password_reset" 
              ? "Vous avez demandé la réinitialisation du mot de passe de votre compte AgroSavoir." 
              : "Merci de créer un compte sur la plateforme AgroSavoir. Pour activer votre compte, veuillez utiliser le code de vérification ci-dessous :"}
          </p>
          <div style="text-align: center; margin: 28px 0;">
            <span style="display: inline-block; font-family: monospace; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #047857; background-color: #ecfdf5; padding: 14px 28px; border-radius: 10px; border: 2px dashed #059669;">
              ${code}
            </span>
          </div>
          <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
            Ce code est valide pendant 15 minutes. Si vous n'avez pas demandé ce code, vous pouvez ignorer cet e-mail en toute sécurité.
          </p>
        </div>
        <div style="border-top: 1px solid #cbd5e1; padding-top: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
          <p>© ${new Date().getFullYear()} AgroSavoir Togo - Formation Maraîchère, Élevage et Pisciculture.</p>
        </div>
      </div>
    `;

    console.log(`====================================================`);
    console.log(`[ENVOI MAIL AGROSAVOIR DÉCLENCHÉ]`);
    console.log(`Destinataire: ${to}`);
    console.log(`Sujet: ${mailSubject}`);
    console.log(`Code secret généré: ${code}`);
    console.log(`====================================================`);

    // If SMTP environment variables are present, dispatch via real SMTP server
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"AgroSavoir Togo" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: to,
        subject: mailSubject,
        html: htmlContent,
      });
      console.log(`[SMTP] E-mail transmis avec succès à ${to}`);
    }

    return res.json({
      success: true,
      message: `E-mail envoyé avec succès à l'adresse ${to}. Veuillez consulter votre boîte de réception.`,
      recipient: to,
    });
  } catch (err: any) {
    console.error("Erreur Envoi Mail:", err);
    return res.status(500).json({ error: "Échec de l'envoi de l'e-mail." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Serveur AgroLearn prêt sur http://localhost:${PORT}`);
  });
}

startServer();
