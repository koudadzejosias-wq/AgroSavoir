import React, { useState } from 'react';
import { Calculator, Droplets, Utensils, DollarSign, Sprout, ArrowRight } from 'lucide-react';

export const CalculatorsView: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<'water' | 'feed' | 'margin' | 'soil'>('water');

  // Calculator 1: Water Needs State
  const [cropType, setCropType] = useState('tomate');
  const [plantCount, setPlantCount] = useState(1000);
  const [emitterFlowRate, setEmitterFlowRate] = useState(2); // L/h per emitter

  // Calculator 2: Feed Formulation State
  const [poultryType, setPoultryType] = useState('demarrage');
  const [batchSize, setBatchSize] = useState(500);

  // Calculator 3: Margin & Profitability State
  const [chickPrice, setChickPrice] = useState(450);
  const [feedSacks, setFeedSacks] = useState(10);
  const [feedSackPrice, setFeedSackPrice] = useState(18000);
  const [otherCosts, setOtherCosts] = useState(80000);
  const [sellingPrice, setSellingPrice] = useState(3200);

  // Water Calculation
  const waterPerPlant: Record<string, number> = {
    tomate: 4.5,
    piment: 3.5,
    concombre: 5.0,
    gombo: 3.0,
    oignon: 2.0,
  };
  const totalWaterNeededL = plantCount * (waterPerPlant[cropType] || 4.0);
  const wateringTimeMinutes = Math.round((totalWaterNeededL / (plantCount * emitterFlowRate)) * 60);

  // Feed Calculation
  const totalFeedKg = poultryType === 'demarrage' ? batchSize * 0.8 : batchSize * 3.4; // kg over phase
  const maizeKg = Math.round(totalFeedKg * 0.62);
  const soyaKg = Math.round(totalFeedKg * 0.22);
  const fishKg = Math.round(totalFeedKg * 0.08);

  // Margin Calculation
  const totalCost = batchSize * chickPrice + feedSacks * feedSackPrice + otherCosts;
  const unitCost = Math.round(totalCost / batchSize);
  const grossProfit = batchSize * sellingPrice - totalCost;
  const marginPercent = Math.round(((sellingPrice - unitCost) / unitCost) * 100);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-xs uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" /> Boîte à Outils AgroLearn
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Calculateurs Agropastoraux Intelligents</h2>
          <p className="text-xs text-emerald-100/80 mt-1 max-w-xl">
            Optimisez l'irrigation, la provende, le diagnostic de vos sols et la rentabilité financière de votre ferme grâce à nos modèles mathématiques pré-paramétrés.
          </p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveCalc('water')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            activeCalc === 'water' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Droplets className="w-4 h-4 text-sky-600" /> Besoins en Eau
        </button>

        <button
          onClick={() => setActiveCalc('feed')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            activeCalc === 'feed' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Utensils className="w-4 h-4 text-amber-600" /> Provende Volailles
        </button>

        <button
          onClick={() => setActiveCalc('margin')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            activeCalc === 'margin' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4 text-purple-600" /> Marge & Rentabilité
        </button>
      </div>

      {/* CALCULATOR 1: WATER */}
      {activeCalc === 'water' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Droplets className="w-5 h-5 text-sky-600" /> Parameter Vos Cultures
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Type de Culture Maraîchère</label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
              >
                <option value="tomate">Tomate (4.5 L / plant / jour)</option>
                <option value="piment">Piment / Poivron (3.5 L / plant / jour)</option>
                <option value="concombre">Concombre (5.0 L / plant / jour)</option>
                <option value="gombo">Gombo (3.0 L / plant / jour)</option>
                <option value="oignon">Oignon (2.0 L / plant / jour)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre de Plants Cultivés</label>
              <input
                type="number"
                value={plantCount}
                onChange={(e) => setPlantCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Débit du Goutteur (Litres / heure)</label>
              <input
                type="number"
                step="0.5"
                value={emitterFlowRate}
                onChange={(e) => setEmitterFlowRate(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
              />
            </div>
          </div>

          <div className="p-6 bg-sky-50 rounded-2xl border border-sky-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Résultat du Dimensionnement</span>
              <div className="mt-3 space-y-3">
                <div className="p-3.5 bg-white rounded-xl border border-sky-100">
                  <div className="text-xs text-slate-500 font-medium">Volume Total d'Eau Quotidien</div>
                  <div className="text-2xl font-extrabold text-sky-900">{totalWaterNeededL.toLocaleString()} Litres / jour</div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-sky-100">
                  <div className="text-xs text-slate-500 font-medium">Temps d'Arrosage Nécessaire</div>
                  <div className="text-xl font-extrabold text-emerald-800">{wateringTimeMinutes} Minutes (soit {(wateringTimeMinutes/60).toFixed(1)} heures)</div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-sky-100">
                  <div className="text-xs text-slate-500 font-medium">Capacité Cuve Recommandée</div>
                  <div className="text-base font-bold text-slate-900">{Math.ceil(totalWaterNeededL / 1000)} Cuve(s) IBC de 1000L</div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-sky-800 italic">
              💡 Conseil AgroLearn: Divisez le temps d'arrosage en 2 sessions (1 session tôt à 6h30 et 1 session le soir à 17h30) pour éviter l'évaporation solaire.
            </p>
          </div>
        </div>
      )}

      {/* CALCULATOR 2: FEED FORMULATION */}
      {activeCalc === 'feed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Utensils className="w-5 h-5 text-amber-600" /> Rationnement Provende
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Stade de Croissance</label>
              <select
                value={poultryType}
                onChange={(e) => setPoultryType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
              >
                <option value="demarrage">Démarrage Poussins (J1 à J21 - 21.5% Protéines)</option>
                <option value="finition">Finition Poulets (J22 à J42 - 18.5% Protéines)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Taille de la Bande (Nombre de Volailles)</label>
              <input
                type="number"
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
              />
            </div>
          </div>

          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 space-y-4">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Matières Premières à Prévoir ({totalFeedKg} kg au total)</span>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-amber-100 font-medium text-xs text-slate-800">
                <span>Maïs Jaune Concassé (62%)</span>
                <span className="font-extrabold text-amber-900">{maizeKg} kg</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-amber-100 font-medium text-xs text-slate-800">
                <span>Tourteau de Soja (22%)</span>
                <span className="font-extrabold text-amber-900">{soyaKg} kg</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-amber-100 font-medium text-xs text-slate-800">
                <span>Farine de Poisson locale (8%)</span>
                <span className="font-extrabold text-amber-900">{fishKg} kg</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-amber-100 font-medium text-xs text-slate-800">
                <span>Coquilles + Prémix Volailles (8%)</span>
                <span className="font-extrabold text-amber-900">{Math.round(totalFeedKg * 0.08)} kg</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 3: MARGIN */}
      {activeCalc === 'margin' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-600" /> Saisie des Dépenses (FCFA)
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Nombre Poulets</label>
                <input
                  type="number"
                  value={batchSize}
                  onChange={(e) => setBatchSize(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Prix Poussin Unitaire</label>
                <input
                  type="number"
                  value={chickPrice}
                  onChange={(e) => setChickPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Sacs Aliment (50kg)</label>
                <input
                  type="number"
                  value={feedSacks}
                  onChange={(e) => setFeedSacks(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Prix par Sac Provende</label>
                <input
                  type="number"
                  value={feedSackPrice}
                  onChange={(e) => setFeedSackPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Prix de Vente Unitaire Cible (FCFA)</label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-purple-50 border border-purple-200 rounded-xl text-xs font-bold text-purple-900"
              />
            </div>
          </div>

          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-200 space-y-3">
            <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">Bilan Financier Prévisionnel</span>

            <div className="p-3.5 bg-white rounded-xl border border-purple-100">
              <div className="text-xs text-slate-500">Coût de Revient Unitaire</div>
              <div className="text-xl font-extrabold text-slate-900">{unitCost.toLocaleString()} FCFA / sujet</div>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-purple-100">
              <div className="text-xs text-slate-500">Bénéfice Net Total Espéré</div>
              <div className="text-2xl font-extrabold text-emerald-600">{grossProfit.toLocaleString()} FCFA</div>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-purple-100">
              <div className="text-xs text-slate-500">Taux de Marge sur Coût</div>
              <div className="text-xl font-extrabold text-purple-900">{marginPercent}%</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
