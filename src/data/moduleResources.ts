import { ResourceItem } from '../types';

export const ALL_MODULE_RESOURCES: Record<string, ResourceItem[]> = {
  'agri-m1': [
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

1. TEST DE TEXTURE DU BOCAL (24h de repos dans l'eau)
   - % Sable : ______ %
   - % Limon : ______ %
   - % Argile : ______ %
2. TEST D'ACIDITÉ & pH ÉCONOMIQUE
3. ÉVALUATION BIOLOGIQUE DES VERS DE TERRE`
    },
    {
      id: 'res-agri-1-xlsx',
      title: 'Calculateur Excel des Proportions Azote/Carbone (C/N)',
      filename: 'Calculateur_Proportions_Compost.xlsx',
      type: 'xlsx',
      fileSize: '620 KB',
      description: 'Tableur interactif pour entrer le volume de paille et fientes et obtenir le ratio C/N exact.',
      contentMarkdown: `TABLEUR INTERACTIF - DOSAGE DU COMPOST
Calcul automatique du ratio C/N optimal (28:1).`
    },
    {
      id: 'res-agri-1-pptx',
      title: 'Présentation PowerPoint : La Vie Microbienne du Sol',
      filename: 'Microbiologie_Du_Sol.pptx',
      type: 'pptx',
      fileSize: '5.1 MB',
      description: 'Diaporama complet de formation sur les bactéries aérobies, mycorhizes et vers de terre.',
      contentMarkdown: `DIAPORAMA DE FORMATION : LA SANTÉ DES SOLS
Slide 1: Bactéries aérobies & température du compost.
Slide 2: Rôle des champignons mycorhiziens.`
    },
    {
      id: 'res-agri-1-pdf2',
      title: 'Guide Technique : Correction du pH par Chaulage Organique',
      filename: 'Correction_pH_Sols_Acides.pdf',
      type: 'pdf',
      fileSize: '3.2 MB',
      description: 'Techniques d\'amendement à base de cendres de bois et dolomie pour stabiliser les sols tropicaux.',
      contentMarkdown: `# AMENDEMENT DES SOLS ACIDES
- Appliquer 150g/m² de cendres de bois tamisées pour corriger un pH < 5.5.`
    },
    {
      id: 'res-agri-1-mp3',
      title: 'Podcast Audio : Les Secrets du Compost Chaud Réussi',
      filename: 'Podcast_Compostage_Express.mp3',
      type: 'mp3',
      fileSize: '6.8 MB',
      description: 'Émission audio de 8 minutes résumant les erreurs fréquentes des maraîchers débutants.',
      contentMarkdown: `🎙️ PODCAST AGROLEARN : LES ERREURS DU COMPOSTAGE EN ZONE CHAUDE
Durée : 8 min 15s. Conseils pratiques de terrain.`
    },
    {
      id: 'res-agri-1-pdf3',
      title: 'Manuel de Laboratoire : Dosage de l\'Humus et Azote Total',
      filename: 'Manuel_Laboratoire_Humus.pdf',
      type: 'pdf',
      fileSize: '4.1 MB',
      description: 'Protocole pour mesurer le pourcentage d\'humus et la capacité d\'échange cationique (CEC).',
      contentMarkdown: `# PROTOCOLE DE LABORATOIRE TERRAIN
Mesure simplifiée de la Capacité d'Échange Cationique (CEC).`
    }
  ],

  'agri-m2': [
    {
      id: 'res-agri-2-pdf',
      title: 'Plans d\'Aménagement Goutte-à-Goutte Basse Pression',
      filename: 'Plan_Installation_Goutte_A_Goutte.pdf',
      type: 'pdf',
      fileSize: '3.1 MB',
      description: 'Schéma technique avec diamètre des tuyaux, vannes de secteur et filtres à disque.',
      contentMarkdown: `# PLANS D'INSTALLATION GOUTTE-À-GOUTTE BASSE PRESSION
## 1. Composants du Système
- Réservoir surélevé IBC 1000L à 1.80m de hauteur.
- Filtre à disque 120 mesh.
- Tuyaux PE Ø 32mm & gaines Ø 16mm.`
    },
    {
      id: 'res-agri-2-docx',
      title: 'Calculateur Automatique des Besoins en Eau',
      filename: 'Calculateur_Besoins_Eau.docx',
      type: 'docx',
      fileSize: '380 KB',
      description: 'Outil de dimensionnement de la cuve et du temps d\'arrosage selon la surface cultivée.',
      contentMarkdown: `CALCULATEUR DE BESOINS EN EAU
Formule : Temps (h) = (Plants x Besoins Litres) / (Goutteurs x Débit L/h)`
    },
    {
      id: 'res-agri-2-pdf2',
      title: 'Fiche Technique de Maintenance des Pompes & Filtres Solairement Alimentés',
      filename: 'Fiche_Maintenance_Pompes_Filtres.pdf',
      type: 'pdf',
      fileSize: '1.9 MB',
      description: 'Procédure pas-à-pas pour le nettoyage des filtres à disque et l\'entretien de la crépine.',
      contentMarkdown: `# MAINTENANCE DU SYSTÈME D'IRRIGATION
1. Nettoyage hebdomadaire du filtre à disque.
2. Purge bi-mensuelle des lignes goutte-à-goutte.`
    },
    {
      id: 'res-agri-2-xlsx',
      title: 'Tableur Excel : Calculateur de Débit par Goutteur & Pression Hydrostatique',
      filename: 'Calculateur_Pression_Debit_Irrigation.xlsx',
      type: 'xlsx',
      fileSize: '540 KB',
      description: 'Calcul automatique des pertes de charge en fonction de la longueur de la parcelle.',
      contentMarkdown: `TABLEUR EXCEL - HYDRAULIQUE MARAÎCHÈRE
Calcul de la hauteur minimale de cuve pour maintenir 0.2 bar.`
    },
    {
      id: 'res-agri-2-png',
      title: 'Diagramme HD : Montage du Filtre à Disque 120 Mesh',
      filename: 'Diagramme_Filtre_Disque.png',
      type: 'png',
      fileSize: '2.1 MB',
      description: 'Vue éclatée du corps de filtre avec vanne de purge rapide.',
      imageUrl: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'res-agri-2-pptx',
      title: 'Présentation PPTX : Hydraulique Agricole & Choix des Tuyaux PE',
      filename: 'Hydraulique_Agricole_Tuyaux_PE.pptx',
      type: 'pptx',
      fileSize: '4.8 MB',
      description: 'Support de cours de 25 diapositives sur la régulation de pression et les vannes.',
      contentMarkdown: `DIAPORAMA : DISSIPATION DE PRESSION ET CHOIX DU MATÉRIEL
Comparatif entre gaine souple perforée et tuyau rigide goutteur intégré.`
    },
    {
      id: 'res-agri-2-mp3',
      title: 'Cours Audio MP3 : Entretien et Détartrage des Micro-Goutteurs',
      filename: 'Cours_Audio_Detartrage_Goutteurs.mp3',
      type: 'mp3',
      fileSize: '5.2 MB',
      description: 'Méthode naturelle au vinaigre et jus de citron pour déboucher les goutteurs entartrés.',
      contentMarkdown: `🎙️ COURS AUDIO : DÉBOUCHAGE DES GOUTTEURS SANS PRODUITS CHIMIQUES
Durée : 6 minutes.`
    },
    {
      id: 'res-agri-2-pdf3',
      title: 'Manuel PDF : Pompes Submersibles Solaires DC 12V/24V',
      filename: 'Manuel_Pompes_Solaires_DC.pdf',
      type: 'pdf',
      fileSize: '3.7 MB',
      description: 'Schéma de raccordement direct panneau photovoltaïque sans batterie.',
      contentMarkdown: `# POMPAGE SOLAIRE DIRECT
Dimensionnement du panneau solaire 200W pour pompe 24V.`
    }
  ],

  'agri-m3': [
    {
      id: 'res-agri-3-pdf',
      title: 'Fiches Recettes des Biopesticides Naturels',
      filename: 'Recettes_Biopesticides.pdf',
      type: 'pdf',
      fileSize: '2.8 MB',
      description: 'Recettes homologuées : Extrait de Neem, Purin d\'Ortie/Tithonia, Macération Piment-Ail.',
      contentMarkdown: `# FICHES RECETTES DE BIOPESTICIDES HOMOLOGUÉS
## Recette 1 : Extrait Neem & Piment (500g Neem + 100g Piment + 50g Savon noir / 10L).`
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
      contentMarkdown: `🎙️ GUIDE AUDIO SUR LE TERRAIN : FABRICATION DU BIOPESTICIDE AU NEEM`
    },
    {
      id: 'res-agri-3-docx',
      title: 'Grille DOCX : Dépouillement des Attaques Foliaires sur Piment & Tomate',
      filename: 'Grille_Suivi_Ravageurs.docx',
      type: 'docx',
      fileSize: '320 KB',
      description: 'Fiche d\'observation hebdomadaire du taux d\'infestation par mètre carré.',
      contentMarkdown: `GRILLE DE DEPOUILLEMENT DE SANTE VEGETALE
Notez de 0 à 3 l'intensité des attaques de pucerons ou Tuta absoluta.`
    },
    {
      id: 'res-agri-3-xlsx',
      title: 'Calendrier XLSX : Traitements Préventifs & Curatifs Biologiques',
      filename: 'Planning_Traitements_Bio.xlsx',
      type: 'xlsx',
      fileSize: '490 KB',
      description: 'Planning automatique des jours de pulvérisation en fonction des pluies.',
      contentMarkdown: `PLANNING DE PULVÉRISATION BIO
Programmation des extraits de Neem et fongicides au bicarbonate.`
    },
    {
      id: 'res-agri-3-pdf2',
      title: 'Manuel PDF : Fabrication des Biofongicides au Bicarbonate et Lait',
      filename: 'Manuel_Biofongicides_Mildiou.pdf',
      type: 'pdf',
      fileSize: '2.9 MB',
      description: 'Protection naturelle contre le mildiou, l\'oïdium et la bactériose.',
      contentMarkdown: `# LUTTE CONTRE LE MILDIOU ET L'OÏDIUM
- 10g Bicarbonate + 1 cuillère d'huile dans 1L d'eau.`
    },
    {
      id: 'res-agri-3-pptx',
      title: 'Diaporama PPTX : Lutte Intégrée contre Tuta Absoluta et Pucerons',
      filename: 'Lutte_Integree_Tuta_Absoluta.pptx',
      type: 'pptx',
      fileSize: '6.2 MB',
      description: 'Utilisation des pièges à phéromones et bandes jaunes gluantes.',
      contentMarkdown: `DIAPORAMA : LUTTE INTÉGRÉE (IPM)
Combinaison de barrières physiques et biopesticides.`
    },
    {
      id: 'res-agri-3-pdf3',
      title: 'Fiche PDF : Consignes de Sécurité des Applicateurs de Biopesticides',
      filename: 'Consignes_Securite_Applicateurs.pdf',
      type: 'pdf',
      fileSize: '1.7 MB',
      description: 'Port des masques et lunettes même pour les produits naturels concentrés.',
      contentMarkdown: `# PRÉCAUTIONS LORS DE LA PULVÉRISATION
Protection des yeux contre la capsaïcine du piment fort.`
    }
  ],

  'elev-m1': [
    {
      id: 'res-elev-1-pdf',
      title: 'Plan d\'Architecte Poulailler Moderne 500 Têtes',
      filename: 'Plan_Poulailler_500_Tetes.pdf',
      type: 'pdf',
      fileSize: '4.2 MB',
      description: 'Plan d\'exécution détaillé avec cotes, fondations, muret de 60cm et grillage anti-oiseaux.',
      contentMarkdown: `# PLAN DE CONSTRUCTION POULAILLER 500 SUJETS
- Surface: 50m² (10m x 5m). Muret de 60cm + grillage 1cm.`
    },
    {
      id: 'res-elev-1-docx',
      title: 'Fiche Matériaux et Devis Estimatif Bâtiment',
      filename: 'Fiche_Materiaux_Et_Couts.docx',
      type: 'docx',
      fileSize: '520 KB',
      description: 'Devis Word modifiable quantitatif des ciments, tôles, bois et maçonnerie.',
      contentMarkdown: `DEVIS ESTIMATIF MAÇONNERIE ET CHARPENTE POULAILLER`
    },
    {
      id: 'res-elev-1-png',
      title: 'Schéma de Circulation d\'Air & Ventilation Naturelle',
      filename: 'Schema_Ventilation.png',
      type: 'png',
      fileSize: '1.5 MB',
      description: 'Schéma thermique illustrant l\'évacuation des gaz d\'ammoniac par effet thermosiphon.',
      imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'res-elev-1-xlsx',
      title: 'Tableur Excel : Dimensionnement des Surfaces & Densité au m²',
      filename: 'Calculateur_Densité_Poulailler.xlsx',
      type: 'xlsx',
      fileSize: '410 KB',
      description: 'Calcul automatique du nombre d\'abreuvoirs et mangeoires requis.',
      contentMarkdown: `TABLEUR DENSITÉ & ÉQUIPEMENTS AVICOLES
Calcul de la surface pour poussins vs poulets adultes.`
    },
    {
      id: 'res-elev-1-pptx',
      title: 'Diaporama PPTX : Biosécurité & Sas Sanitaire en Aviculture',
      filename: 'Biosecurite_Sas_Sanitaire.pptx',
      type: 'pptx',
      fileSize: '5.5 MB',
      description: 'Conception d\'un pédiluve efficace avec crésyl ou eau de Javel.',
      contentMarkdown: `DIAPORAMA : NORMES DE BIOSÉCURITÉ
Règles d'accès au bâtiment et désinfection des bottes.`
    },
    {
      id: 'res-elev-1-pdf2',
      title: 'Manuel PDF : Gestion de la Litière & Prévention de la Coccidiose',
      filename: 'Manuel_Gestion_Litiere.pdf',
      type: 'pdf',
      fileSize: '2.8 MB',
      description: 'Epaisseur optimale de copeaux de bois (10cm) et retournement hebdomadaire.',
      contentMarkdown: `# GESTION DE LA LITIÈRE EN AVICULTURE
Conservation d'une litière sèche et aérée.`
    },
    {
      id: 'res-elev-1-mp3',
      title: 'Explication Audio MP3 : Les 7 Étapes du Vide Sanitaire de 14 Jours',
      filename: 'Audio_Vide_Sanitaire_14_Jours.mp3',
      type: 'mp3',
      fileSize: '5.0 MB',
      description: 'Protocole de lavage, blanchiment à la chaux et repos biologique.',
      contentMarkdown: `🎙️ AUDIO : LES SECRET DU VIDE SANITAIRE REUSSI
Durée: 7 minutes.`
    },
    {
      id: 'res-elev-1-pdf3',
      title: 'Fiche Technique PDF : Installation des Radiants Éleveuses à Gaz',
      filename: 'Installation_Eleveuse_Gaz.pdf',
      type: 'pdf',
      fileSize: '1.9 MB',
      description: 'Réglage de la température de démarrage (35°C la première semaine).',
      contentMarkdown: `# CHAUFFAGE DES POUSSINS EN DÉMARRAGE
Disposition circulaire du garde-poussin.`
    }
  ],

  'elev-m2': [
    {
      id: 'res-elev-2-pdf',
      title: 'Formules Alimentaires Poussins, Poulets et Pondeuses',
      filename: 'Formules_Alimentaires_Poussins_Pondeuses.pdf',
      type: 'pdf',
      fileSize: '3.5 MB',
      description: 'Tableaux de composition pour 100kg de provende : Démarrage, Croissance, Finition.',
      contentMarkdown: `# FORMULES PROVENDE POUR 100 KG
- Démarrage : Maïs 60kg, Soja 22kg, Poisson 8kg, Son 6kg, Prémix 2.5kg.`
    },
    {
      id: 'res-elev-2-docx',
      title: 'Tableau de Suivi de Consommation & Poids Sujets',
      filename: 'Tableau_Rationnement.docx',
      type: 'docx',
      fileSize: '410 KB',
      description: 'Registre de suivi hebdomadaire du gain de poids moyen et de la quantité d\'aliment.',
      contentMarkdown: `REGISTRE DE SUIVI ALIMENTAIRE & CROISSANCE`
    },
    {
      id: 'res-elev-2-xlsx',
      title: 'Calculateur XLSX : Carré de Pearson pour Formulations Maïs/Soja/Poisson',
      filename: 'Calculateur_Carre_Pearson_Provende.xlsx',
      type: 'xlsx',
      fileSize: '680 KB',
      description: 'Tableur de calcul des taux de protéine brute (21.5% démarrage, 18.5% finition).',
      contentMarkdown: `CARRÉ DE PEARSON AUTOMATISÉ
Ajustement du taux de protéine selon la disponibilité des tourteaux.`
    },
    {
      id: 'res-elev-2-pptx',
      title: 'Présentation PPTX : Valeurs Nutritionnelles des Matières Premières Locales',
      filename: 'Nutrition_Avicole_Matieres_Locales.pptx',
      type: 'pptx',
      fileSize: '4.3 MB',
      description: 'Analyse comparée de la farine d\'asticots, du son de riz et de la drèche de brasserie.',
      contentMarkdown: `DIAPORAMA : MATIÈRES PREMIÈRES ALTERNATIVES
Substitution partielle du soja par la farine de larves.`
    },
    {
      id: 'res-elev-2-png',
      title: 'Infographie PNG : Anatomie Digestive du Poulet et Taux d\'Assimilation',
      filename: 'Anatomie_Digestive_Poulet.png',
      type: 'png',
      fileSize: '2.0 MB',
      description: 'Schéma détaillé du jabot, gésier et de l\'action des enzymes d\'assimilation.',
      imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'res-elev-2-pdf2',
      title: 'Guide PDF : Stockage Antimoisissure des Sacs de Provende en Zone Humide',
      filename: 'Stockage_Antimoisissure_Provende.pdf',
      type: 'pdf',
      fileSize: '2.4 MB',
      description: 'Utilisation des palettes en bois et contrôle des aflatoxines.',
      contentMarkdown: `# CONSERVATION DE LA PROVENDE
Prévention de la contamination aux aflatoxines.`
    },
    {
      id: 'res-elev-2-mp3',
      title: 'Leçon Audio MP3 : Comment Réduire de 25% le Coût de l\'Aliment',
      filename: 'Audio_Reduction_Couts_Alimentation.mp3',
      type: 'mp3',
      fileSize: '6.1 MB',
      description: 'Achat groupé de maïs en saison de récolte et stockage à la ferme.',
      contentMarkdown: `🎙️ LEÇON AUDIO : OPTIMISATION DU PRIX DU SAC DE PROVENDE
Durée : 9 minutes.`
    },
    {
      id: 'res-elev-2-pdf3',
      title: 'Fiche Technique PDF : Élevage de Larves de Mouches Soldats Noires & Termites',
      filename: 'Elevage_Mouche_Soldat_Noire.pdf',
      type: 'pdf',
      fileSize: '3.1 MB',
      description: 'Production de protéines vivantes gratuites pour le sous-secteur avicole.',
      contentMarkdown: `# ELEVAGE DE MOUCHES SOLDATS NOIRES (BSF)
Recyclage des déchets organiques en protéines pour poulets.`
    }
  ],

  'elev-m3': [
    {
      id: 'res-elev-3-pdf',
      title: 'Planning Mural de Vaccination et Prophylaxie Volaille',
      filename: 'Calendrier_Vaccination_Volaille.pdf',
      type: 'pdf',
      fileSize: '2.9 MB',
      description: 'Calendrier officiel à afficher au poulailler : Newcastle, Gumboro, Bronchite.',
      contentMarkdown: `# CALENDRIER SANITAIRE OFFICEL
Jour 1 : Newcastle + Gumboro. Jour 7 : Gumboro rappel.`
    },
    {
      id: 'res-elev-3-png',
      title: 'Guide Visuel PNG : Diagnostic Rapide des Symptômes Aviaires',
      filename: 'Guide_Symptomes_Maladies.png',
      type: 'png',
      fileSize: '1.9 MB',
      description: 'Poster comparatif : Fientes blanches (Salmonellose), Fientes sanglantes (Coccidiose).',
      imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'res-elev-3-docx',
      title: 'Fiche DOCX : Registre d\'Autopsie & Mortalité Quotidienne',
      filename: 'Registre_Autopsie_Mortalite.docx',
      type: 'docx',
      fileSize: '380 KB',
      description: 'Grille d\'examen des lésions au foie, aux intestins et à la bourse de Fabricius.',
      contentMarkdown: `REGISTRE D'OBSERVATION CLINIQUE & AUTOPSIE`
    },
    {
      id: 'res-elev-3-xlsx',
      title: 'Tableur XLSX : Rappels Automatiques des Dates de Vaccination',
      filename: 'Calculateur_Rappels_Vaccins.xlsx',
      type: 'xlsx',
      fileSize: '510 KB',
      description: 'Génération automatique du calendrier sanitaire selon la date d\'arrivée des poussins.',
      contentMarkdown: `CALENDRIER VACCINAL SUR MESURE`
    },
    {
      id: 'res-elev-3-pptx',
      title: 'Diaporama PPTX : Administration des Vaccins dans l\'Eau de Boisson avec Lait',
      filename: 'Technique_Vaccination_Eau.pptx',
      type: 'pptx',
      fileSize: '4.9 MB',
      description: 'Protocole de privation d\'eau 2h avant vaccination pour soif stimulée.',
      contentMarkdown: `DIAPORAMA : VACCINISTRATION EN EAU DE BOISSON
Protection de la souche par 2g/L de lait écumé.`
    },
    {
      id: 'res-elev-3-pdf2',
      title: 'Manuel PDF : Posologie des Antibiotiques et Temps d\'Attente Avant Vente',
      filename: 'Posologie_Antibiotiques_Avicoles.pdf',
      type: 'pdf',
      fileSize: '2.7 MB',
      description: 'Gestion responsable des molécules vétérinaires pour éviter les résidus dans la viande.',
      contentMarkdown: `# TEMPS D'ATTENTE AVANT ABATTAGE
Respect des délais d'élimination de l'oxytétracycline et de l'enrofloxacine.`
    },
    {
      id: 'res-elev-3-mp3',
      title: 'Podcast Audio MP3 : Reconnaître les Premiers Signes de la Maladie de Newcastle',
      filename: 'Podcast_Maladie_Newcastle.mp3',
      type: 'mp3',
      fileSize: '5.8 MB',
      description: 'Symptômes nerveux (torsion du cou) et respiratoires.',
      contentMarkdown: `🎙️ PODCAST VÉTÉRINAIRE : LA MALADIE DE NEWCASTLE
Durée : 8 minutes. Mesures d'urgence en cas d'alerte.`
    },
    {
      id: 'res-elev-3-pdf3',
      title: 'Guide PDF : Lutte contre les Poux Rouges et Parasites Externes',
      filename: 'Lutte_Poux_Rouges_Poulailler.pdf',
      type: 'pdf',
      fileSize: '2.2 MB',
      description: 'Traitement à la terre de diatomée et cendre de bois.',
      contentMarkdown: `# ELIMINATION DES POUX ROUGES
Traitement naturel des perchoirs et poudrage des nids.`
    }
  ],

  'pisci-m1': [
    {
      id: 'res-pisci-1-pdf',
      title: 'Guide des Paramètres de Qualité de l\'Eau',
      filename: 'Guide_Parametres_Eau_pH_Oxygene.pdf',
      type: 'pdf',
      fileSize: '3.8 MB',
      description: 'Seuils critiques et actions correctives pour la température, le pH, l\'oxygène et le nitrite.',
      contentMarkdown: `# MANUEL DE GESTION DE LA QUALITÉ DE L'EAU
Température idéale 26-30°C. pH idéal 6.5-8.2. Oxygène > 4.5 mg/L.`
    },
    {
      id: 'res-pisci-1-png',
      title: 'Plan d\'Assemblage Bassin Hors-Sol PVC 10m³',
      filename: 'Plan_Bassin_Hors_Sol.png',
      type: 'png',
      fileSize: '2.2 MB',
      description: 'Schéma de montage de la structure tubulaire, passe-paroi et vidange de fond.',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'res-pisci-1-docx',
      title: 'Fiche DOCX : Relevé Quotidien du pH, Température et Oxygène Dissous',
      filename: 'Fiche_Parametres_Eau.docx',
      type: 'docx',
      fileSize: '400 KB',
      description: 'Tableau de bord matin et soir pour détecter les baisses d\'oxygène.',
      contentMarkdown: `FICHE DE RELEVÉ PISCICOLE MATIN ET SOIR`
    },
    {
      id: 'res-pisci-1-xlsx',
      title: 'Calibrateur XLSX : Fréquence de Renouvellement d\'Eau par Biomasse',
      filename: 'Calculateur_Renouvellement_Eau.xlsx',
      type: 'xlsx',
      fileSize: '590 KB',
      description: 'Estimation du % de vidange nécessaire selon la quantité d\'aliment distribuée.',
      contentMarkdown: `CALCULATEUR DE RENOUVELLEMENT D'EAU`
    },
    {
      id: 'res-pisci-1-pptx',
      title: 'Présentation PPTX : Choix et Installation des Aérateurs à Palettes',
      filename: 'Aerateurs_Oxygenation_Bassins.pptx',
      type: 'pptx',
      fileSize: '5.0 MB',
      description: 'Techniques d\'injection d\'air et brassage pour bacs intensifs.',
      contentMarkdown: `DIAPORAMA : OXYGÉNATION INTENSIVE
Rendement des aérateurs solaires vs électriques.`
    },
    {
      id: 'res-pisci-1-pdf2',
      title: 'Manuel PDF : Neutralisation de l\'Ammoniac Toxique et Salinité de l\'Eau',
      filename: 'Traitement_Ammoniac_Pisciculture.pdf',
      type: 'pdf',
      fileSize: '2.6 MB',
      description: 'Ajout de sel gros grain (1 à 3kg/m³) pour protéger les branchies.',
      contentMarkdown: `# GESTION DU PIC D'AMMONIAC
Utilisation du sel agricole pour réduire la toxicité des nitrites.`
    },
    {
      id: 'res-pisci-1-mp3',
      title: 'Audio MP3 : Fabriquer son Disque de Secchi pour la Transparence',
      filename: 'Audio_Disque_Secchi.mp3',
      type: 'mp3',
      fileSize: '4.8 MB',
      description: 'Tutoriel audio pour mesurer le phytoplancton avec un couvercle blanc et noir.',
      contentMarkdown: `🎙️ TUTORIEL AUDIO DISQUE DE SECCHI
Durée : 5 minutes.`
    },
    {
      id: 'res-pisci-1-pdf3',
      title: 'Guide PDF : Montage de la Tuyauterie Moine de Vidange et Trop-Plein',
      filename: 'Montage_Moine_Vidange_Pisciculture.pdf',
      type: 'pdf',
      fileSize: '3.3 MB',
      description: 'Système permettant d\'évacuer l\'eau de fond sans vider l\'eau de surface.',
      contentMarkdown: `# HYDROLOGIE DU BASSIN : LE MOINE DE VIDANGE
Système automatique d'évacuation des boues de fond.`
    }
  ],

  'pisci-m2': [
    {
      id: 'res-pisci-2-pdf',
      title: 'Protocole de Reproduction Artificielle du Clarias',
      filename: 'Protocole_Reproduction_Clarias.pdf',
      type: 'pdf',
      fileSize: '4.8 MB',
      description: 'Guide technique étape par étape : dosage hormone, stripping, fécondation et éclosion.',
      contentMarkdown: `# PROTOCOLE DE REPRODUCTION ARTIFICIELLE
1. Sélection des géniteurs. 2. Injection Ovaprim (0.5mL/kg). 3. Stripping & Incubation sur Kakaban.`
    },
    {
      id: 'res-pisci-2-docx',
      title: 'Registre DOCX : Suivi d\'Alevinage et Taux de Survie en Écloserie',
      filename: 'Registre_Suivi_Alevinage.docx',
      type: 'docx',
      fileSize: '460 KB',
      description: 'Tableau de bord de suivi du tri des alevins et du nourrissage Artemia.',
      contentMarkdown: `REGISTRE DE SUIVI ÉCLOSERIE / ALEVINAGE`
    },
    {
      id: 'res-pisci-2-xlsx',
      title: 'Calculateur XLSX : Dose d\'Ovaprim & Heures de Latence selon T°',
      filename: 'Calculateur_Injection_Ovaprim.xlsx',
      type: 'xlsx',
      fileSize: '620 KB',
      description: 'Calcul précis du volume de seringue et de l\'heure exacte de stripping.',
      contentMarkdown: `CALCULATEUR DE REPRODUCTION DE CLARIAS`
    },
    {
      id: 'res-pisci-2-pptx',
      title: 'Diaporama PPTX : Stripping des Œufs et Fécondation à la Laitance',
      filename: 'Stripping_Et_Fecondation_Clarias.pptx',
      type: 'pptx',
      fileSize: '6.5 MB',
      description: 'Photos haute résolution des gestes techniques pour éviter de blesser la femelle.',
      contentMarkdown: `DIAPORAMA : LES GESTES DU STRIPPING
Mélange à la plume d'oiseau avec solution saline 0.9%.`
    },
    {
      id: 'res-pisci-2-png',
      title: 'Schéma PNG : Cycle de Maturation et Éclosion des Nauplii d\'Artémie',
      filename: 'Eclosion_Nauplii_Artemia.png',
      type: 'png',
      fileSize: '1.8 MB',
      description: 'Montage du réacteur à Artemia avec bouteille plastique renversée et bulleur.',
      imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5057a225b?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'res-pisci-2-pdf2',
      title: 'Guide PDF : Tri des Alevins par Calibre et Anti-Cannibalisme',
      filename: 'Tri_Alevins_Anti_Cannibalisme.pdf',
      type: 'pdf',
      fileSize: '3.0 MB',
      description: 'Utilisation des tamis métalliques de calibrage tous les 4 jours.',
      contentMarkdown: `# GESTION DU CANNIBALISME EN ALEVINAGE
Séparation impérative des gros sujets "sauteurs".`
    },
    {
      id: 'res-pisci-2-mp3',
      title: 'Audio MP3 : Retours d\'Expérience d\'un Maitre Éclosier',
      filename: 'Audio_Conseils_Ecloserie_Clarias.mp3',
      type: 'mp3',
      fileSize: '7.2 MB',
      description: 'Conseils sur la température de l\'incubateur et la propreté des grilles Kakaban.',
      contentMarkdown: `🎙️ AUDIO : CONSEILS D'UN ÉCLOSIER PRO
Durée : 11 minutes.`
    },
    {
      id: 'res-pisci-2-pdf3',
      title: 'Manuel PDF : Production d\'Aliments Vivants (Copépodes & Tubifex)',
      filename: 'Aliments_Vivants_Pisciculture.pdf',
      type: 'pdf',
      fileSize: '2.9 MB',
      description: 'Élevage alternatif de proies vivantes pour économiser les boîtes d\'Artemia.',
      contentMarkdown: `# CULTURE DE PROIES VIVANTES
Production de cladocères et daphnies en petit bac.`
    }
  ],

  'pisci-m3': [
    {
      id: 'res-pisci-3-pdf',
      title: 'Tableau de Calibrage des Granulés et Taux de Ration',
      filename: 'Tableau_Calibrage_Granules.pdf',
      type: 'pdf',
      fileSize: '3.1 MB',
      description: 'Guide officiel des tailles de granulés (0.5mm à 6mm) et % de protéine recommandé.',
      contentMarkdown: `# TABLEAU OFFICIEL DE NOURRISSAGE
Poids < 2g : 0.8mm (50% Prot). Poids > 200g : 4mm-6mm (35% Prot).`
    },
    {
      id: 'res-pisci-3-docx',
      title: 'Fiche DOCX : Procédure de Pêche et Tri Marchand',
      filename: 'Fiche_Technique_Peche.docx',
      type: 'docx',
      fileSize: '390 KB',
      description: 'Bonnes pratiques de vidange partielle, capture au filet et pesée marchande.',
      contentMarkdown: `FICHE PROTOCOLE DE PÊCHE ET CONDITIONNEMENT`
    },
    {
      id: 'res-pisci-3-xlsx',
      title: 'Tableur XLSX : Estimation de la Biomasse et Calcul de la Ration Hebdomadaire',
      filename: 'Calculateur_Biomasse_Pisciculture.xlsx',
      type: 'xlsx',
      fileSize: '580 KB',
      description: 'Pêche d\'échantillonnage de 30 poissons et calcul automatique du stock total.',
      contentMarkdown: `CALCULATEUR DE BIOMASSE TOTAL EN BASSIN`
    },
    {
      id: 'res-pisci-3-pptx',
      title: 'Présentation PPTX : Granulés Flottants vs Coulants - Taux de Conversion',
      filename: 'Granules_Flottants_vs_Coulants.pptx',
      type: 'pptx',
      fileSize: '4.7 MB',
      description: 'Analyse économique comparée de l\'Indice de Conversion Alimentaire (IC).',
      contentMarkdown: `DIAPORAMA : PERFORMANCE ALIMENTAIRE PISCICOLE
Calcul de l'IC cible : 1 kg de chair pour 1.1 kg d'aliment.`
    },
    {
      id: 'res-pisci-3-png',
      title: 'Poster PNG : Calibres A, B et C du Clarias Marchand',
      filename: 'Calibres_Poissons_Vente.png',
      type: 'png',
      fileSize: '2.3 MB',
      description: 'Guide visuel des normes de vente sur les marchés locaux.',
      imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'res-pisci-3-pdf2',
      title: 'Protocole PDF : Jeûne de 24h & Purge Digestive Avant Pêche',
      filename: 'Protocole_Jeune_Avant_Peche.pdf',
      type: 'pdf',
      fileSize: '2.1 MB',
      description: 'Importance de la purge digestive pour éviter la détérioration de la chair.',
      contentMarkdown: `# RÈGLE DE LA PURGE DIGESTIVE 24H AVANT VENTE
Elimination des déjections pour préserver le goût.`
    },
    {
      id: 'res-pisci-3-mp3',
      title: 'Guide Audio MP3 : Transport Vivant des Poissons vers les Marchés',
      filename: 'Audio_Transport_Poisson_Vivant.mp3',
      type: 'mp3',
      fileSize: '5.5 MB',
      description: 'Conditionnement en fûts plastique percés avec mousse d\'oxygène.',
      contentMarkdown: `🎙️ AUDIO : CONSERVATION DU POISSON VIVANT EN TRANSPORT
Durée : 7 minutes.`
    },
    {
      id: 'res-pisci-3-pdf3',
      title: 'Manuel PDF : Fumage Hygiénique au Four Chorkor Amélioré',
      filename: 'Manuel_Fumage_Poissons_Chorkor.pdf',
      type: 'pdf',
      fileSize: '3.8 MB',
      description: 'Transformation à forte valeur ajoutée des poissons invendus ou petits calibres.',
      contentMarkdown: `# TRANSFORMATION : LE FUMAGE DU CLARIAS
Technique de saumurage et fumage au bois d'agrumes.`
    }
  ],

  'entre-m1': [
    {
      id: 'res-entre-1-docx',
      title: 'Template Modifiable Business Model Canvas Agricole',
      filename: 'Template_Business_Model_Canvas.docx',
      type: 'docx',
      fileSize: '480 KB',
      description: 'Matrice BMC Word pré-formatée avec questions guides pour chaque case.',
      contentMarkdown: `TEMPLATE BUSINESS MODEL CANVAS AGRICOLE (AGROLEARN)`
    },
    {
      id: 'res-entre-1-pdf',
      title: 'Exemple Rempli BMC Ferme Avicole & Piscicole',
      filename: 'Exemple_BMC_Ferme_Avicole.pdf',
      type: 'pdf',
      fileSize: '3.2 MB',
      description: 'Exemple réel d\'une exploitation intégrée rentable avec chiffrages.',
      contentMarkdown: `# EXEMPLE ÉTUDE DE CAS : FERME AGRICOLE "AGRO-PLUS"
Investissement initial 2.500.000 FCFA. Marge cible 35%.`
    },
    {
      id: 'res-entre-1-xlsx',
      title: 'Matrice XLSX : Automatisation des 9 Blocs du Canvas Agricole',
      filename: 'Matrice_Automatisée_BMC.xlsx',
      type: 'xlsx',
      fileSize: '650 KB',
      description: 'Génération automatique du tableau synthétique pour présentation bancaire.',
      contentMarkdown: `MATRICE UNIFIÉE BMC AGRICOLE`
    },
    {
      id: 'res-entre-1-pptx',
      title: 'Cours PPTX : Définir sa Proposition de Valeur Unique',
      filename: 'Proposition_De_Valeur_Agricole.pptx',
      type: 'pptx',
      fileSize: '5.8 MB',
      description: 'Se démarquer des concurrents du marché par le Bio, la fraîcheur et la livraison.',
      contentMarkdown: `DIAPORAMA : STRATÉGIE DE DIFFÉRENCIATION
Pourquoi les clients achèteront chez vous plutôt qu'au marché.`
    },
    {
      id: 'res-entre-1-png',
      title: 'Infographie PNG : Schéma Synthétique du Canvas en 1 Page',
      filename: 'Infographie_BMC_Visuel.png',
      type: 'png',
      fileSize: '2.0 MB',
      description: 'Visuel récapitulatif des 9 cases interconnectées.',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'res-entre-1-pdf2',
      title: 'Guide PDF : Réaliser son Étude de Marché Terrain auprès des Maquis',
      filename: 'Etude_De_Marche_Agricole_Terrain.pdf',
      type: 'pdf',
      fileSize: '2.9 MB',
      description: 'Questionnaire d\'enquête à faire auprès des gérants de restaurants.',
      contentMarkdown: `# GUIDE D'ENQUÊTE COMMERCIALE TERRAIN
Validation de la demande en poulets et poissons avant le lancement.`
    },
    {
      id: 'res-entre-1-mp3',
      title: 'Podcast MP3 : Les 5 Erreurs Financières Fatales de l\'Agropreneur',
      filename: 'Podcast_Erreurs_Agrobusiness.mp3',
      type: 'mp3',
      fileSize: '6.4 MB',
      description: 'Analyse des raisons pour lesquelles 80% des projets manquent de trésorerie.',
      contentMarkdown: `🎙️ PODCAST AGROBUSINESS : LES ERREURS AU DÉMARRAGE
Durée : 9 minutes.`
    },
    {
      id: 'res-entre-1-pdf3',
      title: 'Modèle PDF : Lettre d\'Intention d\'Achat pour Banques et Investisseurs',
      filename: 'Modele_Lettre_Intention_Achat.pdf',
      type: 'pdf',
      fileSize: '1.8 MB',
      description: 'Document officiel à faire signer aux clients grossistes pour prouver le marché.',
      contentMarkdown: `# ENGAGEMENT D'ACHAT DE PRODUITS FERMIERS
Modèle de convention d'approvisionnement régulier.`
    }
  ],

  'entre-m2': [
    {
      id: 'res-entre-2-docx',
      title: 'Cahier de Journal des Recettes et Dépenses',
      filename: 'Cahier_Recettes_Depenses.docx',
      type: 'docx',
      fileSize: '410 KB',
      description: 'Modèle de registre de trésorerie quotidien pour suivre les entrées et sorties de caisse.',
      contentMarkdown: `REGISTRE SIMPLIFIÉ DE TRÉSORERIE DE LA FERME`
    },
    {
      id: 'res-entre-2-pdf',
      title: 'Guide de Calcul de la Marge & Seuil de Rentabilité',
      filename: 'Calculateur_Marge_Rentabilite.pdf',
      type: 'pdf',
      fileSize: '2.7 MB',
      description: 'Formules financières simples et exemples pratiques de calcul du point mort.',
      contentMarkdown: `# FORMULES DE CALCUL FINANCIER AGROBUSINESS
Coût de Revient Unitaire = (Dépenses Totales) / (Quantité Vendable).`
    },
    {
      id: 'res-entre-2-xlsx',
      title: 'Tableur XLSX : Plan de Trésorerie Prévisionnel & Bilan Annuel',
      filename: 'Plan_Tresorerie_Previsionnel_Ferme.xlsx',
      type: 'xlsx',
      fileSize: '720 KB',
      description: 'Outil Excel complet avec calcul automatique du Seuil de Rentabilité.',
      contentMarkdown: `PLAN DE TRÉSORERIE ANNUEL AUTOMATISÉ`
    },
    {
      id: 'res-entre-2-pptx',
      title: 'Cours PPTX : Distinguer Charges Fixes, Charges Variables et Amortissements',
      filename: 'Gestion_Financiere_Charges_Ferme.pptx',
      type: 'pptx',
      fileSize: '4.9 MB',
      description: 'Comprendre l\'amortissement du poulailler sur 5 ans dans le coût du poulet.',
      contentMarkdown: `DIAPORAMA : COMPTABILITÉ RURALE SIMPLIFIÉE
Prise en compte des amortissements du matériel.`
    },
    {
      id: 'res-entre-2-png',
      title: 'Graphique PNG : Visualisation du Point Mort et du Seuil de Rentabilité',
      filename: 'Graphique_Seuil_Rentabilite.png',
      type: 'png',
      fileSize: '1.6 MB',
      description: 'Schéma clair montrant la zone de perte et la zone de bénéfice net.',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'res-entre-2-pdf2',
      title: 'Guide PDF : Négociation d\'Emprunt Agricole auprès des Microfinances',
      filename: 'Guide_Credit_Agricole_Microfinance.pdf',
      type: 'pdf',
      fileSize: '3.4 MB',
      description: 'Constituer un dossier solide pour obtenir un prêt de fonds de roulement.',
      contentMarkdown: `# NÉGOCIATION DE CRÉDIT EN MICROFINANCE
Présentation des garanties matérielles et du calendrier de remboursement.`
    },
    {
      id: 'res-entre-2-mp3',
      title: 'Leçon Audio MP3 : Règle d\'Or : Séparer l\'Argent Personnel de la Caisse',
      filename: 'Audio_Separation_Caisse_Ferme_Poche.mp3',
      type: 'mp3',
      fileSize: '5.1 MB',
      description: 'Fixer un salaire mensuel au promoteur pour éviter la faillite de la ferme.',
      contentMarkdown: `🎙️ AUDIO : DISCIPLINE FINANCIÈRE DE L'AGROPRENEUR
Durée : 8 minutes.`
    },
    {
      id: 'res-entre-2-pdf3',
      title: 'Fiche PDF : Fiscalité Rurale & Déclarations de la Patente Agricole',
      filename: 'Fiscalite_Rurale_Patente_Agricole.pdf',
      type: 'pdf',
      fileSize: '2.2 MB',
      description: 'Avantages fiscaux de l\'agrobusiness et déclaration au régime réel simplifié.',
      contentMarkdown: `# FISCALITÉ AGRICOLE ET RURALE
Exonérations d'impôts sur les intrants agricoles.`
    }
  ],

  'entre-m3': [
    {
      id: 'res-entre-3-pdf',
      title: 'Guide Stratégique Vente sur WhatsApp & Réseaux Sociaux',
      filename: 'Guide_Vente_Sur_WhatsApp_Social.pdf',
      type: 'pdf',
      fileSize: '3.6 MB',
      description: 'Scripts de vente textuels, réponses automatiques et calendrier de publications.',
      contentMarkdown: `# SCRIPT DE VENTE WHATSAPP BUSINESS
Messages d'accueil automatiques et relances de statut 15 jours avant récolte.`
    },
    {
      id: 'res-entre-3-png',
      title: 'Modèles PNG : Affiches Publicitaires Promotionnelles',
      filename: 'Modeles_Affiches_Publicitaires.png',
      type: 'png',
      fileSize: '2.5 MB',
      description: 'Templates d\'affiches carrées pour statut WhatsApp et Facebook.',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'res-entre-3-docx',
      title: 'Modèle DOCX : Contrat Type de Précommande & Bon de Livraison',
      filename: 'Contrat_Précommande_Bon_Livraison.docx',
      type: 'docx',
      fileSize: '390 KB',
      description: 'Accords écrits sécurisant l\'acompte de 30% lors des réservations.',
      contentMarkdown: `CONTRAT DE PRÉCOMMANDE ET BON DE LIVRAISON`
    },
    {
      id: 'res-entre-3-xlsx',
      title: 'Fichier XLSX : Carnet de Clients & Fichier de Suivi des Ventes',
      filename: 'Fichier_Suivi_Clientele_Ventes.xlsx',
      type: 'xlsx',
      fileSize: '520 KB',
      description: 'Base de données clients pour envoyer des messages de promotions régulières.',
      contentMarkdown: `CARNET CLIENTS AUTOMATISÉ`
    },
    {
      id: 'res-entre-3-pptx',
      title: 'Formation PPTX : Créer des Visuels de Vente sur Canva en 10 minutes',
      filename: 'Formation_Canva_Marketing_Agricole.pptx',
      type: 'pptx',
      fileSize: '6.1 MB',
      description: 'Tutoriel pas-à-pas pour détourer des photos de poulets ou légumes frais.',
      contentMarkdown: `DIAPORAMA : CRÉATION DE VISUELS ATTRACTIFS
Utilisation des palettes de couleurs naturelles (Vert, Ambre, Terre).`
    },
    {
      id: 'res-entre-3-pdf2',
      title: 'Guide PDF : Emballages Écologiques & Conditionnement Volailles/Légumes',
      filename: 'Packaging_Ecologique_Produits_Frais.pdf',
      type: 'pdf',
      fileSize: '2.8 MB',
      description: 'Sacs biodégradables, étiquetage avec code QR de traçabilité.',
      contentMarkdown: `# MARQUAGE ET CONDITIONNEMENT RENTABLE
Création de barquettes sous film avec étiquette de la ferme.`
    },
    {
      id: 'res-entre-3-mp3',
      title: 'Audio MP3 : Techniques de Vente Directe aux Maquis et Restaurants',
      filename: 'Audio_Negociation_Maquis_Restaurants.mp3',
      type: 'mp3',
      fileSize: '5.9 MB',
      description: 'Comment convaincre un chef cuisinier d\'acheter vos poissons vivants.',
      contentMarkdown: `🎙️ LEÇON AUDIO : DÉMARCHAGE DES RESTAURANTS
Durée : 8 minutes. Argumentaires de régularité et fraîcheur.`
    },
    {
      id: 'res-entre-3-pdf3',
      title: 'Manuel PDF : Recouvrement Amical des Créances et Impayés',
      filename: 'Recouvrement_Creances_Agricoles.pdf',
      type: 'pdf',
      fileSize: '2.0 MB',
      description: 'Stratégies pour se faire payer dans les délais sans perdre le client.',
      contentMarkdown: `# GESTION DES CRÉDITS CLIENTS
Mise en place de pénalités de retard douces.`
    }
  ]
};
