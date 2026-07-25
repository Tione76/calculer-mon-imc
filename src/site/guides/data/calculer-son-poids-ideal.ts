import type { Guide, GuideBlock } from "../types";
import { imcGuideSidebar } from "./guide-imc-shared";

/** Fourchette IMC « normal » OMS utilisée pour l'estimation pédagogique du poids idéal. */
export const IDEAL_BMI_MIN = 18.5;
export const IDEAL_BMI_MAX = 24.9;

export function estimateIdealWeightRangeKg(heightCm: number): { min: number; max: number } {
  const heightM = heightCm / 100;
  const square = heightM * heightM;
  return {
    min: Math.round(IDEAL_BMI_MIN * square * 10) / 10,
    max: Math.round(IDEAL_BMI_MAX * square * 10) / 10,
  };
}

/** Blocs réutilisables pour présenter une formule de poids idéal. */
function formulaSection(
  id: string,
  title: string,
  blocks: Guide["sections"][number]["blocks"],
): Guide["sections"][number] {
  return { id, title, blocks: blocks ?? [] };
}

function formulaBlock(lines: string[]): GuideBlock {
  return { type: "formula", lines };
}

export const calculerSonPoidsIdealGuide: Guide = {
  slug: "calculer-son-poids-ideal",
  title: "Calculer son poids idéal : méthodes, formules et limites",
  seoTitle: "Calculer son poids idéal : formules Lorentz, Devine, Miller et limites",
  description:
    "Comment calculer son poids idéal ? Formules Lorentz, Devine, Miller, Robinson, Hamwi et Broca : méthodes, comparaison, limites et interprétation prudente de chaque estimation.",
  subtitle:
    "Il n'existe pas de poids idéal universel, mais plusieurs méthodes reconnues permettent d'estimer une fourchette de référence utile lorsqu'elle est bien interprétée.",
  publishedAt: "2026-07-20",
  updatedAt: "2026-07-22",
  introduction: [
    "Calculer son poids idéal ne se résume pas à appliquer une formule. Plusieurs méthodes coexistent, chacune avec son histoire, son objectif et ses limites. Ce guide vous aide à comprendre leurs différences afin de mieux interpréter leurs résultats.",
    "Plusieurs méthodes médicales ou scientifiques permettent d'estimer un poids de référence à partir de la taille, parfois du sexe. Elles donnent une fourchette ou une estimation, pas un objectif absolu au kilogramme près.",
    "Ce guide présente les principales formules (Lorentz, Devine, Miller, Robinson, Hamwi, Broca), explique pourquoi leurs résultats diffèrent, et comment les utiliser avec discernement, comme un repère et non comme une obligation.",
  ],
  introDisclaimer:
    "Contenu à visée pédagogique : il ne remplace pas un avis médical personnalisé.",
  introSummary: {
    title: "Calculer son poids idéal en 30 secondes",
    items: [
      "Il n'existe probablement pas de poids idéal absolu, mais des estimations utiles.",
      "Chaque formule a été conçue pour une époque, une population et un objectif précis.",
      "Lorentz, Devine, Miller, Robinson, Hamwi et Broca donnent souvent des résultats proches, parfois différents.",
      "Quelques kilos d'écart autour de l'estimation sont normaux.",
      "Ces méthodes ignorent masse musculaire, morphologie et contexte médical.",
      "Croisez toujours avec l'IMC, le tour de taille et votre évolution dans le temps.",
    ],
  },
  quickSummary: {
    title: "Poids idéal en bref",
    variant: "cards",
    items: [],
    cards: [
      { icon: "◎", label: "Principe", value: "Estimation de référence, pas un objectif absolu" },
      { icon: "÷", label: "Base", value: "Taille, parfois le sexe biologique" },
      { icon: "≈", label: "Résultat", value: "Fourchette ou valeur indicative en kg" },
      { icon: "⚖", label: "Formules", value: "Lorentz, Devine, Miller, Robinson, Hamwi, Broca" },
      { icon: "✓", label: "Utilité", value: "Repère pour situer son poids actuel" },
      { icon: "⚠", label: "Limite", value: "Ne décrit pas la composition corporelle" },
    ],
  },
  sections: [
    {
      id: "signification-poids-ideal",
      title: "Que signifie réellement « poids idéal » ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le terme « poids idéal » circule partout : magazines, applications, consultations. En pratique, il désigne le plus souvent un poids théorique ou de référence, calculé à partir de la taille selon une formule donnée. Ce n'est pas un objectif obligatoire, ni une garantie de bonne santé.",
        },
        {
          type: "paragraph",
          text: "Deux personnes de même taille peuvent être parfaitement en bonne santé avec plusieurs kilos d'écart. La morphologie, la masse musculaire, l'âge et le mode de vie modifient la lecture d'un chiffre. Parler de fourchette est presque toujours plus juste que de parler de poids parfait.",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "À retenir : un poids idéal calculé est un repère statistique ou pratique. Il ouvre une réflexion, il ne clôt pas celle-ci.",
          ],
        },
      ],
    },
    {
      id: "pourquoi-plusieurs-methodes",
      title: "Pourquoi existe-t-il plusieurs méthodes ?",
      blocks: [
        {
          type: "paragraph",
          text: "Aucune formule n'a été inventée pour répondre à la même question exacte. Chacune a été développée à une époque différente, sur une population donnée, avec un objectif précis : estimation clinique, dosage médicamenteux, repère populationnel ou règle empirique simple.",
        },
        {
          type: "list",
          items: [
            "Époque : la morphologie moyenne et les données disponibles ont évolué depuis le XIXᵉ siècle.",
            "Population : certaines formules visent des adultes occidentaux, d'autres des contextes cliniques précis.",
            "Objectif : repère grand public, calcul de doses ou estimation rapide en consultation.",
            "Sexe : certaines intègrent une distinction homme / femme, d'autres non.",
          ],
        },
        {
          type: "paragraph",
          text: "C'est précisément pour cela que Lorentz et Devine, par exemple, peuvent afficher des résultats différents pour une même personne. Ce n'est pas une erreur : ce sont deux outils distincts, à interpréter comme des estimations, pas comme des vérités concurrentes.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon à savoir : comparer plusieurs formules peut aider à visualiser une fourchette plausible. Un futur outil sur Calculer Mon IMC permettra de les confronter facilement ; en attendant, vous pouvez les calculer une par une avec les formules ci-dessous.",
          ],
        },
      ],
    },
    formulaSection("formule-lorentz", "Formule de Lorentz", [
      {
        type: "paragraph",
        text: "La formule de Lorentz, popularisée au XXᵉ siècle par le Dr Paul Lorentz, est l'une des plus utilisées en France pour estimer un poids de référence à partir de la taille.",
      },
      {
        type: "definition-list",
        items: [
          { term: "Origine", definition: "Formule empirique adaptée à la morphologie adulte, largement diffusée en médecine générale francophone." },
          { term: "Principe", definition: "Partir de la taille (en cm), retrancher 100, puis ajuster selon le sexe biologique." },
        ],
      },
      formulaBlock([
        "Homme : poids idéal (kg) = T − 100 − (T − 150) / 4",
        "Femme : poids idéal (kg) = T − 100 − (T − 150) / 2,5",
        "T = taille en centimètres",
      ]),
      {
        type: "callout",
        variant: "example",
        paragraphs: [
          "Exemple : pour une femme de 1,68 m (168 cm), le calcul donne 168 − 100 − (168 − 150) / 2,5 ≈ 60,8 kg. C'est une estimation, pas un objectif rigide.",
        ],
      },
      {
        type: "list",
        items: [
          "Avantages : simple, très répandue en France, distingue homme et femme.",
          "Limites : ne tient pas compte de la masse musculaire, de l'âge ni de la morphologie.",
          "Pertinence : repère rapide pour un adulte sans particularité sportive ou médicale majeure.",
        ],
      },
    ]),
    formulaSection("formule-devine", "Formule de Devine", [
      {
        type: "paragraph",
        text: "Publiée en 1974 par Bernard Devine, cette formule a été conçue pour estimer le poids corporel dans un contexte clinique, notamment le calcul de doses médicamenteuses.",
      },
      {
        type: "definition-list",
        items: [
          { term: "Origine", definition: "Étude clinique visant à prédire le poids des patients hospitalisés." },
          { term: "Principe", definition: "Poids de base selon le sexe, auquel s'ajoute un surplus proportionnel à la taille au-delà de 1,52 m (5 pieds)." },
        ],
      },
      formulaBlock([
        "Homme : 50 + 0,91 × (T − 152,4)",
        "Femme : 45,5 + 0,91 × (T − 152,4)",
        "T = taille en centimètres ; résultat en kilogrammes",
      ]),
      {
        type: "list",
        items: [
          "Avantages : base scientifique clinique, encore citée en pharmacologie.",
          "Limites : population hospitalière d'origine, peu adaptée aux sportifs très musclés.",
          "Pertinence : estimation médicale ou comparaison avec d'autres formules internationales.",
        ],
      },
    ]),
    formulaSection("formule-miller", "Formule de Miller", [
      {
        type: "paragraph",
        text: "Proposée en 1983 par D. R. Miller, cette formule affîne les estimations de Devine avec des coefficients légèrement différents, toujours à partir de la taille.",
      },
      formulaBlock([
        "Homme : 56,2 + 1,41 × (T − 152,4)",
        "Femme : 53,1 + 1,36 × (T − 152,4)",
        "T = taille en centimètres",
      ]),
      {
        type: "list",
        items: [
          "Avantages : variante plus récente que Devine, parfois jugée plus proche de certains profils contemporains.",
          "Limites : même logique taille + sexe, sans composition corporelle.",
          "Pertinence : comparaison croisée avec Devine et Robinson dans une fourchette d'estimation.",
        ],
      },
    ]),
    formulaSection("formule-robinson", "Formule de Robinson", [
      {
        type: "paragraph",
        text: "Également publiée en 1983 par J. D. Robinson, cette formule propose une autre calibration à partir des mêmes variables (taille et sexe).",
      },
      formulaBlock([
        "Homme : 52 + 1,9 × (T − 152,4)",
        "Femme : 49 + 1,7 × (T − 152,4)",
        "T = taille en centimètres",
      ]),
      {
        type: "list",
        items: [
          "Avantages : souvent citée aux côtés de Devine et Miller dans les comparatifs cliniques.",
          "Limites : résultats parfois plus bas que Hamwi selon la taille.",
          "Pertinence : utile pour situer une fourchette basse / haute entre plusieurs formules.",
        ],
      },
    ]),
    formulaSection("formule-hamwi", "Formule de Hamwi", [
      {
        type: "paragraph",
        text: "George Hamwi a proposé cette règle en 1964 pour estimer rapidement le poids corporel, notamment dans un contexte de prise en charge du diabète.",
      },
      formulaBlock([
        "Homme : 48 + 2,7 × (T − 152,4)",
        "Femme : 45,5 + 2,2 × (T − 152,4)",
        "T = taille en centimètres",
      ]),
      {
        type: "list",
        items: [
          "Avantages : formule simple, historiquement utilisée en consultation.",
          "Limites : tend à surestimer le poids chez les personnes de grande taille par rapport à Robinson.",
          "Pertinence : repère complémentaire dans une comparaison multi-formules.",
        ],
      },
    ]),
    formulaSection("formule-broca", "Formule de Broca (historique)", [
      {
        type: "paragraph",
        text: "Créée par Paul Broca au XIXᵉ siècle, cette règle empirique est l'une des plus anciennes. Elle reste connue du grand public, même si les formules plus récentes sont souvent préférées en contexte médical.",
      },
      formulaBlock([
        "Formule historique : poids idéal (kg) ≈ taille (cm) − 100",
        "Variante femme parfois citée : (taille − 100) × 0,9",
      ]),
      {
        type: "callout",
        variant: "tip",
        paragraphs: [
          "Bon à savoir : Broca se calcule en tête en quelques secondes, ce qui explique sa popularité. En revanche, elle est moins précise que Lorentz ou les formules cliniques américaines pour les morphologies actuelles.",
        ],
      },
      {
        type: "list",
        items: [
          "Avantages : extrêmement simple, bon ordre de grandeur pédagogique.",
          "Limites : ne distingue pas toujours homme et femme, datée, peu personnalisée.",
          "Pertinence : introduction au sujet ou estimation très rapide, à confirmer avec d'autres repères.",
        ],
      },
      {
        type: "callout",
        variant: "retain",
        paragraphs: [
          "Résumé rapide : six formules, six estimations possibles pour une même taille. C'est normal : chacune traduit une logique différente. L'essentiel est de les lire ensemble, comme une fourchette, pas comme six verdicts contradictoires.",
        ],
      },
    ]),
    {
      id: "tableau-comparatif",
      title: "Tableau comparatif des méthodes",
      blocks: [
        {
          type: "paragraph",
          text: "Ce tableau synthétise les six approches présentées. Utilisez-le comme référence, pas comme arbitre unique : l'écart entre deux lignes est normal. Prochainement, un outil sur le site permettra de comparer automatiquement Lorentz, Devine, Miller, Robinson, Hamwi et Broca à partir de votre taille.",
        },
        {
          type: "table",
          variant: "editorial-comparison",
          caption: "Comparatif des principales formules de poids idéal",
          headers: [
            "Méthode",
            "Année",
            "Créateur",
            "Objectif initial",
            "Utilisation actuelle",
            "Avantages",
            "Limites",
          ],
          rows: [
            [
              "Lorentz",
              "XXᵉ s.",
              "Dr Paul Lorentz",
              "Estimation rapide à partir de la taille",
              "Très répandue en France (grand public, médecine)",
              "Simple, distingue homme / femme",
              "Pas de prise en compte du muscle ou de l'âge",
            ],
            [
              "Devine",
              "1974",
              "Bernard Devine",
              "Prédire le poids en milieu hospitalier",
              "Clinique, pharmacologie (dosages)",
              "Base scientifique publiée",
              "Population d'origine limitée",
            ],
            [
              "Miller",
              "1983",
              "D. R. Miller",
              "Affiner l'estimation de Devine",
              "Comparatifs cliniques",
              "Coefficients actualisés",
              "Même logique taille + sexe",
            ],
            [
              "Robinson",
              "1983",
              "J. D. Robinson",
              "Alternative à Devine",
              "Comparatifs cliniques",
              "Souvent cohérente avec d'autres formules US",
              "Peut sous-estimer selon le profil",
            ],
            [
              "Hamwi",
              "1964",
              "George Hamwi",
              "Estimation en diabétologie",
              "Consultation, enseignement médical",
              "Calcul mental facile",
              "Écarts possibles sur grande taille",
            ],
            [
              "Broca",
              "1871",
              "Paul Broca",
              "Règle empirique universitaire",
              "Culture générale, estimation rapide",
              "Ultra-simple",
              "Historique, peu personnalisée",
            ],
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "À retenir : ce tableau sert à comparer les méthodes entre elles, pas à désigner une seule « gagnante ». Repérez plutôt les convergences et les écarts.",
          ],
        },
      ],
    },
    {
      id: "resultats-differents",
      title: "Pourquoi les résultats sont-ils différents ?",
      blocks: [
        {
          type: "paragraph",
          text: "Obtenir 58 kg avec Lorentz et 62 kg avec Devine pour une même personne n'indique pas que l'une des formules est « fausse ». Les écarts s'expliquent par des choix de modélisation différents.",
        },
        {
          type: "list",
          items: [
            "Populations étudiées différentes (patients hospitalisés, diabète, adultes généraux…).",
            "Objectifs différents (dosage médicamenteux vs repère grand public).",
            "Évolution des connaissances et de la morphologie moyenne depuis le XIXᵉ siècle.",
            "Prise en compte ou non du sexe biologique.",
            "Coefficients de conversion taille / poids calibrés sur des échantillons distincts.",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple : pour 1,75 m, Broca donne environ 75 kg, Lorentz environ 68 kg (homme) et Devine environ 70 kg. La zone plausible se situe souvent entre ces valeurs, pas sur un seul chiffre.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon à savoir : confronter plusieurs formules à la main reste instructif. Un calculateur dédié, en cours de préparation sur Calculer Mon IMC, automatisera cette comparaison pour visualiser la fourchette en quelques secondes.",
          ],
        },
      ],
    },
    {
      id: "viser-exactement",
      title: "Peut-on viser exactement ce poids ?",
      blocks: [
        {
          type: "paragraph",
          text: "Non, et ce n'est pas un échec. Un poids idéal calculé est une estimation centrale : viser au kilogramme près serait interpréter une formule au-delà de ce qu'elle peut dire.",
        },
        {
          type: "list",
          items: [
            "Quelques kilos d'écart autour de l'estimation sont normaux et fréquents.",
            "Le poids varie naturellement dans la journée et au fil des semaines (hydratation, repas, cycle…).",
            "Il vaut mieux raisonner en fourchette qu'en chiffre magique.",
            "Une lente évolution dans le temps compte souvent plus qu'un instantané.",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : notez votre poids actuel, l'estimation obtenue et la date. Observez une tendance sur plusieurs semaines plutôt qu'un écart ponctuel de 1 ou 2 kg.",
          ],
        },
      ],
    },
    {
      id: "limites-poids-ideal",
      title: "Les limites du poids idéal",
      blocks: [
        {
          type: "paragraph",
          text: "Comme l'IMC, les formules de poids idéal simplifient un corps réel. Leurs limites sont reconnues, mais elles n'annulent pas leur utilité lorsqu'on les lit comme des repères.",
        },
        {
          type: "list",
          items: [
            "Masse musculaire : un sportif peut dépasser l'estimation sans excès de graisse.",
            "Masse grasse et répartition des graisses : deux poids identiques, deux compositions possibles.",
            "Morphologie : ossature, carrure, proportions non captées par la taille seule.",
            "Âge : les besoins et la composition corporelle évoluent, surtout après 60 ans.",
            "Situations médicales : grossesse, pathologies chroniques, certains traitements.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Avoir des limites ne signifie pas que ces méthodes sont inutiles. Elles restent des outils de premier niveau, à compléter selon le profil, exactement comme l'IMC.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "comprendre les limites de l'IMC",
          href: "/guides/limites-de-l-imc",
          intro: "Pour la même logique appliquée à l'indice de masse corporelle, voir",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "À retenir : des limites reconnues ne rendent pas ces formules inutiles. Elles restent des repères de premier niveau, à compléter selon votre profil et votre contexte.",
          ],
        },
      ],
    },
    {
      id: "indicateurs-complementaires",
      title: "Quels indicateurs compléter avec le poids idéal ?",
      blocks: [
        {
          type: "paragraph",
          text: "Un poids idéal estimé gagne en pertinence lorsqu'il est croisé avec d'autres repères. Aucun ne suffit seul, mais leur combinaison affine la lecture.",
        },
        {
          type: "list",
          items: [
            "IMC : situe le poids actuel par rapport à la taille (fourchette OMS 18,5 à 24,9).",
            "Tour de taille : repère sur la graisse viscérale et l'adiposité abdominale.",
            "Activité physique : nuance un poids élevé ou un écart à l'estimation.",
            "Évolution du poids dans le temps : tendance plus informative qu'un instantané.",
            "Contexte médical : antécédents, traitements, symptômes, bilan biologique.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Comment interpréter son IMC ?",
          href: "/guides/comment-interpreter-son-imc",
          intro: "Pour lire votre IMC actuel par catégorie OMS, consultez",
        },
      ],
    },
    {
      id: "quel-calcul-choisir",
      title: "Quel calcul choisir selon votre besoin ?",
      blocks: [
        {
          type: "paragraph",
          text: "Plutôt que de chercher « la meilleure » formule une fois pour toutes, identifiez ce que vous voulez faire. Voici des orientations pratiques.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Estimer rapidement un poids de référence",
              description: "Lorentz ou Broca : calcul simple à partir de la taille, idéal pour un premier ordre de grandeur.",
            },
            {
              title: "Connaître votre IMC actuel",
              description: "Le calculateur IMC croise poids et taille selon la formule OMS.",
              href: "/",
              linkLabel: "Calculateur IMC",
            },
            {
              title: "Comprendre votre résultat d'IMC",
              description: "Catégories, exemples et lecture prudente selon votre profil.",
              href: "/guides/comment-interpreter-son-imc",
              linkLabel: "Comment interpréter son IMC ?",
            },
            {
              title: "Comparer plusieurs formules de poids idéal",
              description:
                "Calculez Lorentz, Devine, Miller, Robinson, Hamwi et Broca pour visualiser une fourchette, plutôt qu'un chiffre unique.",
              href: "/calculateurs/poids-ideal",
              linkLabel: "Calculateur de poids idéal",
            },
            {
              title: "Savoir si votre poids est cohérent avec votre santé",
              description: "Croisez estimation, IMC, tour de taille et avis médical si besoin.",
              href: "/guides/limites-de-l-imc",
              linkLabel: "connaître les limites de l'indicateur",
            },
          ],
        },
      ],
    },
    {
      id: "poursuivre",
      title: "Comment poursuivre sur le site ?",
      blocks: [
        {
          type: "paragraph",
          text: "Vous disposez désormais d'une vue d'ensemble sur les méthodes de poids idéal. Voici la suite logique pour passer à la pratique, puis croiser avec l'IMC.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Comparer les formules sur le calculateur",
              description:
                "Obtenez une fourchette de poids idéal à partir de votre taille et de votre sexe.",
              href: "/calculateurs/poids-ideal",
              linkLabel: "Estimer mon poids idéal",
            },
            {
              title: "Calculer votre IMC",
              description: "Obtenez votre indice actuel à partir de votre taille et de votre poids.",
              href: "/",
              linkLabel: "Calculateur IMC",
            },
            {
              title: "Interpréter votre IMC",
              description: "Comprendre les catégories OMS et les exemples concrets de lecture.",
              href: "/guides/comment-interpreter-son-imc",
              linkLabel: "Comment interpréter son IMC ?",
            },
            {
              title: "Connaître les limites de l'IMC",
              description: "Pourquoi l'indicateur reste utile malgré ses biais.",
              href: "/guides/limites-de-l-imc",
              linkLabel: "pourquoi l'IMC possède des limites",
            },
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Existe-t-il vraiment un poids idéal ?",
      answer:
        "Probablement pas au sens d'un chiffre universel valable pour toute personne de même taille. En revanche, plusieurs méthodes permettent d'estimer un poids de référence ou une fourchette cohérente. Ces estimations sont utiles lorsqu'elles sont interprétées comme un repère, pas comme une obligation.",
    },
    {
      question: "Quelle est la meilleure formule de poids idéal ?",
      answer:
        "Il n'y en a pas une seule. Lorentz est très répandue en France pour un repère grand public. Devine, Miller, Robinson et Hamwi sont plutôt utilisées en contexte clinique ou comparatif. Broca reste pédagogique mais plus approximative. La « meilleure » formule est celle que vous lisez en connaissant ses limites et en la croisant avec d'autres indicateurs.",
    },
    {
      question: "Pourquoi Lorentz et Devine donnent-elles un résultat différent ?",
      answer:
        "Parce qu'elles ont été conçues à des époques, sur des populations et pour des objectifs différents. Lorentz vise une estimation empirique à partir de la taille ; Devine a été calibrée sur des patients hospitalisés pour prédire le poids réel. Un écart de quelques kilos est normal.",
    },
    {
      question: "Quelle méthode utilisent les médecins ?",
      answer:
        "En consultation, le médecin s'appuie rarement sur une seule formule. Il observe le poids réel, l'IMC, l'évolution dans le temps, le tour de taille et le contexte clinique. Devine ou Robinson peuvent servir en l'absence de pesée, surtout en milieu hospitalier, mais ce ne sont pas des références exclusives.",
    },
    {
      question: "Quelle formule est la plus fiable ?",
      answer:
        "Fiable pour estimer un ordre de grandeur, pas pour prédire la santé individuelle. Les formules cliniques (Devine, Robinson, Miller) reposent sur des publications ; Lorentz s'appuie sur un long usage en médecine générale francophone. Aucune ne remplace une évaluation personnalisée.",
    },
    {
      question: "Le poids idéal change-t-il avec l'âge ?",
      answer:
        "Les formules classiques ne l'intègrent pas explicitement. Or la composition corporelle évolue avec l'âge : masse musculaire, masse grasse et besoins énergétiques changent. Chez le senior, un poids stable dans une fourchette acceptable peut être plus pertinent qu'une formule conçue pour un adulte « standard ».",
    },
    {
      question: "Les sportifs doivent-ils utiliser ces méthodes ?",
      answer:
        "Avec prudence. Une forte masse musculaire peut faire dépasser l'estimation sans que cela signifie un excès de graisse. Les sportifs gagnent à privilégier l'IMC, la composition corporelle et le suivi médical ou sportif plutôt qu'un poids théorique unique.",
    },
    {
      question: "Le poids idéal est-il le même pour les hommes et les femmes ?",
      answer:
        "Non, pour une même taille. La plupart des formules (Lorentz, Devine, Miller, Robinson, Hamwi) appliquent des coefficients différents selon le sexe biologique. Broca, dans sa version la plus simple, ne distingue pas toujours homme et femme.",
    },
    {
      question: "Peut-on être en bonne santé sans être à son poids idéal ?",
      answer:
        "Oui. Un écart de quelques kilos autour de l'estimation est fréquent et compatible avec un bon état de forme. La santé dépend aussi de l'activité physique, de l'alimentation, du sommeil, du stress et de facteurs médicaux que les formules ne mesurent pas.",
    },
    {
      question: "Faut-il absolument atteindre son poids idéal ?",
      answer:
        "Non. Ces calculs proposent une estimation, pas un objectif impératif. Fixer un poids « parfait » au kilogramme près peut même être contre-productif. L'essentiel est une trajectoire globale cohérente avec votre santé et votre ressenti, discutée avec un professionnel si besoin.",
    },
    {
      question: "Comment calculer son poids idéal à partir de l'IMC ?",
      answer:
        "Multipliez les bornes de la zone IMC normale (18,5 et 24,9) par le carré de votre taille en mètres. Vous obtenez une fourchette de poids en kg, par exemple entre 53,5 et 72 kg pour 1,70 m. C'est une autre approche, complémentaire aux formules Lorentz ou Devine.",
    },
    {
      question: "Quel poids idéal pour un homme ou une femme de 1,70 m ?",
      answer:
        "Cela dépend de la formule et du sexe. À titre indicatif : Lorentz donne environ 65 kg (homme) ou 63 kg (femme) ; Devine environ 68 kg (homme) ou 61 kg (femme). La fourchette IMC normal correspond à environ 53,5 à 72 kg. Utilisez ces valeurs comme repères, pas comme cibles strictes.",
    },
  ],
  faqTitle: "Questions fréquentes sur le poids idéal",
  faqIntro:
    "Formules, fiabilité, écarts entre méthodes et objectifs : réponses pour calculer et interpréter un poids idéal avec discernement.",
  conclusion: {
    keyPoints: [
      "Le poids idéal absolu n'existe probablement pas, mais les estimations restent utiles.",
      "Chaque formule reflète une époque, une population et un objectif précis.",
      "Comparez plusieurs méthodes pour visualiser une fourchette, pas un chiffre unique.",
      "Croisez toujours avec l'IMC, le tour de taille et votre contexte personnel.",
    ],
    closingText:
      "Les différentes méthodes ne permettent pas de déterminer un poids parfait, mais elles offrent un excellent repère lorsqu'elles sont utilisées avec discernement. Interprétez-les comme une estimation, jamais comme une obligation.",
    closingPathway:
      "Pour poursuivre : comparez d'abord les formules avec le calculateur de poids idéal, puis croisez avec votre IMC et ses limites. Chaque étape complète la précédente sans la remplacer.",
    closingCta: { label: "Estimer mon poids idéal", href: "/calculateurs/poids-ideal" },
    secondaryLinks: [
      { label: "Calculateur IMC", href: "/" },
      { label: "connaître les limites de l'indicateur", href: "/guides/limites-de-l-imc" },
    ],
  },
  postConclusion: {
    summary: {
      id: "en-resume",
      title: "En résumé",
      blocks: [
        {
          type: "list",
          items: [
            "Calculer son poids idéal, c'est obtenir une estimation de référence, pas un objectif absolu.",
            "Lorentz, Devine, Miller, Robinson, Hamwi et Broca : six approches complémentaires, parfois divergentes.",
            "Les écarts entre formules s'expliquent par leur origine et leur objectif, pas par une « erreur ».",
            "Quelques kilos autour de l'estimation sont normaux ; raisonnez en fourchette.",
            "Croisez avec l'IMC, le tour de taille, l'activité et le contexte médical.",
            "Seul un professionnel de santé peut interpréter correctement une situation individuelle.",
          ],
        },
      ],
    },
    sources: {
      id: "sources",
      title: "Sources et références",
      blocks: [
        {
          type: "paragraph",
          text: "Formules, usage clinique et repères de corpulence : les références ci-dessous complètent ce guide.",
        },
        {
          type: "source-list",
          items: [
            {
              org: "Organisation mondiale de la Santé",
              title: "Obésité et surpoids",
              year: "2024",
              href: "https://www.who.int/fr/news-room/fact-sheets/detail/obesity-and-overweight",
            },
            {
              org: "Assurance Maladie",
              title: "IMC, surpoids et obésité chez l'adulte",
              year: "2024",
              href: "https://www.ameli.fr/assure/sante/themes/obesite-adulte/imc-surpoids-obesite-adulte",
            },
            {
              org: "Haute Autorité de santé",
              title: "Surpoids et obésité de l'adulte",
              year: "2024",
              href: "https://www.has-sante.fr/jcms/c_2025619/fr/surpoids-et-obesite-de-l-adulte",
            },
          ],
        },
      ],
    },
    editorialNote: {
      title: "Note éditoriale",
      paragraphs: [
        "Ce contenu est proposé à des fins pédagogiques et ne remplace pas une consultation médicale.",
        "Antoine, auteur de Calculer Mon IMC, n'est ni médecin ni nutritionniste. En cas de doute, consultez un professionnel de santé.",
      ],
    },
  },
  sidebar: imcGuideSidebar([
    { title: "Comment interpréter son IMC ?", href: "/guides/comment-interpreter-son-imc" },
    { title: "Les limites de l'IMC", href: "/guides/limites-de-l-imc" },
    { title: "Comment calculer son IMC ?", href: "/guides/comment-calculer-son-imc" },
  ]),
};
