import React, { useState, useRef, useEffect } from 'react';
import {
  Play, Pause, CheckCircle2, FileText, Download, MessageCircle,
  Award, Video, FileCode, Image, Send, Volume2, VolumeX, Maximize,
  Globe, Languages, FastForward, RotateCcw, ChevronRight, AlertTriangle,
  X, BookOpen, Check, Lock
} from 'lucide-react';
import { DomainData, ModuleData, ResourceItem, UserProgress, LanguageCode } from '../types';
import { getTranslation } from '../utils/i18n';

interface CourseViewProps {
  domain: DomainData;
  activeModule: ModuleData;
  setActiveModule: (m: ModuleData) => void;
  progress: UserProgress;
  onUpdateProgress: (moduleId: string, percent: number) => void;
  onOpenResource: (resource: ResourceItem) => void;
  onStartQuiz: (domain: DomainData) => void;
  currentLang?: LanguageCode;
}

// Sample subtitle dictionary for demo video chapters in Local Languages
const SUBTITLES_DATA: Record<string, Record<LanguageCode, { time: number; text: string }[]>> = {
  'agri-m1': {
    fr: [
      { time: 0, text: "Bienvenue dans la leçon sur la préparation du sol et le compostage rapide." },
      { time: 5, text: "Un compost chaud monte naturellement à 65°C pour détruire les graines de mauvaises herbes." },
      { time: 12, text: "Respectez le ratio: 2/3 de matière brune carbonée et 1/3 de matière verte azotée." },
      { time: 20, text: "Test de la poignée: en pressant, quelques gouttes doivent suinter." }
    ],
    ee: [
      { time: 0, text: "Woezɔ ɖe agble nyigba ɖoɖo kple compost wɔwɔ kaba nutɔwo me." },
      { time: 5, text: "Compost dzoɖeɖe yia 65°C me be wòaɖe gbe vɔwo kple nuvɔ̃wo fĩ." },
      { time: 12, text: "Wɔ eŋu dɔ: akpa 2/3 ama xɔxɔwo kple akpa 1/3 gbe mumuwo." },
      { time: 20, text: "Lé nya la le asiwom, tsi ʋee aɖewo nasu le asiwom me." }
    ],
    kbp: [
      { time: 0, text: "Sʊʊ kpeya taa kɛ tetʊ labʊ na compost lɔŋ kpeya." },
      { time: 5, text: "Compost miŋ kpem 65°C taa pɩ-yeba kudɔm wɛtʊ sɔʊ." },
      { time: 12, text: "Labʊ tɔm: akpa 2/3 wula pɩ-na akpa 1/3 mumu tɔm." },
      { time: 20, text: "Kpakpa nya-nɔɔ, lɔm ʋee lii nya-nɔɔ taa." }
    ]
  }
};

