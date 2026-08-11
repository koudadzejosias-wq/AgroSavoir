import React, { useState } from 'react';
import { MessageSquare, Users, Award, Send, CheckCircle2, Mic, Image, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { INITIAL_MENTORS, INITIAL_FORUM_POSTS } from '../data/coursesData';
import { DomainId, Mentor, ForumPost } from '../types';

export const MentorshipView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'forum' | 'mentors'>('forum');
  const [selectedDomain, setSelectedDomain] = useState<DomainId | 'all'>('all');
  const [posts, setPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [mentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [chatMessages, setChatMessages] = useState<{ id: string; sender: 'me' | 'mentor'; text: string; time: string }[]>([
    {
      id: '1',
      sender: 'mentor',
      text: 'Bonjour ! Je suis le Dr. Jean-Marc KOUASSI. Comment se porte votre poulailler aujourd\'hui ?',
      time: '09:15'
    }
  ]);
  const [myChatMessage, setMyChatMessage] = useState('');

  // Forum post submission
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      authorName: 'Vous (Apprenant)',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      domainId: selectedDomain === 'all' ? 'agriculture' : selectedDomain,
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      timestamp: 'À l\'instant',
      likes: 0,
      repliesCount: 0,
      hasExpertReply: false
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
  };

  const handleSendMentorChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!myChatMessage.trim()) return;

    const msgText = myChatMessage.trim();
    setChatMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'me', text: msgText, time: 'À l\'instant' }
    ]);
    setMyChatMessage('');

    // Simulated mentor reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'mentor',
          text: `Merci pour votre message ! Concernant "${msgText.slice(0, 30)}...", j'ai analysé votre situation. Je vous conseille d'appliquer le protocole décrit dans le Module 3.`,
          time: 'À l\'instant'
        }
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-emerald-800 to-teal-950 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-xs uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" /> Communauté & Mentorat AgroLearn
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Salons de Discussion & Experts Certifiés</h2>
          <p className="text-xs text-emerald-100/80 mt-1 max-w-xl">
            Échangez entre passionnés du monde agricole, posez vos questions directes et envoyez des photos/vocal à des mentors certifiés.
          </p>
        </div>

        <div className="flex gap-2 bg-slate-900/40 p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('forum')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'forum' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Forum Général
          </button>
          <button
            onClick={() => setActiveTab('mentors')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'mentors' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            Messagerie Mentors ({mentors.length})
          </button>
        </div>
      </div>

      {/* VIEW 1: FORUM */}
      {activeTab === 'forum' && (
        <div className="space-y-6">
          
          {/* Domain Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedDomain('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDomain === 'all' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tous les domaines
            </button>
            <button
              onClick={() => setSelectedDomain('agriculture')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDomain === 'agriculture' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800'
              }`}
            >
              Agriculture
            </button>
            <button
              onClick={() => setSelectedDomain('elevage')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDomain === 'elevage' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800'
              }`}
            >
              Élevage
            </button>
            <button
              onClick={() => setSelectedDomain('pisciculture')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDomain === 'pisciculture' ? 'bg-sky-600 text-white' : 'bg-sky-50 text-sky-800'
              }`}
            >
              Pisciculture
            </button>
            <button
              onClick={() => setSelectedDomain('entrepreneuriat')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDomain === 'entrepreneuriat' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-800'
              }`}
            >
              Agrobusiness
            </button>
          </div>

          {/* Create New Post Form */}
          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" /> Poser une question à la communauté
            </h3>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <input
                type="text"
                placeholder="Titre court de votre problème ou question..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-emerald-500"
              />

              <textarea
                rows={3}
                placeholder="Décrivez en détail ce que vous observez sur le terrain (symptômes, photos, paramètres)..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-emerald-500"
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Les Mentors Certifiés répondent en moyenne en moins de 2 heures.
                </span>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" /> Publier
                </button>
              </div>
            </form>
          </div>

          {/* Forum Posts Feed */}
          <div className="space-y-4">
            {posts
              .filter((p) => selectedDomain === 'all' || p.domainId === selectedDomain)
              .map((post) => (
                <div key={post.id} className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={post.authorAvatar} alt={post.authorName} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs">{post.authorName}</h4>
                        <span className="text-[10px] text-slate-400">{post.timestamp}</span>
                      </div>
                    </div>

                    {post.hasExpertReply && (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" /> Réponse Expert
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{post.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{post.content}</p>
                  </div>

                  {post.imageUrl && (
                    <div className="rounded-2xl overflow-hidden max-h-60 border border-slate-200">
                      <img src={post.imageUrl} alt="Field problem" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
                    <button className="flex items-center gap-1 hover:text-emerald-600">
                      <Heart className="w-4 h-4" /> {post.likes} J'aime
                    </button>
                    <button className="flex items-center gap-1 hover:text-emerald-600">
                      <MessageSquare className="w-4 h-4" /> {post.repliesCount} Réponses
                    </button>
                  </div>
                </div>
              ))}
          </div>

        </div>
      )}

      {/* VIEW 2: MENTORS MESSAGING */}
      {activeTab === 'mentors' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Mentors List Column */}
          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" /> Mentors Certifiés AgroLearn
            </h3>

            <div className="space-y-3">
              {mentors.map((m) => {
                const isSelected = selectedMentor?.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMentor(m)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="relative">
                      <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-2xl object-cover" />
                      {m.online && (
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-slate-900 truncate">{m.name}</h4>
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">
                          ★ {m.rating}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-700 font-semibold truncate">{m.role}</p>
                      <span className="text-[10px] text-slate-400">{m.location}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Window Column */}
          <div className="lg:col-span-2 p-5 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col h-[500px]">
            {selectedMentor ? (
              <>
                {/* Chat Header */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={selectedMentor.avatar} alt={selectedMentor.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 text-xs">{selectedMentor.name}</h4>
                        <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded-full">
                          {selectedMentor.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{selectedMentor.role}</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages Body */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 my-2">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs sm:max-w-md p-3.5 rounded-2xl text-xs ${
                          msg.sender === 'me'
                            ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                            : 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200'
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                        <span className={`text-[9px] block text-right mt-1 ${
                          msg.sender === 'me' ? 'text-emerald-100' : 'text-slate-400'
                        }`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form onSubmit={handleSendMentorChat} className="flex gap-2 pt-2 border-t border-slate-200">
                  <input
                    type="text"
                    placeholder={`Envoyer un message privé à ${selectedMentor.name}...`}
                    value={myChatMessage}
                    onChange={(e) => setMyChatMessage(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <Users className="w-12 h-12 mb-2 text-slate-300" />
                <h4 className="font-bold text-slate-700 text-sm">Sélectionnez un mentor dans la liste</h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Les experts certifiés AgroLearn vous accompagnent individuellement sur vos questions techniques de terrain.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
