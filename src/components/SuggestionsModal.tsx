import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb, MessageSquarePlus, Send, ThumbsUp, Sparkles, User, Tag, CheckCircle2 } from 'lucide-react';
import { UserAccount, DomainId } from '../types';

interface SuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
}

interface SuggestionItem {
  id: string;
  authorName: string;
  authorRole: string;
  region: string;
  topic: string;
  domainId: DomainId;
  content: string;
  likes: number;
  date: string;
  status: 'Proposé' | 'En validation' | 'Intégré au cours';
}

const INITIAL_SUGGESTIONS: SuggestionItem[] = [
  {
    id: 'sug-1',
    authorName: 'Koffi AGBÉKO',
    authorRole: 'Éleveur & Agronome',
    region: 'Plateaux (Kpalimé)',
    topic: 'Module sur l\'élevage hélicicole (escargots géants Achatina)',
    domainId: 'elevage',
    content: 'Propose d\'ajouter un module vidéo dédié à la production d\'escargots Achatina fulica à Kpalimé. Forte demande du marché et très forte rentabilité avec peu d\'espace.',
    likes: 24,
    date: 'Hier',
    status: 'Intégré au cours'
  },
  {
    id: 'sug-2',
    authorName: 'Abla MENSAH',
    authorRole: 'Entrepreneure Agrobusiness',
    region: 'Maritime (Lomé)',
    topic: 'Aide au calcul de séchage solaire des mangues et ananas',
    domainId: 'entrepreneuriat',
    content: 'Un calculateur de rendement de séchage pour la transformation des fruits locaux serait un grand plus pour les groupements de femmes transformatrices.',
    likes: 18,
    date: 'Il y a 3 jours',
    status: 'En validation'
  },
  {
    id: 'sug-3',
    authorName: 'Kodjo TCHALA',
    authorRole: 'Pisciculteur',
    region: 'Centrale (Sokodé)',
    topic: 'Technique d\'aliments flottants faits maison pour Clarias',
    domainId: 'pisciculture',
    content: 'Partage de la formule locale avec de la farine de sang de bœuf et du son de riz compressé à chaud pour faire flotter les granulés à moindre coût.',
    likes: 31,
    date: 'Il y a 5 jours',
    status: 'Intégré au cours'
  }
];

export const SuggestionsModal: React.FC<SuggestionsModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>(() => {
    const saved = localStorage.getItem('agrosavoir_suggestions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SUGGESTIONS;
  });

  const [topic, setTopic] = useState('');
  const [domainId, setDomainId] = useState<DomainId>('agriculture');
  const [content, setContent] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !content.trim()) return;

    const newSug: SuggestionItem = {
      id: `sug-${Date.now()}`,
      authorName: currentUser.name || 'Apprenant Passionné',
      authorRole: currentUser.role ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1) : 'Producteur',
      region: currentUser.region || 'Togo',
      topic: topic.trim(),
      domainId,
      content: content.trim(),
      likes: 1,
      date: 'À l\'instant',
      status: 'Proposé'
    };

    const nextList = [newSug, ...suggestions];
    setSuggestions(nextList);
    localStorage.setItem('agrosavoir_suggestions', JSON.stringify(nextList));

    setTopic('');
    setContent('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  const handleToggleLike = (id: string) => {
    const isLiked = userLikes[id];
    setUserLikes(prev => ({ ...prev, [id]: !isLiked }));

    setSuggestions(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: isLiked ? item.likes - 1 : item.likes + 1
        };
      }
      return item;
    }));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-6"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-900 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/20 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 bg-white text-amber-950 font-black text-[10px] uppercase tracking-wider rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 text-amber-600" /> Espace Participatif
              </span>
              <span className="text-xs text-amber-100 font-semibold">Boîte à Idées & Apports Communautaires</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-amber-300" />
              Apports & Suggestions des Membres
            </h2>
            <p className="text-xs text-amber-100 mt-1">
              Vous avez une idée de nouveau cours, un conseil pratique du terrain ou une suggestion d'amélioration ? Proposez-la ci-dessous !
            </p>
          </div>

          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Form to submit suggestion */}
            <form onSubmit={handleSubmit} className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
                <MessageSquarePlus className="w-4 h-4 text-amber-600" />
                <span>Soumettre une Nouvelle Suggestion ou un Apport</span>
              </div>

              {successMsg && (
                <div className="p-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Votre apport a été publié et transmis à l'équipe pédagogique AgroSavoir !</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Sujet ou Titre de votre apport :
                </label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ex: Proposer un module sur la culture de l'Anacarde / Cajou..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Domaine concerné :</label>
                  <select
                    value={domainId}
                    onChange={(e) => setDomainId(e.target.value as DomainId)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-800"
                  >
                    <option value="agriculture">🌱 Agriculture Écologique</option>
                    <option value="elevage">🐓 Élevage & Aviculture</option>
                    <option value="pisciculture">🐟 Pisciculture & Aquaculture</option>
                    <option value="entrepreneuriat">💼 Agrobusiness & Vente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Auteur / Profil :</label>
                  <div className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>{currentUser.name || 'Visiteur'} ({currentUser.region || 'Togo'})</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Explication détaillée / Conseils pratiques :
                </label>
                <textarea
                  required
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Décrivez votre idée, le besoin sur le terrain ou l'amélioration souhaitée..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Publier mon apport communautaire
              </button>
            </form>

            {/* List of Suggestions */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                <span>Derniers Apports des Producteurs et Formateurs</span>
                <span className="text-xs text-slate-500 font-normal">{suggestions.length} Idées Partagées</span>
              </h3>

              <div className="space-y-3">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 shadow-2xs transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-slate-900">{item.topic}</span>
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                            item.status === 'Intégré au cours'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'En validation'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span className="font-semibold text-emerald-800">{item.authorName}</span>
                          <span>•</span>
                          <span>{item.authorRole}</span>
                          <span>•</span>
                          <span>{item.region}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleLike(item.id)}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition flex items-center gap-1 shrink-0 ${
                          userLikes[item.id]
                            ? 'bg-amber-100 border-amber-300 text-amber-900'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${userLikes[item.id] ? 'fill-amber-600 text-amber-600' : ''}`} />
                        <span>{item.likes}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-100">
                      "{item.content}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
            >
              Fermer l'espace suggestions
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
