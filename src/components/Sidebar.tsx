import React from 'react';
import { LayoutGrid, BookOpen, Calculator, MessageSquare, Award, Camera, Sparkles, Lightbulb, Scale } from 'lucide-react';
import { LanguageCode } from '../types';
import { getTranslation } from '../utils/i18n';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unlockedCertsCount: number;
  currentLang?: LanguageCode;
  onOpenCgu?: () => void;
  onOpenSuggestions?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  unlockedCertsCount,
  currentLang = 'fr',
  onOpenCgu,
  onOpenSuggestions
}) => {
  const t = (key: string) => getTranslation(currentLang as LanguageCode, key);

  const navItems = [
    { id: 'catalogue', label: t('nav_catalogue'), icon: LayoutGrid },
    { id: 'progression', label: t('nav_progression'), icon: BookOpen },
    { id: 'calculateurs', label: t('nav_calculators'), icon: Calculator },
    { id: 'forum', label: t('nav_mentorship'), icon: MessageSquare },
    { id: 'diagnostic', label: t('nav_diagnostic'), icon: Camera, badge: 'IA' },
    { id: 'certificats', label: t('nav_certificates'), icon: Award, count: unlockedCertsCount },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4 gap-1">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Menu Principal
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/80 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-700 rounded-md">
                  {item.badge}
                </span>
              )}
              {item.count !== undefined && item.count > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}

        {/* Community Suggestions Action */}
        {onOpenSuggestions && (
          <button
            onClick={onOpenSuggestions}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all shadow-2xs group"
          >
            <div className="flex items-center gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
              <span>Boîte à Suggestions</span>
            </div>
            <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-amber-200 text-amber-900 rounded-md">
              Avis
            </span>
          </button>
        )}

        {/* CGU Terms Button */}
        {onOpenCgu && (
          <button
            onClick={onOpenCgu}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl font-medium text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <Scale className="w-4 h-4 text-slate-400" />
            <span>Conditions d'Utilisation (CGU)</span>
          </button>
        )}

        {/* Quick Help Card Banner */}
        <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white relative overflow-hidden shadow-lg shadow-emerald-950/20">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> AgroBot IA
          </div>
          <h4 className="font-bold text-sm text-white mb-1">Besoin d'un conseil ?</h4>
          <p className="text-xs text-emerald-100/80 mb-3 leading-relaxed">
            Posez toutes vos questions sur l'agriculture, l'élevage, la pisciculture ou l'agrobusiness.
          </p>
          <button
            onClick={() => setActiveTab('agrobot')}
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all text-center"
          >
            Lancer AgroBot
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] leading-tight text-center truncate max-w-[60px]">
                {item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
