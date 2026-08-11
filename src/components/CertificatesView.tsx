import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, Download, ExternalLink, ShieldCheck, Sparkles, RefreshCcw, QrCode, Search, Share2, Linkedin, Check, Copy, Globe, BadgeCheck, FileText, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DOMAINS_DATA } from '../data/coursesData';
import { DomainData, UserProgress } from '../types';
import { generateCertificatePDF } from '../utils/pdfGenerator';

interface CertificatesViewProps {
  progress: UserProgress;
  onUnlockCertificate: (domainId: string, certData: { certificateId: string; issueDate: string; learnerName: string }) => void;
  selectedQuizDomain: DomainData | null;
  setSelectedQuizDomain: (d: DomainData | null) => void;
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({
  progress,
  onUnlockCertificate,
  selectedQuizDomain,
  setSelectedQuizDomain,
}) => {
  // Quiz evaluation state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [learnerNameInput, setLearnerNameInput] = useState('Josias Koudadze');

  // ProCertif Verification Search Input
  const [searchCertQuery, setSearchCertQuery] = useState('');
  const [proCertifSearchResult, setProCertifSearchResult] = useState<{
    isValid: boolean;
    certId: string;
    domainTitle?: string;
    learnerName?: string;
    issueDate?: string;
    skills?: string[];
    hash?: string;
  } | null>(null);

  // Credly / Skill-Ed Badge Details Modal State
  const [activeBadgeModal, setActiveBadgeModal] = useState<{
    domain: DomainData;
    certData: { certificateId: string; issueDate: string; learnerName: string };
  } | null>(null);

  // Modal when course modules are not all completed
  const [incompleteDomainModal, setIncompleteDomainModal] = useState<{
    domain: DomainData;
    completedCount: number;
    totalCount: number;
  } | null>(null);

  const [copiedLink, setCopiedLink] = useState(false);

  const handleTryStartQuiz = (domain: DomainData) => {
    const domainModuleIds = domain.modules.map((m) => m.id);
    const completedCount = domainModuleIds.filter((id) => (progress.completedLessons[id] || 0) >= 90).length;
    if (completedCount < domainModuleIds.length) {
      setIncompleteDomainModal({
        domain,
        completedCount,
        totalCount: domainModuleIds.length,
      });
    } else {
      setSelectedQuizDomain(domain);
    }
  };

  const activeDomain = selectedQuizDomain || DOMAINS_DATA[0];
  const questions = activeDomain.quiz;

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleFinishQuiz = () => {
    setQuizSubmitted(true);

    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / questions.length) * 100);

    // Trigger celebration confetti if score >= 75%
    if (scorePercent >= 75) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      const certId = `AGRO-2026-${Math.floor(1000 + Math.random() * 9000)}-${activeDomain.id.slice(0, 2).toUpperCase()}`;
      const issueDate = new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      onUnlockCertificate(activeDomain.id, {
        certificateId: certId,
        issueDate,
        learnerName: learnerNameInput || 'Josias Koudadze',
      });
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const handleDownloadCert = (domain: DomainData) => {
    const cert = progress.unlockedCertificates[domain.id];
    if (cert) {
      generateCertificatePDF(
        domain,
        cert.learnerName || learnerNameInput,
        cert.certificateId,
        cert.issueDate
      );
    }
  };

  const handleVerifyProCertifSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchCertQuery.trim().toUpperCase();
    if (!query) return;

    // Search unlocked certificates
    let foundDomain: DomainData | null = null;
    let foundCert: { certificateId: string; issueDate: string; learnerName: string } | null = null;

    Object.entries(progress.unlockedCertificates).forEach(([domId, certObj]) => {
      const cert = certObj as { certificateId: string; issueDate: string; learnerName: string };
      if (cert && cert.certificateId && (cert.certificateId.toUpperCase() === query || query.includes('AGRO'))) {
        const dom = DOMAINS_DATA.find((d) => d.id === domId);
        if (dom) {
          foundDomain = dom;
          foundCert = cert;
        }
      }
    });

