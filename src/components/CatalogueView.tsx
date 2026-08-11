import React from 'react';
import { Sprout, Egg, Fish, Briefcase, Play, CheckCircle2, ChevronRight, Award, FileText } from 'lucide-react';
import { DOMAINS_DATA } from '../data/coursesData';
import { DomainData, ModuleData, UserProgress } from '../types';

interface CatalogueViewProps {
  progress: UserProgress;
  onSelectModule: (domain: DomainData, module: ModuleData) => void;
  onStartQuiz: (domain: DomainData) => void;
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  progress,
  onSelectModule,
  onStartQuiz,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout': return Sprout;
      case 'Egg': return Egg;
      case 'Fish': return Fish;
      case 'Briefcase': return Briefcase;
      default: return Sprout;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome Hero Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-extrabold text-xs rounded-full uppercase tracking-wider inline-block">
            Bienvenue sur AgroLearn
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Formations Agropastorales Pratiques & Certifiantes
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            Maîtrisez l'agriculture maraîchère, la provende avicole, la reproduction du Clarias et l'agrobusiness grâce à nos 12 modules multimédias, ressources téléchargeables et tuteur IA.
          </p>
        </div>
      </div>

      {/* Domain Sections */}
      <div className="space-y-8">
        {DOMAINS_DATA.map((domain) => {
          const IconComponent = getIcon(domain.icon);

          // Calculate domain progress
          const domainModuleIds = domain.modules.map((m) => m.id);
          const completedInDomain = domainModuleIds.filter((id) => progress.completedModules.includes(id)).length;
          const domainPercent = Math.round((completedInDomain / domainModuleIds.length) * 100);

          return (
            <div key={domain.id} className="space-y-4">
              
              {/* Domain Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${domain.bgLight}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-slate-900 text-base sm:text-lg">{domain.title}</h2>
                    <p className="text-xs text-slate-500 line-clamp-1">{domain.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Progression Domaine</div>
                    <div className="text-xs font-extrabold text-slate-900">{domainPercent}% Complété</div>
                  </div>

                  <button
                    onClick={() => onStartQuiz(domain)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                  >
                    <Award className="w-4 h-4" /> Certification
                  </button>
                </div>
              </div>

              {/* Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {domain.modules.map((module) => {
                  const watched = progress.completedLessons[module.id] || 0;
                  const isDone = watched >= 90;

                  return (
                    <div
                      key={module.id}
                      onClick={() => onSelectModule(domain, module)}
                      className="p-5 bg-white rounded-3xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-4 group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Module {module.moduleNumber} • {module.videoDuration}
                          </span>
                          {isDone ? (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Fini
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-slate-400">
                              {watched}%
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-800 transition-colors">
                          {module.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {module.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold">
                        <span className="text-slate-400 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" /> {module.resources.length} Fichiers
                        </span>
                        <span className="text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Commencer <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
