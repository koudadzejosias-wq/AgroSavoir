# 🌾 AgroSavoir Togo — Plateforme Nationale de Formation Agropastorale

Bienvenue sur la plateforme **AgroSavoir Togo**, l'application web d'apprentissage interactif en maraîchage, élevage et pisciculture.

---

## 🚀 Guide de Déploiement sur GitHub

Pour exporter et héberger votre projet sur **GitHub**, suivez les étapes ci-dessous :

### 1. Télécharger le projet depuis AI Studio
1. Dans l'interface AI Studio, ouvrez le menu **Settings** / **Options**.
2. Cliquez sur **Export to GitHub** ou **Download ZIP**.

### 2. Publier sur GitHub avec Git CLI
Si vous avez téléchargé le projet sur votre ordinateur :

```bash
# 1. Initialisez votre dépôt Git local
git init
git add .
git commit -m "Initial commit - AgroSavoir Togo"

# 2. Associez votre dépôt GitHub distant
git branch -M main
git remote add origin https://github.com/VOTRE_PSEUDO/agrosavoir-togo.git

# 3. Envoyez le code sur GitHub
git push -u origin main
```

---

## 🌐 Options de Déploiement Gratuit

### Option A : GitHub Pages (Automatique via GitHub Actions)
L'action GitHub `.github/workflows/deploy.yml` est déjà configurée dans le projet !
1. Rendez-vous sur votre dépôt GitHub : `Settings` > `Pages`.
2. Sous **Build and deployment**, sélectionnez **Source: GitHub Actions**.
3. À chaque `git push` sur la branche `main`, le site sera automatiquement compilé et déployé sur `https://VOTRE_PSEUDO.github.io/agrosavoir-togo/`.

### Option B : Vercel / Netlify (Déploiement en 1 Clic)
1. Connectez votre compte **Vercel** ou **Netlify** à GitHub.
2. Importez le dépôt `agrosavoir-togo`.
3. Laissez les paramètres de build par défaut (`npm run build`, dossier `dist`).
4. Ajoutez vos variables d'environnement si besoin (`GEMINI_API_KEY`, etc.).

---

## 🛠️ Développement Local

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement local
npm run dev

# L'application sera accessible sur http://localhost:3000
```

---

## 📱 Fonctionnalités clés d'AgroSavoir Togo
- 📱 **QR Code Général Universel** (compatible Android, iOS iPhone/iPad et PC).
- 🔥 **Firebase Firestore & Authentication** pour la synchronisation du profil et des cours.
- 📩 **Envoi de mail de confirmation** automatique (SMTP).
- 🌾 **Formations agropastorales interactives** (Maraîchage, Élevage, Pisciculture).
- 🌐 **Support Multilingue** (Français, Éwé, Kabyè).
