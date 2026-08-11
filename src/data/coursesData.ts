import { DomainData, Mentor, ForumPost } from '../types';
import { ALL_MODULE_RESOURCES } from './moduleResources';

const RAW_DOMAINS_DATA: DomainData[] = [
  {
    id: 'agriculture',
    title: 'Agriculture Maraîchère & Vivrière',
    shortTitle: 'Agriculture',
    icon: 'Sprout',
    color: 'emerald',
    bgLight: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderColor: 'border-emerald-500',
    description: 'Techniques modernes de préparation des sols, compostage chaud en 21 jours, goutte-à-goutte économique et biopesticides naturels.',
    certificateTitle: 'Spécialisation en Agriculture Écologique & Maraîchage',
    modules: [
      {
        id: 'agri-m1',
        domainId: 'agriculture',
        moduleNumber: 1,
        title: 'Préparation du sol et Compostage Organique',
        description: 'Analyse pratique de la fertilité du sol et fabrication d\'un compost chaud riche en nutriments en 21 jours.',
        videoDuration: '18 min',
        videoDurationSeconds: 1080,
        videoUrl: 'https://www.youtube.com/embed/qoba9ZK5tKo',
        videoPoster: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80',
        videoChapters: [
          { time: '00:00', label: 'Introduction et diagnostic du sol' },
          { time: '03:30', label: 'Test du bocal & texture (Sable/Limon/Argile)' },
          { time: '07:15', label: 'Ratios Vert (Azote) et Brun (Carbone)' },
          { time: '11:45', label: 'Humidification & test de la poignée' },
          { time: '15:20', label: 'Calendrier des retournements à J4, J8, J14, J21' },
        ],
        transcript: `Bienvenue dans le Module 1 dédié à la préparation du sol et au compostage organique rapide. Pour réussir vos cultures maraîchères (tomates, piments, oignons, gombo), la qualité du sol est la pierre angulaire. Un compost chaud monte naturellement à 65°C pour détruire les graines de mauvaises herbes et les champignons pathogènes. Respectez la règle des 2/3 de matière brune (paille, brindilles, sciure) pour 1/3 de matière verte (déchets de cuisine, fientes, herbes fraîches). L'humidité doit atteindre 60% : en pressant une poignée dans la main, quelques gouttes d'eau doivent suinter sans couler à flot.`,
        resources: [
          {
            id: 'res-agri-1-pdf',
            title: 'Guide Pratique: Fabriquer son Compost Organique en 21 Jours',
            filename: 'Guide_Fabriquer_Son_Compost.pdf',
            type: 'pdf',
            fileSize: '2.4 MB',
            description: 'Guide complet étape par étape avec schémas des couches, dosage azote/carbone et gestion de la température.',
            contentMarkdown: `# GUIDE PRATIQUE : FABRIQUER SON COMPOST CHAUD EN 21 JOURS
*Édition AgroLearn - Filière Agriculture Maraîchère*

## 1. Principe Scientifique du Compost Chaud
Le compostage aérobie à haute température permet de recycler rapidement la matière organique en un humus riche. La montée en température (55°C à 68°C) pasteurise le mélange et élimine les germes pathogènes.

## 2. Ingrédients et Proportions Clés
- **Matières Brunes / Carbonées (C)** : Paille sèche, sciure de bois non traitée, herbes sèches, cartons bruts. (65% du volume)
- **Matières Vertes / Azotées (N)** : Fientes de volaille fraîches, déchets de fruits/légumes, herbe fraîchement coupée. (35% du volume)
- **Eau** : Humidification continue lors de la monte des couches.

## 3. Calendrier de Retournement Rapide
- **Jour 0** : Montage de la tas (1.5m de large x 1.5m de haut).
- **Jour 4** : Premier retournement (le cœur chaud est inversé avec les bords).
- **Jour 8** : Deuxième retournement + vérification humidité.
- **Jour 14** : Troisième retournement (baisse douce de température).
- **Jour 21** : Compost mûr, odeur de sous-bois, couleur brun foncé prêt pour l'épandage.`
          },
          {
            id: 'res-agri-1-png',
            title: 'Infographie: Schéma des Couches de Montage du Compost',
            filename: 'Schema_Couches_Compost.png',
            type: 'png',
            fileSize: '1.8 MB',
            description: 'Visualisation graphique en haute définition du chevauchement des couches C/N et de l\'aération.',
            imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb1b7a5?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'res-agri-1-docx',
            title: 'Fiche de Diagnostic de Fertilité des Sols',
            filename: 'Fiche_Diagnostic_Sols.docx',
            type: 'docx',
            fileSize: '450 KB',
            description: 'Grille d\'évaluation terrain modifiable pour noter le pH, la porosité et la présence de vers de terre.',
            contentMarkdown: `FICHE DE DIAGNOSTIC DE FERTILITÉ DES SOLS (MODÈLE TERRAIN)

Nom de l'Exploitation: ____________________
Parcelle N°: ____________  Culture Prévue: __________________

1. TEST DE TEXTURE DU BOCAL (24h de repos dans l'eau)
   - % Sable (départ bas) : ______ %
   - % Limon (couche médiane) : ______ %
   - % Argile (couche supérieure) : ______ %
   Type de sol déduit : [ ] Sableux  [ ] Argileux  [ ] Limono-Argileux

2. TEST D'ACIDITÉ & pH ÉCONOMIQUE
   - Réaction au Vinaigre blanc (Effervescence = Sol Calcaire/Alcalin pH>7.5) : [ ] Oui  [ ] Non
   - Réaction au Bicarbonate de Soude (Mousse = Sol Acide pH<6.0) : [ ] Oui  [ ] Non

3. ÉVALUATION BIOLOGIQUE
   - Nombre de vers de terre dans 30x30x30cm de terre : _____ vers
   - Présence de mycorhizes / racines saines : [ ] Bonne  [ ] Faible`
          },
          {
            id: 'res-agri-1-xlsx',
            title: 'Calculateur Excel des Proportions Azote/Carbone (C/N)',
            filename: 'Calculateur_Proportions_Compost.xlsx',
            type: 'xlsx',
            fileSize: '620 KB',
            description: 'Tableur interactif pour entrer le volume de paille et fientes et obtenir le ratio C/N exact.',
            contentMarkdown: `TABLEUR INTERACTIF - DOSAGE DU COMPOST EN FONCTION DES MATIÈRES DISPONIBLES

1. Entrez le volume de paille disponible (en kg) : 100 kg
2. Entrez le volume de fientes de volaille (en kg) : 50 kg
3. Quantité d'eau d'arrosage recommandée : 45 Litres

Résultat du Test de C/N : OPTIMAL (28:1).
Temps de maturité estimé : 21 Jours à 62°C.`
          },
          {
            id: 'res-agri-1-pptx',
            title: 'Présentation PowerPoint : La Vie Microbienne du Sol',
            filename: 'Microbiologie_Du_Sol.pptx',
            type: 'pptx',
            fileSize: '5.1 MB',
            description: 'Diaporama complet de formation sur les bactéries aérobies, mycorhizes et vers de terre.',
            contentMarkdown: `DIAPORAMA DE FORMATION : LA SANTÉ ET LA MICROBIOLOGIE DES SOLS

Slide 1 : Rôle clé de la matière organique dans la rétention d'eau.
Slide 2 : Comment les champignons mycorhiziens étendent les racines de 300%.
Slide 3 : Protocole d'aération du compost sans tuer la flore utile.`
          },
          {
            id: 'res-agri-1-pdf2',
            title: 'Guide Technique : Correction du pH par Chaulage Organique',
            filename: 'Correction_pH_Sols_Acides.pdf',
            type: 'pdf',
            fileSize: '3.2 MB',
            description: 'Techniques d\'amendement à base de cendres de bois et dolomie pour stabiliser les sols tropicaux.',
            contentMarkdown: `# AMENDEMENT ET CORRECTION DU pH EN MARAÎCHAGE

- Sols acides (pH < 5.5) : Appliquer 150g de cendre de bois tamisée ou coquilles d'œufs broyées par m².
- Sols très alcalins (pH > 7.8) : Incorporer du compost de feuilles de filao ou d'agrumes.`
          },
          {
            id: 'res-agri-1-mp3',
            title: 'Podcast Audio : Les Secrets du Compost Chaud Réussi',
            filename: 'Podcast_Compostage_Express.mp3',
            type: 'mp3',
            fileSize: '6.8 MB',
            description: 'Émission audio de 8 minutes résumant les erreurs fréquentes des maraîchers débutants.',
            contentMarkdown: `🎙️ PODCAST AGROLEARN : LES ERREURS DU COMPOSTAGE EN ZONE CHAUDE

Durée : 8 minutes 15 secondes
Sommaire :
- Pourquoi mon tas ne monte pas en température ?
- Comment réagir si le compost sent le purin fort ?
- L'astuce du bâton pour mesurer la chaleur sans thermomètre.`
          },
          {
            id: 'res-agri-1-pdf3',
            title: 'Manuel de Laboratoire : Dosage de l\'Humus et Azote Total',
            filename: 'Manuel_Laboratoire_Humus.pdf',
            type: 'pdf',
            fileSize: '4.1 MB',
            description: 'Protocole pour mesurer le pourcentage d\'humus et la capacité d\'échange cationique (CEC).',
            contentMarkdown: `# PROTOCOLE DE LABORATOIRE TERRAIN DE L'HUMUS

1. Échantillonnage en Z sur 5 points de la parcelle à 20cm de profondeur.
2. Séchage à l'ombre sur papier buvard pendant 48 heures.
3. Test de sédimentation rapide.`
          }
        ]
      },
      {
        id: 'agri-m2',
        domainId: 'agriculture',
        moduleNumber: 2,
        title: 'Systèmes d\'Irrigation Économiques',
        description: 'Installation étape par étape d\'un système goutte-à-goutte basse pression à petit budget.',
        videoDuration: '22 min',
        videoDurationSeconds: 1320,
        videoUrl: 'https://www.youtube.com/embed/qoba9ZK5tKo',
        videoPoster: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1000&q=80',
        videoChapters: [
          { time: '00:00', label: 'Enjeux de l\'économie d\'eau en zone tropicale' },
          { time: '04:10', label: 'Matériel nécessaire: Cuve surélevée & tuyaux PE HD' },
          { time: '09:30', label: 'Perçage et installation des goutteurs' },
          { time: '14:50', label: 'Calcul des débits par pied de culture' },
          { time: '19:00', label: 'Entretien anti-bouchage au vinaigre/citron' },
        ],
        transcript: `L'eau est une ressource précieuse et coûteuse. Ce cours vous montre comment fabriquer un kit goutte-à-goutte pour moins de 30 000 FCFA avec une cuve de 1000 litres surélevée à 1.5 mètre de hauteur. Ce système alimente directement les racines de vos plantes en réduisant l'évaporation de 80% et en évitant le mouillage du feuillage, principal vecteur du mildiou et de la bactériose.`,
        resources: [
          {
            id: 'res-agri-2-pdf',
            title: 'Plans d\'Aménagement Goutte-à-Goutte Basse Pression',
            filename: 'Plan_Installation_Goutte_A_Goutte.pdf',
            type: 'pdf',
            fileSize: '3.1 MB',
            description: 'Schéma technique avec diamètre des tuyaux, vannes de secteur et filtres à disque.',
            contentMarkdown: `# PLANS D'INSTALLATION GOUTTE-À-GOUTTE BASSE PRESSION
*Réseau Maraîcher AgroLearn 500m²*

## 1. Composants du Système
- **Réservoir surélevé** : Cuve IBC 1000L positionnée à 1.80m du sol (Pression = 0.18 bar).
- **Filtre à disque 120 mesh** : Indispensable en sortie de cuve pour stopper le limon.
- **Ligne principale** : Tuyau PE polyéthylène Ø 32 mm.
- **Lignes latérales** : Gainages goutteurs Ø 16 mm perforés tous les 30 cm (débit 1.6 L/h par goutteur).

## 2. Tableau des Besoins d'Irrigation Quotidienne
- **Tomate (Plein développement)** : 4.5 Litres / plante / jour
- **Piment / Poivron** : 3.2 Litres / plante / jour
- **Oignon / Échalote** : 1.8 Litres / m² / jour`
          },
          {
            id: 'res-agri-2-docx',
            title: 'Calculateur Automatique des Besoins en Eau',
            filename: 'Calculateur_Besoins_Eau.docx',
            type: 'docx',
            fileSize: '380 KB',
            description: 'Outil de dimensionnement de la cuve et du temps d\'arrosage selon la surface cultivée.',
            contentMarkdown: `CALCULATEUR DE BESOINS EN EAU & TEMPS D'IRRIGATION

Formule de calcul du temps d'arrosage quotidien (heures) :
Temps (h) = (Nombre de Pieds x Volume Besoin Litres par Pied) / (Nombre de Goutteurs x Débit Goutteur L/h)

EXEMPLE D'APPLICATION MARAÎCHÈRE :
- Surface: 250 m² de Tomates
- Densité: 1 000 plants
- Besoin unitaire: 4 Litres / plant / jour
- Volume Total Eau Nécessaire: 4 000 Litres / jour
- Avec des goutteurs de 2 Litres/heure: Temps d'arrosage requis = 2 heures / jour (1h le matin à 6h, 1h le soir à 17h30).`
          },
          {
            id: 'res-agri-2-pdf2',
            title: 'Fiche Technique de Maintenance des Pompes & Filtres Solairement Alimentés',
            filename: 'Fiche_Maintenance_Pompes_Filtres.pdf',
            type: 'pdf',
            fileSize: '1.9 MB',
            description: 'Procédure pas-à-pas pour le nettoyage des filtres à disque et l\'entretien de la crépine de pompe.',
            contentMarkdown: `# MAINTENANCE DU SYSTÈME D'IRRIGATION MARAÎCHÈRE

1. Nettoyage du Filtre à Disque (Fréquence : Hebdomadaire)
- Dévissez le corps de filtre, retirez les disques en plastique.
- Rincez abondamment sous jet d'eau forte pour décoller la vase et le sable.
- Trempez 15 minutes dans une solution d'eau citronnée ou vinaigre d'alcool si dépôt calcaire.

2. Purge des Lignes Latérales (Fréquence : Bi-mensuel)
- Ouvrez les bouchons d'extrémité de chaque ligne goutte-à-goutte.
- Laissez couler l'eau à grande vitesse pendant 2 minutes pour chasser les sédiments accumulés.`
          }
        ]
      },
      {
        id: 'agri-m3',
        domainId: 'agriculture',
        moduleNumber: 3,
        title: 'Protection Biologique des Cultures',
        description: 'Fabrication de biopesticides puissants à base de Neem et Piment, et gestion intégrée des ravageurs.',
        videoDuration: '15 min',
        videoDurationSeconds: 900,
        videoUrl: 'https://www.youtube.com/embed/qoba9ZK5tKo',
        videoPoster: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1000&q=80',
        videoChapters: [
          { time: '00:00', label: 'Danger des pesticides chimiques sur la santé et le sol' },
          { time: '03:15', label: 'Propriétés de l\'Azadirachtine du Neem' },
          { time: '06:40', label: 'Préparation du biopesticide Neem + Piment + Savon' },
          { time: '10:30', label: 'Mode d\'application à la tombée du jour' },
          { time: '13:00', label: 'Identification des prédateurs utiles (Coccinelles)' },
        ],
        transcript: `Dites adieu aux intrants chimiques coûteux et toxiques. Dans cette vidéo, nous préparons un biopesticide naturel répulsif et larvicide. La combinaison de la graine de Neem (riche en Azadirachtine), du piment fort (Capsaïcine) et du savon noir fixe la solution sur les feuilles et détruit le système nerveux des chenilles mineuses de la tomate (Tuta absoluta) et des pucerons.`,
        resources: [
          {
            id: 'res-agri-3-pdf',
            title: 'Fiches Recettes des Biopesticides Naturels',
            filename: 'Recettes_Biopesticides.pdf',
            type: 'pdf',
            fileSize: '2.8 MB',
            description: ' Recettes homologuées : Extrait de Neem, Purin d\'Ortie/Tithonia, Macération Piment-Ail.',
            contentMarkdown: `# FICHES RECETTES DE BIOPESTICIDES HOMOLOGUÉS

## Recette 1 : Extrait Concentré Neem & Piment (Anti-Chenilles & Pucerons)
- **Ingrédients** : 500g de graines de Neem pilées + 100g de piment fort + 50g de savon noir + 10L d'eau.
- **Préparation** : Faire macérer 24 heures à l'ombre. Filtrer très finement à travers un linge synthétique.
- **Dosage** : Diluer 1 Litre de préparation dans 9 Litres d'eau claire (solution à 10%).
- **Fréquence** : Pulvériser tous les 5 jours en préventif ou 3 jours en curatif, impérativement après 17 heures.

## Recette 2 : Biofongicide au Bicarbonate de Soude (Anti-Oïdum & Mildiou)
- **Ingrédients** : 10g de Bicarbonate de soude + 1 cuillère à soupe d'huile végétale + 1L d'eau.
- **Effet** : Modifie le pH de la surface foliaire et bloque la germination des spores fongiques.`
          },
          {
            id: 'res-agri-3-png',
            title: 'Poster d\'Identification des Insectes Ravageurs vs Utiles',
            filename: 'Insectes_Ravageurs_Et_Utiles.png',
            type: 'png',
            fileSize: '2.1 MB',
            description: 'Guide visuel avec photos HD des pucerons, coccinelles, chenilles légionnaires et punaises.',
            imageUrl: 'https://images.unsplash.com/photo-1588615419958-36f78817b1bd?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'res-agri-3-audio',
            title: 'Guide Audio : Préparation du Biopesticide Neem (Français & Ewé)',
            filename: 'Guide_Audio_Biopesticide_Neem.mp3',
            type: 'mp3',
            fileSize: '4.5 MB',
            description: 'Explication audio pratique des dosages et de la macération pour écoute directe sur le terrain.',
            contentMarkdown: `🎙️ GUIDE AUDIO SUR LE TERRAIN : FABRICATION DU BIOPESTICIDE AU NEEM

Durée : 4 minutes 30 secondes
Langues : Français & Ewé (Eʋegbe)

Contenu :
- 00:00 - Introduction et cueillette des graines de Neem mûres
- 01:15 - Pilage au mortier traditionnel
- 02:30 - Ajout du savon noir et du piment fort
- 03:45 - Précautions lors de la pulvérisation du soir`
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Quel est le ratio optimal de matière carbonée (brune) et azotée (verte) pour réussir un compost chaud ?',
        options: ['100% de matière verte', '2/3 de matière brune (C) pour 1/3 de matière verte (N)', '1/2 plastique et 1/2 terre', '90% de sable et 10% d\'eau'],
        correctAnswer: 1,
        explanation: 'Le ratio C/N idéal nécessite 2/3 de matières carbonées (brunes: paille, sciure) et 1/3 de matières azotées (vertes: fientes, déchets verts) pour nourrir les bactéries aérobies.'
      },
      {
        id: 2,
        question: 'Comment vérifier facilement l\'humidité du compost avec le test de la poignée ?',
        options: ['L\'eau doit couler comme un robinet ouvert', 'En pressant le mélange, quelques gouttes doivent suinter sans couler à flot', 'Le mélange doit s\'effriter complètement en poussière sèche', 'Le mélange doit brûler la main'],
        correctAnswer: 1,
        explanation: 'Une humidité de 60% se reconnaît lorsque quelques gouttes suintent entre les doigts lors d\'une forte pression manuelle.'
      },
      {
        id: 3,
        question: 'À quelle hauteur minimale doit-être surélevée une cuve d\'eau pour un système goutte-à-goutte gravitaire ?',
        options: ['Directement posée sur le sol', 'Environ 1.5m à 1.8m de hauteur', 'À 20 mètres de hauteur', 'Sous la terre'],
        correctAnswer: 1,
        explanation: 'Une hauteur de 1.5m à 1.8m crée une pression gravitaire de 0.15 à 0.18 bar, suffisante pour les goutteurs basse pression autorégulants.'
      },
      {
        id: 4,
        question: 'Quel rôle joue le savon noir dans la recette du biopesticide Neem-Piment ?',
        options: ['Donner une bonne odeur', 'Agent mouillant qui fixe le produit sur la feuille et dissout la cuticule des pucerons', 'Accélérer la floraison', 'Chasser les oiseaux'],
        correctAnswer: 1,
        explanation: 'Le savon noir agit comme tensioactif (mouillant) pour coller la préparation sur la feuille et fragiliser la carapace des pucerons.'
      }
    ]
  },
  {
    id: 'elevage',
    title: 'Élevage & Production Avicole',
    shortTitle: 'Élevage',
    icon: 'Egg',
    color: 'amber',
    bgLight: 'bg-amber-50 text-amber-800 border-amber-200',
    borderColor: 'border-amber-500',
    description: 'Bâtiments d\'élevage aux normes, fabrication de provende économique équilibrée et calendrier sanitaire de prophylaxie.',
    certificateTitle: 'Spécialisation en Aviculture Moderne & Gestion de Cheptel',
    modules: [
      {
        id: 'elev-m1',
        domainId: 'elevage',
        moduleNumber: 1,
        title: 'Conception et Hygiène du Poulailler',
        description: 'Plan d\'architecte et normes de construction d\'un poulailler biosecurisé pour 500 poulets de chair.',
        videoDuration: '20 min',
        videoDurationSeconds: 1200,
        videoUrl: 'https://www.youtube.com/embed/qoba9ZK5tKo',
        videoPoster: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80',
        videoChapters: [
          { time: '00:00', label: 'Orientation Est-Ouest du bâtiment' },
          { time: '04:30', label: 'Densité au m² et calcul de surface pour 500 sujets' },
          { time: '08:15', label: 'Conception du toit à double pente avec lanterneau' },
          { time: '13:00', label: 'Gestion de la litière (Copeaux de bois secs)' },
          { time: '17:20', label: 'Procédure du vide sanitaire de 14 jours' },
        ],
        transcript: `Un bâtiment mal conçu est la première cause de mortalité en aviculture. Dans ce module, nous étudions l'architecture idéale d'un poulailler de 50m² pouvant accueillir 500 poulets de chair en finition (10 sujet/m²). L'orientation perpendiculaire aux vents dominants et l'axe Est-Ouest protègent les oiseaux des rayons directs du soleil.`,
        resources: [
          {
            id: 'res-elev-1-pdf',
            title: 'Plan d\'Architecte Poulailler Moderne 500 Têtes',
            filename: 'Plan_Poulailler_500_Tetes.pdf',
            type: 'pdf',
            fileSize: '4.2 MB',
            description: 'Plan d\'exécution détaillé avec cotes, fondations, muret de 60cm et grillage anti-oiseaux.',
            contentMarkdown: `# PLAN DE CONSTRUCTION POULAILLER 500 SUJETS

## 1. Caractéristiques Géométriques
- **Longueur** : 10.0 mètres
- **Largeur** : 5.0 mètres (Surface totale = 50 m²)
- **Hauteur Muret périphérique** : 0.60 mètre en parpaings de 15 cm
- **Hauteur sous plafond au faîtage** : 3.50 mètres
- **Grillage** : Mailles fines 1 cm galvanisées de 0.60m jusqu'au toit.

## 2. Équipements Requis pour 500 Sujets
- **Mangeoires 1er âge (0-2 semaines)** : 10 assiettes de démarrage
- **Mangeoires trémies 2ème âge** : 12 trémies de 15 kg
- **Abreuvoirs siphoïdes** : 12 abreuvoirs automatiques ou siphoïdes 10L
- **Radiant / Éleveuse à gaz ou infrarouge** : 2 éleveuses de 250W`
          },
          {
            id: 'res-elev-1-docx',
            title: 'Fiche Matériaux et Devis Estimatif Bâtiment',
            filename: 'Fiche_Materiaux_Et_Couts.docx',
            type: 'docx',
            fileSize: '520 KB',
            description: 'Devis Excel/Word modifiable quantitatif des ciments, tôles, bois et maçonnerie.',
            contentMarkdown: `DEVIS ESTIMATIF DE CONSTRUCTION POULAILLER 50M²

1. MAÇONNERIE & FONDATION
   - Ciment 42.5 : 25 sacs x 4 500 FCFA = 112 500 FCFA
   - Parpaings 15x20x40 : 350 unités x 350 FCFA = 122 500 FCFA
   - Sable de rivière : 1 camion de 10m³ = 85 000 FCFA

2. CHARPENTE & COUVERTURE
   - Tôles ondulées bac alu 0.35mm : 18 tôles x 9 000 FCFA = 162 000 FCFA
   - Madriers & Chevron bois de charpente : 140 000 FCFA

TOTAL ESTIMÉ MATÉRIAUX : 622 000 FCFA (Hors Main d'œuvre)`
          },
          {
            id: 'res-elev-1-png',
            title: 'Schéma de Circulation d\'Air & Ventilation Naturelle',
            filename: 'Schema_Ventilation.png',
            type: 'png',
            fileSize: '1.5 MB',
            description: 'Schéma thermique illustrant l\'évacuation des gaz d\'ammoniac par effet thermosiphon.',
            imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1000&q=80'
          }
        ]
      },
      {
        id: 'elev-m2',
        domainId: 'elevage',
        moduleNumber: 2,
        title: 'Alimentation et Formulation de Provende',
        description: 'Recettes et formules d\'aliments volailles économiques basées sur le maïs, le soja et le poisson.',
        videoDuration: '25 min',
        videoDurationSeconds: 1500,
        videoUrl: 'https://www.youtube.com/embed/qoba9ZK5tKo',
        videoPoster: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1000&q=80',
        videoChapters: [
          { time: '00:00', label: 'L\'alimentation représente 70% des coûts d\'élevage' },
          { time: '05:00', label: 'Rôle de l\'énergie (Maïs) et des Protéines (Soja/Poisson)' },
          { time: '10:20', label: 'Formulation Provende Démarrage (22% Protéine)' },
          { time: '16:00', label: 'Formulation Provende Croissance & Finition' },
          { time: '21:30', label: 'Calcul de l\'Indice de Conversion Alimentaire (IC)' },
        ],
        transcript: `L'alimentation représente jusqu'à 70% du coût de revient d'un poulet. En fabriquant votre propre provende à la ferme avec un broyeur-mélangeur, vous économisez 20 à 30% sur chaque sac de 50kg. Nous apprenons le carré de Pearson et le dosage exact des matières premières.`,
        resources: [
          {
            id: 'res-elev-2-pdf',
            title: 'Formules Alimentaires Poussins, Poulets et Pondeuses',
            filename: 'Formules_Alimentaires_Poussins_Pondeuses.pdf',
            type: 'pdf',
            fileSize: '3.5 MB',
            description: 'Tableaux de composition pour 100kg de provende : Démarrage, Croissance, Finition et Pondeuse.',
            contentMarkdown: `# FORMULES D'ALIMENTATION PROVENDE POUR 100 KG

## 1. FORMULE DÉMARRAGE POULET DE CHAIR (J1 à J21) - Protéines Brutes: 21.5%
- Maïs Jaune concassé : 60 kg
- Tourteau de Soja (48% PROT) : 22 kg
- Farine de Poisson locale (60% PROT) : 8 kg
- Son de Blé / Riz : 6 kg
- Coquilles d'huîtres / Calcaire broyé : 1.5 kg
- Concentré / Prémix Démarrage 2.5% : 2.5 kg
- Sel de cuisine : 0.3 kg

## 2. FORMULE FINITION POULET DE CHAIR (J22 à J42) - Protéines Brutes: 18.5%
- Maïs Jaune : 66 kg
- Tourteau de Soja : 16 kg
- Farine de Poisson : 6 kg
- Son de Riz : 8 kg
- Coquilles d'huîtres : 1.5 kg
- Prémix Finition : 2.5 kg`
          },
          {
            id: 'res-elev-2-docx',
            title: 'Tableau de Suivi de Consommation & Poids Sujets',
            filename: 'Tableau_Rationnement.docx',
            type: 'docx',
            fileSize: '410 KB',
            description: 'Registre de suivi hebdomadaire du gain de poids moyen et de la quantité d\'aliment distribuée.',
            contentMarkdown: `REGISTRE DE SUIVI ALIMENTAIRE & CROISSANCE (BANDE N°___)

Semaine 1 (J1-J7) :
- Aliment distribué / sujet / jour : 15 grammes
- Poids moyen cible fin de semaine : 160 grammes
- Mortalité tolérée : < 1%

Semaine 6 (J36-J42) :
- Aliment distribué / sujet / jour : 150 grammes
- Poids moyen cible : 2 200 grammes
- Indice de Conversion cumulé cible : 1.85`
          }
        ]
      },
      {
        id: 'elev-m3',
        domainId: 'elevage',
        moduleNumber: 3,
        title: 'Suivi Sanitaire et Prophylaxie',
        description: 'Prévention des maladies aviaires redoutables (Newcastle, Gumboro, Coccidiose) et planning de vaccination.',
        videoDuration: '17 min',
        videoDurationSeconds: 1020,
        videoUrl: 'https://www.youtube.com/embed/qoba9ZK5tKo',
        videoPoster: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1000&q=80',
        videoChapters: [
          { time: '00:00', label: 'Règle d\'or: Mieux vaut prévenir que guérir' },
          { time: '03:45', label: 'Mode d\'administration des vaccins dans l\'eau de boisson' },
          { time: '08:20', label: 'Symptômes de la maladie de Newcastle vs Gumboro' },
          { time: '12:10', label: 'Traitement anticoccidien et gestion du stress thermique' },
          { time: '15:30', label: 'Rôle des vitamines et déparasitage' },
        ],
        transcript: `En élevage avicole, une épidémie peut dévisser un cheptel entier en 48 heures. La vaccination méthodique est l'unique bouclier. Ce cours passe en revue la préparation de l'eau de boisson sans chlore avec du lait écumé en poudre pour protéger la souche vaccinale vivante.`,
        resources: [
          {
            id: 'res-elev-3-pdf',
            title: 'Planning Mural de Vaccination et Prophylaxie Volaille',
            filename: 'Calendrier_Vaccination_Volaille.pdf',
            type: 'pdf',
            fileSize: '2.9 MB',
            description: 'Calendrier officiel à afficher au poulailler : Newcastle, Gumboro, Bronchite, Variole.',
            contentMarkdown: `# CALENDRIER SANITAIRE OFFICEL AGROLEARN (POULET DE CHAIR)

- **Jour 1** : Vaccin HB1 / Newcastle + Gumboro (Goutte à l'œil) + Anti-stress
- **Jour 7** : Vaccin Gumboro Rappel (Eau de boisson + 2g/L Lait écumé)
- **Jour 14** : Vaccin Newcastle Lasota + Gumboro 2ème rappel
- **Jour 18 à 21** : Traitement préventif Coccidiose (Amprolium pendant 3 jours)
- **Jour 28** : Rappel Newcastle Lasota + Complexe Polyvitaminé`
          },
          {
            id: 'res-elev-3-png',
            title: 'Guide Visuel de Diagnostic Rapide des Symptômes',
            filename: 'Guide_Symptomes_Maladies.png',
            type: 'png',
            fileSize: '1.9 MB',
            description: 'Poster comparatif : Fientes blanches (Salmonellose), Fientes sanglantes (Coccidiose), Diarrhée verte (Newcastle).',
            imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Quelle est la densité maximale recommandée pour des poulets de chair en finition par m² ?',
        options: ['50 poulets / m²', '10 à 12 poulets / m²', '2 poulets / m²', '100 poulets / m²'],
        correctAnswer: 1,
        explanation: 'En zone tropicale avec ventilation naturelle, la densité maximale en période de finition est de 10 à 12 sujets par m².'
      },
      {
        id: 2,
        question: 'Quel composant représente la source principale d\'énergie dans la provende volaille ?',
        options: ['Le Maïs jaune', 'Le sel de cuisine', 'Les coquilles d\'huîtres', 'L\'eau pure'],
        correctAnswer: 0,
        explanation: 'Le maïs représente entre 60% et 68% de la formule d\'aliment et fournit l\'énergie métabolisable essentielle.'
      },
      {
        id: 3,
        question: 'Pourquoi ajoute-t-on du lait écumé en poudre dans l\'eau lors d\'une vaccination vaccinale ?',
        options: ['Pour que l\'aliment sente bon', 'Pour neutraliser les métaux lourds/chlore et protéger le vaccin vivant', 'Pour engraisser les volailles', 'Pour faire dormir les poussins'],
        correctAnswer: 1,
        explanation: 'Le lait écumé (2g par litre d\'eau) fixe le chlore et protège la viabilité du virus vaccinal vivant.'
      }
    ]
  },
  {
    id: 'pisciculture',
    title: 'Pisciculture (Tilapias & Clarias)',
    shortTitle: 'Pisciculture',
    icon: 'Fish',
    color: 'sky',
    bgLight: 'bg-sky-50 text-sky-800 border-sky-200',
    borderColor: 'border-sky-500',
    description: 'Construction de bassins hors-sol, reproduction artificielle du Clarias gariepinus et calibrage des granulés.',
    certificateTitle: 'Spécialisation en Pisciculture Intensive & Reproduction d\'Alevins',
    modules: [
      {
        id: 'pisci-m1',
        domainId: 'pisciculture',
        moduleNumber: 1,
        title: 'Aménagement des Bassins et Qualité de l\'Eau',
        description: 'Construction de bassins hors-sol (bac bâche PVC) et gestion des paramètres physico-chimiques de l\'eau.',
        videoDuration: '24 min',
        videoDurationSeconds: 1440,
        videoUrl: 'https://www.youtube.com/embed/qoba9ZK5tKo',
        videoPoster: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=1000&q=80',
        videoChapters: [
          { time: '00:00', label: 'Avantages des bacs hors-sol bâche PVC' },
          { time: '05:20', label: 'Dimensionnement des bacs 10m³ et tuyauterie Moine' },
          { time: '10:45', label: 'Contrôle du pH (6.5 à 8.5) et de l\'Oxygène dissous' },
          { time: '16:30', label: 'Gestion des nitrites et de l\'ammoniac par renouvellement' },
          { time: '20:15', label: 'Test du disque de Secchi pour la transparence' },
        ],
        transcript: `L'eau est le milieu de vie unique du poisson. En pisciculture intensive, 90% des mortalités découlent d'une baisse dramatique de l'oxygène dissous ou d'un pic d'ammoniac toxique émis par les excréments. Dans ce module, nous construisons un bassin hors-sol en structure métallique plastifiée de 10.000 Litres.`,
        resources: [
          {
            id: 'res-pisci-1-pdf',
            title: 'Guide des Paramètres de Qualité de l\'Eau',
            filename: 'Guide_Parametres_Eau_pH_Oxygene.pdf',
            type: 'pdf',
            fileSize: '3.8 MB',
            description: 'Seuils critiques et actions correctives pour la température, le pH, l\'oxygène et le nitrite.',
            contentMarkdown: `# MANUEL DE GESTION DE LA QUALITÉ DE L'EAU EN PISCICULTURE

## 1. Plages Idéales pour le Clarias et le Tilapia
- **Température** : 26°C à 30°C (En dessous de 22°C, arrêt d'alimentation).
- **pH de l'eau** : 6.5 à 8.2 (Si pH < 6.0, appliquer de la chaux agricole CaCO3).
- **Oxygène Dissous** : > 4.5 mg/L (Si < 2 mg/L, risque d'asphyxie, mise en route des aérateurs).
- **Ammoniac toxique (NH3)** : < 0.05 mg/L (Renouvellement d'eau de 30% immédiat si hausse).
- **Transparence Disque de Secchi** : 25 cm à 35 cm.`
          },
          {
            id: 'res-pisci-1-png',
            title: 'Plan d\'Assemblage Bassin Hors-Sol PVC 10m³',
            filename: 'Plan_Bassin_Hors_Sol.png',
            type: 'png',
            fileSize: '2.2 MB',
            description: 'Schéma de montage de la structure tubulaire, passe-paroi et vidange de fond.',
            imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80'
          }
        ]
      },
      {
        id: 'pisci-m2',
        domainId: 'pisciculture',
        moduleNumber: 2,
        title: 'Reproduction et Gestion des Alevins',
        description: 'Protocole complet d\'injection hormonale (Ovaprim), de fertilisation et d\'incubation des œufs de Clarias.',
        videoDuration: '30 min',
        videoDurationSeconds: 1800,
        videoUrl: 'https://www.youtube.com/embed/qoba9ZK5tKo',
        videoPoster: 'https://images.unsplash.com/photo-1508873696983-2df5057a225b?auto=format&fit=crop&w=1000&q=80',
        videoChapters: [
          { time: '00:00', label: 'Sélection des géniteurs mâle et femelle' },
          { time: '06:15', label: 'Calcul et injection d\'Ovaprim (0.5 ml / kg)' },
          { time: '12:00', label: 'Temps de latence selon la température de l\'eau' },
          { time: '17:30', label: 'Stripping des œufs & prélèvement des laitance' },
          { time: '23:00', label: 'Mise en incubation sur grille Kakaban' },
          { time: '27:10', label: 'Alimentation des larves aux nauplii d\'artémie' },
        ],
        transcript: `La reproduction artificielle du Clarias gariepinus (Poisson-Chat africain) est l'une des activités les plus rentables en agrobusiness. À partir de 2 géniteurs bien conditionnés, vous pouvez produire 30.000 à 50.000 alevins viables par cycle. Suivez pas à pas la technique du stripping.`,
        resources: [
          {
            id: 'res-pisci-2-pdf',
            title: 'Protocole de Reproduction Artificielle du Clarias',
            filename: 'Protocole_Reproduction_Clarias.pdf',
            type: 'pdf',
            fileSize: '4.8 MB',
            description: 'Guide technique étape par étape : dosage hormone, stripping, fécondation et éclosion.',
            contentMarkdown: `# PROTOCOLE DE REPRODUCTION ARTIFICIELLE DU CLARIAS GARIEPINUS

## Étape 1 : Sélection des Géniteurs
- Femelle : Poids minimum 1.5 kg, abdomen très rebondi et souple, papille génitale rougeâtre.
- Mâle : Poids 1.5 - 2.0 kg, papille génitale allongé et pointue.

## Étape 2 : Injection Hormonale d'Ovaprim
- Dosage : 0.5 mL d'Ovaprim par Kilogramme de femelle.
- Angle d'injection : Intramusculaire à 45° sous la nageoire dorsale.
- Latence : 10 heures à 28°C d'eau.

## Étape 3 : Fécondation et Incubation
- Extraire délicatement les œufs dans un récipient plastique sec.
- Prélever les testicules du mâle sacrifié, inciser et répandre la laitance sur les œufs.
- Ajouter une solution saline 0.9% et mélanger avec une plume d'oiseau propre pendant 1 minute.
- Étalage sur kakaban en bac d'incubation sous courant d'eau oxygéné. Éclosion en 24h à 28°C.`
          },
          {
            id: 'res-pisci-2-docx',
            title: 'Registre de Suivi d\'Alevinage et Taux de Mortalité',
            filename: 'Registre_Suivi_Alevinage.docx',
            type: 'docx',
            fileSize: '460 KB',
            description: 'Tableau de bord de suivi du tri des alevins (Grosseur), du calibrage et de la mortalité.',
            contentMarkdown: `REGISTRE DE SUIVI ÉCLOSERIE / ALEVINAGE

Lot N°: _____ Date Fécondation: ___________

- Jour 1 (Éclosion) : Estimation larves nageuses : __________
- Jour 3 à 10 (Aliment Artemia) : 6 repas / jour
- Jour 14 (Premier tri de taille) :
  * Séparation des "Cannibales" (gros sujets) pour éviter le massacre des petits.
  * Taux de survie cible : > 65%`
          }
        ]
      },
      {
        id: 'pisci-m3',
        domainId: 'pisciculture',
        moduleNumber: 3,
        title: 'Alimentation, Grossissement et Récolte',
        description: 'Tailles des granulés selon le poids des poissons, taux de rationnement et récolte optimisée.',
        videoDuration: '18 min',
        videoDurationSeconds: 1080,
        videoUrl: 'https://www.youtube.com/embed/qoba9ZK5tKo',
        videoPoster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
        videoChapters: [
          { time: '00:00', label: 'Calibrage de la taille des granulés (0.5mm à 6mm)' },
          { time: '04:15', label: 'Taux de rationnement en % de la biomasse' },
          { time: '08:50', label: 'Fréquence de nourrissage et comportement alimentaire' },
          { time: '13:00', label: 'Jeûne de 24h avant récolte pour purge digestive' },
          { time: '16:00', label: 'Techniques de pêche et conditionnement vivant' },
        ],
        transcript: `Pour passer d'un alevin de 5g à un poisson marchand de 1 kg en 5 mois, la gestion de la ration journalière basée sur le poids vif cumulé (Biomasse) est impérative. Donner trop d'aliment pollue le bassin ; pas assez provoque le cannibalisme chez le Clarias.`,
        resources: [
          {
            id: 'res-pisci-3-pdf',
            title: 'Tableau de Calibrage des Granulés et Taux de Ration',
            filename: 'Tableau_Calibrage_Granules.pdf',
            type: 'pdf',
            fileSize: '3.1 MB',
            description: 'Guide officiel des tailles de granulés (0.5mm à 6mm) et % de protéine recommandé.',
            contentMarkdown: `# TABLEAU OFFICIEL DE NOURRISSAGE CLARIAS & TILAPIA

- **Poids < 2g** : Granulés Poudre / 0.8mm | 50% Protéine | 10% de la Biomasse / jour
- **Poids 2g à 10g** : Granulés 1.2mm - 1.5mm | 45% Protéine | 7% de la Biomasse / jour
- **Poids 10g à 50g** : Granulés 2.0mm | 42% Protéine | 5% de la Biomasse / jour
- **Poids 50g à 200g** : Granulés 3.0mm | 40% Protéine | 3.5% de la Biomasse / jour
- **Poids > 200g** : Granulés 4.0mm à 6.0mm | 35% Protéine | 2% de la Biomasse / jour`
          },
          {
            id: 'res-pisci-3-docx',
            title: 'Fiche Technique de Récolte et Vente',
            filename: 'Fiche_Technique_Peche.docx',
            type: 'docx',
            fileSize: '390 KB',
            description: 'Bonnes pratiques de vidange partielle, capture au filet et pesée marchande.',
            contentMarkdown: `FICHE PROTOCOLE DE PÊCHE ET CONDITIONNEMENT

1. PRÉPARATION J-1
   - Arrêt complet du nourrissage 24 heures avant la pêche (vide le tube digestif, évite la dégradation de l'eau dans les bacs de transport).

2. OPÉRATION DE DÉSENCOMBREMENT
   - Abaissement du niveau d'eau à 30 cm.
   - Pêche douce au filet de senne à mailles 20mm sans bousculer les poissons.
   - Tri par catégorie de poids :
     * Calibre A (Marchand) : > 1.0 kg
     * Calibre B : 600g à 900g
     * Calibre C : < 500g`
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Quel est le taux minimal d\'oxygène dissous recommandé dans un bassin piscicole ?',
        options: ['0.1 mg/L', '> 4.5 mg/L', '100 mg/L', '0 mg/L'],
        correctAnswer: 1,
        explanation: 'Un niveau d\'oxygène supérieur à 4.5 mg/L garantit une bonne digestion et évite le stress asphyxique chez les poissons.'
      },
      {
        id: 2,
        question: 'Quelle est la dose d\'hormone Ovaprim injectée par kilogramme de femelle Clarias ?',
        options: ['10 mL / kg', '0.5 mL / kg', '1 Litre / kg', 'Aucune injection'],
        correctAnswer: 1,
        explanation: 'Le dosage standard d\'Ovaprim est de 0.5 mL par kg de masse corporelle de la génitrice femelle.'
      },
      {
        id: 3,
        question: 'Pourquoi faut-il stopper l\'alimentation 24 heures avant la récolte des poissons ?',
        options: ['Pour punir les poissons', 'Pour vider le tube digestif et éviter la détérioration de la chair et de l\'eau de transport', 'Pour les faire grandir', 'Parce qu\'il n\'y a plus de nourriture'],
        correctAnswer: 1,
        explanation: 'Le jeûne de 24h purge le canal digestif, préserve la fraîcheur de la chair et évite la salissure de l\'eau pendant le transport vivant.'
      }
    ]
  },
  {
    id: 'entrepreneuriat',
    title: 'Entrepreneuriat Agrobusiness',
    shortTitle: 'Agrobusiness',
    icon: 'Briefcase',
    color: 'purple',
    bgLight: 'bg-purple-50 text-purple-800 border-purple-200',
    borderColor: 'border-purple-500',
    description: 'Business Model Canvas agricole, gestion financière, calcul du coût de revient et vente via WhatsApp et le marketing digital.',
    certificateTitle: 'Spécialisation en Agrobusiness & Gestion d\'Exploitation',
    modules: [
      {
        id: 'entre-m1',
        domainId: 'entrepreneuriat',
        moduleNumber: 1,
        title: 'Business Model Canvas (BMC) Agricole',
        description: 'Structurez un projet agropastoral rentable en 9 étapes adaptées aux réalités du marché africain.',
        videoDuration: '20 min',
        videoDurationSeconds: 1200,
        videoUrl: 'https://www.youtube.com/embed/qoba9ZK5tKo',
        videoPoster: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
        videoChapters: [
          { time: '00:00', label: 'Pourquoi 80% des projets agricoles échouent sans stratégie' },
          { time: '04:20', label: 'Les 9 blocs du BMC appliqué à la ferme' },
          { time: '09:10', label: 'Définir une proposition de valeur unique (Bio, Frais, Traçable)' },
          { time: '14:00', label: 'Cartographie des segments clients (Ménages vs Restos)' },
          { time: '17:30', label: 'Structure des coûts et flux de revenus' },
        ],
        transcript: `L'agriculture n'est pas seulement un travail de terre, c'est une entreprise commerciale. Le Business Model Canvas Agricole est une carte synthétique sur une seule page qui clarifie votre modèle d'affaire avant d'investir le moindre franc.`,
        resources: [
          {
            id: 'res-entre-1-docx',
            title: 'Template Modifiable Business Model Canvas Agricole',
            filename: 'Template_Business_Model_Canvas.docx',
            type: 'docx',
            fileSize: '480 KB',
            description: 'Matrice BMC Word/Excel pré-formatée avec questions guides pour chaque case.',
            contentMarkdown: `TEMPLATE BUSINESS MODEL CANVAS AGRICOLE (AGROLEARN)

1. PROPOSITION DE VALEUR
   - Légumes maraîchers sans pesticides chimiques livrés en 24h.
   - Poulets de chair sains et calibrés prêts à cuire.

2. SEGMENTS CLIENTS
   - Ménages urbains soucieux de la santé.
   - Hôtels, Restaurants, Maquis et Traiteurs.
   - Revendeuses des marchés locaux.

3. CANAUX DE DISTRIBUTION
   - Boutique physique à la ferme + Page WhatsApp Business + Vente directe au marché.`
          },
          {
            id: 'res-entre-1-pdf',
            title: 'Exemple Rempli BMC Ferme Avicole & Piscicole',
            filename: 'Exemple_BMC_Ferme_Avicole.pdf',
            type: 'pdf',
            fileSize: '3.2 MB',
            description: 'Exemple réel d\'une exploitation intégrée rentable avec chiffrages.',
            contentMarkdown: `# EXEMPLE ÉTUDE DE CAS : FERME AGRICOLE "AGRO-PLUS"

- **Investissement initial** : 2 500 000 FCFA
- **Capacité** : 1 000 Poulets de chair / vague + 2 000 Poissons Clarias
- **Chiffre d'Affaire prévisionnel par Vague (6 semaines)** : 4 200 000 FCFA
- **Marge Nette Cible** : 35%`
          }
        ]
      },
      {
        id: 'entre-m2',
        domainId: 'entrepreneuriat',
        moduleNumber: 2,
        title: 'Gestion Financière et Comptabilité Simplifiée',
        description: 'Gérer son trésorerie, calculer son coût de revient unitaire et fixer des prix de vente très rentables.',
        videoDuration: '28 min',
        videoDurationSeconds: 1680,
        videoUrl: 'https://www.youtube.com/embed/qoba9ZK5tKo',
        videoPoster: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
        videoChapters: [
          { time: '00:00', label: 'Séparer l\'argent de la poche de celui de la ferme' },
          { time: '05:30', label: 'Charges Fixes vs Charges Variables' },
          { time: '12:00', label: 'Calcul exact du coût de revient unitaire' },
          { time: '19:40', label: 'Détermination du prix de vente et marge bénéficiaire' },
          { time: '24:15', label: 'Tenue du journal des recettes et dépenses' },
        ],
        transcript: `L'erreur classique de l'agropreneur est de confondre la recette de vente avec le bénéfice. Si vous vendez un poulet à 3000 FCFA mais qu'il vous a coûté 2600 FCFA en poussins, aliment, vaccins et électricité, votre vrai bénéfice n'est que de 400 FCFA. Nous calculons ici votre Seuil de Rentabilité.`,
        resources: [
          {
            id: 'res-entre-2-docx',
            title: 'Cahier de Journal des Recettes et Dépenses',
            filename: 'Cahier_Recettes_Depenses.docx',
            type: 'docx',
            fileSize: '410 KB',
            description: 'Modèle de registre de trésorerie quotidien pour suivre les entrées et sorties de caisse.',
            contentMarkdown: `REGISTRE SIMPLIFIÉ DE TRÉSORERIE DE LA FERME

Date | Libellé Opération | Categorie | Dépense (-) | Recette (+) | Solde Caisse
-----------------------------------------------------------------------------
01/08 | Achat 500 Poussins | Intrants | 225 000 | - | 775 000
05/08 | Achat 10 sacs Provende | Aliment | 180 000 | - | 595 000
20/09 | Vente 100 Poulets à M. K. | Vente | - | 320 000 | 915 000`
          },
          {
            id: 'res-entre-2-pdf',
            title: 'Guide de Calcul de la Marge & Seuil de Rentabilité',
            filename: 'Calculateur_Marge_Rentabilite.pdf',
            type: 'pdf',
            fileSize: '2.7 MB',
            description: 'Formules financières simples et exemples pratiques de calcul de seuil de rentabilité.',
            contentMarkdown: `# FORMULES DE CALCUL FINANCIER AGROBUSINESS

## 1. Coût de Revient Unitaire (CRU)
CRU = (Somme des Dépenses Aliment + Poussins/Alevins + Santé + Énergie + Main d'œuvre + Amortissements) / Nombre de Produits Vondables

## 2. Taux de Marge (%)
Taux de Marge = ((Prix de Vente Unitaire - CRU) / CRU) * 100

## 3. Seuil de Rentabilité en Volume
Seuil (Unités) = Charges Fixes Totales / (Prix de Vente Unitaire - Coût Variable Unitaire)`
          }
        ]
      },
      {
        id: 'entre-m3',
        domainId: 'entrepreneuriat',
        moduleNumber: 3,
        title: 'Marketing et Vente des Produits Agricoles',
        description: 'Stratégie de précommande, vente directe via WhatsApp Business et visuels attractifs Canva.',
        videoDuration: '22 min',
        videoDurationSeconds: 1320,
        videoUrl: 'https://www.youtube.com/embed/qoba9ZK5tKo',
        videoPoster: 'https://images.unsplash.com/photo-1556742049-0a67daf64f22?auto=format&fit=crop&w=1000&q=80',
        videoChapters: [
          { time: '00:00', label: 'Principe d\'or: Vendre avant de produire' },
          { time: '04:40', label: 'Configuration efficace de WhatsApp Business' },
          { time: '10:15', label: 'Techniques de Storytelling agricole (Montrer la vie de la ferme)' },
          { time: '15:50', label: 'Offres groupées et fidélisation des maquis/restaurants' },
          { time: '19:30', label: 'Affiches et promotions de fêtes' },
        ],
        transcript: `Ne attendez pas la maturité de vos poulets ou légumes pour chercher des acheteurs ! La stratégie de précommande avec acompte de 30% sécurise votre trésorerie et élimine le risque d'impayés. WhatsApp Business est votre canal commercial N°1.`,
        resources: [
          {
            id: 'res-entre-3-pdf',
            title: 'Guide Strategique Vente sur WhatsApp & Réseaux Sociaux',
            filename: 'Guide_Vente_Sur_WhatsApp_Social.pdf',
            type: 'pdf',
            fileSize: '3.6 MB',
            description: 'Scripts de vente textuels, réponses automatiques et calendrier de publications.',
            contentMarkdown: `# SCRIPT DE VENTE WHATSAPP BUSINESS POUR L'AGROPASTORAL

## Message d'Accueil Automatique :
"Bonjour ! Bienvenue chez Agro-Ferme. 🌿 🐔 🐟
Découvrez nos produits frais du jour :
1. Poulets de chair nettoyés prêts à cuire (2.2kg) : 3 200 FCFA
2. Poissons Clarias frais ou fumés au bois d'agrumes : 2 800 FCFA / kg
3. Piments frais & Tomates : Paniers de 5 000 FCFA

Répondez par 1, 2 ou 3 pour réserver votre livraison !"

## Technique du Teasing 15 jours avant la Pêche :
Postez quotidiennement des vidéos de pesée des poissons en statut avec la phrase : "Plus que 100 kg disponibles pour la récolte du Samedi !"`
          },
          {
            id: 'res-entre-3-png',
            title: 'Modèles d\'Affiches Publicitaires Promotionnelles',
            filename: 'Modeles_Affiches_Publicitaires.png',
            type: 'png',
            fileSize: '2.5 MB',
            description: 'Templates d\'affiches carrées pour statut WhatsApp et Facebook.',
            imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'Combien de blocs principaux compose le Business Model Canvas (BMC) ?',
        options: ['3 blocs', '9 blocs', '50 blocs', '1 seul bloc'],
        correctAnswer: 1,
        explanation: 'Le Business Model Canvas regroupe 9 blocs stratégiques fondamentaux pour analyser une entreprise.'
      },
      {
        id: 2,
        question: 'Comment calcule-t-on le coût de revient unitaire d\'un produit agricole ?',
        options: ['En devinant au hasard', 'En divisant la somme totale des charges par le nombre de produits vendables obtenus', 'En multipliant le prix par 10', 'En enlevant les taxes'],
        correctAnswer: 1,
        explanation: 'Le coût de revient est égal au Total des dépenses (Fixes + Variables) divisé par la Quantité totale produite vendable.'
      },
      {
        id: 3,
        question: 'Quelle est la meilleure stratégie pour éviter le risque de surstockage et d\'impayés ?',
        options: ['Attendre la récolte pour chercher des clients', 'Mettre en place la vente en précommande avec acomptes 15 jours avant la récolte', 'Rendre les produits gratuits', 'Fermer la ferme'],
        correctAnswer: 1,
        explanation: 'La vente en précommande sécurise les débouchés commerciaux et encaisse de la trésorerie avant même le jour de livraison.'
      }
    ]
  }
];

export const DOMAINS_DATA: DomainData[] = RAW_DOMAINS_DATA.map((domain) => ({
  ...domain,
  modules: domain.modules.map((module) => ({
    ...module,
    resources: ALL_MODULE_RESOURCES[module.id] || module.resources,
  })),
}));

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Dr. Jean-Marc KOUASSI',
    role: 'Docteur Vétérinaire & Expert Avicole',
    domainId: 'elevage',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    badge: 'Expert Certifié',
    rating: 4.9,
    location: 'Yamoussoukro / Abidjan',
    bio: '15 ans d\'expérience dans le suivi sanitaire des grands cheptels avicoles et cunicoles.',
    online: true
  },
  {
    id: 'm2',
    name: 'Ing. Aminata DIALLO',
    role: 'Ingénieure Agronome Spécialiste Maraîchage',
    domainId: 'agriculture',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    badge: 'Ingénieur Agronome',
    rating: 4.95,
    location: 'Dakar / Thiès',
    bio: 'Spécialiste de la permaculture tropicale, irrigation goutte-à-goutte et biopesticides au Neem.',
    online: true
  },
  {
    id: 'm3',
    name: 'M. Paulin TOGBÉ',
    role: 'Mître Pisciculteur & Écloserie Clarias',
    domainId: 'pisciculture',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    badge: 'Expert Certifié',
    rating: 4.88,
    location: 'Cotonou / Porto-Novo',
    bio: 'Pionnier de la reproduction artificielle assistée du Clarias gariepinus en bacs bâche PVC.',
    online: false
  },
  {
    id: 'm4',
    name: 'Mme Grace BONY',
    role: 'Consultante Agrobusiness & Finance Rurale',
    domainId: 'entrepreneuriat',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    badge: 'Expert Certifié',
    rating: 4.92,
    location: 'Douala / Yaoundé',
    bio: 'Accompagne les fermes agropastorales dans leur structuration financière et levée de fonds.',
    online: true
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    authorName: 'Sékou Traoré',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    domainId: 'agriculture',
    title: 'Feuilles de tomates qui jaunissent et se recroquevillent',
    content: 'Bonjour à la communauté AgroLearn ! J\'ai planté 500 pieds de tomates Cobra. Depuis 3 jours, les jeunes feuilles du haut jaunissent. Est-ce un manque d\'azote ou le virus du TYLCV ? Quelle recette biopesticide appliquer ?',
    timestamp: 'Il y a 2 heures',
    likes: 12,
    repliesCount: 4,
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb1b7a5?auto=format&fit=crop&w=600&q=80',
    hasExpertReply: true
  },
  {
    id: 'post-2',
    authorName: 'Chantal Koffi',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
    domainId: 'elevage',
    title: 'Consommation d\'eau anormale sur mes poussins de J10',
    content: 'Mes poussins de 10 jours consomment le double du tableau habituel. La litière commence à devenir humide. Faut-il ajouter de la chaux sous les copeaux ?',
    timestamp: 'Il y a 5 heures',
    likes: 8,
    repliesCount: 3,
    hasExpertReply: true
  },
  {
    id: 'post-3',
    authorName: 'Moussa Ndiaye',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
    domainId: 'pisciculture',
    title: 'Éclosion de Clarias réussie à 80% grâce au Module 2 !',
    content: 'Un grand merci à AgroLearn ! J\'ai suivi la méthode d\'injection Ovaprim à 0.5ml/kg et le système de grille Kakaban. Résultat : plus de 25 000 alevins vigoureux !',
    timestamp: 'Hier à 18:30',
    likes: 34,
    repliesCount: 7,
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5057a225b?auto=format&fit=crop&w=600&q=80',
    hasExpertReply: true
  }
];
