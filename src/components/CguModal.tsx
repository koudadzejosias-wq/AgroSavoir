import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, CheckCircle2, Lock, Scale, HelpCircle } from 'lucide-react';

interface CguModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CguModal: React.FC<CguModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-full flex items-center gap-1">
                <Scale className="w-3 h-3" /> Cadre Réglementaire & Juridique
              </span>
              <span className="text-xs text-emerald-300 font-semibold">République Togolaise</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-emerald-400" />
              Conditions Générales d'Utilisation (CGU)
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Règles d'utilisation de la plateforme nationale AgroSavoir Togo, protection des données et certification.
            </p>
          </div>

          {/* Content Body */}
          <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto text-xs text-slate-700 leading-relaxed">
            
            {/* Article 1 */}
            <div className="space-y-2">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Article 1 : Objet et Gratuité de la Service
              </h3>
              <p>
                La plateforme <strong>AgroSavoir Togo</strong> est une initiative publique-privée de vulgarisation et de formation agropastorale numérique. L'accès aux contenus de cours (maraîchage, élevage avicole et petit bétail, pisciculture Clarias/Tilapia, agrobusiness) ainsi qu'aux calculateurs de rationnement est entièrement <strong>gratuit</strong> pour l'ensemble des producteurs, apprenants et acteurs du monde rural.
              </p>
            </div>

            {/* Article 2 */}
            <div className="space-y-2">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Article 2 : Création de Compte & Vérification d'Accès
              </h3>
              <p>
                Pour personnaliser son suivi, sauvegarder sa progression et obtenir des attestations certifiées, l'utilisateur s'inscrit en fournissant un nom, un e-mail et une région d'activité. Afin de garantir l'authenticité des comptes et lutter contre les abus, un <strong>code secret de vérification à 6 chiffres</strong> est envoyé par e-mail lors de l'inscription pour débloquer l'espace apprenant.
              </p>
            </div>

            {/* Article 3 */}
            <div className="space-y-2">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 text-emerald-800">
                <Lock className="w-4 h-4 text-emerald-600" />
                Article 3 : Protection des Données Personnelles (Conformité Loi Togolaise)
              </h3>
              <p>
                Conformément aux réglementations de l'Instance de Protection des Données à Caractère Personnel du Togo, AgroSavoir s'engage à :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Ne jamais commercialiser vos informations personnelles ou coordonnées WhatsApp/e-mail.</li>
                <li>Utiliser les données de géolocalisation ou de région uniquement pour recommander des semences et conseils adaptés au climat local (Maritime, Plateaux, Centrale, Kara, Savanes).</li>
                <li>Garantir un droit d'accès, de modification et de suppression totale de votre compte sur simple demande dans le profil.</li>
              </ul>
            </div>

            {/* Article 4 */}
            <div className="space-y-2">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 text-emerald-800">
                <Scale className="w-4 h-4 text-emerald-600" />
                Article 4 : Délivrance des Certificats ProCertif & Badges Credly
              </h3>
              <p>
                Les diplômes et micro-créditiales numérotés émis par la plateforme (normes Credly / Skill-Ed) requièrent la validation minimale de <strong>75% de réussite au quiz d'évaluation</strong> du domaine correspondant. Tout certificat porte un identifiant unique vérifiable dans le registre national AgroSavoir. Toute falsification ou usurpation entraîne l'invalidation immédiate du diplôme.
              </p>
            </div>

            {/* Article 5 */}
            <div className="space-y-2">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 text-emerald-800">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                Article 5 : Recommandations Agropastorales & Responsabilité
              </h3>
              <p>
                Les conseils délivrés par le tuteur intelligent <strong>AgroBot IA</strong>, les fiches techniques et le diagnostic phytosanitaire sont donnés à titre indicatif selon les meilleures pratiques agronomiques. Ils ne remplacent pas la consultation directe d'un technicien ou vétérinaire agréé en cas d'épidémie grave sur la ferme.
              </p>
            </div>

            {/* Article 6 */}
            <div className="space-y-2 border-t border-slate-100 pt-3">
              <h3 className="font-extrabold text-sm text-slate-900">Article 6 : Propriété Intellectuelle & Partage Communautaire</h3>
              <p className="text-slate-600">
                Les vidéos, fiches PDF et guides pratiques sont libres de partage et d'utilisation pour la formation des groupements agricoles, sous réserve de citer la source <strong>AgroSavoir Togo</strong>.
              </p>
            </div>

          </div>

          {/* Footer Bar */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500">
              Dernière mise à jour : <strong>Août 2026</strong> • Lomé, Togo
            </div>
            <button
              onClick={onClose}
              className="py-2 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
            >
              J'ai lu et j'accepte les CGU
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
