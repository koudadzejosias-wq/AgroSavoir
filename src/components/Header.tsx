import React from 'react';
import { Sprout, Search, Sparkles, BookOpen, LogIn } from 'lucide-react';
import { UserProgress, UserAccount, LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../utils/i18n';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  progress: UserProgress;
  isMobilePreview: boolean;
  setIsMobilePreview: (val: boolean) => void;
  onOpenAgroBot: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  currentUser: UserAccount;
  onOpenLogin: () => void;
  onOpenProfile: () => void;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  progress,
  isMobilePreview,
  setIsMobilePreview,
  onOpenAgroBot,
  searchQuery,
  setSearchQuery,
  currentUser,
  onOpenLogin,
  onOpenProfile,
  currentLang,
  onSelectLang
}) => {
  const t = (key: string) => getTranslation(currentLang, key);

  // Calculate total overall completed modules
  const totalModules = 12;
  const completedCount = progress.completedModules.length;
  const overallPercent = Math.round((completedCount / totalModules) * 100);

  // Unlocked certificates count
  const certsCount = Object.keys(progress.unlockedCertificates).length;

  const activeLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('catalogue')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Sprout className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight">Agro<span className="text-emerald-600">Savoir</span></span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-full">
                  Web & Mobile
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                {t('app_subtitle')}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm text-slate-800 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-2.5">

            {/* Language Picker Dropdown */}
            <div className="relative group">
              <button
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 flex items-center gap-1.5 transition-all"
                title="Changer de langue"
              >
                <span>{activeLangObj.flag}</span>
                <span className="hidden sm:inline">{activeLangObj.label.split(' ')[0]}</span>
              </button>

              <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 hidden group-hover:block z-50">
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => onSelectLang(l.code)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                      currentLang === l.code ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* User Auth Profile / Login Button */}
            {currentUser.isLoggedIn ? (
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-1.5 p-1 pl-2 sm:pl-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-2xl transition-all shadow-2xs group"
                title="Mon Profil Apprenant (Cliquez pour modifier votre photo et vos informations)"
              >
                <div className="relative shrink-0">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-emerald-500 shadow-xs group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="text-left flex flex-col justify-center max-w-[90px] sm:max-w-[130px]">
                  <div className="text-[11px] sm:text-xs font-black text-slate-900 leading-tight truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[9px] text-emerald-800 font-extrabold uppercase leading-none truncate mt-0.5">
                    {currentUser.ageRange ? currentUser.ageRange.split(' ')[0] : currentUser.role}
                  </div>
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t('login_btn')}</span>
              </button>
            )}

            {/* AgroBot AI Trigger Button */}
            <button
              onClick={onOpenAgroBot}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span className="hidden sm:inline">Tuteur</span> AgroBot
            </button>

            {/* Overall Progress Badge */}
            <button
              onClick={() => setActiveTab('progression')}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-all"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <div className="text-left">
                <div className="text-[9px] font-bold text-slate-500 uppercase leading-none">Progression</div>
                <div className="text-xs font-bold text-slate-900">{overallPercent}%</div>
              </div>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
