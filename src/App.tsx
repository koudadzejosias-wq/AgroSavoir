import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CatalogueView } from './components/CatalogueView';
import { CourseView } from './components/CourseView';
import { ProgressionView } from './components/ProgressionView';
import { CalculatorsView } from './components/CalculatorsView';
import { MentorshipView } from './components/MentorshipView';
import { CertificatesView } from './components/CertificatesView';
import { DiagnosticView } from './components/DiagnosticView';
import { AgroBotFloating } from './components/AgroBotFloating';
import { ResourcePreviewModal } from './components/ResourcePreviewModal';
import { LoginModal } from './components/LoginModal';
import { UserProfileModal } from './components/UserProfileModal';
import { CguModal } from './components/CguModal';
import { SuggestionsModal } from './components/SuggestionsModal';
import { Footer } from './components/Footer';
import { useFirebaseSync } from './lib/useFirebaseSync';
import { DOMAINS_DATA } from './data/coursesData';
import { DomainData, ModuleData, ResourceItem, UserProgress, UserAccount, LanguageCode } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('catalogue');
  const [selectedDomain, setSelectedDomain] = useState<DomainData>(DOMAINS_DATA[0]);
  const [selectedModule, setSelectedModule] = useState<ModuleData>(DOMAINS_DATA[0].modules[0]);

  // Modals state
  const [isCguOpen, setIsCguOpen] = useState<boolean>(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState<boolean>(false);

  // Language state (fr, ee, kbp)
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('agrolearn_lang');
    return (saved as LanguageCode) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('agrolearn_lang', currentLang);
  }, [currentLang]);

  // Auth User state
  const [currentUser, setCurrentUser] = useState<UserAccount>(() => {
    const saved = localStorage.getItem('agrolearn_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return {
      id: 'usr-default',
      name: 'Koffi Agbéko',
      email: 'agbeko.koffi@agrosavoir.tg',
      phone: '+228 90 12 34 56',
      role: 'agriculteur',
      region: 'Maritime (Lomé / Tsévié)',
      ageRange: '26 - 35 ans (Jeune Producteur)',
      preferredLanguage: 'fr',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isLoggedIn: true,
      joinedDate: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    };
  });

  useEffect(() => {
    localStorage.setItem('agrolearn_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Auth Modals
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Mobile Simulator Preview Frame
  const [isMobilePreview, setIsMobilePreview] = useState<boolean>(false);

  // AgroBot Drawer Open State
  const [isAgroBotOpen, setIsAgroBotOpen] = useState<boolean>(false);

  // Resource Modal State
  const [previewResource, setPreviewResource] = useState<ResourceItem | null>(null);

  // Quiz Trigger Domain
  const [quizDomain, setQuizDomain] = useState<DomainData | null>(null);

  // Search Query
  const [searchQuery, setSearchQuery] = useState('');

  // User Local Progress State
  const EMPTY_PROGRESS: UserProgress = {
    completedLessons: {},
    completedModules: [],
    quizScores: {
      agriculture: 0,
      elevage: 0,
      pisciculture: 0,
      entrepreneuriat: 0,
    },
    unlockedCertificates: {},
    downloadHistory: [],
  };

  const [progress, setProgress] = useState<UserProgress>(() => {
    // Clean slate: reset cached progress to zero
    localStorage.removeItem('agrolearn_progress');
    return EMPTY_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem('agrolearn_progress', JSON.stringify(progress));
  }, [progress]);

  const handleResetProgress = () => {
    setProgress(EMPTY_PROGRESS);
    localStorage.setItem('agrolearn_progress', JSON.stringify(EMPTY_PROGRESS));
  };

  // Activate Firebase Cloud Synchronization for User Progress & Profiles
  useFirebaseSync(currentUser, progress, setProgress);

  const handleUpdateProgress = (moduleId: string, percent: number) => {
    setProgress((prev) => {
      const nextLessons = { ...prev.completedLessons, [moduleId]: percent };
      let nextCompletedMods = [...prev.completedModules];
      if (percent >= 90 && !nextCompletedMods.includes(moduleId)) {
        nextCompletedMods.push(moduleId);
      } else if (percent < 90 && nextCompletedMods.includes(moduleId)) {
        nextCompletedMods = nextCompletedMods.filter((id) => id !== moduleId);
      }

      return {
        ...prev,
        completedLessons: nextLessons,
        completedModules: nextCompletedMods,
      };
    });
  };

  const handleUnlockCertificate = (
    domainId: string,
    certData: { certificateId: string; issueDate: string; learnerName: string }
  ) => {
    setProgress((prev) => ({
      ...prev,
      unlockedCertificates: {
        ...prev.unlockedCertificates,
        [domainId]: certData,
      },
    }));
  };

  const handleTrackDownload = (resource: ResourceItem) => {
    setProgress((prev) => ({
      ...prev,
      downloadHistory: [
        ...prev.downloadHistory,
        {
          resourceId: resource.id,
          title: resource.title,
          type: resource.type,
          downloadedAt: new Date().toISOString(),
          domainId: 'agriculture',
        },
      ],
    }));
  };

  const handleSelectModuleFromCatalogue = (domain: DomainData, module: ModuleData) => {
    setSelectedDomain(domain);
    setSelectedModule(module);
    setActiveTab('cours');
  };

  const handleStartQuiz = (domain: DomainData) => {
    setQuizDomain(domain);
    setActiveTab('certificats');
  };

  const handleLogout = () => {
    setCurrentUser((prev) => ({
      ...prev,
      isLoggedIn: false
    }));
  };

  const unlockedCertsCount = Object.keys(progress.unlockedCertificates).length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-emerald-500 selection:text-white flex flex-col justify-between pb-16 md:pb-0">
      
      <div>
        {/* Top Application Bar */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          progress={progress}
          isMobilePreview={isMobilePreview}
          setIsMobilePreview={setIsMobilePreview}
          onOpenAgroBot={() => setIsAgroBotOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentUser={currentUser}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          currentLang={currentLang}
          onSelectLang={(lang) => setCurrentLang(lang)}
        />

        {/* Main Container Layout */}
        <div className={`mx-auto transition-all ${isMobilePreview ? 'max-w-md py-6' : 'max-w-7xl'}`}>
          
          <div className={`flex flex-col md:flex-row ${
            isMobilePreview ? 'border-8 border-slate-900 rounded-[40px] shadow-2xl bg-white overflow-hidden min-h-[750px]' : ''
          }`}>
            
            {/* Sidebar */}
            {!isMobilePreview && (
              <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                unlockedCertsCount={unlockedCertsCount}
                currentLang={currentLang}
                onOpenCgu={() => setIsCguOpen(true)}
                onOpenSuggestions={() => setIsSuggestionsOpen(true)}
              />
            )}

            {/* Main Content Body */}
            <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">

              {/* Mobile High-Visibility User Profile Status Bar */}
              {currentUser.isLoggedIn && (
                <div className="md:hidden mb-4 p-3 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl flex items-center justify-between gap-3 shadow-md border border-emerald-800">
                  <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsProfileOpen(true)}>
                    <div className="relative shrink-0">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-emerald-400 shadow-sm"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-black text-white flex items-center gap-1.5 leading-snug">
                        <span>{currentUser.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-200">
                        <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 font-bold rounded-md border border-emerald-500/30">
                          {currentUser.ageRange ? currentUser.ageRange.split(' ')[0] : '26-35 ans'}
                        </span>
                        <span className="capitalize font-medium truncate max-w-[120px]">
                          {currentUser.role} • {currentUser.region.split('(')[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsProfileOpen(true)}
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-[11px] rounded-xl shadow-sm transition shrink-0"
                  >
                    Profil
                  </button>
                </div>
              )}

              {activeTab === 'catalogue' && (
                <CatalogueView
                  progress={progress}
                  onSelectModule={handleSelectModuleFromCatalogue}
                  onStartQuiz={handleStartQuiz}
                />
              )}

              {activeTab === 'cours' && (
                <CourseView
                  domain={selectedDomain}
                  activeModule={selectedModule}
                  setActiveModule={setSelectedModule}
                  progress={progress}
                  onUpdateProgress={handleUpdateProgress}
                  onOpenResource={(res) => setPreviewResource(res)}
                  onStartQuiz={handleStartQuiz}
                  currentLang={currentLang}
                />
              )}

              {activeTab === 'progression' && (
                <ProgressionView
                  progress={progress}
                  onOpenResource={(res) => setPreviewResource(res)}
                  onResetProgress={handleResetProgress}
                />
              )}

              {activeTab === 'calculateurs' && <CalculatorsView />}

              {activeTab === 'forum' && <MentorshipView />}

              {activeTab === 'diagnostic' && <DiagnosticView />}

              {activeTab === 'certificats' && (
                <CertificatesView
                  progress={progress}
                  onUnlockCertificate={handleUnlockCertificate}
                  selectedQuizDomain={quizDomain}
                  setSelectedQuizDomain={setQuizDomain}
                />
              )}
            </main>

          </div>

        </div>
      </div>

      {/* Global Application Footer */}
      {!isMobilePreview && (
        <Footer
          onOpenCgu={() => setIsCguOpen(true)}
          onOpenSuggestions={() => setIsSuggestionsOpen(true)}
          setActiveTab={setActiveTab}
        />
      )}

      {/* AgroBot AI Floating Drawer */}
      <AgroBotFloating
        isOpen={isAgroBotOpen || activeTab === 'agrobot'}
        onClose={() => {
          setIsAgroBotOpen(false);
          if (activeTab === 'agrobot') setActiveTab('catalogue');
        }}
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
      />

      {/* Resource Download & Preview Modal */}
      <ResourcePreviewModal
        resource={previewResource}
        domainId={selectedDomain.id}
        onClose={() => setPreviewResource(null)}
        onTrackDownload={handleTrackDownload}
      />

      {/* Auth Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        currentUser={currentUser}
        onLogin={(u) => setCurrentUser(u)}
        currentLang={currentLang}
        onSelectLang={(l) => setCurrentLang(l)}
        onOpenCgu={() => setIsCguOpen(true)}
      />

      {/* User Profile & Settings Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        userProgress={progress}
        onUpdateUser={(u) => setCurrentUser(u)}
        onLogout={handleLogout}
        currentLang={currentLang}
        onSelectLang={(l) => setCurrentLang(l)}
        onOpenCgu={() => setIsCguOpen(true)}
        onResetProgress={handleResetProgress}
      />

      {/* CGU Terms Modal */}
      <CguModal
        isOpen={isCguOpen}
        onClose={() => setIsCguOpen(false)}
      />

      {/* Community Suggestions Modal */}
      <SuggestionsModal
        isOpen={isSuggestionsOpen}
        onClose={() => setIsSuggestionsOpen(false)}
        currentUser={currentUser}
      />

    </div>
  );
}

