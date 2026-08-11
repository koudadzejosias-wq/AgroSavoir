import React, { useState } from 'react';
import { Camera, Sparkles, AlertTriangle, CheckCircle2, RefreshCw, Upload, FileText } from 'lucide-react';

export const DiagnosticView: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setDiagnosisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setDiagnosisResult(null);

    try {
      const res = await fetch('/api/agrobot/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          userNotes: userNotes,
        }),
      });

      const data = await res.json();
      setDiagnosisResult(data.diagnosis || data.error || 'Diagnostic non disponible.');
    } catch (err: any) {
      console.error(err);
      setDiagnosisResult('Erreur lors de la connexion avec le serveur de diagnostic IA.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-purple-800 to-indigo-950 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-300 font-extrabold text-xs uppercase tracking-wider mb-1">
            <Camera className="w-4 h-4" /> Diagnostic IA de Plante & Cheptel
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Analyseur de Pathologies Agricoles</h2>
          <p className="text-xs text-purple-100/80 mt-1 max-w-xl">
            Prenez en photo une feuille malade, un poulet affaibli ou une eau de bassin suspecte. L'IA AgroBot identifie le problème et vous donne la solution AgroLearn.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Upload Card */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Upload className="w-4 h-4 text-purple-600" /> Transmettre une Photo
          </h3>

          <div className="relative border-2 border-dashed border-slate-200 hover:border-purple-400 rounded-2xl p-6 text-center cursor-pointer bg-slate-50 hover:bg-purple-50/20 transition-all">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {selectedImage ? (
              <div className="space-y-2">
                <img src={selectedImage} alt="Uploaded sample" className="max-h-56 mx-auto rounded-xl object-contain border border-slate-200 shadow-sm" />
                <p className="text-xs text-purple-700 font-bold">Changer la photo</p>
              </div>
            ) : (
              <div className="space-y-2 py-4 text-slate-500">
                <Camera className="w-10 h-10 mx-auto text-purple-500" />
                <p className="text-xs font-bold text-slate-800">Cliquez pour importer une photo ou prenez une prise de vue</p>
                <p className="text-[10px] text-slate-400">Formats acceptés : JPG, PNG, WEBP (Max 10MB)</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Notes complémentaires (facultatif) :</label>
            <input
              type="text"
              placeholder="Ex: Taches noires apparues hier, plante arrosée au goutte-à-goutte..."
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-500"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!selectedImage || isLoading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-purple-600/20 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Analyse IA en cours par AgroBot...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Lancer le Diagnostic IA
              </>
            )}
          </button>
        </div>

        {/* Diagnostic Results Card */}
        <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4" /> Rapport de Diagnostic
            </div>

            {diagnosisResult ? (
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
                {diagnosisResult}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <Sparkles className="w-10 h-10 mx-auto text-slate-700" />
                <p className="text-xs font-bold text-slate-400">Aucun résultat d'analyse pour l'instant</p>
                <p className="text-[11px] text-slate-600 max-w-xs mx-auto">
                  Importez une photo d'un végétal ou d'un animal malade pour recevoir les conseils de traitement AgroLearn.
                </p>
              </div>
            )}
          </div>

          <p className="text-[10px] text-slate-500 text-center italic">
            AgroLearn IA Diagnostic v2.4 • Modèle Gemini 3.6 Vision
          </p>
        </div>

      </div>

    </div>
  );
};
