import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Globe, MapPin, Briefcase, LogOut, Save, ShieldCheck, Mail, Phone, Image, Scale, Sparkles, CheckCircle2, Camera, Upload, Calendar, RotateCcw } from 'lucide-react';
import { UserAccount, LanguageCode, UserProgress } from '../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../utils/i18n';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  userProgress: UserProgress;
  onUpdateUser: (user: UserAccount) => void;
  onLogout: () => void;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onOpenCgu?: () => void;
  onResetProgress?: () => void;
}

const PRESET_AVATARS = [
  { label: 'Agriculteur', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  { label: 'Productrice', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
  { label: 'Agronome', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  { label: 'Jeune Entrepreneur', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { label: 'Éleveuse', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' },
  { label: 'Conseiller', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' },
];

export const AGE_RANGES = [
  "18 - 25 ans (Jeune)",
  "26 - 35 ans (Jeune Producteur)",
  "36 - 50 ans",
  "Plus de 50 ans",
  "Moins de 18 ans"
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  userProgress,
  onUpdateUser,
  onLogout,
  currentLang,
  onSelectLang,
  onOpenCgu,
  onResetProgress
}) => {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '+228 90 00 00 00');
  const [role, setRole] = useState(currentUser.role);
  const [region, setRegion] = useState(currentUser.region);
  const [ageRange, setAgeRange] = useState(currentUser.ageRange || '26 - 35 ans (Jeune Producteur)');
  const [avatar, setAvatar] = useState(currentUser.avatar || PRESET_AVATARS[0].url);
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(currentLang);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const t = (key: string) => getTranslation(selectedLang, key);

  const completedCount = userProgress.completedModules.length;
  const certificatesCount = Object.keys(userProgress.unlockedCertificates).length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatar(reader.result);
          setShowAvatarPicker(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserAccount = {
      ...currentUser,
      name,
      email,
      phone,
      role,
      region,
      ageRange,
      avatar,
      preferredLanguage: selectedLang
    };
    onSelectLang(selectedLang);
    onUpdateUser(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-auto max-h-[90vh] flex flex-col"
        >
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-5 sm:p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              
              {/* Photo Avatar with Camera Button */}
              <div className="relative group shrink-0">
                <img
                  src={avatar}
                  alt={name}
                  className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-4 border-emerald-400 object-cover shadow-xl"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                  title="Téléverser une nouvelle photo de profil"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-xl font-black text-white leading-tight">
                    {name || 'Nom & Prénom'}
                  </h3>
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                </div>
                
                <p className="text-xs text-slate-300 font-medium">{email || 'e-mail non renseigné'}</p>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                    {role}
                  </span>
                  <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold rounded-full">
                    {ageRange}
                  </span>
                  <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-semibold rounded-full">
                    {region.split('(')[0]}
                  </span>
                </div>
              </div>

            </div>

            {/* Quick stats badge */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800/80 text-center">
              <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-white/5">
                <span className="text-xl font-black text-emerald-400">{completedCount}</span>
                <p className="text-[10px] text-slate-300 uppercase font-bold">Modules Validés</p>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-white/5">
                <span className="text-xl font-black text-amber-400">{certificatesCount}</span>
                <p className="text-[10px] text-slate-300 uppercase font-bold">Certificats Obtenus</p>
              </div>
            </div>
          </div>

          {/* Avatar Photo Actions & Preset Selector */}
          <div className="p-3 bg-emerald-50/80 border-b border-emerald-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-emerald-900 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-emerald-600" /> Photo de profil apprenant :
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition flex items-center gap-1 text-[11px]"
              >
                <Upload className="w-3.5 h-3.5" /> Téléverser photo (Galerie/Appareil)
              </button>
              <button
                type="button"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 rounded-lg transition text-[11px]"
              >
                {showAvatarPicker ? 'Masquer modèles' : 'Choisir un modèle'}
              </button>
            </div>
          </div>

          {showAvatarPicker && (
            <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Sélectionnez une photo modèle pré-définie :</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {PRESET_AVATARS.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setAvatar(av.url);
                      setShowAvatarPicker(false);
                    }}
                    className={`p-1 rounded-xl border transition ${
                      avatar === av.url ? 'border-emerald-600 ring-2 ring-emerald-500/30 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <img src={av.url} alt={av.label} className="w-10 h-10 rounded-lg object-cover mx-auto" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-4 text-xs flex-1 overflow-y-auto">
            
            {savedSuccess && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-xl font-bold flex items-center gap-2 animate-bounce">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Profil du participant mis à jour avec succès !</span>
              </div>
            )}

            {/* Nom et Prénom */}
            <div>
              <label className="block font-extrabold text-slate-800 mb-1 flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-600" /> Nom & Prénom complets du Participant
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Koffi Agbéko"
                className="w-full py-2.5 px-3.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900 bg-slate-50"
              />
            </div>

            {/* Tranche d'âge & Profil/Spécialité */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-extrabold text-slate-800 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600" /> Tranche d'âge
                </label>
                <select
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-bold text-slate-800"
                >
                  {AGE_RANGES.map((range, idx) => (
                    <option key={idx} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-extrabold text-slate-800 mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-emerald-600" /> Profil / Spécialité
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserAccount['role'])}
                  className="w-full py-2.5 px-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-bold text-slate-800"
                >
                  <option value="agriculteur">Agriculteur / Maraîcher</option>
                  <option value="eleveur">Éleveur Volaille / Bétail</option>
                  <option value="pisciculteur">Pisciculteur</option>
                  <option value="entrepreneur">Entrepreneur Agrobusiness</option>
                  <option value="student">Étudiant / Stagiaire</option>
                </select>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" /> Adresse E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: participant@agrosavoir.tg"
                  className="w-full py-2 px-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> Téléphone / WhatsApp
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+228 90 12 34 56"
                  className="w-full py-2 px-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 bg-slate-50 font-mono"
                />
              </div>
            </div>

            {/* Region */}
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Région du Togo
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full py-2 px-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-semibold text-slate-800"
              >
                <option value="Maritime (Lomé / Tsévié)">Maritime (Lomé)</option>
                <option value="Plateaux (Atakpamé / Kpalimé)">Plateaux (Atakpamé)</option>
                <option value="Centrale (Sokodé)">Centrale (Sokodé)</option>
                <option value="Kara (Kara / Bafilo)">Kara (Kara)</option>
                <option value="Savanes (Dapaong)">Savanes (Dapaong)</option>
              </select>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-600" /> {t('learning_language')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setSelectedLang(lang.code);
                      onSelectLang(lang.code);
                    }}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition flex flex-col items-center gap-1 ${
                      selectedLang === lang.code
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="text-[11px]">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CGU Link inside Profile */}
            {onOpenCgu && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <Scale className="w-4 h-4 text-slate-500" />
                  <span>Conditions Générales d'Utilisation</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCgu();
                  }}
                  className="text-emerald-700 hover:text-emerald-800 font-bold underline text-[11px]"
                >
                  Consulter les CGU
                </button>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="py-2.5 px-3.5 text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                {t('logout_btn')}
              </button>

              <button
                type="submit"
                className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                {savedSuccess ? 'Modifications Enregistrées !' : t('save_changes')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


