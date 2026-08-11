export type LanguageCode = 'fr' | 'ee' | 'kbp';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  flag: string;
  localName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'fr', label: 'Français', flag: 'FR', localName: 'Français' },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  fr: {
    // Nav & General
    app_title: 'AgroSavoir',
    app_subtitle: 'Plateforme Agricole & Élevage',
    nav_catalogue: 'Catalogue des Cours',
    nav_diagnostic: 'Diagnostic IA Maladie',
    nav_calculators: 'Calculateurs Agricoles',
    nav_mentorship: 'Mentorat & Forum',
    nav_certificates: 'Mes Certificats',
    nav_progression: 'Ma Progression',
    
    // Auth & Header
    login_btn: 'Connexion',
    logout_btn: 'Déconnexion',
    guest_user: 'Utilisateur Invité',
    role_agriculteur: 'Agriculteur Maraîcher',
    role_eleveur: 'Éleveur Avicole',
    role_pisciculteur: 'Pisciculteur',
    role_student: 'Étudiant / Apprenant',
    role_entrepreneur: 'Agropreneur',
    
    // Login Modal
    login_title: 'Connexion à AgroSavoir',
    login_subtitle: 'Accédez à vos cours, votre progression et votre assistant IA',
    email_label: 'Adresse Email',
    password_label: 'Mot de passe',
    name_label: 'Nom Complet',
    role_label: 'Votre Domaine Agropastoral',
    region_label: 'Votre Région (Togo)',
    language_label: 'Langue Préférée',
    btn_login_submit: 'Se Connecter',
    btn_register_submit: 'Créer un Compte & Recevoir le Mail',
    demo_login_btn: 'Connexion Rapide Démo (Accès Immédiat)',
    switch_to_register: 'Pas encore de compte ? S\'inscrire',
    switch_to_login: 'Déjà un compte ? Se connecter',
    forgot_password_link: 'Mot de passe oublié ?',
    forgot_password_title: 'Réinitialiser mon mot de passe',
    forgot_password_subtitle: 'Un lien et un code de sécurité seront envoyés sur votre boîte mail',
    btn_send_reset: 'Envoyer le mail de réinitialisation',
    enter_reset_code_label: 'Code de sécurité (Reçu par email)',
    new_password_label: 'Nouveau mot de passe',
    btn_save_new_password: 'Enregistrer le nouveau mot de passe',
    email_confirmation_title: 'Confirmation de votre adresse Email',
    email_confirmation_subtitle: 'Veuillez saisir le code à 6 chiffres envoyé à votre boîte mail',
    resend_email_btn: 'Renvoyer l\'email de confirmation',
    email_sent_notice: 'Email de confirmation envoyé à',
    code_placeholder: 'ex: 894210',
    btn_verify_email: 'Valider et Activer mon Compte',
    back_to_login: 'Retour à la connexion',
    
    // Course Player & Video
    video_player_title: 'Lecteur Vidéo Interactif',
    video_chapters: 'Chapitres de la leçon',
    video_subtitles: 'Sous-titres',
    video_audio_track: 'Piste Audio / Voix',
    subtitles_off: 'Désactivés',
    audio_fr: 'Français (Original)',
    audio_ee: 'Français (Audio)',
    audio_kbp: 'Français (Audio)',
    playback_speed: 'Vitesse de lecture',
    transcript_tab: 'Transcription & Texte',
    resources_tab: 'Ressources & Guides (PDF / DOC)',
    quiz_tab: 'Quiz de Validation (100%)',
    mark_as_completed: 'Marquer comme terminé',
    lesson_completed: 'Leçon complétée !',
    
    // AgroBot Chat
    agrobot_title: 'AgroBot IA',
    agrobot_subtitle: 'Posez toutes vos questions sur l\'agriculture et l\'élevage',
    agrobot_placeholder: 'Écrivez votre message ou utilisez le micro...',
    agrobot_voice_record: 'Enregistrer votre voix',
    agrobot_voice_listening: 'Écoute en cours...',
    agrobot_listen_reply: 'Écouter en audio',
    agrobot_stop_reply: 'Arrêter l\'audio',
    agrobot_lang_select: 'Langue de réponse:',
    agrobot_quick_q1: 'Comment préparer le biopesticide de Neem ?',
    agrobot_quick_q2: 'Comment fabriquer le compost chaud en 21 jours ?',
    agrobot_quick_q3: 'Quelle est la formule de provende pour poussins ?',

    // Profile & Settings
    my_profile: 'Mon Profil & Paramètres',
    progress_summary: 'Résumé de ma Formation',
    learning_language: 'Langue d\'apprentissage',
    save_changes: 'Enregistrer les modifications',
    
    // Common
    download: 'Télécharger',
    start_course: 'Commencer la leçon',
    continue_course: 'Continuer la leçon',
    search_placeholder: 'Rechercher un cours, un sujet, un guide...',
  },

  ee: { // Ewé (Eʋegbe)
    // Nav & General
    app_title: 'AgroSavoir',
    app_subtitle: 'Agble kple Lãnyinyi Nutɔwo',
    nav_catalogue: 'Nusɔsrɔ̃wo Kpɔfe',
    nav_diagnostic: 'Dɔléle Dodokpɔ (IA)',
    nav_calculators: 'Agble Nuwo Bɔbɔfe',
    nav_mentorship: 'Aɖaŋuɖolawo kple Takpekpe',
    nav_certificates: 'Nye Agbalẽwo',
    nav_progression: 'Nye Ŋgɔyiyi',
    
    // Auth & Header
    login_btn: 'Ge ɖe eme',
    logout_btn: 'Do go',
    guest_user: 'Amedzro Nusrɔ̃la',
    role_agriculteur: 'Agbledela (Maraîcher)',
    role_eleveur: 'Koklonyila / Lãnyila',
    role_pisciculteur: 'Akpala nyila',
    role_student: 'Nusrɔ̃la / Sukuvi',
    role_entrepreneur: 'Agble Asitsala',
    
    // Login Modal
    login_title: 'Ge ɖe AgroSavoir me',
    login_subtitle: 'Sɔsrɔ̃ wò nusɔsrɔ̃wo, ŋgɔyiyi kple AgroBot le Eʋegbe me',
    email_label: 'Email gbalẽ',
    password_label: 'Gbevia / Password',
    name_label: 'Ŋkɔ blibo',
    role_label: 'Wò agble dɔwɔwɔ',
    region_label: 'Wò nutome (Togo)',
    language_label: 'Gbe si nèdi',
    btn_login_submit: 'Ge ɖe eme fifia',
    btn_register_submit: 'Ŋlɔ ŋkɔ ɖe eme',
    demo_login_btn: '⚡ Ge ɖe eme kabakaba (Kaba)',
    switch_to_register: 'Mèŋlɔ ŋkɔ ɖo oa? Ŋlɔ ŋkɔ',
    switch_to_login: 'Èŋlɔ ŋkɔ xoxo? Ge ɖe eme',
    
    // Course Player & Video
    video_player_title: 'Video Nusɔsrɔ̃',
    video_chapters: 'Agbale akpawo',
    video_subtitles: 'Gbegbɔgblɔ ŋɔŋlɔwo',
    video_audio_track: 'Gbe si nèse nàse',
    subtitles_off: 'Tsi eŋu',
    audio_fr: 'Fransagbe (Yevugbe)',
    audio_ee: 'Eʋegbe (Gbegbɔgblɔ)',
    audio_kbp: 'Kabiyè (Gbegbɔgblɔ)',
    playback_speed: 'Duatsɔtsɔ',
    transcript_tab: 'Nuŋɔŋlɔ blibo',
    resources_tab: 'Agbalẽwo kple Mɔfiame (PDF)',
    quiz_tab: 'Dodokpɔ (100%)',
    mark_as_completed: 'Ŋlɔe be ewɔ vɔ',
    lesson_completed: 'Nusɔsrɔ̃ la wu enu!',
    
    // AgroBot Chat
    agrobot_title: 'AgroBot IA (Eʋegbe)',
    agrobot_subtitle: 'Bia biabia le Eʋegbe, Fransagbe alo Kabyè me',
    agrobot_placeholder: 'Ŋlɔ wò biabia alo ƒo nu...',
    agrobot_voice_record: 'Lé wò gbe ɖi',
    agrobot_voice_listening: 'Míele to ɗom...',
    agrobot_listen_reply: '🔊 Se gbe la',
    agrobot_stop_reply: '⏹ Tsi gbe la',
    agrobot_lang_select: 'Gbe si me wòaɖo eŋu le:',
    agrobot_quick_q1: 'Aleke woawɔ Neem biopesticide-a?',
    agrobot_quick_q2: 'Aleke woawɔ compost kaba le ŋkeke 21 me?',
    agrobot_quick_q3: 'Mɔ ka dzi woato anyi koklowo bɔbɔe?',

    // Profile & Settings
    my_profile: 'Nye Nɔnɔme & Mɔfiame',
    progress_summary: 'Nye nusɔsrɔ̃wo kpekpe structural',
    learning_language: 'Nusɔsrɔ̃ gbe',
    save_changes: 'Dzra nuwo ɖo',
    
    // Common
    download: 'Tia eɖe gbe',
    start_course: 'Dze nusɔsrɔ̃ gɔme',
    continue_course: 'Yi nusɔsrɔ̃ dzi',
    search_placeholder: 'Di nusɔsrɔ̃, nya aɖe...',
  },

  kbp: { // Kabyè (Kabiyè)
    // Nav & General
    app_title: 'AgroSavoir',
    app_subtitle: 'Haɖaʊ kɛlɛʊ kpeya',
    nav_catalogue: 'Sukuli tɔm takayası',
    nav_diagnostic: 'Kudɔm wɛtʊ tazʊʊ (IA)',
    nav_calculators: 'Haɖaʊ kpakpası labʊ',
    nav_mentorship: 'Tasʊʊ lɔŋ kpeya',
    nav_certificates: 'Man-takayası Takayaɣ',
    nav_progression: 'Maw-ɛsɨndaa yabʊ',
    
    // Auth & Header
    login_btn: 'Sʊʊ kɛ kpeya',
    logout_btn: 'Lii kpeya',
    guest_user: 'Kedeŋa sukuli-dʊ',
    role_agriculteur: 'Haɖyʊ (Haɖaʊ)',
    role_eleveur: 'Afan-tʊ / Sumasi dʊ',
    role_pisciculteur: 'Kpakpasi dʊ',
    role_student: 'Sukuli-dʊ',
    role_entrepreneur: 'Tɔm kpeya tadıyʊ',
    
    // Login Modal
    login_title: 'Sʊʊ AgroSavoir taa',
    login_subtitle: 'Maw-ɛsɨndaa yabʊ kpeya kɛ Kabiyè, Fransagbe na Eʋegbe',
    email_label: 'Email takayaɣ',
    password_label: 'Majaɣ / Password',
    name_label: 'Hɩɖɛ tiku tiku',
    role_label: 'Nya-haɖaʊ tuma',
    region_label: 'Nya-tetʊ (Togo)',
    language_label: 'Kʊnʊŋ kpeya',
    btn_login_submit: 'Sʊʊ lɛɛlɛɛ',
    btn_register_submit: 'Maw-hɩɖɛ ŋlɔʊ',
    demo_login_btn: '⚡ Sʊʊ lɔŋ lɔŋ (Démo)',
    switch_to_register: 'Ŋta-ŋlɔ hɩɖɛ? Ŋlɔ lɛɛlɛɛ',
    switch_to_login: 'Ŋŋlɔ hɩɖɛ xoxo? Sʊʊ',
    
    // Course Player & Video
    video_player_title: 'Video Sukuli',
    video_chapters: 'Tɔm kpeya cɔlɔ',
    video_subtitles: 'Kʊnʊŋ ŋɔŋlɔwo',
    video_audio_track: 'Yabʊ kʊnʊŋ',
    subtitles_off: 'Sɔʊ tɔm',
    audio_fr: 'Fransagbe (Kɛlɛʊ)',
    audio_ee: 'Eʋegbe (Kabiyè translation)',
    audio_kbp: 'Kabiyè (Kabiyè translation)',
    playback_speed: 'Lɔŋ wɛtʊ',
    transcript_tab: 'Tɔm kpeya takayaɣ',
    resources_tab: 'Mɔfiame Takayası (PDF)',
    quiz_tab: 'Dodokpɔ Tazʊʊ (100%)',
    mark_as_completed: 'Labʊ yelʊ',
    lesson_completed: 'Sukuli deewɔ vɔ!',
    
    // AgroBot Chat
    agrobot_title: 'AgroBot IA (Kabiyè)',
    agrobot_subtitle: 'Pɔzı tɔm kɛ Kabiyè, Eʋegbe na Fransagbe taa',
    agrobot_placeholder: 'Ŋmaa nya-tɔm yaa yoo yee...',
    agrobot_voice_record: 'Hoko nya-nɔɔ',
    agrobot_voice_listening: 'Nì-tɔm nìʊ...',
    agrobot_listen_reply: '🔊 Nì tɔm kpeya',
    agrobot_stop_reply: '⏹ Sɔʊ nɔɔ',
    agrobot_lang_select: 'Kʊnʊŋ cɔlɔʊ:',
    agrobot_quick_q1: 'Ekpazʊʊ nim tɔm lɔŋ kɛ Kabiyè?',
    agrobot_quick_q2: 'Isɛm kaba kɛ compost labʊ 21 kĩe-ŋa?',
    agrobot_quick_q3: 'Afan tɔm tazʊʊ kɛ kpeya?',

    // Profile & Settings
    my_profile: 'Maw-Wɛtʊ & Lɔŋ',
    progress_summary: 'Man-Sukuli tɔm',
    learning_language: 'Sukuli kʊnʊŋ',
    save_changes: 'Yebʊ tɔm',
    
    // Common
    download: 'Kpazʊʊ takayaɣ',
    start_course: 'Paa sukuli',
    continue_course: 'Wobi sukuli taa',
    search_placeholder: 'Pɔzı sukuli, tɔm...',
  }
};

export function getTranslation(lang: LanguageCode, key: string): string {
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['fr']?.[key] || key;
}
