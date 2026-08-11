import React from 'react';
import { X, Download, FileText, Image, FileCode, CheckCircle2 } from 'lucide-react';
import { ResourceItem, DomainId } from '../types';
import { generateResourcePDF } from '../utils/pdfGenerator';
import { downloadDocxFile } from '../utils/docxGenerator';

interface ResourcePreviewModalProps {
  resource: ResourceItem | null;
  domainId: DomainId;
  onClose: () => void;
  onTrackDownload: (resource: ResourceItem) => void;
}

export const ResourcePreviewModal: React.FC<ResourcePreviewModalProps> = ({
  resource,
  onClose,
  onTrackDownload,
}) => {
  if (!resource) return null;

  const handleDownload = () => {
    onTrackDownload(resource);

    if (resource.type === 'pdf') {
      generateResourcePDF(resource.title, resource.filename, resource.contentMarkdown || resource.description);
    } else if (resource.type === 'docx') {
      downloadDocxFile(resource.title, resource.filename, resource.contentMarkdown || resource.description);
    } else if (resource.type === 'png' && resource.imageUrl) {
      const link = document.createElement('a');
      link.href = resource.imageUrl;
      link.download = resource.filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              resource.type === 'pdf' ? 'bg-red-100 text-red-700' :
              resource.type === 'docx' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {resource.type === 'pdf' && <FileText className="w-5 h-5" />}
              {resource.type === 'docx' && <FileCode className="w-5 h-5" />}
              {resource.type === 'png' && <Image className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{resource.type.toUpperCase()} • {resource.fileSize}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">{resource.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Preview Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl flex items-start gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong>Ressource AgroLearn Validée :</strong> Ce fichier est pré-intégré dans votre parcours d'apprentissage. Vous pouvez le lire directement ci-dessous ou le télécharger pour un usage hors-ligne sur le terrain.
            </p>
          </div>

          {resource.type === 'png' && resource.imageUrl ? (
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-950 flex items-center justify-center min-h-[250px]">
              <img
                src={resource.imageUrl}
                alt={resource.title}
                className="max-h-[400px] w-auto object-contain"
              />
            </div>
          ) : (
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed shadow-inner max-h-[400px] overflow-y-auto">
              {resource.contentMarkdown || resource.description}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <span className="text-xs text-slate-500 font-medium">Fichier: <code className="text-slate-800 font-mono">{resource.filename}</code></span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-xl transition-all"
            >
              Fermer
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-4 h-4" /> Télécharger ({resource.type.toUpperCase()})
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