// Helper function to convert YouTube URLs into YouTube embed links
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  if (url.includes('youtube.com/embed/')) {
    return url;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=0&rel=0&modestbranding=1`;
  }
  return null;
}

export const CourseView: React.FC<CourseViewProps> = ({
  domain,
  activeModule,
  setActiveModule,
  progress,
  onUpdateProgress,
  onOpenResource,
  onStartQuiz,
  currentLang = 'fr'
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(activeModule.videoDurationSeconds || 180);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedSubtitles, setSelectedSubtitles] = useState<'off' | LanguageCode>(currentLang);
  const [selectedAudioLang, setSelectedAudioLang] = useState<LanguageCode>(currentLang);
  const [activeSubtitleText, setActiveSubtitleText] = useState('');

  const [activeTab, setActiveTab] = useState<'resources' | 'transcript' | 'qa'>('resources');
  const [qaMessages, setQaMessages] = useState<{ id: string; author: string; text: string; time: string }[]>([
    {
      id: '1',
      author: 'Koffi A. (Tshévié)',
      text: 'Excellente démonstration ! Le dosage Neem + Piment fonctionne à merveille.',
      time: 'Il y a 2 heures'
    },
    {
      id: '2',
      author: 'Dr. Lawson (Mentor)',
      text: 'N\'oubliez pas de pulvériser après 17h pour ne pas brûler les feuilles.',
      time: 'Il y a 1 heure'
    }
  ]);
  const [newQuestionText, setNewQuestionText] = useState('');

  const t = (key: string) => getTranslation(currentLang as LanguageCode, key);

  // Validation & completion modal states
  const [validationModalOpen, setValidationModalOpen] = useState(false);
  const [readConfirmed, setReadConfirmed] = useState(false);
  const [quizWarningModalOpen, setQuizWarningModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const youtubeEmbedUrl = getYouTubeEmbedUrl(activeModule.videoUrl);

  // Watch percentage
  const watchedPercent = progress.completedLessons[activeModule.id] || 0;
  const isCompleted = watchedPercent >= 90;

  useEffect(() => {
    // Reset video & reading state when activeModule changes
    setIsPlaying(false);
    setCurrentTime(0);
    setReadConfirmed(false);
    setValidationModalOpen(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [activeModule.id]);

  // Video time update event handler
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || duration;
    setCurrentTime(cur);
    setDuration(dur);

    // Calculate percentage watched & auto-save to progress
    const pct = Math.min(100, Math.round((cur / dur) * 100));
    if (pct > watchedPercent) {
      onUpdateProgress(activeModule.id, pct);
    }

    // Subtitle matching
    if (selectedSubtitles !== 'off') {
      const subs = SUBTITLES_DATA['agri-m1']?.[selectedSubtitles] || SUBTITLES_DATA['agri-m1']?.['fr'] || [];
      const currentSub = [...subs].reverse().find(s => cur >= s.time);
      if (currentSub) {
        setActiveSubtitleText(currentSub.text);
      } else {
        setActiveSubtitleText('');
      }
    } else {
      setActiveSubtitleText('');
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      // Removed automatic grant of 100% completion on play
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  const parseChapterTime = (timeStr: string): number => {
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return 0;
  };

  const jumpToChapter = (timeStr: string) => {
    const secs = parseChapterTime(timeStr);
    setCurrentTime(secs);
    if (videoRef.current) {
      videoRef.current.currentTime = secs;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const changeSpeed = () => {
    const rates = [0.75, 1, 1.25, 1.5];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Enforced course completion check
  const handleValidateCourse = () => {
    if (isCompleted) {
      // Toggle off if already validated
      onUpdateProgress(activeModule.id, 0);
      setReadConfirmed(false);
      return;
    }

    const videoTimePct = duration > 0 ? Math.round((currentTime / duration) * 100) : 0;
    const currentProgress = Math.max(watchedPercent, videoTimePct);

    if (currentProgress >= 90 || readConfirmed) {
      onUpdateProgress(activeModule.id, 100);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3500);
    } else {
      // Show blocking modal explaining why course cannot be validated yet
      setValidationModalOpen(true);
    }
  };

  const handleConfirmReading = () => {
    setReadConfirmed(true);
    onUpdateProgress(activeModule.id, 100);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3500);
  };

  const handleStartQuizWithCheck = () => {
    const domainModuleIds = domain.modules.map((m) => m.id);
    const completedCount = domainModuleIds.filter((id) => (progress.completedLessons[id] || 0) >= 90).length;
    if (completedCount < domainModuleIds.length) {
      setQuizWarningModalOpen(true);
    } else {
      onStartQuiz(domain);
    }
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    setQaMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        author: 'Vous (Apprenant)',
        text: newQuestionText.trim(),
        time: 'À l\'instant'
      }
    ]);
    setNewQuestionText('');
  };

  // Speak local language summary when user toggles local voice audio
  const handleSpeakVoiceover = (lang: LanguageCode) => {
    setSelectedAudioLang(lang);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      let textToSpeak = activeModule.transcript.slice(0, 200);
      if (lang === 'ee') {
        textToSpeak = "Woezɔ ɖe AgroLearn nusɔsrɔ̃ sia me. Míele agble nyigba ɖoɖo kple compost wɔwɔ kaba sɔsrɔ̃m.";
      } else if (lang === 'kbp') {
        textToSpeak = "Sʊʊ kpeya taa kɛ AgroLearn sukuli. Ɖɩ-wɛɛ labʊ kɛ tetʊ labʊ na compost labʊ lɔŋ.";
      }
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = lang === 'ee' ? 'ee-TG' : lang === 'kbp' ? 'fr-FR' : 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Domain Navigation Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>{t('nav_catalogue')}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-700 font-bold">{domain.title}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900">Module {activeModule.moduleNumber}</span>
        </div>

        <button
          onClick={handleStartQuizWithCheck}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all hover:scale-[1.02]"
        >
          <Award className="w-4 h-4" /> Passer le Mini-Quiz Certifiant
        </button>
      </div>

      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-3">
          <div className="flex items-center gap-2 text-xs font-extrabold">
            <CheckCircle2 className="w-5 h-5 text-amber-300" />
            <span>Bravo ! Vous avez validé ce module avec succès (100%). Progression enregistrée.</span>
          </div>
          <button onClick={() => setShowSuccessToast(false)} className="p-1 hover:bg-emerald-700 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Grid: Video Player + Module Selector Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Interactive Video Player */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Functional HTML5 Video Container Card */}
          <div className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative group">
            
            <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
              {youtubeEmbedUrl ? (
                <iframe
                  src={youtubeEmbedUrl}
                  title={activeModule.title}
                  className="w-full h-full border-0 relative z-10"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <>
                  <video
                    ref={videoRef}
                    src={activeModule.videoUrl}
                    poster={activeModule.videoPoster}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => {
                      setIsPlaying(false);
                      onUpdateProgress(activeModule.id, 100);
                    }}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={togglePlay}
                  />

                  {/* Big Centered Play/Pause Button Overlay */}
                  {!isPlaying && (
                    <button
                      onClick={togglePlay}
                      className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/90 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:bg-emerald-400 hover:scale-110 transition-all z-20"
                    >
                      <Play className="w-8 h-8 fill-slate-950 ml-1" />
                    </button>
                  )}

                  {/* On-screen Subtitles Display Overlay */}
                  {selectedSubtitles !== 'off' && activeSubtitleText && (
                    <div className="absolute bottom-16 left-4 right-4 text-center z-20 pointer-events-none">
                      <span className="px-4 py-1.5 bg-black/80 text-amber-300 text-xs sm:text-sm font-bold rounded-lg backdrop-blur-md border border-amber-400/30 shadow-xl inline-block max-w-lg">
                        {activeSubtitleText}
                      </span>
                    </div>
                  )}
                </>
              )}

              {/* Top Badges */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10 z-20 pointer-events-none">
                <Video className="w-3.5 h-3.5 text-emerald-400" />
                <span>{youtubeEmbedUrl ? 'YouTube HD' : `HD • ${formatTime(currentTime)} / ${formatTime(duration)}`}</span>
              </div>

              <div className="absolute top-4 right-4 z-20">
                {isCompleted ? (
                  <span className="px-3 py-1 bg-emerald-500 text-slate-950 font-extrabold text-xs rounded-full flex items-center gap-1 shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Leçon Validée (100%)
                  </span>
                ) : (
                  <button
                    onClick={handleValidateCourse}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-full shadow-md transition flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Valider la Leçon
                  </button>
                )}
              </div>
            </div>

            {/* Custom Interactive Toolbar Controls */}
            {youtubeEmbedUrl ? (
              <div className="p-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="font-semibold text-white">Session Vidéo YouTube Interactive</span>
                  <span className="text-slate-400 font-mono">({activeModule.videoDuration})</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleValidateCourse}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Valider la Leçon
                  </button>
                  <a
                    href="https://youtu.be/qoba9ZK5tKo?si=8WCCyr-i4cv0jFci"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm"
                  >
                    <Globe className="w-3.5 h-3.5" /> Ouvrir sur YouTube
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-900 text-white space-y-3">
              
              {/* Timeline Scrubber */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-400 font-bold">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <span className="text-xs font-mono text-slate-400">{formatTime(duration)}</span>
              </div>

              {/* Controls Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-xl font-bold transition shadow-md"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="text-slate-400 hover:text-white">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.1}
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 hidden sm:block"
                    />
                  </div>

                  <button
                    onClick={changeSpeed}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 flex items-center gap-1"
                  >
                    <FastForward className="w-3 h-3 text-emerald-400" />
                    <span>{playbackRate}x</span>
                  </button>
                </div>

                {/* Subtitles & Audio Track Switchers */}
                <div className="flex items-center gap-2">
                  
                  {/* Subtitle language dropdown */}
                  <div className="flex items-center gap-1.5 bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-700 text-xs">
                    <Languages className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[10px] text-slate-400 font-semibold hidden md:inline">Sous-titres:</span>
                    <select
                      value={selectedSubtitles}
                      onChange={(e) => setSelectedSubtitles(e.target.value as any)}
                      className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer"
                    >
                      <option value="off" className="bg-slate-900 text-slate-200">Désactivés</option>
                      <option value="fr" className="bg-slate-900 text-slate-200">Français 🇫🇷</option>
                      <option value="ee" className="bg-slate-900 text-slate-200">Ewé 🇹🇬</option>
                      <option value="kbp" className="bg-slate-900 text-slate-200">Kabyè 🇹🇬</option>
                    </select>
                  </div>

                  {/* Audio track synthesis */}
                  <div className="flex items-center gap-1.5 bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-700 text-xs">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] text-slate-400 font-semibold hidden md:inline">Piste Voix:</span>
                    <button
                      onClick={() => handleSpeakVoiceover('ee')}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        selectedAudioLang === 'ee' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      Ewé
                    </button>
                    <button
                      onClick={() => handleSpeakVoiceover('kbp')}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        selectedAudioLang === 'kbp' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      Kabyè
                    </button>
                  </div>

                  <button onClick={toggleFullscreen} className="text-slate-400 hover:text-white p-1">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
            )}

            {/* Video Controls & Title Bar */}
            <div className="p-5 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800">
              <div>
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                  Module {activeModule.moduleNumber} / 3
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">{activeModule.title}</h2>
              </div>

              <button
                onClick={handleValidateCourse}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {isCompleted ? 'Marquer comme non vue' : 'Valider la leçon'}
              </button>
            </div>
          </div>

          {/* Interactive Chapters Bar */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chapitres & Saut Temporel</h4>
            <div className="flex flex-wrap gap-2">
              {activeModule.videoChapters.map((chap, idx) => (
                <button
                  key={idx}
                  onClick={() => jumpToChapter(chap.time)}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-xl text-xs font-medium border border-slate-200 hover:border-emerald-300 transition-all flex items-center gap-1.5"
                >
                  <span className="font-mono text-emerald-600 font-bold">{chap.time}</span>
                  <span>{chap.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Course Tabs (Ressources, Transcript, Q&A) */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            
            {/* Tab Header */}
            <div className="flex border-b border-slate-200 bg-slate-50">
              <button
                onClick={() => setActiveTab('resources')}
                className={`flex-1 py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
                  activeTab === 'resources'
                    ? 'border-emerald-600 text-emerald-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Download className="w-4 h-4 text-emerald-600" />
                Ressources ({activeModule.resources.length})
              </button>

              <button
                onClick={() => setActiveTab('transcript')}
                className={`flex-1 py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
                  activeTab === 'transcript'
                    ? 'border-emerald-600 text-emerald-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileText className="w-4 h-4 text-slate-600" />
                Support / Transcription
              </button>

              <button
                onClick={() => setActiveTab('qa')}
                className={`flex-1 py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
                  activeTab === 'qa'
                    ? 'border-emerald-600 text-emerald-800 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-blue-600" />
                Forum ({qaMessages.length})
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6">
              
              {/* TAB 1: RESSOURCES */}
              {activeTab === 'resources' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600">
                    Ces documents pédagogiques (PDF, DOCX, Infographies PNG) sont débloqués pour cette leçon. Prévisualisez-les ou téléchargez-les gratuitement.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeModule.resources.map((res) => (
                      <div
                        key={res.id}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-slate-50/50 hover:bg-emerald-50/30 transition-all flex flex-col justify-between gap-3 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 rounded-xl shrink-0 ${
                            res.type === 'pdf' ? 'bg-red-100 text-red-700' :
                            res.type === 'docx' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {res.type === 'pdf' && <FileText className="w-5 h-5" />}
                            {res.type === 'docx' && <FileCode className="w-5 h-5" />}
                            {res.type === 'png' && <Image className="w-5 h-5" />}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {res.type.toUpperCase()} • {res.fileSize}
                            </span>
                            <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-800 transition-colors">
                              {res.title}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                              {res.description}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => onOpenResource(res)}
                          className="w-full py-2 bg-white hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 hover:border-emerald-600 shadow-xs transition-all flex items-center justify-center gap-2"
                        >
                          <Download className="w-3.5 h-3.5" /> Prévisualiser & Télécharger
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: TRANSCRIPT */}
              {activeTab === 'transcript' && (
                <div className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 font-serif text-sm text-slate-800 leading-relaxed space-y-3">
                    <h4 className="font-sans font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-600" /> Support de Cours Écrit & Transcription
                    </h4>
                    <p>{activeModule.transcript}</p>
                  </div>

                  {/* Reading Confirmation Interactive Box */}
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-600 text-white rounded-xl shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Validation de la Leçon par Lecture</div>
                        <div className="text-[11px] text-slate-600">
                          Vous avez lu attentivement le cours ? Cliquez sur le bouton pour attester la lecture et valider le module.
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleConfirmReading}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                        readConfirmed || isCompleted
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      {readConfirmed || isCompleted ? 'Cours Lu & Validé (100%)' : 'J\'ai lu et j\'atteste la leçon'}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: Q&A */}
              {activeTab === 'qa' && (
                <div className="space-y-4">
                  <form onSubmit={handlePostQuestion} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Poser une question en Français, Ewé ou Kabyè..."
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-emerald-500 outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" /> Envoyer
                    </button>
                  </form>

                  <div className="space-y-3">
                    {qaMessages.map((msg) => (
                      <div key={msg.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900">{msg.author}</span>
                          <span className="text-slate-400">{msg.time}</span>
                        </div>
                        <p className="text-slate-700">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Right Column: Module List for this Domain */}
        <div className="space-y-4">
          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Modules de la Filière</h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                3 Modules
              </span>
            </div>

            <div className="space-y-2.5">
              {domain.modules.map((mod) => {
                const modWatched = progress.completedLessons[mod.id] || 0;
                const isModDone = modWatched >= 90;
                const isActive = mod.id === activeModule.id;

                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModule(mod)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                      isActive
                        ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20'
                        : isModDone
                        ? 'bg-slate-50/80 border-emerald-200/60 hover:bg-slate-100'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                      isModDone ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isModDone ? <CheckCircle2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Module {mod.moduleNumber} • {mod.videoDuration}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 truncate">{mod.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{mod.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Domain Mini-Quiz Box */}
          <div className="p-5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl text-slate-950 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-slate-950 font-extrabold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4" /> Certification Finale
            </div>
            <h4 className="font-extrabold text-base text-slate-950">
              Prêt pour le diplôme {domain.shortTitle} ?
            </h4>
            <p className="text-xs text-slate-900 leading-relaxed">
              Complétez les 3 modules et réussissez le mini-quiz (80%+ de réussite) pour générer votre certificat PDF officiel signé avec QR code.
            </p>
            <button
              onClick={handleStartQuizWithCheck}
              className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-xs rounded-xl shadow-md transition-all text-center"
            >
              Lancer l'Évaluation Certifiante
            </button>
          </div>

        </div>

      </div>

      {/* Modal 1: Validation Impossible (Cours/Vidéo non terminé) */}
      {validationModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-amber-100 text-amber-900 rounded-2xl flex items-center gap-2 font-black text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Validation Bloquée</span>
              </div>
              <button
                onClick={() => setValidationModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Vous n'avez pas encore terminé ce cours
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Afin d'assurer la valeur de vos diplômes <strong>AgroSavoir</strong>, vous ne pouvez pas valider un cours sans l'avoir visionné ou lu.
              </p>
            </div>

            {/* Visual Progress Meter */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">Progression Vidéo actuelle</span>
                <span className="text-amber-600 font-black">
                  {Math.max(watchedPercent, duration > 0 ? Math.round((currentTime / duration) * 100) : 0)}% / 90% requis
                </span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(watchedPercent, duration > 0 ? Math.round((currentTime / duration) * 100) : 0)}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-1.5 text-xs text-emerald-900">
              <div className="font-extrabold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Comment valider cette leçon ?
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-700 pl-1">
                <li>Visionner au moins <strong>90% de la vidéo</strong> jusqu'à la fin.</li>
                <li>Ou lire le support dans l'onglet <strong>Support / Transcription</strong> et cliquer sur "J'ai lu et j'atteste la leçon".</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button
                onClick={() => {
                  setValidationModalOpen(false);
                  if (videoRef.current) {
                    togglePlay();
                  }
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
              >
                <Play className="w-4 h-4 fill-white" /> Visionner la Vidéo
              </button>
              <button
                onClick={() => {
                  setValidationModalOpen(false);
                  setActiveTab('transcript');
                }}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-slate-600" /> Lire le Cours Écrit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Warning Quiz Start when modules not all completed */}
      {quizWarningModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-amber-100 text-amber-900 rounded-2xl flex items-center gap-2 font-black text-sm">
                <Lock className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Modules Non Validés</span>
              </div>
              <button
                onClick={() => setQuizWarningModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Modules de cours incomplets
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vous n'avez pas encore terminé les 3 modules de la filière <strong>{domain.title}</strong>. Il est fortement recommandé de lire tous les cours et regarder les vidéos pour réussir l'évaluation certifiante.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => setQuizWarningModalOpen(false)}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                Continuer les Leçons
              </button>
              <button
                onClick={() => {
                  setQuizWarningModalOpen(false);
                  onStartQuiz(domain);
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Tenter le Quiz Malgré Tout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