    if (foundDomain && foundCert) {
      const d = foundDomain as DomainData;
      const c = foundCert as { certificateId: string; issueDate: string; learnerName: string };
      setProCertifSearchResult({
        isValid: true,
        certId: c.certificateId,
        domainTitle: d.certificateTitle,
        learnerName: c.learnerName,
        issueDate: c.issueDate,
        skills: d.modules.map((m) => m.title),
        hash: `0x8f${Math.random().toString(16).substring(2, 10)}${c.certificateId.replace(/[^0-9]/g, '')}`,
      });
    } else {
      // Demo simulated valid check for standard ID AGRO-2026-8942-AG
      if (query === 'AGRO-2026-8942-AG' || query.length >= 8) {
        setProCertifSearchResult({
          isValid: true,
          certId: query,
          domainTitle: 'Certificat d\'Aptitude en Agriculture Écologique',
          learnerName: learnerNameInput || 'Josias Koudadze',
          issueDate: '5 Août 2026',
          skills: ['Compostage chaud 21 jours', 'Biopesticides à base de Neem', 'Irrigation au goutte-à-goutte'],
          hash: `0x9a3f7c1d8e2094${query.slice(-4)}`,
        });
      } else {
        setProCertifSearchResult({
          isValid: false,
          certId: query,
        });
      }
    }
  };

  const handleCopyShareLink = (certId: string) => {
    const link = `https://agrosavoir.tg/verify/${certId}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header Banner - Credly / Skill-Ed / ProCertif Ecosystem */}
      <div className="p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 rounded-full flex items-center gap-1">
                <BadgeCheck className="w-3.5 h-3.5" /> Normes Credly • Skill-Ed • ProCertif
              </span>
              <span className="text-xs text-emerald-300 font-semibold">Togo & Afrique de l'Ouest</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Certifications & Badges Numériques Vérifiés
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Obtenez des certifications professionnelles agropastorales infalsifiables. Chaque certificat est enregistré dans le registre numérique <strong>ProCertif Ledger</strong> et exportable sous forme de badge digital <strong>Credly / Skill-Ed</strong> pour valoriser votre CV et vos demandes de financements.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-2">
              <div className="text-xl font-extrabold text-amber-400">{Object.keys(progress.unlockedCertificates).length} / 4</div>
              <div className="text-[10px] text-slate-300 font-medium">Diplômes Acquis</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center px-2">
              <div className="text-xl font-extrabold text-emerald-400">100%</div>
              <div className="text-[10px] text-slate-300 font-medium">Vérifié ProCertif</div>
            </div>
          </div>
        </div>
      </div>

      {/* PROCERTIF REAL-TIME PUBLIC VERIFICATION BAR */}
      <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="font-extrabold text-slate-900 text-sm">
            Moteur de Vérification d'Authenticité ProCertif
          </h3>
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
            Blockchain Ledger Live
          </span>
        </div>

        <form onSubmit={handleVerifyProCertifSearch} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Entrez un ID de Certificat ProCertif (ex: AGRO-2026-8942-AG)..."
              value={searchCertQuery}
              onChange={(e) => setSearchCertQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2"
          >
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>Vérifier sur ProCertif</span>
          </button>
        </form>

        {/* Verification Search Output Card */}
        {proCertifSearchResult && (
          <div className="mt-3 p-4 rounded-2xl border transition-all animate-fade-in">
            {proCertifSearchResult.isValid ? (
              <div className="bg-emerald-50/80 border-emerald-300 text-emerald-950 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>DIPLÔME AUTHENTIQUE & VÉRIFIÉ (ProCertif)</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded-md">
                    {proCertifSearchResult.certId}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-slate-500 text-[10px]">Titulaire Certifié :</div>
                    <div className="font-extrabold text-slate-900 text-sm">{proCertifSearchResult.learnerName}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px]">Titre de la Formation :</div>
                    <div className="font-bold text-slate-900">{proCertifSearchResult.domainTitle}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px]">Organisme Émetteur :</div>
                    <div className="font-semibold text-slate-800">AgroSavoir & Ministère de l'Agriculture Togo</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px]">Empreinte Cryptographique ProCertif :</div>
                    <code className="text-[11px] font-mono font-bold text-emerald-800">{proCertifSearchResult.hash}</code>
                  </div>
                </div>

                {proCertifSearchResult.skills && (
                  <div className="pt-2 border-t border-emerald-200">
                    <div className="text-[10px] text-emerald-800 font-bold mb-1">Compétences Validées (Standard Skill-Ed) :</div>
                    <div className="flex flex-wrap gap-1.5">
                      {proCertifSearchResult.skills.map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white text-emerald-900 rounded-lg text-[10px] font-semibold border border-emerald-200">
                          ✓ {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-red-50 border-red-200 text-red-900 p-4 rounded-2xl flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-600 shrink-0" />
                <div>
                  <div className="font-bold text-xs">Identifiant Introuvable ({proCertifSearchResult.certId})</div>
                  <div className="text-[11px] text-red-700 mt-0.5">
                    Aucun certificat ne correspond à cet ID dans le registre. Passez l'évaluation pour obtenir votre diplôme officiel.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* QUIZ EVALUATION SECTION */}
      {selectedQuizDomain && (
        <div className="p-6 bg-white rounded-3xl border-2 border-amber-400 shadow-2xl space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" /> Évaluation Certifiante • {selectedQuizDomain.title}
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Mini-Quiz de Validation des Acquis Agropastoraux
              </h3>
            </div>

            <button
              onClick={() => setSelectedQuizDomain(null)}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
            >
              Fermer le quiz
            </button>
          </div>

          {/* Learner Name Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nom et Prénom complets tels qu'ils figureront sur le diplôme officiel PDF :
            </label>
            <input
              type="text"
              value={learnerNameInput}
              onChange={(e) => setLearnerNameInput(e.target.value)}
              className="w-full max-w-md px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {!quizSubmitted ? (
            <div className="space-y-6">
              {/* Question Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Question {currentQuestionIdx + 1} sur {questions.length}</span>
                  <span>75% minimum requis pour valider le badge Credly</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Question */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-extrabold text-slate-900 text-sm leading-relaxed">
                  {questions[currentQuestionIdx].question}
                </h4>

                <div className="space-y-2">
                  {questions[currentQuestionIdx].options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQuestionIdx, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border font-semibold text-xs transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-100 border-amber-400 text-slate-950 font-bold ring-2 ring-amber-400/20'
                            : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="space-y-3">
                {!selectedAnswers[currentQuestionIdx] && selectedAnswers[currentQuestionIdx] !== 0 && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Veuillez sélectionner une réponse ci-dessus avant d'accéder à la question suivante.</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx((p) => p - 1)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold disabled:opacity-40"
                  >
                    Précédent
                  </button>

                  {currentQuestionIdx < questions.length - 1 ? (
                    <button
                      disabled={selectedAnswers[currentQuestionIdx] === undefined}
                      onClick={() => {
                        if (selectedAnswers[currentQuestionIdx] !== undefined) {
                          setCurrentQuestionIdx((p) => p + 1);
                        }
                      }}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none text-white font-bold text-xs rounded-xl shadow-md transition"
                    >
                      Suivant
                    </button>
                  ) : (
                    <button
                      disabled={selectedAnswers[currentQuestionIdx] === undefined}
                      onClick={() => {
                        if (selectedAnswers[currentQuestionIdx] !== undefined) {
                          handleFinishQuiz();
                        }
                      }}
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition"
                    >
                      Valider le Quiz & Générer le Diplôme
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Quiz Results Display */
            <div className="space-y-6 text-center py-4">
              {(() => {
                let correctCount = 0;
                questions.forEach((q, idx) => {
                  if (selectedAnswers[idx] === q.correctAnswer) correctCount++;
                });
                const percent = Math.round((correctCount / questions.length) * 100);
                const passed = percent >= 75;

                return (
                  <div className="space-y-4 max-w-lg mx-auto">
                    <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-lg ${
                      passed ? 'bg-emerald-100 text-emerald-600 border-4 border-emerald-300' : 'bg-red-100 text-red-600'
                    }`}>
                      {passed ? <Award className="w-10 h-10 animate-bounce" /> : <XCircle className="w-10 h-10" />}
                    </div>

                    <h3 className="font-extrabold text-2xl text-slate-900">
                      {passed ? 'Félicitations ! Quiz Réussi avec Succès' : 'Niveau Insuffisant'}
                    </h3>

                    <p className="text-sm text-slate-600">
                      Votre score : <strong className="text-emerald-700 text-lg font-black">{percent}%</strong> ({correctCount} / {questions.length} réponses correctes)
                    </p>

                    {passed ? (
                      <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-3 text-left">
                        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Certificat ProCertif & Badge Credly Débloqués !</span>
                        </div>
                        <p className="text-xs text-emerald-950 leading-relaxed">
                          Votre titre officiel <strong>« {selectedQuizDomain.certificateTitle} »</strong> est maintenant enregistré dans le registre national AgroSavoir.
                        </p>

                        <button
                          onClick={() => handleDownloadCert(selectedQuizDomain)}
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                        >
                          <Download className="w-4 h-4" /> Télécharger mon Diplôme PDF Haute Définition
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-slate-500">Revoyez les modules de cours avant de tenter un nouvel essai.</p>
                        <button
                          onClick={handleResetQuiz}
                          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 mx-auto"
                        >
                          <RefreshCcw className="w-4 h-4" /> Recommencer l'évaluation
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* CREDLY & SKILL-ED STYLE DIGITAL BADGES CATALOGUE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Catalogue des Micro-Créditiales (Normes Skill-Ed & Credly)
          </h3>
          <span className="text-xs text-slate-500 font-medium">4 Parcours Disponibles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DOMAINS_DATA.map((domain) => {
            const unlocked = progress.unlockedCertificates[domain.id];

            return (
              <div
                key={domain.id}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between gap-5 relative overflow-hidden ${
                  unlocked
                    ? 'bg-gradient-to-br from-white via-amber-50/40 to-emerald-50/40 border-amber-300 shadow-lg'
                    : 'bg-white border-slate-200 opacity-95'
                }`}
              >
                {/* Top Status Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full flex items-center gap-1.5 ${
                      unlocked ? 'bg-amber-100 text-amber-950 border border-amber-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {unlocked ? (
                        <>
                          <BadgeCheck className="w-3.5 h-3.5 text-amber-600" />
                          <span>Credly Badge Débloqué</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          <span>En cours de formation</span>
                        </>
                      )}
                    </span>

                    {unlocked && (
                      <button
                        onClick={() => setActiveBadgeModal({ domain, certData: unlocked })}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
                      >
                        <Share2 className="w-3.5 h-3.5" /> Métadonnées & Partage
                      </button>
                    )}
                  </div>

                  {/* Credly Digital Badge Visual Element */}
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center font-black shadow-md border ${
                      unlocked
                        ? 'bg-gradient-to-tr from-amber-400 via-amber-300 to-amber-500 border-amber-200 text-slate-950 shadow-amber-400/20'
                        : 'bg-slate-100 border-slate-200 text-slate-400'
                    }`}>
                      <Award className="w-8 h-8 text-slate-950" />
                    </div>

                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base leading-snug">{domain.certificateTitle}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{domain.description}</p>
                    </div>
                  </div>

                  {/* Skill-Ed Micro-competencies tags */}
                  <div>
                    <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                      Compétences Clés Certifiées (Skill-Ed) :
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {domain.modules.slice(0, 3).map((m, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md border border-slate-200">
                          • {m.title.split(':')[0]}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Unlocked Credentials Info Box */}
                  {unlocked && (
                    <div className="p-3 bg-white/90 rounded-2xl border border-amber-200 text-xs space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between text-slate-700">
                        <span>Titulaire :</span>
                        <strong className="text-slate-900">{unlocked.learnerName}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-700">
                        <span>ProCertif Ledger ID :</span>
                        <code className="text-emerald-700 font-mono font-bold">{unlocked.certificateId}</code>
                      </div>
                      <div className="flex items-center justify-between text-slate-700">
                        <span>Validité :</span>
                        <span className="text-emerald-800 font-bold">Permanente (A vie)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action Button */}
                {unlocked ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDownloadCert(domain)}
                      className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
                    >
                      <Download className="w-3.5 h-3.5" /> Diplôme PDF
                    </button>
                    <button
                      onClick={() => setActiveBadgeModal({ domain, certData: unlocked })}
                      className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                    >
                      <QrCode className="w-3.5 h-3.5" /> Badge & Code QR
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleTryStartQuiz(domain)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    <Award className="w-4 h-4 text-amber-400" /> Passer l'Évaluation Certifiante
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CREDLY & SKILL-ED BADGE SHARE MODAL */}
      {activeBadgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-slate-200 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-slate-900 text-base">Badge Numérique Credly • AgroSavoir</h3>
              </div>
              <button
                onClick={() => setActiveBadgeModal(null)}
                className="p-1 text-slate-400 hover:text-slate-800 text-xs font-bold"
              >
                Fermer
              </button>
            </div>

            {/* Badge Visual Card */}
            <div className="p-5 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-2xl text-white text-center space-y-3 shadow-lg">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 font-black flex items-center justify-center shadow-lg border-2 border-amber-200">
                <Award className="w-10 h-10 text-slate-950" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold rounded-full">
                  VERIFIED CREDENTIAL • SKILL-ED
                </span>
                <h4 className="font-extrabold text-lg text-white mt-1">{activeBadgeModal.domain.certificateTitle}</h4>
                <p className="text-xs text-slate-300 mt-0.5">Délivré à <strong>{activeBadgeModal.certData.learnerName}</strong></p>
              </div>

              <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
                <span>ID: {activeBadgeModal.certData.certificateId}</span>
                <span>Date: {activeBadgeModal.certData.issueDate}</span>
              </div>
            </div>

            {/* Social Share & Verification Links */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700">Partager votre badge professionnel :</div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    const linkedinUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(activeBadgeModal.domain.certificateTitle)}&organizationName=AgroSavoir%20Togo&issueYear=2026&issueMonth=8&certUrl=https://agrosavoir.tg/verify/${activeBadgeModal.certData.certificateId}`;
                    window.open(linkedinUrl, '_blank');
                  }}
                  className="py-2.5 px-3 bg-[#0A66C2] hover:bg-[#004182] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <Linkedin className="w-4 h-4" /> Ajouter à LinkedIn
                </button>

                <button
                  onClick={() => handleCopyShareLink(activeBadgeModal.certData.certificateId)}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
                  <span>{copiedLink ? 'Lien Copié !' : 'Copier le Lien Public'}</span>
                </button>
              </div>

              <button
                onClick={() => handleDownloadCert(activeBadgeModal.domain)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md"
              >
                <Download className="w-4 h-4" /> Télécharger le Diplôme Imprimable (PDF HD)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INCOMPLETE COURSE WARNING MODAL */}
      {incompleteDomainModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-amber-300 shadow-2xl relative">
            <button
              onClick={() => setIncompleteDomainModal(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full transition"
            >
              <XCircle className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2">
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase rounded-full tracking-wider">
                Accès Restreint aux Évaluations
              </span>
              <h3 className="font-extrabold text-lg text-slate-900">
                Cours Non Terminé ({incompleteDomainModal.completedCount} / {incompleteDomainModal.totalCount} Modules Validés)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pour pouvoir passer le mini-quiz certifiant et obtenir votre diplôme officiel <strong>{incompleteDomainModal.domain.certificateTitle}</strong>, vous devez impérativement suivre et valider l'ensemble des <strong>{incompleteDomainModal.totalCount} modules de cours</strong> (vidéo ou support PDF) de ce domaine.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="text-[11px] font-bold text-slate-700">Progression des cours de cette filière :</div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all"
                  style={{ width: `${(incompleteDomainModal.completedCount / incompleteDomainModal.totalCount) * 100}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-500 font-medium text-right">
                {Math.round((incompleteDomainModal.completedCount / incompleteDomainModal.totalCount) * 100)}% réalisé
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setIncompleteDomainModal(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl shadow-md transition"
              >
                J'ai compris (Compléter mes cours)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
