import type { Guide } from "../types";
import { imcGuideSidebar } from "./guide-imc-shared";

/** Seuils adultes alignés sur le calculateur et l'Assurance Maladie (repères OMS). */
const IMC_ADULT_SUMMARY_ROWS: string[][] = [
  ["Insuffisance pondérale", "< 18,5", "Repère en dessous du seuil adulte habituel"],
  ["Corpulence normale", "18,5 à 24,9", "Repère dans la fourchette adulte de référence"],
  ["Surpoids", "25 à 29,9", "Repère au-dessus de la corpulence normale"],
  ["Obésité modérée (classe I)", "30 à 34,9", "Repère dans la première classe d'obésité"],
  ["Obésité sévère (classe II)", "35 à 39,9", "Repère dans la deuxième classe d'obésité"],
  ["Obésité massive (classe III)", "≥ 40", "Repère dans la troisième classe d'obésité"],
];

export const questCeQueLImcGuide: Guide = {
  slug: "quest-ce-que-l-imc",
  title: "Qu'est-ce que l'IMC et à quoi sert-il ?",
  seoTitle: "Qu'est-ce que l'IMC ? Définition, calcul et utilité",
  description:
    "Découvrez ce qu'est l'indice de masse corporelle (IMC), son intérêt et son rôle dans l'évaluation du poids et de la corpulence.",
  subtitle:
    "L'indice de masse corporelle expliqué simplement : définition, utilité, calcul, lecture des résultats et limites essentielles.",
  publishedAt: "2026-07-20",
  updatedAt: "2026-07-21",
  introduction: [
    "L'indice de masse corporelle (IMC) met en relation le poids et la taille pour situer rapidement une corpulence. Facile à calculer, il sert de repère courant en santé publique et comme premier niveau de lecture chez l'adulte.",
    "Utile pour orienter une réflexion, il reste imparfait : il ne mesure ni la masse grasse, ni l'état de santé global. Ce guide présente ce qu'est l'IMC, d'où il vient, comment le lire et ce qu'il ne dit pas.",
  ],
  introDisclaimer:
    "Ce guide a une vocation pédagogique et ne remplace pas un avis médical personnalisé.",
  quickSummary: {
    title: "L'IMC en bref",
    variant: "cards",
    items: [],
    cards: [
      { icon: "ℹ", label: "Signification", value: "Indice de masse corporelle" },
      { icon: "÷", label: "Formule", value: "Poids en kg ÷ taille en mètres au carré" },
      { icon: "👤", label: "Public de référence", value: "Seuils standards principalement utilisés chez l'adulte" },
      { icon: "◎", label: "Utilité principale", value: "Premier repère pour situer une corpulence" },
      {
        icon: "!",
        label: "Limite essentielle",
        value: "Ne mesure pas directement la masse grasse ni l'état de santé global",
      },
    ],
  },
  sections: [
    {
      id: "definition",
      title: "Définition de l'IMC",
      blocks: [
        {
          type: "paragraph",
          text: "L'IMC est un nombre calculé à partir du poids (en kilogrammes) et de la taille (en mètres). Le résultat s'exprime le plus souvent en kg/m², même si certains outils l'affichent comme un indice sans unité.",
        },
        {
          type: "paragraph",
          text: "Concrètement, il situe une corpulence par rapport à des seuils de référence chez l'adulte. Il ne mesure pas directement la masse grasse, la masse musculaire, la répartition des graisses ni l'état de santé.",
        },
        {
          type: "definition-list",
          items: [
            { term: "Corpulence", definition: "Relation globale entre poids et taille." },
            { term: "Poids", definition: "Masse totale du corps à un instant donné." },
            { term: "Masse grasse", definition: "Part du corps composée de graisse." },
            {
              term: "Composition corporelle",
              definition: "Répartition muscle, graisse, eau et os.",
            },
            {
              term: "État de santé",
              definition: "Résultat de nombreux facteurs, au-delà du seul poids.",
            },
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "L'IMC est un repère statistique, pas une photographie complète du corps. Il aide à classer une corpulence, pas à décrire toute votre santé.",
          ],
        },
      ],
    },
    {
      id: "origine",
      title: "Origine et histoire de l'IMC",
      blocks: [
        {
          type: "paragraph",
          text: "Au XIXᵉ siècle, le statisticien belge Adolphe Quetelet (1796-1874) étudie la morphologie humaine à l'échelle des populations. Il observe qu'entre la puberté et l'âge adulte, le poids tend à varier approximativement comme le carré de la taille.",
        },
        {
          type: "paragraph",
          text: "Ce ratio, parfois appelé indice de Quetelet, s'inscrit dans ses travaux sur l'homme moyen. Il vise à décrire des tendances statistiques, pas à poser un diagnostic médical individuel.",
        },
        {
          type: "timeline",
          items: [
            {
              period: "XIXᵉ siècle",
              text: "Adolphe Quetelet formalise le ratio poids/taille² dans une perspective statistique et anthropométrique.",
            },
            {
              period: "XXᵉ siècle",
              text: "L'indice est repris en recherche médicale et épidémiologique pour étudier le poids relatif à la taille.",
            },
            {
              period: "1972",
              text: "Ancel Keys et ses collaborateurs popularisent l'expression « Body Mass Index » (BMI) dans une publication scientifique.",
            },
            {
              period: "Aujourd'hui",
              text: "L'indicateur sert surtout de repère en santé publique et de premier niveau de lecture chez l'adulte.",
            },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "L'IMC n'a pas été conçu à l'origine comme un outil clinique individuel, mais comme un moyen de comparer des groupes de personnes.",
          ],
        },
      ],
    },
    {
      id: "usage-actuel",
      title: "Pourquoi l'IMC est-il encore utilisé ?",
      blocks: [
        {
          type: "paragraph",
          text: "Malgré ses limites, l'IMC reste largement employé. L'Organisation mondiale de la Santé (OMS) s'en sert comme repère pour décrire l'insuffisance pondérale, le surpoids et l'obésité chez l'adulte dans ses communications de santé publique.",
        },
        {
          type: "list",
          items: [
            "Calcul simple à partir de deux mesures courantes.",
            "Coût quasi nul.",
            "Résultat reproductible si les mesures sont fiables.",
            "Langage commun entre professionnels, institutions et grand public.",
            "Utilité en épidémiologie pour suivre des populations dans le temps.",
            "Premier niveau de repérage chez l'adulte, avant une évaluation plus complète.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "La facilité d'utilisation ne signifie pas que l'IMC résume à lui seul la santé d'une personne. Son interprétation doit toujours être contextualisée.",
          ],
        },
      ],
    },
    {
      id: "utilite",
      title: "À quoi sert l'IMC concrètement ?",
      subsections: [
        {
          id: "utilite-personne",
          title: "Pour une personne",
          blocks: [
            {
              type: "paragraph",
              text: "L'IMC peut servir de point de départ pour situer son poids par rapport à sa taille. Il permet aussi de suivre une évolution dans le temps si les mesures sont prises dans des conditions comparables.",
            },
            {
              type: "list",
              items: [
                "Obtenir un premier repère chiffré.",
                "Suivre une évolution de poids sur plusieurs mois.",
                "Préparer un échange avec un professionnel de santé.",
                "Repérer une situation pouvant nécessiter une évaluation plus complète.",
              ],
            },
          ],
        },
        {
          id: "utilite-sante-publique",
          title: "Pour les professionnels et la santé publique",
          blocks: [
            {
              type: "paragraph",
              text: "En pratique clinique ou en recherche, l'IMC aide surtout au repérage statistique : prévalence du surpoids ou de l'obésité, comparaison entre territoires ou périodes, complément à d'autres mesures (tour de taille, examen clinique).",
            },
            {
              type: "callout",
              variant: "warning",
              paragraphs: [
                "Une catégorie de corpulence normale selon l'IMC ne garantit pas une bonne santé. Un IMC élevé ne suffit pas, à lui seul, à décrire la composition corporelle ou la situation médicale d'une personne.",
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
      ],
    },
    {
      id: "calcul",
      title: "Comment l'IMC se calcule-t-il ?",
      blocks: [
        {
          type: "paragraph",
          text: "La formule est la suivante : IMC = poids en kilogrammes ÷ taille en mètres au carré. Il faut donc convertir la taille en mètres (1,70 m pour 170 cm) et utiliser un poids en kg.",
        },
        {
          type: "paragraph",
          text: "Exemple : pour 70 kg et 1,70 m, le calcul donne 70 ÷ (1,70 × 1,70) = 24,22, soit environ 24,2 kg/m² en arrondissant à une décimale.",
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "En pratique, un calculateur en ligne évite les erreurs de conversion. L'essentiel reste la fiabilité des mesures saisies.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "calculer son IMC correctement",
          href: "/guides/comment-calculer-son-imc",
          intro:
            "Retrouvez la méthode pas à pas, les conversions d'unités et les erreurs de saisie à éviter dans notre guide pour",
        },
      ],
    },
    {
      id: "interpretation",
      title: "Comment interpréter son IMC ?",
      blocks: [
        {
          type: "paragraph",
          text: "Une fois l'IMC calculé, on le compare à des catégories utilisées comme repères chez l'adulte. L'OMS distingue notamment l'insuffisance pondérale, la corpulence normale, le surpoids et plusieurs degrés d'obésité.",
        },
        {
          type: "table",
          variant: "imc-categories",
          headers: ["Catégorie", "IMC chez l'adulte", "Lecture du repère"],
          rows: IMC_ADULT_SUMMARY_ROWS,
          footnote:
            "Ces catégories sont des repères pour les adultes. Chez les enfants et les adolescents, l'interprétation dépend notamment de l'âge et du sexe.",
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "interpréter son résultat d'IMC",
          href: "/guides/comment-interpreter-son-imc",
          intro: "Pour une lecture détaillée de chaque catégorie et des exemples concrets, consultez notre guide pour",
        },
      ],
    },
    {
      id: "permet-et-limites",
      title: "Ce que l'IMC permet et ce qu'il ne permet pas",
      blocks: [
        {
          type: "table",
          variant: "imc-permits",
          caption: "Lecture prudente de l'indicateur",
          headers: ["L'IMC peut aider à…", "L'IMC ne permet pas, à lui seul, de…"],
          rows: [
            ["Situer un poids par rapport à une taille", "Mesurer directement la masse grasse"],
            ["Repérer une catégorie statistique", "Évaluer toute la santé d'une personne"],
            ["Suivre une évolution dans le temps", "Distinguer clairement graisse et muscle"],
            ["Comparer des données de population", "Poser un diagnostic médical complet"],
            ["Constituer un premier repère", "Définir un poids idéal universel"],
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Deux personnes avec le même IMC peuvent avoir des morphologies très différentes. C'est pourquoi l'interprétation doit rester prudente.",
          ],
        },
      ],
    },
    {
      id: "limites",
      title: "Pourquoi l'IMC a-t-il des limites ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'IMC ne décrit pas directement la masse grasse, la masse musculaire, la répartition des graisses, le tour de taille, l'âge ou certaines particularités morphologiques. Il ne résume pas non plus l'état de santé global.",
        },
        {
          type: "paragraph",
          text: "Un sportif musclé peut afficher un IMC élevé sans excès de masse grasse. À l'inverse, une personne dans la catégorie de corpulence normale peut présenter une masse grasse abdominale significative.",
        },
        {
          type: "internal-link",
          variant: "calculator",
          label: "estimer votre masse grasse",
          href: "/calculateurs/masse-grasse",
          intro:
            "Lorsque la composition corporelle compte autant que le poids total, vous pouvez",
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Plutôt que de dire que l'IMC « ne fonctionne pas », il est plus juste de préciser que son interprétation est moins directe, doit être adaptée ou nécessite davantage de contexte selon le profil.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "comprendre les limites de l'IMC",
          href: "/guides/limites-de-l-imc",
          intro: "Pour approfondir les biais, les exceptions et les mesures complémentaires possibles, consultez notre guide pour",
        },
      ],
    },
    {
      id: "profils",
      title: "Pour quels profils l'interprétation doit-elle être adaptée ?",
      blocks: [
        {
          type: "list",
          items: [
            "Enfants : courbes spécifiques selon l'âge et le sexe, pas les seuils adultes.",
            "Adolescents : même logique que chez l'enfant ; la croissance modifie l'interprétation.",
            "Femmes enceintes : pendant la grossesse, les seuils habituels de l'adulte ne s'interprètent pas de la même manière, car le poids évolue naturellement. Les professionnels tiennent notamment compte de l'IMC antérieur à la grossesse et du suivi de la prise de poids.",
            "Sportifs très musclés : masse musculaire élevée pouvant majorer l'IMC sans surpoids de graisse.",
            "Personnes âgées : perte de masse musculaire possible avec une catégorie de corpulence normale selon l'IMC.",
            "Situations médicales ou morphologiques particulières : lecture à croiser avec le contexte clinique.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Un professionnel de santé peut croiser l'IMC avec d'autres éléments : tour de taille, antécédents, mode de vie, examen clinique.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "découvrir pourquoi l'IMC doit être relativisé",
          href: "/guides/limites-de-l-imc",
          intro: "Pour le détail des cas où le repère perd en pertinence,",
        },
      ],
    },
    {
      id: "lecture-responsable",
      title: "Pourquoi ne faut-il jamais se fier uniquement à l'IMC ?",
      blocks: [
        {
          type: "paragraph",
          text: "Utilisé isolément, l'IMC peut rassurer à tort ou inquiéter inutilement. Il ne reflète pas directement l'alimentation, l'activité physique, le sommeil, les antécédents médicaux ou les analyses biologiques.",
        },
        {
          type: "paragraph",
          text: "Les professionnels de santé le croisent le plus souvent avec d'autres informations complémentaires :",
        },
        {
          type: "list",
          items: [
            "Évolution du poids.",
            "Tour de taille.",
            "Composition corporelle lorsqu'elle est disponible.",
            "Habitudes de vie.",
            "Antécédents.",
            "Évaluation clinique.",
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "En pratique : considérez l'IMC comme une étape, pas comme une conclusion. En cas de doute, demandez l'avis d'un professionnel qualifié.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Calculer son poids idéal",
          href: "/guides/calculer-son-poids-ideal",
          intro: "Pour aborder prudemment la notion de fourchette de poids, sans la confondre avec un objectif universel :",
        },
      ],
    },
    {
      id: "idees-recues",
      title: "Idées reçues et erreurs fréquentes",
      blocks: [
        {
          type: "profession-faq",
          items: [
            {
              label: "« Un IMC normal signifie que je suis forcément en bonne santé »",
              answer:
                "Non. Une catégorie de corpulence normale selon l'IMC indique seulement que le poids est situé dans la fourchette adulte de référence. L'indicateur ne renseigne pas directement sur l'alimentation, l'activité physique, le sommeil, les antécédents ni la composition corporelle.",
            },
            {
              label: "« Un IMC élevé signifie forcément que j'ai trop de graisse »",
              answer:
                "Pas nécessairement. Une masse musculaire importante peut majorer l'IMC sans excès de masse grasse. Le contexte personnel et une évaluation complémentaire restent nécessaires pour nuancer cette lecture.",
            },
            {
              label: "« Deux personnes avec le même IMC ont le même corps »",
              answer:
                "Faux. La morphologie, la masse musculaire et la répartition des graisses peuvent différer fortement pour un même résultat chiffré.",
            },
            {
              label: "« L'IMC donne mon poids idéal »",
              answer:
                "L'IMC classe une corpulence dans un intervalle statistique. Il ne définit pas un objectif personnalisé ni un poids universel à atteindre.",
            },
            {
              label: "« L'IMC est inutile puisqu'il a des limites »",
              answer:
                "Un indicateur peut rester utile comme premier repère, à condition de connaître ses limites et de ne pas l'utiliser seul. C'est précisément l'objet d'une lecture contextualisée.",
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
          text: "Vous disposez des bases pour comprendre l'indice de masse corporelle. Voici un parcours logique sur Calculer Mon IMC.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Estimer votre IMC",
              description: "Utilisez le calculateur gratuit à partir de votre taille et de votre poids.",
              href: "/",
              linkLabel: "Accéder au calculateur IMC",
            },
            {
              title: "Comprendre le calcul",
              description: "Retrouvez la formule, les unités et les erreurs de saisie les plus courantes.",
              href: "/guides/comment-calculer-son-imc",
              linkLabel: "Guide pour calculer son IMC correctement",
            },
            {
              title: "Interpréter le résultat",
              description: "Lisez votre catégorie avec les repères adultes de référence.",
              href: "/guides/comment-interpreter-son-imc",
              linkLabel: "Guide pour interpréter son résultat d'IMC",
            },
            {
              title: "Connaître les limites",
              description: "Identifiez les situations où l'indicateur doit être relativisé.",
              href: "/guides/limites-de-l-imc",
              linkLabel: "Guide sur les limites de l'IMC",
            },
            {
              title: "Explorer le poids idéal avec prudence",
              description: "Découvrez comment estimer une fourchette sans viser un chiffre universel.",
              href: "/guides/calculer-son-poids-ideal",
              linkLabel: "Guide sur le poids idéal",
            },
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Qu'est-ce que l'IMC en termes simples ?",
      answer:
        "L'IMC est un chiffre qui met en relation votre poids et votre taille. On divise le poids en kilogrammes par le carré de la taille en mètres. Le résultat, en kg/m², sert à situer une corpulence dans une catégorie de référence chez l'adulte.",
    },
    {
      question: "Que signifient les lettres IMC ?",
      answer:
        "IMC signifie indice de masse corporelle. En anglais, on parle de Body Mass Index (BMI). Les deux désignent le même calcul.",
    },
    {
      question: "Qui a créé l'IMC ?",
      answer:
        "Le ratio poids/taille² est associé au statisticien belge Adolphe Quetelet au XIXᵉ siècle. L'expression moderne « Body Mass Index » a été popularisée en 1972 par Ancel Keys et ses collaborateurs dans une publication scientifique.",
    },
    {
      question: "Pourquoi l'IMC est-il encore utilisé ?",
      answer:
        "Parce qu'il est simple, peu coûteux et comparable d'une personne à l'autre. Il sert surtout de repère en santé publique et de premier niveau de lecture chez l'adulte, avant une évaluation plus complète si nécessaire.",
    },
    {
      question: "Comment calcule-t-on l'IMC ?",
      answer:
        "IMC = poids (kg) ÷ [taille (m)]². Exemple : 70 kg pour 1,70 m donnent environ 24,2 kg/m². Voir notre guide pour calculer son IMC pour la méthode pas à pas.",
    },
    {
      question: "Comment savoir si son IMC se situe dans une catégorie normale ?",
      answer:
        "Chez l'adulte, la catégorie dite de corpulence normale correspond généralement à un IMC compris entre 18,5 inclus et 25 exclu. Il s'agit d'un repère statistique, pas d'une garantie de bonne santé. Comparez votre résultat au tableau de ce guide ou utilisez le calculateur.",
    },
    {
      question: "L'IMC est-il fiable ?",
      answer:
        "Il est utile comme premier indicateur de corpulence chez l'adulte, mais sa précision individuelle est limitée. Il ne distingue pas la graisse du muscle et doit être interprété avec le contexte général. Voir le guide sur les limites de l'IMC.",
    },
    {
      question: "Quelle différence entre IMC et masse grasse ?",
      answer:
        "L'IMC est calculé uniquement à partir du poids et de la taille. La masse grasse mesure la part de graisse dans le corps. Deux personnes avec le même IMC peuvent avoir des proportions muscle-graisse très différentes.",
    },
    {
      question: "Peut-on avoir un IMC normal sans être en bonne santé ?",
      answer:
        "Oui. Une catégorie de corpulence normale selon l'IMC n'indique pas automatiquement une alimentation équilibrée, une bonne condition physique ou l'absence de problème de santé.",
    },
    {
      question: "Peut-on avoir un IMC élevé sans excès important de masse grasse ?",
      answer:
        "Oui, notamment chez les personnes très musclées. L'IMC ne distingue pas la masse musculaire de la masse grasse. Une évaluation complémentaire peut être utile selon le contexte.",
    },
    {
      question: "L'IMC est-il interprété de la même manière chez les enfants ?",
      answer:
        "Non. Chez l'enfant et l'adolescent, l'interprétation repose sur des courbes tenant compte de l'âge et du sexe. Les seuils adultes ne s'appliquent pas de la même façon.",
    },
    {
      question: "L'IMC suffit-il pour savoir s'il faut perdre du poids ?",
      answer:
        "Non. Seul un bilan personnalisé, idéalement avec un professionnel de santé, peut répondre à cette question. L'IMC peut orienter une réflexion, mais un objectif éventuel dépend de votre historique, de votre mode de vie et d'une évaluation individualisée.",
    },
  ],
  faqTitle: "Questions fréquentes sur l'IMC",
  faqIntro:
    "Réponses courtes aux questions les plus fréquentes. Pour approfondir, consultez les guides spécialisés du site.",
  conclusion: {
    keyPoints: [
      "L'IMC résume la relation entre poids et taille : c'est un repère, pas un diagnostic.",
      "Créé par Quetelet au XIXᵉ siècle, popularisé sous le nom BMI en 1972, il reste un premier niveau de lecture.",
      "Son calcul et ses catégories adultes font l'objet de guides dédiés sur ce site.",
      "Ses limites imposent une interprétation contextualisée, jamais isolée du reste.",
      "En cas de doute, un professionnel de santé reste la référence pour une évaluation personnalisée.",
    ],
    closingText:
      "En résumé, l'indice de masse corporelle situe une corpulence à partir du poids et de la taille : utile comme premier repère, insuffisant pour décrire toute votre santé.",
    closingCta: { label: "Calculer mon IMC", href: "/" },
    secondaryLinks: [
      { label: "Comment interpréter son IMC ?", href: "/guides/comment-interpreter-son-imc" },
      { label: "Les limites de l'IMC", href: "/guides/limites-de-l-imc" },
    ],
  },
  postConclusion: {
    sources: {
      id: "sources",
      title: "Sources et références",
      blocks: [
        {
          type: "paragraph",
          text: "Les informations de ce guide s'appuient principalement sur les références suivantes.",
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
              title: "Surpoids et obésité de l'adulte : prise en charge médicale de premier recours",
              year: "2011",
              href: "https://has-sante.fr/jcms/c_964938/fr/surpoids-et-obesite-de-l-adulte-prise-en-charge-medicale-de-premier-recours",
            },
            {
              org: "Santé publique France",
              title: "De la grossesse à l'arrivée de bébé, avec sérénité",
              year: "2026",
              href: "https://www.santepubliquefrance.fr/nutrition-et-activite-physique/brochure/de-la-grossesse-a-larrivee-de-bebe-avec-serenite-alimentation-activite-physique-et-bien-etre",
            },
            {
              org: "A. Keys et al.",
              title: "Indices of relative weight and obesity",
              year: "1972",
              href: "https://doi.org/10.1016/0021-9681(72)90027-6",
            },
            {
              org: "G. Eknoyan",
              title: "Adolphe Quetelet (1796-1874): the average man and indices of obesity",
              year: "2008",
              href: "https://doi.org/10.1093/ndt/gfm517",
            },
          ],
        },
      ],
    },
    editorialNote: {
      title: "Note éditoriale",
      paragraphs: [
        "Ce contenu a une vocation pédagogique et s'appuie sur les références institutionnelles et scientifiques citées sur cette page. Il ne remplace pas l'avis d'un professionnel de santé.",
        "Antoine, auteur de Calculer-mon-IMC.fr, n'est ni médecin ni nutritionniste.",
      ],
    },
  },
  sidebar: imcGuideSidebar([
    { title: "Comment calculer son IMC ?", href: "/guides/comment-calculer-son-imc" },
    { title: "Comment interpréter son IMC ?", href: "/guides/comment-interpreter-son-imc" },
    { title: "Les limites de l'IMC", href: "/guides/limites-de-l-imc" },
    { title: "Calculer son poids idéal", href: "/guides/calculer-son-poids-ideal" },
  ]),
};
