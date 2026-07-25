/** Liens discrets affichés sous le calculateur masse grasse. */
export const MASSE_GRASSE_CALCULATOR_LINKS = [
  { href: "/", label: "Calculer mon IMC" },
  { href: "/calculateurs/poids-ideal", label: "Calculer son poids idéal" },
  { href: "/guides/limites-de-l-imc", label: "Comprendre les limites de l'IMC" },
] as const;

export const MASSE_GRASSE_SEX_HELP =
  "Les formules et les repères de la jauge s'adaptent au sexe sélectionné.";

export const MASSE_GRASSE_SEX_LABEL = "Choisissez votre sexe";

export const MASSE_GRASSE_AGE_LABEL = "Indiquez votre âge";

export const MASSE_GRASSE_HEIGHT_LABEL = "Indiquez votre taille";

export const MASSE_GRASSE_WEIGHT_LABEL = "Indiquez votre poids";

export const MASSE_GRASSE_WAIST_LABEL = "Indiquez votre tour de taille";

export const MASSE_GRASSE_WAIST_HELP =
  "Mesurez horizontalement, sans rentrer le ventre, avec un mètre ruban souple.";

export const MASSE_GRASSE_WAIST_MEASURE_TITLE = "Comment mesurer ?";

export const MASSE_GRASSE_WAIST_MEASURE_DETAILS =
  "Placez le mètre ruban à hauteur du nombril (homme) ou au point le plus étroit du buste (femme). Tenez-vous debout, détendu, sans comprimer la peau.";

export const MASSE_GRASSE_CARD_TITLE = "Estimez votre masse grasse";

export const MASSE_GRASSE_QUICK_TITLE = "Estimation rapide";

export const MASSE_GRASSE_PERSONALIZED_TITLE = "Estimation personnalisée";

export const MASSE_GRASSE_COMPARE_TITLE = "Comparer les méthodes";

export const MASSE_GRASSE_QUICK_TAB_DESC =
  "Une estimation immédiate à partir de vos informations générales.";

export const MASSE_GRASSE_PERSONALIZED_TAB_DESC =
  "Une estimation davantage liée à votre morphologie avec une seule mesure supplémentaire.";

export const MASSE_GRASSE_COMPARE_TAB_DESC =
  "Comparez plusieurs approches lorsque vous souhaitez approfondir l'estimation.";

export const MASSE_GRASSE_QUICK_INTRO =
  "Obtenez une première estimation à partir de votre âge, de votre taille et de votre poids.";

export const MASSE_GRASSE_PERSONALIZED_INTRO =
  "Utilisez votre taille et votre tour de taille pour obtenir une estimation davantage liée à votre morphologie.";

export const MASSE_GRASSE_COMPARE_INTRO =
  "Confrontez plusieurs approches et visualisez leurs éventuels écarts.";

export const MASSE_GRASSE_QUICK_KEEP_IN_MIND_TITLE = "À garder en tête";

export const MASSE_GRASSE_QUICK_KEEP_IN_MIND = [
  "Le pourcentage affiché est une estimation statistique, pas une mesure directe. La masse musculaire, la morphologie et l'hydratation peuvent faire varier le résultat réel.",
  "Pour une interprétation plus fine, croisez ce repère avec votre IMC, votre tour de taille, votre évolution dans le temps et, en cas de doute, l'avis d'un professionnel de santé.",
] as const;

export const MASSE_GRASSE_PERSONALIZED_KEEP_IN_MIND = [
  "La formule RFM repose sur le rapport taille / tour de taille. C'est un repère morphologique, pas une mesure directe de la masse grasse.",
  "Cette estimation peut compléter, sans remplacer, une analyse plus complète ou l'avis d'un professionnel de santé.",
] as const;

export const MASSE_GRASSE_COMPARE_MEASURES_TITLE = "Mesures complémentaires";

export const MASSE_GRASSE_COMPARE_MEASURES_HELP =
  "Ces mesures permettent d'inclure les méthodes anthropométriques avancées. Elles restent facultatives.";

export const MASSE_GRASSE_COMPARE_KEEP_IN_MIND = [
  "Les écarts entre méthodes sont attendus : chaque publication repose sur des populations et des protocoles différents.",
  "Utilisez ces résultats comme une fourchette de référence, pas comme un diagnostic. Seule une mesure directe (DEXA, impédancemétrie, plis cutanés) est plus précise.",
  "En cas de doute, consultez un professionnel de santé pour interpréter votre composition corporelle.",
] as const;

export const MASSE_GRASSE_CENTRAL_POINT_NOTE =
  "Ce point central résume les estimations calculées. Il ne s'agit pas d'une méthode supplémentaire ni d'une valeur scientifiquement supérieure.";

export const MASSE_GRASSE_QUICK_UNDERAGE_MESSAGE =
  "Ce mode est réservé aux adultes (18 ans et plus). Les enfants et adolescents nécessitent une interprétation spécifique.";

export const MASSE_GRASSE_OPTIONAL_WEIGHT_LABEL =
  "Ajouter mon poids pour convertir cette estimation en kilogrammes";

export const MASSE_GRASSE_OPTIONAL_WEIGHT_HELP =
  "Facultatif. Permet d'estimer la masse grasse et la masse maigre en kg à partir du pourcentage RFM.";
