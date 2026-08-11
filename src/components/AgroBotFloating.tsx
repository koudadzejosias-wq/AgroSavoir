import React, { useState } from 'react';
import { X, Sparkles, Send, Mic, Camera, RefreshCw, Bot, Volume2, VolumeX, Globe } from 'lucide-react';
import { ChatMessage, LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../utils/i18n';

interface AgroBotFloatingProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: LanguageCode;
  onSelectLang?: (lang: LanguageCode) => void;
}

export const AgroBotFloating: React.FC<AgroBotFloatingProps> = ({
  isOpen,
  onClose,
  currentLang = 'fr',
  onSelectLang
}) => {
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('fr');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Bonjour ! Je suis AgroBot, votre tuteur IA AgroSavoir. Posez-moi toutes vos questions sur la préparation du sol, le compostage, l\'élevage avicole, la pisciculture, la santé animale ou l\'agrobusiness.',
      timestamp: 'À l\'instant',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  // Image Diagnosis State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const t = (key: string) => getTranslation(selectedLang, key);

  function getOfflineAgroBotAnswer(query: string): string {
    const q = query.toLowerCase();
    if (q.includes('neem') || q.includes('pesticide') || q.includes('chenille') || q.includes('puceron') || q.includes('bio')) {
      return "**Biopesticide de Neem & Piment (Recette Écologique AgroSavoir)** :\n\n1. **Ingrédients** : 500g de graines/feuilles de Neem fraîches pilées + 100g de piment fort + 50g de savon noir.\n2. **Préparation** : Macérer dans 10 Litres d'eau pendant 24h à l'ombre. Filtrer au chiffon fin.\n3. **Application** : Diluer à 10% (1L de préparation pour 9L d'eau). Pulvériser le soir après 17h contre les chenilles, pucerons et mouches blanches.";
    }
    if (q.includes('compost') || q.includes('engrais') || q.includes('sol')) {
      return "**Compost Chaud en 21 Jours (Méthode AgroSavoir)** :\n\n1. **Composition** : 2/3 de matières brunes carbonées (paille, feuilles mortes, sciure) et 1/3 de matières vertes azotées (fientes, herbes, déchets de cuisine).\n2. **Humidité** : 60% (Test de la poignée : l'eau suinte légèrement).\n3. **Retournement** : Retourner aux jours 4, 8, 14 et 21. La température monte à 65°C pour détruire les graines d'adventices et germes pathogènes.";
    }
    if (q.includes('poulet') || q.includes('poussin') || q.includes('provende') || q.includes('aliment') || q.includes('volaille')) {
      return "**Formulation de Provende Avicole AgroSavoir** :\n\n- **Démarrage (0-3 semaines)** : 60% Maïs jaune, 20% Tourteau de soja, 10% Farine de poisson, 6% Son de blé, 3.5% CMOV/Prémix, 0.5% Sel (21-22% Protéines).\n- **Finition (4-6 semaines)** : 68% Maïs, 15% Tourteau de soja, 8% Farine de poisson, 5% Son de riz, 3.5% Prémix, 0.5% Sel (18-19% Protéines).\n- **Consommation cible** : ~4.2 kg de provende par poulet de chair sur 6 semaines pour 2.2 kg de poids vif.";
    }
    if (q.includes('poisson') || q.includes('clarias') || q.includes('tilapia') || q.includes('pisciculture') || q.includes('bassin') || q.includes('eau')) {
      return "**Conduite Piscicole (Clarias & Tilapia)** :\n\n- **Paramètres de l'eau** : Température 26-30°C, pH 6.5-8.5, Oxygène > 4 mg/L.\n- **Taille des Granulés** : Alevins (<2g: Poudre 0.5-1mm), Juveniles (2mm, 42% protéines), Grossissement (3-4mm, 38-40% prot).\n- **Densité** : 80 à 120 Clarias/m³ en bac PVC hors-sol avec aération et renouvellement d'eau.";
    }
    if (q.includes('vaccin') || q.includes('gumboro') || q.includes('newcastle') || q.includes('maladie') || q.includes('sante')) {
      return "**Prophylaxie & Santé Avicole AgroSavoir** :\n\n- **J1** : Newcastle (HB1) + Gumboro.\n- **J7** : Rappel Gumboro (Eau de boisson).\n- **J14** : Newcastle Lasota + 2ème rappel Gumboro.\n- **J21** : Variole aviaire.\n- **J28** : Rappel Lasota + Vitamines anti-stress.";
    }
    return "**Conseil Agropastoral AgroSavoir** :\n\nPour maximiser vos rendements :\n1. **Diagnostic de Terrain** : Évaluez soigneusement vos sols, intrants ou paramètres d'eau.\n2. **Normes Techniques** : Appliquez les dosages prescrits dans les cours officiels AgroSavoir.\n3. **Téléchargements** : Tous les fiches techniques PDF sont disponibles hors-ligne dans l'onglet 'Catalogue des Cours'.";
  }

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query && !selectedImage) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query || 'Analyse de cette photo de plante/animal...',
      image: selectedImage || undefined,
      timestamp: 'À l\'instant',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    const currentImg = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    try {
      if (currentImg) {
        // Call Image Diagnosis endpoint
        const res = await fetch('/api/agrobot/analyze-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: currentImg,
            userNotes: query,
          }),
        });
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: data.diagnosis || data.error || getOfflineAgroBotAnswer(query),
          timestamp: 'À l\'instant',
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        // Standard RAG Text Chat Call
        const historyForApi = messages
          .filter((m) => m.id !== 'welcome')
          .map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          }));

        const res = await fetch('/api/agrobot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            history: historyForApi,
          }),
        });

        if (!res.ok) {
          throw new Error('Server response not ok');
        }

        const data = await res.json();
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: data.reply || getOfflineAgroBotAnswer(query),
          timestamp: 'À l\'instant',
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (err) {
      console.error('AgroBot API call failed, falling back to offline knowledge engine:', err);
      // Seamless offline response
      const offlineReply = getOfflineAgroBotAnswer(query);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: offlineReply,
          timestamp: 'À l\'instant (Mode Hors-Ligne)',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Microphone Speech Recognition
  const handleStartVoice = () => {
    const windowSpeech = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!windowSpeech) {
      alert("La reconnaissance vocale n'est pas supportée par votre navigateur web.");
      return;
    }

    try {
      const recognition = new windowSpeech();
      recognition.lang = selectedLang === 'ee' ? 'ee-TG' : selectedLang === 'kbp' ? 'fr-FR' : 'fr-FR';
      recognition.continuous = false;
      recognition.interimResults = false;

      setIsRecording(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputQuery(transcript);
        }
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (e) {
      setIsRecording(false);
    }
  };

  // Text-to-Speech Vocal Readout
  const handleSpeakText = (msgId: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (speakingMsgId === msgId) {
        window.speechSynthesis.cancel();
        setSpeakingMsgId(null);
        return;
      }

      window.speechSynthesis.cancel();
      // Clean markdown tags for clean reading
      const cleanText = text.replace(/[*#_`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 300));
      utterance.lang = selectedLang === 'ee' ? 'ee-TG' : selectedLang === 'kbp' ? 'fr-FR' : 'fr-FR';
      
      utterance.onend = () => setSpeakingMsgId(null);
      utterance.onerror = () => setSpeakingMsgId(null);

      setSpeakingMsgId(msgId);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const quickQuestions = [
    { label: 'Compost chaud 21 jours', text: 'Comment fabriquer le compost chaud en 21 jours ?' },
    { label: 'Provende poussins', text: 'Quelle est la formule de provende pour poussins ?' },
    { label: 'Élevage Clarias', text: 'Comment élever les Clarias en bassin hors-sol ?' },
    { label: 'Biopesticide Neem', text: 'Comment fabriquer et appliquer le biopesticide Neem ?' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full sm:max-w-md h-[100vh] sm:h-[640px] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-slide-up">
        
        {/* Drawer Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex flex-col gap-2 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <Bot className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white">{t('agrobot_title')}</h3>
                  <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-400 text-slate-950 rounded-full">
                    IA Avancée
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100/80">{t('agrobot_subtitle')}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-700/50 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Suggested Quick Buttons */}
        <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q.text)}
              className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-lg text-[11px] font-semibold border border-slate-200 whitespace-nowrap shrink-0 transition-all shadow-2xs"
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs relative group ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                    : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-xs'
                }`}
              >
                {m.image && (
                  <img src={m.image} alt="Uploaded diagnostic" className="w-full max-h-48 object-cover rounded-xl mb-2" />
                )}
                <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100/20 text-[9px]">
                  <span className={m.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'}>
                    {m.timestamp}
                  </span>

                  {/* Audio Readout Button */}
                  {m.sender === 'bot' && (
                    <button
                      onClick={() => handleSpeakText(m.id, m.text)}
                      className={`px-2 py-0.5 rounded-md font-bold flex items-center gap-1 transition ${
                        speakingMsgId === m.id
                          ? 'bg-amber-500 text-slate-950 animate-pulse'
                          : 'bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800'
                      }`}
                    >
                      {speakingMsgId === m.id ? (
                        <>
                          <VolumeX className="w-3 h-3 text-slate-950" />
                          <span>{t('agrobot_stop_reply')}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3 text-emerald-600" />
                          <span>{t('agrobot_listen_reply')}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>AgroBot analyse en {selectedLang.toUpperCase()}...</span>
            </div>
          )}
        </div>

        {/* Selected Image Preview */}
        {selectedImage && (
          <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
            <span className="font-bold flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-emerald-600" /> Photo jointe pour diagnostic
            </span>
            <button
              onClick={() => setSelectedImage(null)}
              className="text-red-600 font-bold hover:underline"
            >
              Supprimer
            </button>
          </div>
        )}

        {/* Bottom Input Area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          {/* Camera upload */}
          <label className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-xl cursor-pointer transition-all">
            <Camera className="w-5 h-5" />
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          {/* Voice Mic Button */}
          <button
            type="button"
            onClick={handleStartVoice}
            className={`p-2 rounded-xl transition-all ${
              isRecording
                ? 'bg-rose-500 text-white animate-bounce'
                : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-100'
            }`}
            title={t('agrobot_voice_record')}
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Text Input */}
          <input
            type="text"
            placeholder={isRecording ? t('agrobot_voice_listening') : t('agrobot_placeholder')}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-emerald-500"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md disabled:opacity-50 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
