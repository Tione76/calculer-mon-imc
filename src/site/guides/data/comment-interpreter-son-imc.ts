import type { Guide } from "../types";
import { imcGuideSidebar } from "./guide-imc-shared";

/** Seuils adultes alignés sur le calculateur, l'OMS et l'Assurance Maladie. */
const IMC_ADULT_CATEGORIES_ROWS: string[][] = [
  ["Insuffisance pondérale", "< 18,5", "Repère en dessous du seuil adulte habituel"],
  ["Corpulence normale", "18,5 à 24,9", "Repère dans la fourchette adulte de référence"],
  ["Surpoids", "25 à 29,9", "Repère au-dessus de la corpulence normale"],
  ["Obésité modérée (classe I)", "30 à 34,9", "Première classe d'obésité selon la grille OMS"],
  ["Obésité sévère (classe II)", "35 à 39,9", "Deuxième classe d'obésité"],
  ["Obésité massive (classe III)", "≥ 40", "Troisième classe d'obésité"],
];

export const commentInterpreterSonImcGuide: Guide = {
  slug: "comment-interpreter-son-imc",
  title: "Comment interpréter votre IMC ?",
  seoTitle: "Comment interpréter votre IMC ? Maigreur, surpoids et obésité",
  description:
    "Découvrez comment interpréter le résultat de votre IMC grâce aux différentes catégories de corpulence. Retrouvez des exemples concrets pour mieux comprendre votre résultat.",
  subtitle:
    "Votre chiffre est calculé : découvrez ce qu'il représente réellement, où le situer parmi les catégories OMS et pourquoi le contexte compte toujours.",
  publishedAt: "2026-07-20",
  updatedAt: "2026-07-22",
  introduction: [
    "Vous venez d'obtenir un chiffre, et la vraie question arrive aussitôt : que signifie-t-il concrètement pour vous ? Retenez d'emblée que l'IMC est un repère statistique, pas un diagnostic individuel : il évalue votre corpulence par rapport à des seuils de référence, sans raconter toute votre histoire de santé.",
    "Les catégories OMS adultes aident à mettre ce résultat en perspective, mais elles restent des grilles populationnelles. Morphologie, âge, masse musculaire, mode de vie : autant d'éléments qui nuancent la lecture d'un même chiffre.",
  ],
  introDisclaimer:
    "Contenu à visée pédagogique : il ne remplace pas un avis médical personnalisé.",
  quickSummary: {
    title: "Interpréter son IMC en bref",
    variant: "cards",
    items: [],
    cards: [
      { icon: "◎", label: "Nature", value: "Indicateur statistique, pas un diagnostic" },
      { icon: "÷", label: "Mesure", value: "Relation entre poids et taille" },
      { icon: "✗", label: "Ne mesure pas", value: "Masse grasse, muscle, santé globale" },
      { icon: "▦", label: "Référence adulte", value: "Six catégories OMS (18,5 à 40+)" },
      { icon: "⚖", label: "Lecture", value: "Toujours contextualiser le résultat" },
      { icon: "!", label: "Limite clé", value: "Seul un professionnel peut trancher un cas individuel" },
    ],
  },
  sections: [
    {
      id: "signification",
      title: "Que représente réellement votre IMC ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'IMC résume la relation entre votre poids et votre taille en un seul nombre. C'est un repère de corpulence, utilisé en santé publique et repris par l'Assurance Maladie pour situer un adulte parmi des catégories de référence.",
        },
        {
          type: "paragraph",
          text: "Ce qu'il indique : à quel point votre poids est important par rapport à votre stature, au regard des seuils OMS. Ce qu'il n'indique pas : votre masse grasse, votre masse musculaire, votre tour de taille, votre alimentation, votre condition physique ou votre état de santé global.",
        },
        {
          type: "table",
          variant: "imc-permits",
          caption: "Ce que l'IMC permet de lire, et ce qu'il ne permet pas",
          headers: ["L'IMC aide à…", "L'IMC ne permet pas, à lui seul, de…"],
          rows: [
            ["Situer une corpulence chez l'adulte", "Poser un diagnostic médical"],
            ["Repérer une catégorie statistique (normal, surpoids…)", "Mesurer directement la masse grasse"],
            ["Suivre une évolution dans le temps", "Distinguer muscle et graisse"],
            ["Ouvrir une réflexion sur le poids", "Décrire toute la santé d'une personne"],
            ["Comparer des données de population", "Remplacer un examen clinique"],
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Deux personnes affichant exactement le même IMC peuvent avoir une composition corporelle totalement différente : l'une très musclée, l'autre avec davantage de masse grasse. Le chiffre ouvre une analyse, il ne la clôt pas.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Qu'est-ce que l'IMC ?",
          href: "/guides/quest-ce-que-l-imc",
          intro: "Pour la définition, l'origine et le rôle de l'indicateur dans le cocon IMC, consultez",
        },
      ],
    },
    {
      id: "categories-oms",
      title: "Les catégories OMS pour adultes",
      blocks: [
        {
          type: "paragraph",
          text: "Chez l'adulte, l'OMS distingue six catégories à partir de seuils fixés par tranches d'IMC. L'Assurance Maladie reprend cette classification pour informer le grand public. Ce ne sont pas des verdicts individuels, mais des repères communs.",
        },
        {
          type: "table",
          variant: "imc-categories",
          caption: "Classification OMS de l'IMC chez l'adulte",
          headers: ["Catégorie", "IMC", "Lecture du repère"],
          rows: IMC_ADULT_CATEGORIES_ROWS,
          footnote:
            "Seuils applicables aux adultes. Chez l'enfant et l'adolescent, l'analyse repose sur des courbes spécifiques (âge et sexe).",
        },
        {
          type: "paragraph",
          text: "Pourquoi 18,5, 25, 30, 35 et 40 ? Ces valeurs ont été retenues pour comparer des populations et repérer des tendances en santé publique (surpoids, obésité). Elles structurent la lecture statistique : elles ne servent pas à juger une personne isolée ni à poser un diagnostic.",
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Comment calculer son IMC ?",
          href: "/guides/comment-calculer-son-imc",
          intro: "Si vous souhaitez vérifier d'où vient votre chiffre avant de le lire, reportez-vous au guide",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon à savoir : un IMC « normal » (18,5 à 24,9) signifie que votre poids est cohérent avec votre taille selon cette grille. Cela n'équivaut pas automatiquement à une santé optimale.",
          ],
        },
        {
          type: "callout",
          variant: "hint",
          paragraphs: [
            "Astuce : comparez votre résultat arrondi à une décimale, comme sur notre calculateur, pour vous situer dans le tableau.",
          ],
        },
      ],
    },
    {
      id: "lire-resultat",
      title: "Comment lire son résultat simplement",
      blocks: [
        {
          type: "paragraph",
          text: "Placez votre chiffre dans le tableau ci-dessus, puis lisez la catégorie correspondante. Voici comment aborder chaque fourchette, sans diagnostic ni promesse.",
        },
        {
          type: "list",
          items: [
            "IMC inférieur à 18,5 : insuffisance pondérale selon la grille adulte. Un écart modéré mérite d'être discuté avec un professionnel si vous avez des questions.",
            "IMC entre 18,5 et 24,9 : corpulence normale selon les repères OMS. Le contexte (composition corporelle, mode de vie) reste déterminant.",
            "IMC entre 25 et 29,9 : surpoids statistique. Cela oriente une réflexion, sans présumer d'un problème de santé.",
            "IMC à partir de 30 : obésité selon la classification OMS (classes I, II ou III selon le niveau). Seul un bilan personnalisé permet une interprétation fiable.",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Attention : situer un chiffre dans une catégorie n'est pas un diagnostic. Un IMC élevé n'est pas forcément alarmant ; un IMC normal n'est pas une garantie de santé.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          label: "Calculateur IMC",
          href: "/",
          intro: "Vous n'avez pas encore votre résultat ? Passez par le",
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Comment calculer son IMC ?",
          href: "/guides/comment-calculer-son-imc",
          intro: "Pour la formule, les conversions et les erreurs de saisie, voir le guide",
        },
      ],
    },
    {
      id: "exemples",
      title: "Exemples concrets : que signifie chaque IMC ?",
      blocks: [
        {
          type: "paragraph",
          text: "Neuf chiffres, neuf situations types, dont plusieurs au voisinage des seuils OMS. Chaque ligne indique la catégorie et la nuance à garder en tête. Aucun de ces exemples ne remplace une évaluation individuelle.",
        },
        {
          type: "table",
          variant: "imc-categories",
          caption: "Si votre IMC est…",
          headers: ["IMC", "Catégorie OMS", "Lecture prudente"],
          rows: [
            [
              "17,9",
              "Insuffisance pondérale",
              "Sous le seuil de 18,5. Proche de la limite basse : la tendance récente et le ressenti comptent autant que la catégorie affichée.",
            ],
            [
              "18,9",
              "Insuffisance pondérale",
              "Proche du seuil normal (18,5). La marge est fine : le contexte (appétit, fatigue, évolution récente) compte autant que le chiffre.",
            ],
            [
              "22,0",
              "Corpulence normale",
              "Au centre de la fourchette de référence. Repère rassurant statistiquement, sans résumer pour autant votre santé globale.",
            ],
            [
              "24,8",
              "Corpulence normale",
              "Toujours « normal », mais proche du seuil de surpoids (25). Un léger écart de poids peut faire basculer la catégorie sans changement visible majeur.",
            ],
            [
              "24,9",
              "Corpulence normale",
              "Dernière valeur de la tranche « normale ». Statistiquement normal, à relativiser si le tour de taille ou la composition corporelle vous interpellent.",
            ],
            [
              "25,1",
              "Surpoids",
              "Juste au-dessus du repère. Statistiquement en surpoids, sans que cela signifie automatiquement un risque accru pour vous.",
            ],
            [
              "29,0",
              "Surpoids",
              "Haut de la tranche surpoids, proche de l'obésité (30). Un bon moment pour contextualiser : morphologie, activité, antécédents.",
            ],
            [
              "31,0",
              "Obésité modérée (classe I)",
              "Première classe d'obésité OMS. Le repère mérite une analyse approfondie avec un professionnel, surtout si le chiffre est nouveau ou en hausse.",
            ],
            [
              "34,8",
              "Obésité modérée (classe I)",
              "Proche du seuil de classe II (35). La catégorie structure la lecture, sans remplacer un bilan personnalisé.",
            ],
            [
              "39,8",
              "Obésité sévère (classe II)",
              "Juste avant la classe III (40). Encore une zone de transition où le contexte et l'évolution priment sur le seul libellé.",
            ],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "Exemple : 24,8 et 25,1 ne diffèrent que de 0,3 point, mais changent de catégorie. C'est pourquoi les seuils se lisent avec recul, surtout près des limites.",
          ],
        },
      ],
    },
    {
      id: "seuils-limites",
      title: "Pourquoi un chiffre proche d'un seuil demande de la prudence",
      blocks: [
        {
          type: "paragraph",
          text: "Les catégories OMS découpent un continuum en tranches (18,5, 25, 30, 35, 40). Or, la réalité corporelle ne change pas du jour au lendemain quand on franchit un seuil.",
        },
        {
          type: "list",
          items: [
            "Un IMC à 24,9 et un autre à 25,1 appartiennent à des catégories différentes, avec une différence minime sur le plan biologique.",
            "L'arrondi du calculateur peut faire basculer l'affichage d'une catégorie à l'autre.",
            "Une variation de poids de quelques kilos suffit parfois à changer de tranche, sans modification profonde de la composition corporelle.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "À retenir : les seuils structurent la lecture statistique. Ils ne tranchent pas, à eux seuls, la situation d'une personne proche de la limite.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Calculer son poids idéal",
          href: "/guides/calculer-son-poids-ideal",
          intro: "Pour estimer une fourchette de poids cohérente avec un IMC normal, sans chiffre magique, voir",
        },
      ],
    },
    {
      id: "limites-interpretation",
      title: "Les limites de l'interprétation selon votre profil",
      blocks: [
        {
          type: "paragraph",
          text: "Les seuils adultes OMS sont pensés pour une population générale. Ils perdent en pertinence dès que le profil s'écarte de la « norme statistique ». Ce n'est pas que l'IMC « ne marche pas » : c'est que sa lecture demande plus de contexte.",
        },
        {
          type: "table",
          variant: "imc-categories",
          caption: "Profils pour lesquels l'interprétation change",
          headers: ["Profil", "Pourquoi la lecture diffère", "Piste de lecture"],
          rows: [
            [
              "Sportif très musclé",
              "La masse musculaire alourdit le poids sans excès de graisse",
              "IMC élevé possible avec une composition corporelle saine",
            ],
            [
              "Personne âgée",
              "Masse musculaire parfois réduite malgré un poids stable",
              "IMC normal possible avec une masse grasse relative plus élevée",
            ],
            [
              "Adolescent",
              "Corps en croissance, proportions changeantes",
              "Courbes percentiles (âge + sexe), pas les seuils adultes",
            ],
            [
              "Enfant",
              "IMC varie fortement avec l'âge",
              "Courbes de référence pédiatriques uniquement",
            ],
            [
              "Femme enceinte",
              "Poids physiologiquement modifié",
              "IMC habituel non applicable pendant la grossesse",
            ],
            [
              "Certaines morphologies",
              "Corpulence, répartition des graisses, antécédents",
              "Tour de taille et examen clinique complètent l'IMC",
            ],
            [
              "Personne amputée ou stature modifiée",
              "La taille de référence peut être difficile à estimer",
              "L'IMC calculé perd en fiabilité ; avis professionnel recommandé",
            ],
            [
              "Très grande taille",
              "Proportions parfois éloignées de la « norme statistique »",
              "Repère à relativiser ; le contexte prime",
            ],
            [
              "Maladies chroniques",
              "Rétention d'eau, inflammation, certains traitements",
              "Le poids fluctue indépendamment de la masse grasse",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Ces situations n'invalident pas l'IMC : elles rappellent qu'un repère populationnel ne suffit pas toujours. Pour une analyse fine de ces cas, le guide sur les limites de l'IMC détaille chaque profil.",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : si vous vous reconnaissez dans l'un de ces profils, considérez votre IMC comme un premier repère, pas comme une conclusion.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          label: "estimer votre masse grasse",
          href: "/calculateurs/masse-grasse",
          intro:
            "Lorsque muscle et graisse expliquent mieux le résultat que le seul poids, vous pouvez",
        },
      ],
    },
    {
      id: "pas-seul",
      title: "Pourquoi un IMC ne suffit jamais à lui seul",
      blocks: [
        {
          type: "paragraph",
          text: "En consultation, un médecin ne se contente pas d'un chiffre. L'IMC entre dans un ensemble d'informations qui permettent de comprendre une situation individuelle. C'est cette logique qu'il faut garder en tête en lisant votre résultat.",
        },
        {
          type: "list",
          items: [
            "Tour de taille et répartition des graisses (notamment abdominales).",
            "Antécédents médicaux et traitements en cours.",
            "Tension artérielle, bilan sanguin si pertinent.",
            "Activité physique et sédentarité.",
            "Alimentation et rythme de vie.",
            "Évolution du poids sur plusieurs mois ou années.",
            "Contexte général : fatigue, douleurs, changements récents.",
          ],
        },
        {
          type: "paragraph",
          text: "L'Assurance Maladie rappelle que l'IMC est un repère utile, mais qu'il doit s'inscrire dans une évaluation globale. Deux personnes avec le même chiffre peuvent avoir des parcours de santé très différents, et une composition corporelle opposée malgré un indice identique.",
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Qu'est-ce que l'IMC ?",
          href: "/guides/quest-ce-que-l-imc",
          intro: "Pour replacer l'indicateur dans son rôle de repère statistique, consultez",
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "pourquoi l'IMC possède des limites",
          href: "/guides/limites-de-l-imc",
          intro: "Pour les profils où l'indicateur se lit autrement, voir",
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "L'IMC est un excellent point de départ. Il n'est jamais le point d'arrivée.",
          ],
        },
      ],
    },
    {
      id: "erreurs-interpretation",
      title: "Erreurs fréquentes dans l'interprétation",
      blocks: [
        {
          type: "table",
          variant: "imc-categories",
          caption: "Ce qu'il vaut mieux éviter",
          headers: ["Erreur de lecture", "Pourquoi c'est insuffisant", "Approche plus juste"],
          rows: [
            [
              "« Mon IMC est normal, donc tout va bien »",
              "Un IMC normal n'exclut pas une masse grasse abdominale ou un mode de vie déséquilibré",
              "Regarder aussi le tour de taille, l'activité, le ressenti",
            ],
            [
              "« Mon IMC est élevé, je suis en mauvaise santé »",
              "Un sportif musclé ou une personne en bonne forme peut afficher un IMC élevé",
              "Contextualiser : morphologie, antécédents, examens",
            ],
            [
              "« Je compare mon IMC à celui d'un enfant ou d'un ado »",
              "Les seuils adultes ne s'appliquent pas de la même façon",
              "Utiliser les courbes adaptées à l'âge",
            ],
            [
              "« Un dixième de point change tout »",
              "Les catégories sont des tranches, pas des frontières biologiques nettes",
              "Lire la tendance et le contexte, surtout près d'un seuil",
            ],
            [
              "« Mon IMC suffit pour décider de perdre ou prendre du poids »",
              "Objectif de poids sans bilan = décision prématurée",
              "En parler à un professionnel en cas de doute",
            ],
            [
              "« Je veux absolument atteindre un IMC de 22 »",
              "Chasse à un chiffre sans tenir compte de la morphologie ni du contexte",
              "Viser une fourchette cohérente avec son profil, pas un nombre universel",
            ],
            [
              "« Je compare mon IMC à celui d'un influenceur »",
              "Tailles, masses musculaires et compositions différentes",
              "Analyser son propre résultat, pas celui d'autrui",
            ],
            [
              "« Un IMC normal, donc pas de graisse abdominale »",
              "L'IMC ne mesure pas la répartition des graisses",
              "Compléter avec le tour de taille et le ressenti corporel",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Ni alarmisme, ni fausse tranquillité : l'IMC informe, il ne tranche pas. C'est la nuance centrale de toute lecture sérieuse.",
          ],
        },
      ],
    },
    {
      id: "consulter",
      title: "Quand consulter un professionnel de santé ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'IMC est un indicateur, pas un diagnostic. Dans la plupart des cas, le situer dans une catégorie suffit pour orienter une réflexion personnelle. Certains signaux méritent en revanche d'être évoqués avec un médecin ou un autre professionnel de santé.",
        },
        {
          type: "list",
          items: [
            "Perte ou prise de poids rapide et inexpliquée (plusieurs kilos en quelques semaines sans cause identifiée).",
            "Votre IMC a nettement changé en peu de temps, sans modification volontaire de l'alimentation ou de l'activité.",
            "Vous vous interrogez sur votre poids, votre alimentation ou votre forme.",
            "Vous êtes proche d'un seuil et le chiffre vous inquiète ou vous obsède.",
            "Vous avez des antécédents médicaux, un traitement en cours ou des symptômes associés.",
            "Vous êtes enceinte, adolescente, ou vous interrogez sur l'IMC d'un enfant.",
            "Vous envisagez un changement alimentaire ou une perte de poids importante.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "connaître les limites de l'indicateur",
          href: "/guides/limites-de-l-imc",
          intro: "Si votre profil sort de la norme statistique, reportez-vous au guide pour",
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : notez votre IMC, la date, vos mesures et vos questions avant la consultation. Vous gagnerez en clarté et en temps de dialogue.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon à savoir : consulter n'est pas « alarmer le médecin ». C'est lui permettre de replacer votre IMC dans votre situation réelle.",
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
          text: "Vous savez lire votre catégorie et garder le recul nécessaire. Voici la suite logique pour approfondir sur Calculer Mon IMC.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Vérifier ou recalculer votre IMC",
              description: "Confirmez votre chiffre avec le simulateur, dans les mêmes conditions de mesure.",
              href: "/",
              linkLabel: "Calculer mon IMC",
            },
            {
              title: "Revenir aux fondamentaux",
              description: "Définition, origine et rôle de l'indicateur : utile pour replacer votre résultat.",
              href: "/guides/quest-ce-que-l-imc",
              linkLabel: "Qu'est-ce que l'IMC ?",
            },
            {
              title: "Maîtriser le calcul",
              description: "Formule, conversions et pièges de saisie : pour comprendre d'où vient votre chiffre.",
              href: "/guides/comment-calculer-son-imc",
              linkLabel: "Comment calculer son IMC ?",
            },
            {
              title: "Approfondir les limites",
              description: "Profils atypiques, biais et cas particuliers : quand relativiser le repère.",
              href: "/guides/limites-de-l-imc",
              linkLabel: "comprendre les limites de l'IMC",
            },
            {
              title: "Estimer une fourchette de poids",
              description: "Un repère chiffré cohérent avec un IMC normal, sans objectif universel.",
              href: "/guides/calculer-son-poids-ideal",
              linkLabel: "Poids idéal : méthode et limites",
            },
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Que signifie mon IMC concrètement ?",
      answer:
        "Votre IMC situe votre corpulence par rapport à des seuils OMS adultes (insuffisance pondérale, normal, surpoids, obésité). C'est un repère statistique : il indique dans quelle tranche se place votre rapport poids/taille, sans décrire votre masse grasse, votre muscle ni votre santé globale. Pour une lecture personnalisée, le contexte et, si besoin, un professionnel de santé restent indispensables.",
    },
    {
      question: "Mon IMC est-il normal ?",
      answer:
        "Un IMC entre 18,5 et 24,9 correspond à la catégorie « corpulence normale » chez l'adulte, selon la grille OMS reprise par l'Assurance Maladie. « Normal » signifie cohérent avec la taille au regard de cette classification, pas automatiquement « en parfaite santé ». Tour de taille, mode de vie et antécédents complètent toujours la lecture.",
    },
    {
      question: "Mon IMC est de 25 : suis-je en surpoids ?",
      answer:
        "Statistiquement, un IMC à partir de 25 entre dans la catégorie surpoids chez l'adulte. À 25,0 exactement, vous êtes au seuil : la différence avec 24,9 est minime sur le plan biologique. Le mot « surpoids » décrit un repère populationnel, pas un diagnostic. Morphologie, masse musculaire et état de santé général modifient la lecture.",
    },
    {
      question: "Un IMC élevé signifie-t-il que je suis en mauvaise santé ?",
      answer:
        "Pas nécessairement. Un IMC élevé indique un poids important par rapport à la taille selon la grille OMS. Un sportif musclé peut afficher un IMC en surpoids sans excès de graisse. À l'inverse, un IMC élevé peut aussi refléter un excès de masse grasse. Seul un bilan individualisé, idéalement avec un professionnel, permet une interprétation fiable.",
    },
    {
      question: "Un IMC faible est-il inquiétant ?",
      answer:
        "Un IMC inférieur à 18,5 relève de l'insuffisance pondérale selon les repères adultes. Cela mérite attention, surtout si le chiffre est bas, en baisse récente ou associé à fatigue, perte d'appétit ou autres symptômes. Proche du seuil (18,4 ou 18,6), la marge est fine : le contexte compte autant que la catégorie.",
    },
    {
      question: "Pourquoi mon IMC diffère-t-il de celui d'un proche de même taille ?",
      answer:
        "L'IMC dépend du poids, pas de la morphologie visuelle. Deux personnes de 1,70 m avec des IMC différents ont simplement des poids différents. Masse musculaire, répartition des graisses et ossature expliquent pourquoi deux silhouettes comparables peuvent afficher des chiffres éloignés.",
    },
    {
      question: "L'interprétation est-elle la même pour les femmes et les hommes ?",
      answer:
        "Oui pour les seuils adultes OMS : les catégories sont identiques. En revanche, la composition corporelle diffère statistiquement entre les sexes (masse grasse, masse musculaire). Un même IMC peut donc correspondre à des réalités morphologiques différentes. Le contexte prime sur la catégorie seule.",
    },
    {
      question: "Comment interpréter l'IMC d'un enfant ou d'un adolescent ?",
      answer:
        "Les seuils adultes ne s'appliquent pas. Chez l'enfant et l'adolescent, l'interprétation repose sur des courbes de croissance tenant compte de l'âge et du sexe (percentiles). Un IMC « normal » adulte serait inadapté. En cas de question sur un mineur, un pédiatre ou un professionnel de santé est la bonne porte d'entrée.",
    },
    {
      question: "Un IMC normal garantit-il une bonne santé ?",
      answer:
        "Non. Une corpulence normale selon l'IMC n'indique ni une alimentation équilibrée, ni une bonne condition physique, ni l'absence de problème de santé. Une personne peut avoir un IMC normal avec une masse grasse abdominale significative ou un mode de vie sédentaire. L'IMC est un repère parmi d'autres.",
    },
    {
      question: "Faut-il s'inquiéter si mon IMC est juste au-dessus ou en dessous d'un seuil ?",
      answer:
        "Un écart minime (24,8 vs 25,1, 18,4 vs 18,6) change la catégorie affichée, pas forcément la réalité corporelle. Regardez la tendance dans le temps, votre ressenti et, si besoin, d'autres indicateurs (tour de taille, examen médical). L'inquiétude ou la satisfaction ne devraient pas reposer sur un dixième de point.",
    },
    {
      question: "L'IMC suffit-il pour savoir si je dois perdre du poids ?",
      answer:
        "Non. L'IMC oriente une réflexion, il ne prescrit pas d'objectif. Perte ou prise de poids dépend de votre historique, de votre santé, de votre mode de vie et d'une évaluation individualisée. Un professionnel de santé peut vous aider à déterminer si un changement est pertinent, et sous quelle forme.",
    },
    {
      question: "Où trouver les catégories officielles de l'IMC ?",
      answer:
        "L'OMS publie les repères de surpoids et d'obésité utilisés internationalement. L'Assurance Maladie les reprend pour le grand public français avec les six catégories adultes (insuffisance pondérale, normal, surpoids, obésité classes I à III). Notre calculateur et le tableau de cette page s'alignent sur ces seuils.",
    },
    {
      question: "Un IMC de 24,9 est-il normal ?",
      answer:
        "Oui, statistiquement : 24,9 appartient à la catégorie « corpulence normale » (18,5 à 24,9) chez l'adulte. Vous êtes au seuil haut de la fourchette, à un dixième du surpoids. Le chiffre est normal selon la grille OMS, mais le tour de taille, la composition corporelle et votre ressenti méritent d'être pris en compte. Un IMC normal ne garantit pas l'absence de graisse abdominale.",
    },
    {
      question: "Peut-on être en bonne santé avec un IMC élevé ?",
      answer:
        "Oui, c'est possible. Un sportif très musclé, une personne active avec une forte masse maigre ou certains profils morphologiques peuvent afficher un IMC en surpoids sans excès de masse grasse. À l'inverse, un IMC élevé peut aussi refléter un excès pondéral. L'indicateur seul ne tranche pas : seul un bilan individualisé, idéalement avec un professionnel, permet une lecture fiable.",
    },
    {
      question: "Pourquoi mon IMC est-il normal alors que j'ai du ventre ?",
      answer:
        "Parce que l'IMC ne mesure pas la répartition des graisses. Il résume le rapport poids/taille global, sans distinguer la graisse abdominale du reste. Une personne peut avoir un IMC normal avec une masse grasse concentrée au niveau du ventre, phénomène parfois appelé « obésité normo-poids ». Le tour de taille et un examen clinique complètent alors la lecture.",
    },
    {
      question: "Quel est le meilleur IMC ?",
      answer:
        "Il n'existe pas de « meilleur IMC » universel. La fourchette de corpulence normale (18,5 à 24,9) sert de repère statistique chez l'adulte, mais le chiffre optimal varie selon la morphologie, l'âge, la masse musculaire et le contexte de santé. Viser un nombre précis (22, 23…) sans analyse personnalisée relève d'une chasse au chiffre, pas d'une démarche médicale.",
    },
  ],
  faqTitle: "Questions fréquentes sur l'interprétation de l'IMC",
  faqIntro:
    "Résultat IMC normal, élevé ou faible : réponses détaillées pour lire votre chiffre avec recul.",
  conclusion: {
    keyPoints: [
      "L'IMC situe une corpulence : c'est un repère statistique, pas un diagnostic.",
      "Six catégories OMS adultes structurent la lecture (de l'insuffisance pondérale à l'obésité massive).",
      "Morphologie, âge, masse musculaire et contexte modifient toujours l'interprétation.",
      "Un chiffre proche d'un seuil se lit avec prudence : les tranches ne sont pas des frontières nettes.",
      "Seul un professionnel de santé peut interpréter correctement une situation individuelle.",
    ],
    closingText:
      "Votre IMC est un excellent point de départ pour comprendre où vous vous situez statistiquement. Il ne raconte jamais toute l'histoire : gardez le contexte en tête, poursuivez votre lecture sur le site, et consultez un professionnel si le moindre doute persiste.",
    closingCta: { label: "Calculer mon IMC", href: "/" },
    secondaryLinks: [
      { label: "pourquoi l'IMC possède des limites", href: "/guides/limites-de-l-imc" },
      { label: "Comment calculer son IMC ?", href: "/guides/comment-calculer-son-imc" },
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
            "L'IMC est un repère statistique : il situe votre corpulence, il ne diagnostique rien.",
            "Six catégories OMS adultes structurent la lecture, de l'insuffisance pondérale à l'obésité massive.",
            "Deux personnes au même IMC peuvent avoir une composition corporelle totalement différente.",
            "Les seuils (18,5, 25, 30…) comparent des populations ; près d'une limite, relativisez toujours.",
            "Morphologie, âge, muscle, grossesse, pathologies : le contexte modifie la lecture.",
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
          text: "Catégories adultes, seuils et bonnes pratiques d'interprétation : les repères ci-dessous reprennent les sources habituellement citées en santé publique.",
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
        "Antoine, auteur de Calculer-mon-IMC.fr, n'est ni médecin ni nutritionniste. En cas de doute, consultez un professionnel de santé.",
      ],
    },
  },
  sidebar: imcGuideSidebar([
    { title: "Qu'est-ce que l'IMC ?", href: "/guides/quest-ce-que-l-imc" },
    { title: "Comment calculer son IMC ?", href: "/guides/comment-calculer-son-imc" },
    { title: "Les limites de l'IMC", href: "/guides/limites-de-l-imc" },
    { title: "Calculer son poids idéal", href: "/guides/calculer-son-poids-ideal" },
  ]),
};
