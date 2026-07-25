import type { Guide } from "../types";
import { imcGuideSidebar } from "./guide-imc-shared";

export const limitesDeLImcGuide: Guide = {
  slug: "limites-de-l-imc",
  title: "Quelles sont les limites de l'IMC ?",
  seoTitle: "Quelles sont les limites de l'IMC ? Fiabilité et exceptions",
  description:
    "L'IMC est un indicateur reconnu, mais il présente certaines limites. Découvrez pour quels profils il est le moins pertinent et pourquoi son interprétation doit parfois être nuancée.",
  subtitle:
    "L'IMC reste un indicateur reconnu par l'OMS et l'Assurance Maladie : voici ses limites réelles, sans le discréditer, pour mieux lire votre résultat.",
  publishedAt: "2026-07-20",
  updatedAt: "2026-07-22",
  introduction: [
    "L'IMC est un repère reconnu, mais il ne suffit pas à lui seul pour évaluer une personne. Découvrez ses principales limites, les profils pour lesquels il est moins pertinent et comment interpréter correctement votre résultat.",
    "L'indicateur reste un repère statistique reconnu par l'OMS et l'Assurance Maladie. Ce guide explique ce qu'il mesure, ce qu'il ne mesure pas, et comment l'utiliser comme point de départ, jamais comme conclusion.",
  ],
  introDisclaimer:
    "Contenu à visée pédagogique : il ne remplace pas un avis médical personnalisé.",
  introSummary: {
    title: "Les limites de l'IMC en 30 secondes",
    items: [
      "L'IMC résume poids et taille : un repère, pas un diagnostic.",
      "Il ne distingue pas masse maigre et masse grasse.",
      "Deux personnes au même IMC peuvent avoir une composition corporelle totalement différente.",
      "Chez certains profils (sportif, senior, enfant…), la lecture doit être nuancée.",
      "L'OMS et l'Assurance Maladie le conservent comme indicateur de premier niveau.",
      "Complétez avec tour de taille, activité et contexte médical si besoin.",
    ],
  },
  quickSummary: {
    title: "Les limites de l'IMC en bref",
    variant: "cards",
    items: [],
    cards: [
      { icon: "◎", label: "Rôle", value: "Repère statistique reconnu, pas un diagnostic" },
      { icon: "÷", label: "Mesure", value: "Relation poids / taille uniquement" },
      { icon: "✗", label: "Limite clé", value: "Ne distingue pas graisse et muscle" },
      { icon: "👤", label: "Profils", value: "Sportifs, seniors, enfants : lecture nuancée" },
      { icon: "✓", label: "Utilité", value: "Tendance, évolution, repère populationnel" },
      { icon: "⚖", label: "Lecture", value: "Un point de départ, jamais toute l'histoire" },
    ],
  },
  sections: [
    {
      id: "mesure-reelle",
      title: "Que mesure réellement l'IMC ?",
      blocks: [
        {
          type: "paragraph",
          text: "Avant d'aborder les limites, rappelons l'essentiel : l'IMC ne mesure que deux grandeurs, le poids et la taille, et la relation entre les deux. Rien de plus. C'est sa force (simplicité) et sa faiblesse (réduction du corps à un chiffre).",
        },
        {
          type: "definition-list",
          items: [
            { term: "Poids", definition: "Masse totale du corps à un instant donné, en kilogrammes." },
            { term: "Taille", definition: "Stature, en mètres, mise au carré dans la formule." },
            {
              term: "Résultat",
              definition: "Un indice en kg/m² qui situe la corpulence par rapport à des seuils adultes de référence.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "Ce qu'il n'indique pas : la composition corporelle (masse maigre, masse grasse, pourcentage de masse grasse), la graisse viscérale, le tour de taille, la santé métabolique ou le risque cardiovasculaire. Confondre IMC et état de forme reste l'une des erreurs les plus courantes.",
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Qu'est-ce que l'IMC ?",
          href: "/guides/quest-ce-que-l-imc",
          intro: "Pour la définition, l'origine et le rôle de l'indicateur, consultez",
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Comment calculer son IMC ?",
          href: "/guides/comment-calculer-son-imc",
          intro: "Pour la formule et les conversions, voir",
        },
        {
          type: "internal-link",
          variant: "calculator",
          label: "Calculateur IMC",
          href: "/",
          intro: "Pour estimer votre indice avant d'en discuter les limites, utilisez le",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon à savoir : l'OMS et l'Assurance Maladie reconnaissent les limites de l'IMC, tout en le recommandant comme repère de premier niveau, complété par d'autres informations en consultation.",
          ],
        },
      ],
    },
    {
      id: "pourquoi-limites",
      title: "Pourquoi l'IMC possède-t-il des limites ?",
      blocks: [
        {
          type: "paragraph",
          text: "Un corps humain combine os, muscle, graisse, eau et organes. Réduire cette complexité à un seul nombre permet de comparer des populations, pas de décrire une personne dans sa singularité. L'OMS et la Haute Autorité de santé le rappellent : l'IMC est un indicateur de premier niveau, pas une photographie complète.",
        },
        {
          type: "list",
          items: [
            "Le poids total mélange masse maigre et masse grasse, que la formule ne sépare pas.",
            "Deux morphologies opposées peuvent produire le même indice.",
            "La santé métabolique dépend de facteurs que le calcul ignore.",
            "Les seuils OMS visent une population générale, pas chaque profil.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Avoir des limites ne signifie pas être « faux ». Les organismes de santé les reconnaissent, et recommandent malgré tout l'IMC comme repère initial, complété au besoin.",
          ],
        },
      ],
    },
    {
      id: "mythes-realites",
      title: "Idées reçues et réalités",
      blocks: [
        {
          type: "paragraph",
          text: "Les limites de l'IMC alimentent parfois des conclusions hâtives. Voici cinq idées reçues fréquentes, confrontées à ce qu'en disent les organismes de santé.",
        },
        {
          type: "table",
          variant: "imc-categories",
          caption: "Mythes et réalités sur l'IMC",
          headers: ["Idée reçue", "Réalité"],
          rows: [
            [
              "« L'IMC est dépassé, les médecins ne s'en servent plus »",
              "Faux. L'OMS, l'Assurance Maladie et la HAS le maintiennent comme repère de corpulence chez l'adulte, croisé avec l'examen clinique.",
            ],
            [
              "« Un IMC élevé, c'est forcément de la graisse en excès »",
              "Pas toujours. Une forte masse maigre (muscle) peut majorer l'indice sans excès de masse grasse.",
            ],
            [
              "« IMC normal = pas de graisse viscérale »",
              "Faux dans certains cas. Un IMC normal peut coexister avec une adiposité abdominale et un risque cardiovasculaire à surveiller.",
            ],
            [
              "« Connaître les limites, c'est jeter l'IMC »",
              "Au contraire. Comprendre ce qu'il ne mesure pas permet de l'utiliser à bon escient, comme le recommandent les autorités de santé.",
            ],
            [
              "« Un seul chiffre suffit à juger ma santé »",
              "Non. L'IMC ouvre une réflexion ; tour de taille, mode de vie et contexte médical la complètent.",
            ],
          ],
        },
      ],
    },
    {
      id: "principales-limites",
      title: "Les principales limites de l'IMC",
      blocks: [
        {
          type: "paragraph",
          text: "Plutôt qu'une liste interminable, voici sept limites essentielles, chacune avec une explication, un exemple concret et un conseil pratique. Ce sont celles qui comptent le plus au quotidien.",
        },
        {
          type: "table",
          variant: "imc-categories",
          caption: "Sept limites majeures de l'IMC",
          headers: ["Limite", "Explication", "Exemple concret", "Conseil pratique"],
          rows: [
            [
              "Ne distingue pas graisse et muscle",
              "Le poids augmente avec la masse musculaire comme avec la graisse",
              "Un rugbyman peut afficher un IMC en surpoids avec peu de graisse",
              "Ne concluez pas sur la masse grasse à partir du seul chiffre",
            ],
            [
              "Ignore la répartition des graisses",
              "La graisse abdominale n'est pas captée différemment de celle des hanches",
              "IMC normal avec ventre proéminent (obésité normo-poids possible)",
              "Complétez avec le tour de taille si pertinent",
            ],
            [
              "Ne reflète pas la morphologie",
              "Ossature, carrure et proportions varient d'une personne à l'autre",
              "Deux personnes de 1,70 m et 70 kg peuvent avoir des silhouettes opposées",
              "Observez l'évolution dans le temps plutôt qu'un instantané",
            ],
            [
              "Ne mesure pas l'état de santé",
              "Corpulence et santé sont liées statistiquement, pas individuellement",
              "IMC normal chez une personne sédentaire fumeuse",
              "Considérez mode de vie et antécédents, pas le chiffre seul",
            ],
            [
              "Profils spécifiques mal représentés",
              "Sportifs, seniors, enfants, femmes enceintes : seuils adultes inadaptés",
              "Adolescent avec IMC « normal » adulte mais courbe pédiatrique différente",
              "Identifiez si votre profil nécessite une lecture spécifique",
            ],
            [
              "Instantané, pas une histoire",
              "Un IMC ne dit rien de l'évolution sur six mois ou cinq ans",
              "IMC stable à 26 depuis dix ans vs hausse récente de 22 à 28",
              "Suivez la tendance, pas seulement la valeur du jour",
            ],
            [
              "Seuils = tranches statistiques",
              "18,5, 25, 30 ne sont pas des frontières biologiques nettes",
              "24,9 vs 25,1 : catégories différentes, réalité proche",
              "Relativisez près des limites, surtout sans autres signaux",
            ],
          ],
        },
      ],
    },
    {
      id: "profils-moins-pertinents",
      title: "Personnes pour lesquelles l'IMC est moins pertinent",
      blocks: [
        {
          type: "paragraph",
          text: "Chez certaines personnes, l'IMC reste un repère, mais son interprétation doit être nuancée ou complétée. Ce n'est pas une invalidation de l'indicateur : c'est une adaptation à la réalité du profil.",
        },
        {
          type: "table",
          variant: "imc-categories",
          caption: "Profils concernés : pourquoi, comment lire, que faire",
          headers: ["Profil", "Pourquoi ?", "Comment interpréter ?", "Que faire ?"],
          rows: [
            [
              "Sportif très musclé",
              "Masse musculaire élevée",
              "IMC élevé possible sans excès de graisse",
              "Ne pas conclure hâtivement ; tour de taille, composition si besoin",
            ],
            [
              "Personne âgée",
              "Masse musculaire parfois réduite (sarcopénie)",
              "IMC normal possible avec masse grasse relative plus haute",
              "Privilégier l'évolution et l'avis médical",
            ],
            [
              "Adolescent",
              "Corps en croissance",
              "Seuils adultes inadaptés",
              "Courbes percentiles (âge + sexe), avis professionnel",
            ],
            [
              "Enfant",
              "IMC varie fortement avec l'âge",
              "Grilles pédiatriques uniquement",
              "Consulter un pédiatre en cas de question",
            ],
            [
              "Femme enceinte",
              "Poids physiologiquement modifié",
              "IMC habituel non applicable",
              "Suivi de grossesse avec un professionnel",
            ],
            [
              "Morphologies atypiques",
              "Amputation, très grande taille, certaines pathologies",
              "Fiabilité réduite du calcul ou de la lecture",
              "Ne pas surinterpréter ; bilan personnalisé",
            ],
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : si vous vous reconnaissez ici, gardez l'IMC comme repère parmi d'autres, pas comme verdict. Le guide pour interpréter son IMC détaille la lecture par catégorie.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Comment interpréter son IMC ?",
          href: "/guides/comment-interpreter-son-imc",
          intro: "Pour situer votre chiffre parmi les catégories OMS adultes, consultez",
        },
      ],
    },
    {
      id: "exemples-concrets",
      title: "Exemples concrets : même IMC, réalités différentes",
      blocks: [
        {
          type: "paragraph",
          text: "Trois situations illustrent pourquoi le contexte prime sur la catégorie affichée. Aucune ne remplace une évaluation individuelle.",
        },
        {
          type: "list",
          items: [
            "Sportive musclée (1,68 m, 76 kg, IMC 27) : surpoids statistique, faible pourcentage de masse grasse, bonne condition physique.",
            "Personne sédentaire (mêmes mesures, IMC 27) : même catégorie, composition corporelle et risque cardiovasculaire potentiellement différents.",
            "Homme mince (1,82 m, 78 kg, IMC 23,5) : corpulence normale, mais graisse viscérale possible malgré un chiffre rassurant.",
          ],
        },
        {
          type: "callout",
          variant: "hint",
          paragraphs: [
            "Astuce : notez votre IMC avec la date, votre activité physique et votre ressenti. Vous analyserez une évolution, pas un instantané isolé.",
          ],
        },
      ],
    },
    {
      id: "ce-que-permet",
      title: "Ce que l'IMC permet malgré tout",
      blocks: [
        {
          type: "paragraph",
          text: "Reconnaître les limites ne signifie pas jeter l'indicateur. L'OMS et l'Assurance Maladie le maintiennent parce qu'il remplit des fonctions utiles en santé publique et en consultation, à condition de le croiser avec d'autres repères.",
        },
        {
          type: "list",
          items: [
            "Repérer une tendance de corpulence chez l'adulte (normal, surpoids, obésité).",
            "Suivre une évolution dans le temps avec des mesures comparables.",
            "Comparer des données à l'échelle d'une population (santé publique, épidémiologie).",
            "Ouvrir une discussion avec un professionnel de santé sur le poids.",
            "Orienter une première réflexion personnelle avant un bilan plus complet.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "L'IMC est un très bon point de départ. Il ne raconte jamais toute l'histoire : c'est précisément pour cela qu'il doit être complété, pas abandonné.",
          ],
        },
        {
          type: "contextual-cta",
          text: "Vous souhaitez estimer votre IMC à partir de votre taille et de votre poids ?",
          label: "Utiliser le calculateur IMC",
          href: "/",
        },
      ],
    },
    {
      id: "indicateurs-complementaires",
      title: "Quels indicateurs complètent l'IMC ?",
      blocks: [
        {
          type: "paragraph",
          text: "Aucun indicateur isolé ne suffit. Voici les compléments les plus couramment cités par l'Assurance Maladie et la HAS pour nuancer un IMC.",
        },
        {
          type: "list",
          items: [
            "Tour de taille : repère sur la graisse viscérale et l'adiposité abdominale, parfois révélateur même avec IMC normal.",
            "Activité physique : nuance la lecture d'un IMC élevé ou normal.",
            "Composition corporelle (DEXA, impédancemétrie) : estime masse maigre et pourcentage de masse grasse.",
            "Alimentation et mode de vie : un IMC normal n'exclut pas un déséquilibre.",
            "Évolution du poids et contexte médical : indispensables pour toute interprétation individualisée.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          label: "estimer votre masse grasse",
          href: "/calculateurs/masse-grasse",
          intro:
            "Pour une estimation accessible du pourcentage de masse grasse, sans matériel clinique, utilisez le",
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
      id: "consulter",
      title: "Quand consulter un professionnel de santé ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'IMC est un indicateur, pas un diagnostic. Dans la plupart des cas, le connaître suffit pour orienter une réflexion. Certains signaux méritent d'être évoqués calmement avec un médecin ou un autre professionnel de santé.",
        },
        {
          type: "list",
          items: [
            "Perte ou prise de poids rapide et inexpliquée.",
            "IMC en forte hausse ou en forte baisse sur une période courte.",
            "Inquiétude persistante malgré un IMC « normal ».",
            "Question sur l'IMC d'un enfant, d'un adolescent ou pendant une grossesse.",
            "Antécédents médicaux, traitement en cours ou symptômes associés.",
            "Projet de changement alimentaire ou de perte de poids important.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Bon à savoir : consulter n'est pas dramatiser. C'est permettre à un professionnel de replacer votre IMC dans une évaluation globale, comme le recommande l'Assurance Maladie.",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Conseil pratique : apportez vos mesures récentes, la date et vos questions. Vous gagnerez en clarté dès le premier échange.",
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
          text: "Vous connaissez désormais les limites de l'IMC sans le discréditer. Voici la suite logique sur Calculer Mon IMC.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Calculer ou vérifier votre IMC",
              description: "Obtenez votre chiffre avec le simulateur, dans des conditions de mesure comparables.",
              href: "/",
              linkLabel: "Calculateur IMC",
            },
            {
              title: "Interpréter votre résultat",
              description: "Catégories OMS, exemples et lecture prudente : le guide dédié à l'interprétation.",
              href: "/guides/comment-interpreter-son-imc",
              linkLabel: "Comment interpréter son IMC ?",
            },
            {
              title: "Maîtriser le calcul",
              description: "Formule, conversions et erreurs de saisie : comprendre d'où vient votre chiffre.",
              href: "/guides/comment-calculer-son-imc",
              linkLabel: "Comment calculer son IMC ?",
            },
            {
              title: "Revenir aux fondamentaux",
              description: "Définition, origine et rôle de l'indicateur dans le cocon éditorial.",
              href: "/guides/quest-ce-que-l-imc",
              linkLabel: "Qu'est-ce que l'IMC ?",
            },
            {
              title: "Estimer une fourchette de poids",
              description: "Repère chiffré cohérent avec un IMC normal, sans objectif universel.",
              href: "/guides/calculer-son-poids-ideal",
              linkLabel: "Calculer son poids idéal",
            },
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Pourquoi l'IMC est-il critiqué ?",
      answer:
        "Parce qu'il réduit le corps à un seul chiffre issu du poids et de la taille, sans distinguer muscle et graisse ni décrire la santé globale. Ces critiques sont reconnues par l'OMS et l'Assurance Maladie. L'indicateur reste néanmoins un repère statistique simple, à condition de connaître ses limites.",
    },
    {
      question: "L'IMC est-il fiable ?",
      answer:
        "Fiable pour ce qu'il mesure : la relation poids / taille par rapport à des seuils populationnels. Moins fiable pour décrire une personne isolée, surtout si le profil s'écarte de la norme statistique (sportif, senior, enfant…). « Fiable » ne veut pas dire « suffisant seul » : il doit être interprété avec prudence et complété si besoin.",
    },
    {
      question: "Pourquoi les sportifs ont-ils parfois un IMC élevé ?",
      answer:
        "La masse musculaire alourdit le poids sans ajouter de graisse au même rythme. Un sportif de force ou d'athlétisme peut afficher un IMC en surpoids ou en obésité selon la grille OMS, tout en ayant une composition corporelle saine. L'IMC ne distingue pas ces situations : d'autres repères (tour de taille, composition) peuvent compléter la lecture.",
    },
    {
      question: "Pourquoi les médecins continuent-ils à utiliser l'IMC ?",
      answer:
        "Parce qu'il est simple, reproductible, comparé internationalement et utile comme premier repère. Il permet de repérer une catégorie de corpulence, de suivre une évolution et d'orienter une discussion. Les médecins le croisent ensuite avec l'examen clinique, l'historique et d'autres mesures, comme le recommande la HAS.",
    },
    {
      question: "L'IMC est-il encore utilisé ?",
      answer:
        "Oui. L'OMS, l'Assurance Maladie et la plupart des professionnels de santé continuent de l'utiliser comme repère de corpulence chez l'adulte. Il n'est pas « dépassé » : il est complété par d'autres informations quand la situation l'exige.",
    },
    {
      question: "Pourquoi deux personnes avec le même IMC sont-elles différentes ?",
      answer:
        "Parce que le poids total cache des compositions opposées. Deux personnes à 27 kg/m² peuvent différer par la masse musculaire, la répartition des graisses, l'activité physique, l'âge et l'état de santé. L'IMC les classe dans la même catégorie statistique, pas dans la même réalité corporelle.",
    },
    {
      question: "Quels sont les principaux défauts de l'IMC ?",
      answer:
        "Ne pas distinguer graisse et muscle, ignorer la répartition des graisses, ne pas refléter la morphologie ni l'état de santé, être moins pertinent chez certains profils, ne capturer qu'un instantané et s'appuyer sur des seuils statistiques (18,5, 25, 30…) qui ne sont pas des frontières biologiques nettes.",
    },
    {
      question: "Pourquoi l'IMC ne mesure-t-il pas la graisse ?",
      answer:
        "Parce que la formule ne prend en compte que le poids total et la taille. Elle ne dispose d'aucune information sur la répartition muscle / graisse / eau. Mesurer directement la masse grasse nécessite d'autres outils (DEXA, impédancemétrie, plis cutanés), plus complexes et moins accessibles au grand public.",
    },
    {
      question: "Quand l'IMC peut-il tromper ?",
      answer:
        "Principalement chez les sportifs très musclés (IMC surévalué), chez certaines personnes âgées (IMC « normal » avec masse grasse relative élevée), chez l'enfant et l'adolescent (seuils adultes inadaptés), pendant la grossesse, ou lorsqu'un IMC normal masque une graisse abdominale importante.",
    },
    {
      question: "Quel indicateur est plus précis que l'IMC ?",
      answer:
        "Aucun indicateur simple ne remplace une évaluation globale. Le tour de taille complète souvent l'IMC pour la graisse viscérale et l'adiposité abdominale. La DEXA ou l'impédancemétrie estiment la composition corporelle, mais restent moins accessibles. En consultation, le médecin croise plusieurs repères selon le contexte.",
    },
    {
      question: "Pourquoi les enfants utilisent-ils d'autres courbes ?",
      answer:
        "Parce que l'IMC varie naturellement avec l'âge et le sexe chez l'enfant et l'adolescent. Les seuils adultes ne s'appliquent pas. L'interprétation repose sur des courbes de croissance (percentiles). Un pédiatre ou un professionnel de santé est la bonne référence pour un mineur.",
    },
    {
      question: "Faut-il abandonner l'IMC à cause de ses limites ?",
      answer:
        "Non. Connaître ses limites permet de mieux l'utiliser, pas de l'écarter. L'IMC n'est ni parfait ni inutile : c'est un outil simple et reconnu, utile lorsqu'il est employé pour ce qu'il est, un repère parmi d'autres.",
    },
  ],
  faqTitle: "Questions fréquentes sur les limites de l'IMC",
  faqIntro:
    "Critiques, fiabilité, sportifs, enfants : réponses détaillées pour nuancer votre lecture de l'indicateur.",
  conclusion: {
    keyPoints: [
      "L'IMC mesure la relation poids / taille : rien de plus, rien de moins.",
      "Muscle, graisse, morphologie et contexte modifient la lecture d'un même chiffre.",
      "Chez certains profils, l'IMC reste un repère à compléter, pas à abandonner.",
      "L'OMS et l'Assurance Maladie le maintiennent comme indicateur de premier niveau.",
    ],
    closingText:
      "Comprendre les limites de l'IMC, c'est mieux l'utiliser. Poursuivez sur le site ou consultez un professionnel si le moindre doute persiste.",
    closingCta: { label: "Calculer mon IMC", href: "/" },
    secondaryLinks: [
      { label: "Comment interpréter son IMC ?", href: "/guides/comment-interpreter-son-imc" },
      { label: "Qu'est-ce que l'IMC ?", href: "/guides/quest-ce-que-l-imc" },
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
            "L'IMC est un repère statistique reconnu, pas un diagnostic ni une photo complète du corps.",
            "Il ne distingue pas graisse et muscle : deux personnes au même IMC peuvent être très différentes.",
            "Sportifs, seniors, enfants, femmes enceintes : certains profils exigent une lecture nuancée.",
            "Malgré ses limites, l'IMC reste utile pour repérer une tendance, suivre une évolution et ouvrir une discussion médicale.",
            "Tour de taille, activité, alimentation et contexte médical complètent l'IMC sans le remplacer.",
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
          text: "Limites, usage et bonnes pratiques : les repères ci-dessous reprennent les sources habituellement citées en santé publique.",
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
    { title: "Comment interpréter son IMC ?", href: "/guides/comment-interpreter-son-imc" },
    { title: "Calculer son poids idéal", href: "/guides/calculer-son-poids-ideal" },
  ]),
};
