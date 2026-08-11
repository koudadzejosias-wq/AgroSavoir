export type DomainId = 'agriculture' | 'elevage' | 'pisciculture' | 'entrepreneuriat';

export type LanguageCode = 'fr' | 'ee' | 'kbp';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'agriculteur' | 'eleveur' | 'pisciculteur' | 'entrepreneur' | 'student';
  region: string; // Maritime, Plateaux, Centrale, Kara, Savanes
  ageRange?: string; // e.g., '26 - 35 ans (Jeune Producteur)'
  phone?: string;
  preferredLanguage: LanguageCode;
  avatar: string;
  isLoggedIn: boolean;
  joinedDate: string;
}

export type ResourceType = 'pdf' | 'docx' | 'png' | 'xlsx' | 'pptx' | 'mp3' | 'mp4' | 'zip' | 'audio';

export interface ResourceItem {
  id: string;
  title: string;
  filename: string;
  type: ResourceType;
  description: string;
  fileSize: string;
  downloadUrl?: string;
  contentMarkdown?: string;
  imageUrl?: string;
  previewData?: Record<string, any>;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ModuleData {
  id: string;
  domainId: DomainId;
  moduleNumber: number;
  title: string;
  description: string;
  videoDuration: string;
  videoDurationSeconds: number;
  videoUrl: string; // Embed or simulated player URL
  videoPoster: string;
  videoChapters: { time: string; label: string }[];
  transcript: string;
  resources: ResourceItem[];
}

export interface DomainData {
  id: DomainId;
  title: string;
  shortTitle: string;
  icon: string;
  color: string;
  bgLight: string;
  borderColor: string;
  description: string;
  modules: ModuleData[];
  quiz: QuizQuestion[];
  certificateTitle: string;
}

export interface UserProgress {
  completedLessons: Record<string, number>; // moduleId -> watched percentage (0 - 100)
  completedModules: string[]; // moduleId
  quizScores: Record<DomainId, number>; // domainId -> score (0-100)
  unlockedCertificates: Partial<Record<DomainId, {
    certificateId: string;
    issueDate: string;
    learnerName: string;
  }>>;
  downloadHistory: {
    resourceId: string;
    title: string;
    type: ResourceType;
    downloadedAt: string;
    domainId: DomainId;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'mentor';
  text: string;
  timestamp: string;
  image?: string;
  domainId?: DomainId;
  audioUrl?: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  domainId: DomainId;
  avatar: string;
  badge: 'Expert Certifié' | 'Ingénieur Agronome' | 'Docteur Vétérinaire';
  rating: number;
  location: string;
  bio: string;
  online: boolean;
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  domainId: DomainId;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  repliesCount: number;
  imageUrl?: string;
  hasExpertReply?: boolean;
}
