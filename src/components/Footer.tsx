import React from 'react';
import { Sprout, Scale, Lightbulb, Award, BookOpen, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenCgu: () => void;
  onOpenSuggestions: () => void;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCgu,
  onOpenSuggestions,
  setActiveTab
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800 mt-12 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-md">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg text-white tracking-tight">Agro<span className="text-emerald-400">Savoir</span> Togo</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Plateforme numérique nationale de vulgarisation et de formation agropastorale (Agriculture, Élevage, Pisciculture, Agrobusiness).
          </p>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Certifié par le Comité AgroSavoir & ITRA Togo</span>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="space-y-2">
          <h4 className="font-extrabold text-white uppercase text-[11px] tracking-wider">Parcours & Modules</h4>
          <ul className="space-y-1.5 text-slate-400 text-[11px]">
            <li>
              <button onClick={() => setActiveTab('catalogue')} className="hover:text-emerald-400 transition">
                Agriculture Écologique & Bio
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('catalogue')} className="hover:text-emerald-400 transition">
                Élevage Avicole & Provende
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('catalogue')} className="hover:text-emerald-400 transition">
                Pisciculture Clarias & Tilapia
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('catalogue')} className="hover:text-emerald-400 transition">
                Agrobusiness & Commercialisation
              </button>
            </li>
          </ul>
        </div>

        {/* Certifications & Tools */}
        <div className="space-y-2">
          <h4 className="font-extrabold text-white uppercase text-[11px] tracking-wider">Certificats & Outils</h4>
          <ul className="space-y-1.5 text-slate-400 text-[11px]">
            <li>
              <button onClick={() => setActiveTab('certificats')} className="hover:text-amber-400 transition flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Test de Validation & Diplôme ProCertif
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('calculateurs')} className="hover:text-emerald-400 transition">
                Calculateurs de Rationnement & Semences
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('diagnostic')} className="hover:text-purple-400 transition">
                Diagnostic Phyto-Sanitaire par IA
              </button>
            </li>
            <li>
              <button onClick={onOpenSuggestions} className="text-amber-300 font-bold hover:underline flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Boîte à Suggestions / Apports
              </button>
            </li>
          </ul>
        </div>

        {/* Mentions Légales & CGU */}
        <div className="space-y-2">
          <h4 className="font-extrabold text-white uppercase text-[11px] tracking-wider">Engagements & Législation</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Plateforme conforme aux normes d'apprentissage rural du Ministère de l'Agriculture, de l'Élevage et du Développement Rural (Togo).
          </p>
          <div className="pt-1">
            <button
              onClick={onOpenCgu}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg border border-slate-700 transition flex items-center gap-1.5 text-[11px]"
            >
              <Scale className="w-3.5 h-3.5 text-emerald-400" /> Conditions Générales d'Utilisation (CGU)
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
        <div>
          © 2026 <strong>AgroSavoir Togo</strong>. Tous droits réservés.
        </div>
        <div className="flex items-center gap-1">
          Développé avec <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> pour la communauté agropastorale du Togo.
        </div>
      </div>
    </footer>
  );
};
