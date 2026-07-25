import type { Guide } from "../types";
import { imcGuideSidebar } from "./guide-imc-shared";

export const commentCalculerSonImcGuide: Guide = {
  slug: "comment-calculer-son-imc",
  title: "Comment calculer son IMC ?",
  seoTitle: "Comment calculer son IMC ? Formule, exemples et méthode pas à pas",
  description:
    "Comment calculer son IMC ? Formule officielle, conversion cm en mètres, exemples chiffrés, erreurs à éviter et vérification avec le calculateur gratuit.",
  subtitle:
    "Poids, taille, conversion et formule : tout pour obtenir un IMC fiable, avec des exemples que vous pouvez reproduire chez vous.",
  publishedAt: "2026-07-20",
  updatedAt: "2026-07-22",
  introduction: [
    "Calculer son IMC est simple, à condition d'utiliser la bonne formule et les bonnes unités. Dans ce guide, découvrez la méthode pas à pas, les erreurs à éviter et des exemples concrets pour réaliser un calcul fiable.",
    "La formule tient en une ligne, mais une mauvaise unité suffit à fausser le résultat. Vous trouverez ici la méthode complète, des exemples concrets et les pièges les plus courants, avant de comparer votre calcul au simulateur.",
  ],
  introDisclaimer:
    "Contenu à visée pédagogique : il ne remplace pas un avis médical personnalisé.",
  quickSummary: {
    title: "Calculer son IMC en bref",
    variant: "cards",
    items: [],
    cards: [
      { icon: "÷", label: "Formule", value: "IMC = poids (kg) ÷ taille² (m)" },
      { icon: "↔", label: "Conversion", value: "170 cm = 1,70 m" },
      { icon: "kg", label: "Unités", value: "Kilogrammes et mètres" },
      { icon: "≈", label: "Résultat type", value: "24,2 kg/m²" },
      { icon: "◎", label: "Étape suivante", value: "Comparer aux catégories OMS adultes" },
      { icon: "!", label: "Erreur fréquente", value: "Utiliser les centimètres au lieu des mètres" },
    ],
  },
  sections: [
    {
      id: "rappel",
      title: "Que calcule-t-on exactement ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'IMC (indice de masse corporelle, ou BMI en anglais) est un nombre dérivé du poids et de la taille. Chez l'adulte, il sert surtout à situer une corpulence par rapport aux seuils de référence utilisés par l'OMS et repris par l'Assurance Maladie.",
        },
        {
          type: "paragraph",
          text: "Ce n'est pas une mesure directe comme un poids sur la balance. C'est un indice calculé. Deux personnes peuvent afficher 23 kg/m² avec des silhouettes très différentes, d'où l'intérêt de ne jamais s'arrêter au chiffre seul.",
        },
        {
          type: "list",
          items: [
            "Entrées : poids en kg, taille en m (centimètres convertis si besoin).",
            "Sortie : un nombre, le plus souvent en kg/m².",
            "Usage : comparer le résultat aux catégories adultes de référence.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Qu'est-ce que l'IMC ?",
          href: "/guides/quest-ce-que-l-imc",
          intro: "Pour la définition, l'origine ou le rôle de l'indicateur dans le cocon IMC, consultez",
        },
      ],
    },
    {
      id: "formule-officielle",
      title: "La formule officielle de l'IMC",
      blocks: [
        {
          type: "paragraph",
          text: "Partout dans le monde, la même formule s'applique : IMC = poids (kg) ÷ [taille (m)]². Concrètement, vous divisez votre poids en kilogrammes par votre taille en mètres, multipliée par elle-même.",
        },
        {
          type: "paragraph",
          text: "Prenons 70 kg pour 1,70 m. On calcule d'abord 1,70 × 1,70 = 2,89, puis 70 ÷ 2,89 = 24,2 kg/m². C'est exactement la logique que suivent les calculateurs en ligne, y compris le nôtre.",
        },
        {
          type: "definition-list",
          items: [
            { term: "Poids (numérateur)", definition: "Masse en kilogrammes. Exemple : 68 kg, pas 150 lb sans conversion." },
            {
              term: "Taille² (dénominateur)",
              definition: "Taille en mètres, au carré. Exemple : 1,75 m → 1,75 × 1,75 = 3,0625.",
            },
            {
              term: "Résultat",
              definition: "Un indice en kg/m² qui situe le poids par rapport à la taille.",
            },
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "Homme ou femme, jeune adulte ou senior : la formule ne change pas. Seule l'interprétation du résultat peut varier selon le profil.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "IMC, BMI, indice de masse corporelle : trois noms, un seul calcul. Si vous tombez sur un site anglophone, la formule reste identique.",
          ],
        },
      ],
    },
    {
      id: "resultat-kg-m2",
      title: "Pourquoi le résultat s'exprime en kg/m² ?",
      blocks: [
        {
          type: "paragraph",
          text: "L'unité n'est pas là pour impressionner. Elle décrit l'opération : des kilogrammes divisés par des mètres au carré. D'où « kg/m² », que l'on retrouve sur les fiches de l'OMS comme sur celles de l'Assurance Maladie.",
        },
        {
          type: "list",
          items: [
            "En haut de la fraction : une masse, en kg.",
            "En bas : une surface dérivée de la taille, en m².",
            "Au final : un nombre comparable d'une personne à l'autre, quelle que soit sa stature.",
          ],
        },
        {
          type: "paragraph",
          text: "Sans cette normalisation, un grand gabarit serait pénalisé et un petit gabarit avantagé, même avec une corpulence équivalente. Le kg/m² corrige cet effet de taille.",
        },
        {
          type: "callout",
          variant: "hint",
          paragraphs: [
            "Un site affiche « 22,2 » sans unité ? Lisez quand même kg/m² : les seuils adultes (18,5, 25, 30…) s'appliquent de la même façon.",
          ],
        },
      ],
    },
    {
      id: "pourquoi-cette-formule",
      title: "Pourquoi diviser par la taille au carré ?",
      blocks: [
        {
          type: "paragraph",
          text: "Quand on grandit, le poids augmente, mais pas au même rythme que la taille. Statistiquement, chez l'adulte, le poids tend plutôt à suivre le carré de la taille. C'est pour cela que la formule divise par taille², et non par la taille seule.",
        },
        {
          type: "list",
          items: [
            "Division par la taille seule : IMC trop élevé chez les grands gabits.",
            "Division par taille³ (indice pondéral) : IMC trop bas chez les mêmes profils.",
            "Division par taille² : compromis retenu internationalement, simple à reproduire.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          paragraphs: [
            "Pas besoin de retenir l'histoire statistique. L'essentiel : convertir, mettre au carré, diviser. Dans cet ordre, à chaque calcul.",
          ],
        },
      ],
    },
    {
      id: "unites",
      title: "Unités indispensables : kilogrammes et mètres",
      blocks: [
        {
          type: "paragraph",
          text: "La formule officielle parle kilogrammes et mètres. En France, la taille se mesure souvent en centimètres : pensez à convertir avant toute chose. 175 cm, ce n'est pas 175 dans la formule, c'est 1,75.",
        },
        {
          type: "table",
          variant: "imc-categories",
          caption: "Centimètres → mètres : les conversions les plus utiles",
          headers: ["Taille indiquée", "À saisir dans la formule"],
          rows: [
            ["150 cm", "1,50 m"],
            ["160 cm", "1,60 m"],
            ["165 cm", "1,65 m"],
            ["170 cm", "1,70 m"],
            ["175 cm", "1,75 m"],
            ["180 cm", "1,80 m"],
            ["185 cm", "1,85 m"],
            ["195 cm", "1,95 m"],
          ],
        },
        {
          type: "callout",
          variant: "error",
          paragraphs: [
            "Erreur classique : entrer 170 au lieu de 1,70. Le résultat tombe proche de zéro, bien en dessous de toute catégorie adulte. Si votre IMC affiche 0,00x, recommencez par la conversion.",
          ],
        },
        {
          type: "callout",
          variant: "hint",
          paragraphs: [
            "Astuce rapide : divisez les centimètres par 100, ou reculez la virgule de deux rangs. 168 cm → 1,68 m.",
          ],
        },
        {
          type: "paragraph",
          text: "Balance en livres, taille en pieds et pouces ? Convertissez d'abord. La formule ne change pas ; seules les unités d'entrée diffèrent.",
        },
        {
          type: "table",
          variant: "imc-categories",
          caption: "Mesures impériales → système international",
          headers: ["Vous avez", "Convertissez en"],
          rows: [
            ["1 livre (lb)", "≈ 0,454 kg"],
            ["150 lb", "≈ 68 kg"],
            ["5 pieds 9 pouces (5'9\")", "≈ 1,75 m"],
            ["5 pieds 5 pouces (5'5\")", "≈ 1,65 m"],
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Notez poids et taille convertis sur papier avant de calculer. Mélanger lb et kg, ou pouces et mètres, produit un chiffre plausible mais faux.",
          ],
        },
      ],
    },
    {
      id: "etapes",
      title: "Les étapes du calcul pas à pas",
      blocks: [
        {
          type: "paragraph",
          text: "Cinq étapes, toujours dans le même ordre. Vérifiez l'unité à chaque passage : c'est le point où la plupart des calculs déraillent.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Relever le poids en kilogrammes",
              description:
                "Balance à plat, idéalement le matin à jeun, sans manteau ni chaussures. Si vous suivez une évolution, gardez les mêmes conditions à chaque pesée.",
            },
            {
              title: "Mesurer la taille, puis convertir en mètres",
              description:
                "Debout, pieds joints, regard face à l'horizon. 175 cm → 1,75 m (175 ÷ 100). Vous connaissez déjà 1,82 m ? Passez directement à l'étape suivante.",
            },
            {
              title: "Mettre la taille au carré",
              description:
                "Multipliez la taille par elle-même : 1,75 × 1,75 = 3,0625. Ne sautez pas cette étape : diviser par 1,75 (sans carré) fausse tout.",
            },
            {
              title: "Diviser le poids par ce carré",
              description:
                "68 kg ÷ 3,0625 = 22,204… Arrondi à une décimale : 22,2 kg/m². Une calculatrice ou le simulateur du site évitent l'erreur de manipulation.",
            },
            {
              title: "Arrondir, puis lire le résultat avec recul",
              description:
                "Une décimale suffit (22,2, pas 22,204891). Placez ensuite le chiffre dans les catégories adultes de référence.",
              href: "/guides/comment-interpreter-son-imc",
              linkLabel: "Lire les catégories OMS adultes",
            },
          ],
        },
        {
          type: "callout",
          variant: "advice",
          paragraphs: [
            "Date, poids, taille, résultat : quatre lignes dans un carnet suffisent pour suivre une évolution. Vous comparerez des mesures prises dans des conditions identiques.",
          ],
        },
      ],
    },
    {
      id: "exemples",
      title: "Exemples de calcul d'IMC",
      blocks: [
        {
          type: "paragraph",
          text: "Reprenez ces profils avec votre calculatrice : chaque ligne aboutit au résultat indiqué, arrondi à une décimale comme sur notre simulateur.",
        },
        {
          type: "table",
          variant: "imc-categories",
          caption: "Sept situations types, une seule formule",
          headers: ["Profil", "Taille", "Poids", "Calcul", "IMC"],
          rows: [
            [
              "Homme",
              "1,75 m (175 cm)",
              "68 kg",
              "68 ÷ (1,75 × 1,75)",
              "22,2 kg/m²",
            ],
            [
              "Femme",
              "1,65 m (165 cm)",
              "58 kg",
              "58 ÷ (1,65 × 1,65)",
              "21,3 kg/m²",
            ],
            [
              "Seuil normal / surpoids",
              "1,70 m (170 cm)",
              "70 kg",
              "70 ÷ (1,70 × 1,70)",
              "24,2 kg/m²",
            ],
            [
              "Grand gabarit",
              "1,95 m (195 cm)",
              "90 kg",
              "90 ÷ (1,95 × 1,95)",
              "23,7 kg/m²",
            ],
            [
              "Petit gabarit",
              "1,55 m (155 cm)",
              "52 kg",
              "52 ÷ (1,55 × 1,55)",
              "21,6 kg/m²",
            ],
            [
              "Poids avec décimale",
              "1,68 m (168 cm)",
              "63,5 kg",
              "63,5 ÷ (1,68 × 1,68)",
              "22,5 kg/m²",
            ],
            [
              "Cas limite d'arrondi",
              "1,72 m (172 cm)",
              "65 kg",
              "65 ÷ (1,72 × 1,72) = 21,97…",
              "22,0 kg/m²",
            ],
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "63,5 kg pour 1,68 m : 1,68² = 2,8224, puis 63,5 ÷ 2,8224 = 22,498… L'arrondi donne 22,5 kg/m².",
          ],
        },
        {
          type: "callout",
          variant: "example",
          paragraphs: [
            "65 kg pour 1,72 m : 65 ÷ 2,9584 = 21,971… Le chiffre après la virgule est 7 (≥ 5), donc 22,0 kg/m², pas 21,9.",
          ],
        },
        {
          type: "contextual-cta",
          text: "Entrez vos propres mesures pour confirmer un de ces exemples, ou calculez directement votre IMC en quelques secondes.",
          label: "Ouvrir le calculateur IMC",
          href: "/",
        },
      ],
    },
    {
      id: "arrondi",
      title: "Faut-il arrondir le résultat ?",
      blocks: [
        {
          type: "paragraph",
          text: "22,2 kg/m² ou 22,204891 ? En pratique, une décimale suffit. Notre calculateur arrondit ainsi, comme la plupart des outils grand public.",
        },
        {
          type: "paragraph",
          text: "Les seuils adultes eux-mêmes sont arrondis (18,5 ; 25 ; 30). Un IMC à 24,96 et un autre à 25,04 se situent tous deux au voisinage du repère surpoids : l'arrondi ne doit pas occulter cette zone grise.",
        },
        {
          type: "list",
          items: [
            "Une décimale change rarement la catégorie chez l'adulte.",
            "Un écart de 0,1 entre deux sites vient souvent d'un arrondi intermédiaire différent.",
            "Pour un suivi dans le temps, gardez la même règle d'arrondi à chaque mesure.",
          ],
        },
        {
          type: "callout",
          variant: "retain",
          paragraphs: [
            "L'arrondi sert à lire, pas à trancher. Des mesures fiables et des unités correctes comptent bien plus qu'une décimale supplémentaire.",
          ],
        },
      ],
    },
    {
      id: "erreurs-frequentes",
      title: "Erreurs fréquentes et bonnes pratiques",
      blocks: [
        {
          type: "paragraph",
          text: "Quand deux sites affichent des IMC différents, la cause est presque toujours la même : unités, conversion ou oubli du carré. Reprenez la saisie avant de douter de la formule.",
        },
        {
          type: "table",
          variant: "imc-categories",
          caption: "Même personne (175 cm, 68 kg), saisies différentes",
          headers: ["Ce que vous entrez", "Calcul", "Résultat"],
          rows: [
            ["1,75 m et 68 kg", "68 ÷ (1,75 × 1,75)", "22,2 kg/m² ✓"],
            ["175 et 68", "68 ÷ (175 × 175)", "≈ 0,002 (aberrant)"],
            ["1,75 sans carré", "68 ÷ 1,75", "38,9 (incohérent)"],
            ["150 lb saisis comme kg", "150 ÷ (1,75 × 1,75)", "49,0 (faussé)"],
          ],
        },
        {
          type: "table",
          variant: "imc-categories",
          caption: "Erreurs, conséquences et correction",
          headers: ["Erreur", "Ce qui se passe", "Correction"],
          rows: [
            [
              "Centimètres au lieu de mètres",
              "IMC proche de zéro",
              "Diviser les cm par 100, puis mettre au carré",
            ],
            [
              "Taille non mise au carré",
              "Chiffre trop élevé, sans unité cohérente",
              "Multiplier la taille en m par elle-même",
            ],
            [
              "Livres saisies en kilogrammes",
              "IMC surévalué ou sous-évalué",
              "Multiplier les lb par 0,454 avant le calcul",
            ],
            [
              "Arrondi à mi-parcours",
              "Écart de 0,1 sur le résultat final",
              "Calculer d'abord, arrondir à la fin",
            ],
            [
              "Taille ou poids de mémoire",
              "Résultat décalé de plusieurs points",
              "Mesurer à nouveau, avec le même protocole",
            ],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          paragraphs: [
            "Un mauvais IMC peut rassurer ou inquiéter à tort. Si le chiffre vous surprend, refaites le calcul en contrôlant chaque unité avant d'en tirer une conclusion.",
          ],
        },
      ],
    },
    {
      id: "sans-calculatrice",
      title: "Calculer son IMC sans calculatrice",
      blocks: [
        {
          type: "paragraph",
          text: "Avec des chiffres ronds, le calcul se fait à la main. Dès que la taille comporte des décimales (1,68 m, 1,72 m…), une calculatrice ou le simulateur du site évitent une erreur de manipulation.",
        },
        {
          type: "paragraph",
          text: "Essayez avec 1,70 m et 70 kg : 1,70² = 2,89, puis 70 ÷ 2,89 = 24,2 kg/m². Si vous obtenez autre chose, revérifiez le carré de la taille en premier.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Convertir la taille en mètres et calculer le carré sur papier.",
            "Diviser le poids par ce carré.",
            "Arrondir à une décimale.",
            "Confirmer avec le calculateur en ligne.",
          ],
        },
        {
          type: "internal-link",
          variant: "calculator",
          label: "Calculateur IMC",
          href: "/",
          intro: "Pour gagner du temps et zéro risque sur la conversion cm → m, passez par le",
        },
      ],
    },
    {
      id: "apres-calcul",
      title: "Que faire une fois l'IMC calculé ?",
      blocks: [
        {
          type: "paragraph",
          text: "Vous avez un chiffre. Et maintenant ? Il reste à le lire avec les catégories adultes de référence (OMS, reprises par l'Assurance Maladie), puis à le relativiser. L'IMC ne dit rien de votre masse grasse, de votre muscle ni de votre santé globale.",
        },
        {
          type: "list",
          items: [
            "Situer le résultat parmi les seuils adultes (insuffisance pondérale, normal, surpoids, obésité).",
            "Contextualiser : âge, morphologie, activité physique, antécédents.",
            "Connaître les limites de l'indicateur avant toute décision.",
            "Consulter un professionnel de santé si le résultat vous interroge.",
          ],
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Comment interpréter son IMC ?",
          href: "/guides/comment-interpreter-son-imc",
          intro: "Chaque fourchette adulte, expliquée avec les repères OMS :",
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Les limites de l'IMC",
          href: "/guides/limites-de-l-imc",
          intro: "Sportifs, seniors, femmes enceintes : quand le repère perd en pertinence :",
        },
        {
          type: "internal-link",
          variant: "guide",
          label: "Calculer son poids idéal",
          href: "/guides/calculer-son-poids-ideal",
          intro: "Une fourchette de poids cohérente avec un IMC normal, sans chiffre magique :",
        },
      ],
    },
    {
      id: "poursuivre",
      title: "Comment poursuivre sur le site ?",
      blocks: [
        {
          type: "paragraph",
          text: "Le calcul est maîtrisé. Voici la suite naturelle pour aller plus loin sur Calculer Mon IMC.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Confirmer avec le calculateur",
              description: "Entrez poids et taille : le simulateur reprend la même formule et les mêmes arrondis.",
              href: "/",
              linkLabel: "Calculer mon IMC en ligne",
            },
            {
              title: "Revenir aux fondamentaux",
              description: "Définition, origine, rôle en santé publique : utile si l'indicateur vous est nouveau.",
              href: "/guides/quest-ce-que-l-imc",
              linkLabel: "Qu'est-ce que l'IMC ?",
            },
            {
              title: "Lire votre catégorie",
              description: "18,5, 25, 30 : que signifient concrètement ces seuils pour un adulte ?",
              href: "/guides/comment-interpreter-son-imc",
              linkLabel: "Interpréter son résultat d'IMC",
            },
            {
              title: "Identifier les cas limites",
              description: "Masse musculaire, âge, grossesse : les profils où l'IMC se lit autrement.",
              href: "/guides/limites-de-l-imc",
              linkLabel: "Limites de l'IMC",
            },
            {
              title: "Estimer une fourchette de poids",
              description: "Un repère chiffré, pas un objectif universel : comment l'aborder avec prudence.",
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
      question: "Quelle est la formule officielle de l'IMC ?",
      answer:
        "IMC = poids (kg) ÷ [taille (m)]². Exemple : 68 kg et 1,75 m donnent 68 ÷ (1,75 × 1,75) = 22,2 kg/m². C'est la formule retenue par l'OMS et reprise sur les fiches de l'Assurance Maladie pour situer la corpulence adulte.",
    },
    {
      question: "Pourquoi divise-t-on par la taille au carré ?",
      answer:
        "Parce que le poids augmente approximativement comme le carré de la taille chez l'adulte. Diviser par taille² permet de comparer une personne de 1,55 m et une autre de 1,85 m sur la même échelle, sans pénaliser les grands gabits.",
    },
    {
      question: "Pourquoi convertir les centimètres en mètres ?",
      answer:
        "La formule exige des mètres. Entrer 170 au lieu de 1,70 produit un IMC proche de zéro, totalement incohérent. Divisez les centimètres par 100 : 168 cm → 1,68 m, puis mettez au carré.",
    },
    {
      question: "Pourquoi le résultat est-il exprimé en kg/m² ?",
      answer:
        "Parce que vous divisez des kilogrammes par des mètres au carré. L'unité kg/m² traduit exactement cette opération. Même sans l'affichage explicite, les seuils adultes (18,5, 25, 30…) s'interprètent dans cette unité.",
    },
    {
      question: "Le calcul est-il le même pour les femmes et les hommes ?",
      answer:
        "Oui, formule strictement identique. Un homme de 1,75 m et 68 kg obtient le même IMC qu'une femme avec les mêmes mesures. Seule l'interprétation peut nécessiter du contexte (morphologie, masse musculaire, etc.).",
    },
    {
      question: "Le calcul change-t-il avec l'âge ?",
      answer:
        "Non : poids ÷ taille², quel que soit l'âge. En revanche, chez l'enfant ou l'adolescent, l'interprétation repose sur des courbes de croissance, pas sur les seuils adultes OMS. Voir notre guide sur les limites de l'IMC pour le détail.",
    },
    {
      question: "Faut-il arrondir l'IMC ?",
      answer:
        "Une décimale suffit (22,2 plutôt que 22,204891). Arrondissez en fin de calcul, pas à mi-parcours, pour limiter les écarts entre outils. Un IMC à 24,96 et un à 25,04 restent tous deux au voisinage du seuil de surpoids.",
    },
    {
      question: "Pourquoi mon calcul est différent selon les sites ?",
      answer:
        "Vérifiez d'abord les unités (cm vs m, lb vs kg). Ensuite l'arrondi intermédiaire : certains outils arrondissent le carré de la taille, d'autres le résultat final. Un écart de 0,1 est fréquent ; un écart de plusieurs points signale presque toujours une erreur de saisie.",
    },
    {
      question: "Peut-on utiliser les livres (lbs) ?",
      answer:
        "Oui, à condition de convertir avant le calcul. 1 lb ≈ 0,454 kg : 150 lb ≈ 68 kg. Entrer 150 directement en kilogrammes fausse le résultat d'environ 25 points d'IMC pour une taille de 1,75 m.",
    },
    {
      question: "Comment calculer son IMC sans calculatrice ?",
      answer:
        "Convertissez la taille en mètres, calculez le carré sur papier, divisez le poids par ce nombre, arrondissez. Avec 1,70 m et 70 kg : 1,70² = 2,89, 70 ÷ 2,89 = 24,2 kg/m². Pour des chiffres moins ronds, une calculatrice reste plus sûre.",
    },
    {
      question: "Quelles erreurs de saisie sont les plus fréquentes ?",
      answer:
        "Top 3 : centimètres saisis comme mètres (IMC proche de zéro), taille oubliée au carré (chiffre incohérent), livres entrées en kilogrammes (IMC faussé). Reprenez systématiquement conversion et carré si le résultat vous surprend.",
    },
    {
      question: "Dois-je interpréter mon IMC immédiatement après le calcul ?",
      answer:
        "Vous pouvez situer le chiffre parmi les catégories adultes OMS, mais gardez du recul. L'IMC ne mesure ni la masse grasse ni l'état de santé. Pour la lecture détaillée, consultez notre guide pour interpréter son IMC ; pour les profils atypiques, celui sur les limites de l'IMC.",
    },
  ],
  faqTitle: "Questions fréquentes sur le calcul de l'IMC",
  faqIntro:
    "Formule, unités, arrondi, écarts entre sites : les réponses essentielles, sans détour.",
  conclusion: {
    keyPoints: [
      "IMC = poids (kg) ÷ [taille (m)]², pour tous les adultes.",
      "175 cm, ce n'est pas 175 dans la formule : convertissez en 1,75 m.",
      "Mettez la taille au carré avant de diviser.",
      "Arrondissez à une décimale en fin de calcul.",
      "Un chiffre correctement calculé n'est qu'une première étape : l'interprétation compte autant.",
    ],
    closingText:
      "Vous avez la formule, les conversions et les pièges à éviter. Entrez vos mesures dans le simulateur pour confirmer, puis lisez votre résultat avec les repères adaptés.",
    closingCta: { label: "Calculer mon IMC", href: "/" },
    secondaryLinks: [
      { label: "Interpréter mon IMC", href: "/guides/comment-interpreter-son-imc" },
      { label: "Qu'est-ce que l'IMC ?", href: "/guides/quest-ce-que-l-imc" },
    ],
  },
  postConclusion: {
    sources: {
      id: "sources",
      title: "Sources et références",
      blocks: [
        {
          type: "paragraph",
          text: "Formule, seuils adultes et bonnes pratiques de calcul : les repères ci-dessous reprennent les sources habituellement citées en santé publique.",
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
              org: "A. Keys et al.",
              title: "Indices of relative weight and obesity",
              year: "1972",
              href: "https://doi.org/10.1016/0021-9681(72)90027-6",
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
    { title: "Comment interpréter son IMC ?", href: "/guides/comment-interpreter-son-imc" },
    { title: "Les limites de l'IMC", href: "/guides/limites-de-l-imc" },
    { title: "Calculer son poids idéal", href: "/guides/calculer-son-poids-ideal" },
  ]),
};
