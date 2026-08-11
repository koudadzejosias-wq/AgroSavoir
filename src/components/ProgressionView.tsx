import React from 'react';
import { BookOpen, CheckCircle2, Download, FileText, Award, ArrowUpRight, RotateCcw } from 'lucide-react';
import { DOMAINS_DATA } from '../data/coursesData';
import { UserProgress, ResourceItem } from '../types';

interface ProgressionViewProps {
  progress: UserProgress;
  onOpenResource: (res: ResourceItem) => void;
  onResetProgress?: () => void;
}

export const ProgressionView: React.FC<ProgressionViewProps> = ({
  progress,
  onOpenResource,
  onResetProgress,
}) => {
  const totalModules = 12;
  const completedModules = progress.completedModules.length;
  const overallPercent = Math.round((completedModules / totalModules) * 100);

  // Flatten all available resources for Resource Vault
  const allResources = DOMAINS_DATA.flatMap((d) =>
    d.modules.flatMap((m) =>
      m.resources.map((r) => ({ ...r, domainId: d.id, domainTitle: d.title }))
    )
  );

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" /> Tableau de Bord Apprenant
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Suivi de Progression & Coffre de Ressources</h2>
          <p className="text-xs text-emerald-100/80 mt-1 max-w-xl">
            Visualisez le taux de complétion de vos 4 filières et accédez à tous les guides PDF, DOCX et infographies débloqués.
          </p>
        </div>

        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center">
          <span className="text-[10px] font-bold text-emerald-300 uppercase">Taux de Maîtrise</span>
          <div className="text-2xl font-black text-white">{overallPercent}%</div>
        </div>
      </div>

      {/* Domain Progression Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DOMAINS_DATA.map((domain) => {
          const domainModuleIds = domain.modules.map((m) => m.id);
          const completedInDomain = domainModuleIds.filter((id) => progress.completedModules.includes(id)).length;
          const percent = Math.round((completedInDomain / domainModuleIds.length) * 100);

          return (
            <div key={domain.id} className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{domain.shortTitle}</span>
              <h3 className="font-extrabold text-slate-900 text-sm">{domain.title}</h3>

              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>{completedInDomain} / {domainModuleIds.length} Modules</span>
                <span className="text-emerald-700">{percent}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* RESOURCE VAULT (HISTORIQUE ET FICHIERS) */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-600" /> Coffre-Fort des Ressources Téléchargeables
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Accédez directement à l'ensemble des guides PDF, plans de poulaillers, formulaires provende et recettes biopesticides.
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
            {allResources.length} Fichiers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allResources.map((res) => (
            <div
              key={res.id}
              className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between gap-3"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {res.domainTitle} • {res.type.toUpperCase()}
                </span>
                <h4 className="font-bold text-slate-900 text-xs mt-1">{res.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{res.description}</p>
              </div>

              <button
                onClick={() => onOpenResource(res)}
                className="w-full py-2 bg-white hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Ouvrir & Télécharger
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
