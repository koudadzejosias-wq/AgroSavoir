import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Lock, Globe, MapPin, Briefcase, Sparkles, CheckCircle2, KeyRound, ArrowLeft, Send, RefreshCw, Inbox, AlertCircle, Sprout, Trash2 } from 'lucide-react';
import { UserAccount, LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../utils/i18n';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onLogin: (user: UserAccount) => void;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onOpenCgu?: () => void;
}

type ViewMode = 'login' | 'register' | 'forgot_password' | 'confirm_email' | 'reset_password_code';

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  currentLang,
  onSelectLang,
  onOpenCgu
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserAccount['role']>('agriculteur');
  const [region, setRegion] = useState('Maritime (Lomé / Tsévié)');
  const [ageRange, setAgeRange] = useState('26 - 35 ans (Jeune Producteur)');
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(currentLang);
  
  // Confirmation code state
  const [generatedCode, setGeneratedCode] = useState<string>('894210');
  const [enteredCode, setEnteredCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  
  // Status feedback
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendNotice, setResendNotice] = useState('');

  if (!isOpen) return null;

  const t = (key: string) => getTranslation(selectedLang, key);

  const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // LocalStorage registered users database helper
  const getRegisteredUsers = (): Record<string, { name: string; email: string; password?: string; role: string; region: string; ageRange?: string }> => {
    try {
      const saved = localStorage.getItem('agrosavoir_registered_users');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return {};
  };

  const saveRegisteredUserToDb = (newUser: { name: string; email: string; password?: string; role: string; region: string; ageRange?: string }) => {
    const users = getRegisteredUsers();
    users[newUser.email.toLowerCase().trim()] = newUser;
    localStorage.setItem('agrosavoir_registered_users', JSON.stringify(users));
  };

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail) {
      setErrorMessage('Veuillez renseigner votre adresse e-mail.');
      return;
    }

    const registeredUsers = getRegisteredUsers();
    const existingUser = registeredUsers[cleanEmail];

    // RULE 1: User CANNOT log in if they haven't created an account yet
    if (!existingUser) {
      setErrorMessage(`Accès refusé : Aucun compte n'a été trouvé avec l'adresse "${cleanEmail}". Vous n'avez pas le droit de vous connecter sans avoir d'abord créé votre compte. Veuillez cliquer sur "S'inscrire".`);
      return;
    }

    // RULE 2: Password check
    const userPassword = existingUser.password || 'password123';
    if (password && password !== userPassword) {
      setErrorMessage('Mot de passe incorrect. Si vous l\'avez oublié, utilisez le lien "Mot de passe oublié ?".');
      return;
    }

    const userToSave: UserAccount = {
      id: `user-${cleanEmail.replace(/[^a-zA-Z0-0]/g, '')}`,
      name: existingUser.name || name.trim() || cleanEmail.split('@')[0],
      email: cleanEmail,
      role: (existingUser.role as UserAccount['role']) || role,
      region: existingUser.region || region,
      ageRange: existingUser.ageRange || ageRange,
      preferredLanguage: selectedLang,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
      isLoggedIn: true,
      joinedDate: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    };

    onSelectLang(selectedLang);
    onLogin(userToSave);

    setSuccessMessage('Connexion réussie ! Bienvenue sur AgroSavoir.');
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 900);
  };

  const handleRegisterStart = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail) {
      setErrorMessage('Veuillez saisir une adresse e-mail valide.');
      return;
    }

    const registeredUsers = getRegisteredUsers();
    
    // RULE 3: Cannot use the same email multiple times
    if (registeredUsers[cleanEmail]) {
      setErrorMessage(`Adresse e-mail déjà utilisée : L'adresse "${cleanEmail}" possède déjà un compte AgroSavoir. Vous n'avez pas le droit d'utiliser le même e-mail plusieurs fois. Veuillez vous connecter ou réinitialiser votre mot de passe.`);
      return;
    }

    if (!password || password.length < 4) {
      setErrorMessage('Veuillez définir un mot de passe d\'au moins 4 caractères.');
      return;
    }
    
    const newCode = generateRandomCode();
    setGeneratedCode(newCode);
    setEnteredCode('');

    // Trigger real email dispatch via backend API
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: cleanEmail,
        subject: 'AgroSavoir - Confirmation de création de votre compte',
        code: newCode,
        type: 'confirmation',
        userName: name || cleanEmail.split('@')[0],
      })
    }).catch(err => console.error("Email send error:", err));
    
    // Switch to email confirmation view mode
    setViewMode('confirm_email');
  };

  const handleVerifyEmailConfirmation = () => {
    if (enteredCode.trim() !== generatedCode) {
      setErrorMessage(`Code incorrect. Veuillez saisir le code à 6 chiffres envoyé à votre adresse mail ${email}.`);
      return;
    }

    const cleanEmail = email.toLowerCase().trim();

    // Register user in storage DB
    saveRegisteredUserToDb({
      name: name.trim() || cleanEmail.split('@')[0],
      email: cleanEmail,
      password: password || 'password123',
      role,
      region,
      ageRange
    });

    const userToSave: UserAccount = {
      id: `user-${Date.now()}`,
      name: name.trim() || cleanEmail.split('@')[0],
      email: cleanEmail,
      role,
      region,
      ageRange,
      preferredLanguage: selectedLang,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
      isLoggedIn: true,
      joinedDate: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    };

    onSelectLang(selectedLang);
    onLogin(userToSave);

    setSuccessMessage('Email confirmé et activé ! Votre compte AgroSavoir a été créé avec succès.');
    setTimeout(() => {
      setSuccessMessage('');
      setViewMode('login');
      onClose();
    }, 1200);
  };

  const handleSendForgotPasswordEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail) {
      setErrorMessage('Veuillez entrer votre adresse e-mail.');
      return;
    }

    const registeredUsers = getRegisteredUsers();
    if (!registeredUsers[cleanEmail]) {
      setErrorMessage(`Aucun compte associé à l'adresse e-mail "${cleanEmail}". Vous devez d'abord créer un compte.`);
      return;
    }
    
    const code = generateRandomCode();
    setGeneratedCode(code);

    // Trigger email send for password reset
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: cleanEmail,
        subject: 'AgroSavoir - Réinitialisation de votre mot de passe',
        code,
        type: 'reset',
        userName: registeredUsers[cleanEmail]?.name || cleanEmail.split('@')[0],
      })
    }).catch(err => console.error("Reset email send error:", err));

    setViewMode('reset_password_code');
  };

  const handleSaveResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredCode.trim() !== generatedCode) {
      setErrorMessage('Le code de sécurité saisi est incorrect. Veuillez vérifier le mail reçu.');
      return;
    }
    if (!newPassword || newPassword.length < 4) {
      setErrorMessage('Le nouveau mot de passe doit contenir au moins 4 caractères.');
      return;
    }

    const cleanEmail = email.toLowerCase().trim();
    const registeredUsers = getRegisteredUsers();
    if (registeredUsers[cleanEmail]) {
      registeredUsers[cleanEmail].password = newPassword;
      localStorage.setItem('agrosavoir_registered_users', JSON.stringify(registeredUsers));
    }

    setPassword(newPassword);
    setSuccessMessage('Mot de passe réinitialisé avec succès ! Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.');
    setTimeout(() => {
      setSuccessMessage('');
      setViewMode('login');
      setEnteredCode('');
      setNewPassword('');
    }, 1200);
  };

  const handleResendCode = () => {
    setIsResending(true);
    const freshCode = generateRandomCode();
    setGeneratedCode(freshCode);

    const cleanEmail = email.toLowerCase().trim();
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: cleanEmail,
        subject: 'AgroSavoir - Nouveau code de vérification',
        code: freshCode,
        type: 'resend',
        userName: name || cleanEmail.split('@')[0],
      })
    }).then(() => {
      setIsResending(false);
      setResendNotice(`Un nouvel e-mail avec un code secret a été distribué à ${email || 'votre boîte mail'}.`);
      setTimeout(() => setResendNotice(''), 4000);
    }).catch(err => {
      console.error(err);
      setIsResending(false);
    });
  };

  const handleDemoLogin = () => {
    const demoUser: UserAccount = {
      id: 'demo-farmer-01',
      name: 'Josias Koudadze',
      email: 'josias.koudadze@agrosavoir.tg',
      role: 'agriculteur',
      region: 'Maritime (Lomé / Tsévié)',
      preferredLanguage: selectedLang,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isLoggedIn: true,
      joinedDate: 'Août 2025'
    };

    onSelectLang(selectedLang);
    onLogin(demoUser);
    setSuccessMessage('Connexion rapide réussie !');
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-6 text-white relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-xl shadow-inner">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight">
                  {viewMode === 'forgot_password' || viewMode === 'reset_password_code'
                    ? t('forgot_password_title')
                    : viewMode === 'confirm_email'
                    ? t('email_confirmation_title')
                    : t('login_title')}
                </h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  {viewMode === 'confirm_email'
                    ? t('email_confirmation_subtitle')
                    : viewMode === 'forgot_password' || viewMode === 'reset_password_code'
                    ? t('forgot_password_subtitle')
                    : t('login_subtitle')}
                </p>
              </div>
            </div>

            {/* Language quick picker */}
            <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-100 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> {t('language_label')}:
              </span>
              <div className="flex gap-1.5">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setSelectedLang(lang.code);
                      onSelectLang(lang.code);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                      selectedLang === lang.code
                        ? 'bg-white text-emerald-800 shadow-sm'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 overflow-y-auto flex-1">
            
            {/* Success Global Overlay */}
            {successMessage ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-10 text-center flex flex-col items-center justify-center text-emerald-600"
              >
                <CheckCircle2 className="w-16 h-16 mb-3 text-emerald-500 animate-bounce" />
                <p className="text-lg font-bold text-slate-800">{successMessage}</p>
                <p className="text-sm text-slate-500 mt-1">Plateforme AgroSavoir Togo</p>
              </motion.div>
            ) : (
              <div>
                
                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center gap-2 font-medium">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* VIEW MODE 1: LOGIN & REGISTER FORMS */}
                {(viewMode === 'login' || viewMode === 'register') && (
                  <form onSubmit={viewMode === 'register' ? handleRegisterStart : handleSubmitLogin} className="space-y-4">
                    
                    {/* Demo Quick Login Button */}
                    <button
                      type="button"
                      onClick={handleDemoLogin}
                      className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      {t('demo_login_btn')}
                    </button>

                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink mx-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Ou avec vos identifiants
                      </span>
                      <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    {viewMode === 'register' && (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {t('name_label')}
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="ex: Josias Koudadze"
                            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t('email_label')}
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="agriculteur@agrosavoir.tg"
                          className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          {t('password_label')}
                        </label>
                        {viewMode === 'login' && (
                          <button
                            type="button"
                            onClick={() => {
                              setErrorMessage('');
                              setViewMode('forgot_password');
                            }}
                            className="text-xs text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
                          >
                            {t('forgot_password_link')}
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    {viewMode === 'register' && (
                      <div className="space-y-3 pt-1">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                              {t('role_label')}
                            </label>
                            <select
                              value={role}
                              onChange={(e) => setRole(e.target.value as UserAccount['role'])}
                              className="w-full py-2 px-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                            >
                              <option value="agriculteur">{t('role_agriculteur')}</option>
                              <option value="eleveur">{t('role_eleveur')}</option>
                              <option value="pisciculteur">{t('role_pisciculteur')}</option>
                              <option value="entrepreneur">{t('role_entrepreneur')}</option>
                              <option value="student">{t('role_student')}</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {t('region_label')}
                            </label>
                            <select
                              value={region}
                              onChange={(e) => setRegion(e.target.value)}
                              className="w-full py-2 px-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                            >
                              <option value="Maritime (Lomé / Tsévié)">Maritime (Lomé)</option>
                              <option value="Plateaux (Atakpamé / Kpalimé)">Plateaux</option>
                              <option value="Centrale (Sokodé)">Centrale</option>
                              <option value="Kara (Kara / Bafilo)">Kara</option>
                              <option value="Savanes (Dapaong)">Savanes</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Tranche d'âge
                          </label>
                          <select
                            value={ageRange}
                            onChange={(e) => setAgeRange(e.target.value)}
                            className="w-full py-2 px-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white font-medium text-slate-800"
                          >
                            <option value="18 - 25 ans (Jeune)">18 - 25 ans (Jeune)</option>
                            <option value="26 - 35 ans (Jeune Producteur)">26 - 35 ans (Jeune Producteur)</option>
                            <option value="36 - 50 ans">36 - 50 ans</option>
                            <option value="Plus de 50 ans">Plus de 50 ans</option>
                            <option value="Moins de 18 ans">Moins de 18 ans</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                      >
                        {viewMode === 'register' ? (
                          <>
                            <Mail className="w-4 h-4" />
                            <span>{t('btn_register_submit')}</span>
                          </>
                        ) : (
                          <span>{t('btn_login_submit')}</span>
                        )}
                      </button>
                    </div>

                    <div className="text-center pt-2 space-y-2">
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            setErrorMessage('');
                            setViewMode(viewMode === 'register' ? 'login' : 'register');
                          }}
                          className="text-xs text-emerald-700 hover:text-emerald-800 font-bold underline underline-offset-2"
                        >
                          {viewMode === 'register' ? t('switch_to_login') : t('switch_to_register')}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm("Êtes-vous sûr de vouloir supprimer tous les comptes précédemment inscrits ?")) {
                            localStorage.removeItem('agrosavoir_registered_users');
                            localStorage.removeItem('agrolearn_user');
                            localStorage.removeItem('agrolearn_progress');
                            setSuccessMessage('Base de données réinitialisée : tous les anciens comptes ont été supprimés !');
                            setTimeout(() => {
                              setSuccessMessage('');
                              window.location.reload();
                            }, 1200);
                          }
                        }}
                        className="text-[11px] text-slate-400 hover:text-red-600 transition flex items-center gap-1 mx-auto"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Supprimer tous les comptes précédemment inscrits</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* VIEW MODE 2: EMAIL CONFIRMATION AFTER REGISTRATION */}
                {viewMode === 'confirm_email' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50/90 border border-emerald-200 rounded-2xl text-emerald-950 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                        <Inbox className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Code de vérification envoyé à {email} !</span>
                      </div>
                      <p className="text-xs leading-relaxed text-emerald-800">
                        Un code secret d'activation à 6 chiffres a été envoyé directement à votre adresse <strong>{email}</strong>. Veuillez saisir ce code ci-dessous pour valider et débloquer l'accès à votre espace utilisateur.
                      </p>
                    </div>

                    {/* Simulation auto-fill helper for convenience during tests */}
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900">
                      <div className="flex items-center gap-2 font-medium">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Code reçu / Démo : <strong className="font-mono text-sm tracking-widest bg-white px-2 py-0.5 rounded border border-amber-300">{generatedCode}</strong></span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEnteredCode(generatedCode)}
                        className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] shadow-xs transition"
                      >
                        Saisir automatiquement
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Saisissez le code de vérification à 6 chiffres
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={enteredCode}
                        onChange={(e) => setEnteredCode(e.target.value)}
                        placeholder="Ex: 894210"
                        className="w-full text-center tracking-widest font-mono text-xl py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-black text-slate-900 bg-white shadow-inner"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleVerifyEmailConfirmation}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t('btn_verify_email')}</span>
                    </button>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={isResending}
                        className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                        <span>{t('resend_email_btn')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setErrorMessage('');
                          setViewMode('login');
                        }}
                        className="text-slate-500 hover:text-slate-700 font-medium"
                      >
                        {t('back_to_login')}
                      </button>
                    </div>

                    {resendNotice && (
                      <p className="text-[11px] text-emerald-700 text-center font-medium animate-fade-in">
                        {resendNotice}
                      </p>
                    )}
                  </div>
                )}

                {/* VIEW MODE 3: FORGOT PASSWORD (EMAIL PROMPT) */}
                {viewMode === 'forgot_password' && (
                  <form onSubmit={handleSendForgotPasswordEmail} className="space-y-4">
                    <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-950 text-xs leading-relaxed">
                      Saisissez l'adresse e-mail de votre compte AgroSavoir. Un code secret de réinitialisation sera envoyé directement dans votre boîte de réception.
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t('email_label')}
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre-email@agrosavoir.tg"
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t('btn_send_reset')}</span>
                    </button>

                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setErrorMessage('');
                          setViewMode('login');
                        }}
                        className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center justify-center gap-1 mx-auto"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{t('back_to_login')}</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* VIEW MODE 4: RESET PASSWORD CODE & NEW PASSWORD INPUT */}
                {viewMode === 'reset_password_code' && (
                  <form onSubmit={handleSaveResetPassword} className="space-y-4">
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-950 text-xs space-y-1">
                      <p className="font-bold">E-mail de réinitialisation envoyé !</p>
                      <p>Un code secret à 6 chiffres a été distribué à votre adresse e-mail <strong>{email}</strong>. Veuillez ouvrir votre boîte de réception.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t('enter_reset_code_label')}
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={enteredCode}
                        onChange={(e) => setEnteredCode(e.target.value)}
                        placeholder="ex: 894210"
                        className="w-full text-center tracking-widest font-mono text-base py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t('new_password_label')}
                      </label>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Nouveau mot de passe sécurisé"
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t('btn_save_new_password')}</span>
                    </button>

                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setErrorMessage('');
                          setViewMode('login');
                        }}
                        className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center justify-center gap-1 mx-auto"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{t('back_to_login')}</span>
                      </button>
                    </div>
                  </form>
                )}

              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
