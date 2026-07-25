import type { FaqItem } from "@/framework/types";
import { FAQ_INTERNAL_LINKS as L } from "./faq-page-links";

export type FaqAnswerSegment = string | { href: string; link: string };

export interface FaqPageItem {
  question: string;
  answer: FaqAnswerSegment[];
}

export interface FaqPageCategory {
  id: string;
  title: string;
  tocLabel: string;
  items: FaqPageItem[];
}

export interface FaqPageSourceItem {
  label: string;
  href: string;
  linkText: string;
}

export const FAQ_PAGE_META = {
  title: "FAQ IMC : calcul, interprétation, poids idéal et masse grasse",
  description:
    "Retrouvez les réponses aux questions fréquentes sur le calcul de l'IMC, son interprétation, ses limites, le poids idéal, la masse grasse et nos calculateurs gratuits.",
};

export const FAQ_PAGE_H1 = "Questions fréquentes sur l'IMC";

export const FAQ_PAGE_SUBTITLE =
  "Calcul, interprétation, limites de l'IMC, poids idéal, masse grasse et utilisation de nos calculateurs.";

/** Deux paragraphes d'introduction (≈ 90 à 140 mots au total). */
export const FAQ_PAGE_INTRO_PARAGRAPHS: FaqAnswerSegment[][] = [
  [
    "Cette FAQ rassemble les réponses aux principales questions sur le calcul de l'IMC, son interprétation, ses limites, le poids idéal, la masse grasse et l'utilisation de nos calculateurs. Elle complète le ",
    L.calcImc,
    " et la page ",
    L.guidesHubShort,
    ", sans remplacer les articles plus détaillés.",
  ],
  [
    "Les réponses sont pédagogiques et restent indicatives : elles aident à comprendre un résultat, pas à établir un diagnostic. Pour une estimation concrète, vous pouvez aussi utiliser le ",
    L.calcPoidsIdeal,
    " ou l'",
    L.calcMasseGrasse,
    ".",
  ],
];

export const FAQ_PAGE_UPDATED = "25 juillet 2026";

export const FAQ_PAGE_SOURCES = {
  id: "sources-faq",
  title: "Sources et références",
  tocLabel: "Sources",
  intro:
    "Les réponses de cette FAQ s'appuient sur les classifications institutionnelles de l'IMC et sur les publications décrivant les formules utilisées par les calculateurs. Ces références ne constituent pas une validation médicale individualisée des résultats.",
  items: [
    {
      label: "Organisation mondiale de la Santé : classification de la corpulence chez l'adulte.",
      href: "https://www.who.int/fr/news-room/fact-sheets/detail/obesity-and-overweight",
      linkText: "OMS : obésité et surpoids",
    },
    {
      label:
        "Assurance Maladie : repères d'interprétation de l'IMC chez l'adulte (seuils et catégories).",
      href: "https://www.ameli.fr/assure/sante/themes/obesite-adulte/imc-surpoids-obesite-adulte",
      linkText: "Ameli : IMC, surpoids et obésité",
    },
    {
      label:
        "Haute Autorité de santé : recommandations sur le surpoids et l'obésité de l'adulte.",
      href: "https://www.has-sante.fr/jcms/c_2025619/fr/surpoids-et-obesite-de-l-adulte",
      linkText: "HAS : surpoids et obésité de l'adulte",
    },
  ] satisfies FaqPageSourceItem[],
  methodsNote:
    "Les formules de poids idéal (Lorentz, Devine, Robinson, Miller, Hamwi, Broca) et les méthodes d'estimation de masse grasse (Deurenberg, RFM, YMCA, U.S. Navy) correspondent à celles réellement proposées par les calculateurs du site, selon leurs publications d'origine.",
};

export const FAQ_PAGE_OUTRO_SEGMENTS: FaqAnswerSegment[] = [
  "Cette FAQ répond aux questions courantes sur l'IMC et les indicateurs associés. Pour approfondir, consultez nos ",
  L.guidesHubShort,
  " ; pour obtenir une estimation, passez par ",
  L.toolsHubShort,
  ". Les résultats restent des estimations pédagogiques à croiser avec le contexte individuel.",
];

export const faqPageCategories: FaqPageCategory[] = [
  {
    id: "calcul-imc",
    title: "Calcul de l'IMC",
    tocLabel: "Calcul de l'IMC",
    items: [
      {
        question: "Comment calculer son IMC ?",
        answer: [
          "Divisez votre poids en kilogrammes par le carré de votre taille en mètres. Exemple : 70 kg pour 1,75 m donne 70 ÷ (1,75 × 1,75) ≈ 22,9. Le résultat se lit ensuite selon les catégories adultes usuelles. Pour un calcul immédiat, utilisez le ",
          L.calcImcAction,
          ".",
        ],
      },
      {
        question: "Quelle est la formule de l'IMC ?",
        answer: [
          "La formule de calcul de l'IMC est identique pour les hommes et les femmes adultes : poids (kg) ÷ taille (m)². En revanche, la composition corporelle moyenne, notamment la proportion de masse grasse et de masse musculaire, peut différer. L'IMC ne reflète pas directement ces différences. Le détail du calcul est expliqué dans le guide pour ",
          L.guideCalculerImc,
          ".",
        ],
      },
      {
        question: "Quelle taille et quel poids utiliser pour calculer son IMC ?",
        answer: [
          "Utilisez une taille mesurée sans chaussures et un poids pris dans des conditions stables, de préférence le matin, après être allé aux toilettes et avant un repas copieux. Une balance précise et une toise (ou un mètre mural) limitent les erreurs. Des mesures approximatives faussent surtout le résultat près d'un seuil de catégorie.",
        ],
      },
      {
        question: "Peut-on calculer son IMC en livres et en pieds ?",
        answer: [
          "Oui, à condition de convertir correctement : 1 livre ≈ 0,4536 kg et 1 pied = 0,3048 m (ou convertissez d'abord en kg et mètres). Une erreur d'unité fausse nettement le résultat. Sur ce site, le calculateur IMC fonctionne en unités métriques.",
        ],
      },
      {
        question: "Le calculateur IMC est-il gratuit ?",
        answer: [
          "Oui, le calculateur IMC est gratuit et utilisable sans inscription.",
        ],
      },
      {
        question: "Pourquoi mon IMC change-t-il peu après une perte de poids ?",
        answer: [
          "L'IMC dépend du poids divisé par le carré de la taille. Une variation de quelques kilogrammes peut donc modifier le résultat progressivement, mais l'ampleur exacte du changement dépend de votre taille. Près d'un seuil, une petite variation peut faire changer la catégorie affichée sans transformer radicalement la situation : les seuils restent des repères statistiques.",
        ],
      },
    ],
  },
  {
    id: "interpretation-imc",
    title: "Interprétation de l'IMC",
    tocLabel: "Interprétation de l'IMC",
    items: [
      {
        question: "Comment interpréter son IMC ?",
        answer: [
          "Comparez votre résultat aux catégories adultes usuelles (insuffisance pondérale, corpulence normale, surpoids, catégories d'obésité). Ces seuils sont des repères statistiques, pas un diagnostic. Pour une lecture détaillée des plages et des nuances, consultez le guide pour ",
          L.guideInterpreterImc,
          ".",
        ],
      },
      {
        question: "Quelles sont les catégories de l'IMC ?",
        answer: [
          "Chez l'adulte, on distingue en général : insuffisance pondérale (IMC < 18,5), corpulence normale (18,5 à 24,9), surpoids (25 à 29,9), puis obésité modérée, sévère et massive (à partir de 30, 35 et 40). Ces plages servent de cadre commun ; elles ne décrivent pas à elles seules l'état de santé.",
        ],
      },
      {
        question: "Quel est un IMC normal ?",
        answer: [
          "Un IMC compris entre 18,5 et 24,9 est généralement classé dans la catégorie de corpulence normale chez l'adulte. Cette plage reste un repère statistique : elle ne suffit pas à évaluer la masse grasse, la condition physique ou l'état de santé général.",
        ],
      },
      {
        question: "Que signifie un IMC inférieur à 18,5 ?",
        answer: [
          "Un IMC inférieur à 18,5 place le résultat dans la catégorie d'insuffisance pondérale chez l'adulte. C'est un signal statistique, pas une conclusion nutritionnelle automatique. Selon le contexte (âge, antécédents, appétit, fatigue), un professionnel de santé pourra affiner l'évaluation.",
        ],
      },
      {
        question: "Que signifie un IMC supérieur à 25 ?",
        answer: [
          "À partir de 25, le résultat se situe dans la catégorie surpoids chez l'adulte ; à partir de 30, le résultat entre dans une catégorie d'obésité selon les classes usuelles. Un chiffre élevé n'implique pas à lui seul un diagnostic clinique : masse musculaire, répartition des graisses et bilans médicaux complètent la lecture.",
        ],
      },
      {
        question: "Un IMC normal signifie-t-il être en bonne santé ?",
        answer: [
          "Non. Un IMC situé dans la catégorie de corpulence normale ne garantit pas à lui seul une bonne santé. Il ne renseigne pas directement sur la tension artérielle, la glycémie, la répartition de la graisse, la condition physique, le sommeil ou d'autres facteurs importants. À l'inverse, un IMC situé en dehors de cette plage ne signifie pas automatiquement qu'une personne est malade.",
        ],
      },
      {
        question: "Une variation de quelques dixièmes est-elle importante ?",
        answer: [
          "Rarement en soi. Passer de 24,8 à 25,1 peut faire changer de catégorie sur le papier, sans transformer radicalement la situation. Les seuils sont des frontières statistiques : une tendance sur plusieurs mesures et le contexte personnel comptent davantage qu'un dixième isolé. Pour le cadre général de l'indicateur, vous pouvez ",
          L.guideQuestCeQueImc,
          ".",
        ],
      },
    ],
  },
  {
    id: "limites-imc",
    title: "Limites et fiabilité de l'IMC",
    tocLabel: "Limites et fiabilité",
    items: [
      {
        question: "L'IMC est-il fiable ?",
        answer: [
          "L'IMC est un indicateur standardisé utile pour classer la corpulence et comparer des populations. À l'échelle individuelle, sa précision reste limitée, car il ne tient pas compte directement de la masse musculaire, de la masse grasse, de la répartition des graisses ni de nombreux autres facteurs de santé. Il peut servir de premier repère, mais ne suffit pas à décrire la santé ou la composition corporelle et doit être interprété avec le contexte individuel. Pour le détail des cas limites, voir le guide pour ",
          L.guideLimitesImc,
          ".",
        ],
      },
      {
        question: "Pourquoi l'IMC peut-il être trompeur ?",
        answer: [
          "Parce qu'il ne distingue pas masse musculaire et masse grasse, ni la localisation des graisses. Une personne musclée peut avoir un IMC élevé sans excès de graisse ; une autre peut avoir un IMC situé dans la catégorie de corpulence normale avec un tour de taille élevé. L'indicateur décrit une relation poids/taille, pas un portrait de santé complet.",
        ],
      },
      {
        question: "L'IMC convient-il aux sportifs ?",
        answer: [
          "Chez les sportifs très musclés, l'IMC peut surestimer la corpulence liée à la graisse. Il reste calculable, mais son interprétation doit être complétée par d'autres informations sur la composition corporelle. Vous pouvez par exemple ",
          L.calcMasseGrasseAction,
          ".",
        ],
      },
      {
        question: "Peut-on utiliser l'IMC chez l'enfant ?",
        answer: [
          "Chez l'enfant et l'adolescent, l'IMC se calcule avec la même formule, mais il ne s'interprète pas avec les seuils fixes de l'adulte. Il doit être reporté sur des courbes de corpulence adaptées à l'âge et au sexe. Le calculateur IMC de ce site cible les adultes.",
        ],
      },
      {
        question: "L'IMC est-il adapté pendant la grossesse ?",
        answer: [
          "L'IMC calculé à partir du poids en cours de grossesse ne s'interprète pas avec les catégories adultes habituelles pour suivre la prise de poids gestationnelle. En revanche, l'IMC avant la grossesse ou au début de celle-ci peut être utilisé par les professionnels de santé pour adapter le suivi. La prise de poids pendant la grossesse suit d'autres repères. Le calculateur du site n'est pas conçu pour évaluer une femme enceinte : le suivi relève d'un professionnel de santé.",
        ],
      },
      {
        question: "L'IMC est-il pertinent chez les personnes âgées ?",
        answer: [
          "Chez les personnes âgées, l'IMC doit être interprété avec prudence, car la diminution de la masse musculaire et les changements de composition corporelle peuvent modifier sa signification. Un IMC apparemment normal peut masquer une faible masse musculaire. L'évaluation doit tenir compte du contexte clinique, de l'évolution du poids et de l'état général.",
        ],
      },
      {
        question: "L'IMC remplace-t-il un avis médical ?",
        answer: [
          "Non. L'IMC est un indicateur pédagogique et statistique. Il ne suffit pas pour établir un diagnostic. Pour toute question de santé, de nutrition, de perte ou de prise de poids, l'avis d'un professionnel qualifié peut être nécessaire.",
        ],
      },
    ],
  },
  {
    id: "poids-ideal",
    title: "Poids idéal et fourchettes de poids",
    tocLabel: "Poids idéal",
    items: [
      {
        question: "Comment calculer son poids idéal ?",
        answer: [
          "Plusieurs formules historiques (Lorentz, Devine, Robinson, Miller, Hamwi, Broca) estiment un poids théorique à partir de la taille et, souvent, du sexe. Le résultat se lit comme une fourchette, pas comme un chiffre unique. Le ",
          L.calcPoidsIdeal,
          " compare ces méthodes côté à côté.",
        ],
      },
      {
        question: "Existe-t-il un poids idéal unique pour une taille donnée ?",
        answer: [
          "Non. Morphologie, masse musculaire, âge et objectifs personnels font varier le poids compatible avec un bon état de forme. Une fourchette issue de plusieurs formules ou de la zone d'IMC de corpulence normale est plus réaliste qu'une cible fixe au kilo près.",
        ],
      },
      {
        question: "Quelle formule de poids idéal est la plus fiable ?",
        answer: [
          "Aucune formule n'est la plus fiable pour tout le monde. Lorentz, Devine, Miller, Robinson, Hamwi ou Broca reposent sur des méthodes et des hypothèses différentes. Leur intérêt principal est de fournir plusieurs repères théoriques à comparer, plutôt qu'une valeur exacte à atteindre. Le ",
          L.guidePoidsIdeal,
          " détaille usages et limites.",
        ],
      },
      {
        question: "Quelle différence entre poids idéal et IMC ?",
        answer: [
          "L'IMC classe un poids déjà mesuré par rapport à la taille. Le poids idéal estime un poids théorique à partir de formules, souvent sans partir de votre poids actuel. Les deux sont des repères : l'un décrit où vous êtes, l'autre propose une estimation de zone, sans fournir un objectif personnalisé.",
        ],
      },
      {
        question: "Pourquoi les formules donnent-elles des résultats différents ?",
        answer: [
          "Parce qu'elles reposent sur des coefficients et des hypothèses historiques distincts. Un écart de quelques kilos entre Lorentz et Devine n'est pas une erreur de calcul : c'est le signe que le poids idéal est une estimation, pas une mesure unique. Lisez la zone commune plutôt qu'un chiffre isolé.",
        ],
      },
      {
        question: "Le poids idéal dépend-il du sexe ?",
        answer: [
          "Plusieurs formules du calculateur utilisent des coefficients différents selon le sexe. Toutes les méthodes ne prennent pas en compte l'âge. Dans tous les cas, la composition corporelle réelle n'est pas directement mesurée : le résultat reste une estimation théorique.",
        ],
      },
      {
        question: "Le calculateur de poids idéal donne-t-il un objectif médical ?",
        answer: [
          "Non. Il fournit une estimation théorique à but pédagogique. Ce n'est ni une prescription ni un objectif de santé personnalisé. Pour définir une cible adaptée, un professionnel tient compte de votre historique, de votre composition corporelle et de vos contraintes.",
        ],
      },
    ],
  },
  {
    id: "masse-grasse",
    title: "Masse grasse et composition corporelle",
    tocLabel: "Masse grasse",
    items: [
      {
        question: "Qu'est-ce que la masse grasse ?",
        answer: [
          "La masse grasse correspond à la part du poids corporel constituée de tissu adipeux. Elle ne doit pas être confondue avec l'IMC, qui met simplement en relation le poids et la taille, ni avec la masse maigre, qui regroupe le reste du corps.",
        ],
      },
      {
        question: "Comment calculer son taux de masse grasse ?",
        answer: [
          "On l'estime par des formules à partir de la taille, du poids, du sexe, de l'âge et parfois de circonférences (taille, cou, hanches). Sur ce site, le calculateur propose Deurenberg, RFM, YMCA et U.S. Navy. Pour une estimation, utilisez l'",
          L.calcMasseGrasseAction,
          ".",
        ],
      },
      {
        question: "Quelle différence entre IMC et masse grasse ?",
        answer: [
          "L'IMC met en relation poids total et taille. Le taux de masse grasse cherche à estimer la part de graisse dans ce poids. Deux personnes peuvent avoir le même IMC et des taux de masse grasse très différents, surtout si l'une est plus musclée que l'autre.",
        ],
      },
      {
        question: "Pourquoi deux personnes avec le même IMC peuvent-elles avoir des physiques différents ?",
        answer: [
          "Parce que l'IMC ignore la composition corporelle. À poids et taille égaux, l'une peut avoir plus de muscle et moins de graisse, l'autre l'inverse, avec des silhouettes différentes. C'est l'une des principales limites de l'indicateur.",
        ],
      },
      {
        question: "Le calculateur de masse grasse est-il fiable ?",
        answer: [
          "C'est un estimateur, pas une mesure clinique. Les résultats peuvent varier selon la formule, les mensurations saisies, la morphologie et les conditions de mesure. Les formules donnent des ordres de grandeur utiles pour se situer et suivre une tendance : comparez-les plutôt que de fixer un chiffre unique.",
        ],
      },
      {
        question: "Quelle différence entre masse grasse et masse maigre ?",
        answer: [
          "La masse grasse est le tissu adipeux. La masse maigre regroupe le reste : muscles, os, organes et eau corporelle. Une variation de poids peut toucher les deux composantes ; l'interprétation utile distingue souvent l'évolution de la graisse de celle de la masse maigre, avec un accompagnement adapté si besoin.",
        ],
      },
      {
        question: "La masse grasse varie-t-elle selon le sexe ?",
        answer: [
          "Oui. En moyenne, la composition corporelle diffère entre les hommes et les femmes, notamment pour la proportion de masse grasse et de masse musculaire. Les formules du calculateur tiennent compte du sexe (et parfois de l'âge ou des circonférences) pour ajuster l'estimation. L'IMC, lui, utilise la même formule pour les deux sexes.",
        ],
      },
    ],
  },
  {
    id: "calculateurs-site",
    title: "Calculateurs et utilisation du site",
    tocLabel: "Calculateurs et utilisation du site",
    items: [
      {
        question: "Quel calculateur utiliser en premier ?",
        answer: [
          "Commencez par le ",
          L.calcImc,
          " pour situer votre corpulence selon le poids et la taille. Complétez ensuite avec le poids idéal (fourchette théorique) ou la masse grasse (composition estimée) selon votre question.",
        ],
      },
      {
        question: "Les calculateurs sont-ils gratuits ?",
        answer: [
          "Oui, les calculateurs IMC, poids idéal et masse grasse sont accessibles gratuitement. Vous pouvez ",
          L.toolsHub,
          " depuis la page dédiée.",
        ],
      },
      {
        question: "Faut-il créer un compte ?",
        answer: [
          "Aucun compte ni identifiant n'est nécessaire pour effectuer un calcul. Les outils fonctionnent directement dans le navigateur.",
        ],
      },
      {
        question: "Les données saisies sont-elles enregistrées ?",
        answer: [
          "Les calculs sont effectués directement dans votre navigateur. Les valeurs saisies dans les champs des calculateurs ne sont pas envoyées à notre serveur ni utilisées pour établir un profil personnel. Les outils de mesure d'audience ne se chargent qu'après votre consentement et les champs des calculateurs sont masqués dans les enregistrements de session.",
        ],
      },
      {
        question: "Quelle différence entre le calculateur IMC, le poids idéal et la masse grasse ?",
        answer: [
          "L'IMC classe votre poids actuel par rapport à votre taille. Le poids idéal estime une fourchette théorique via plusieurs formules. La masse grasse estime la part de graisse à partir de mesures et de formules. Ce sont trois angles complémentaires, tous indicatifs.",
        ],
      },
    ],
  },
];

function answerToPlainText(segments: FaqAnswerSegment[]): string {
  return segments
    .map((seg) => (typeof seg === "string" ? seg : seg.link))
    .join("");
}

/** Items Schema.org FAQPage : même source que le contenu visible. */
export function getFaqPageSchemaItems(): FaqItem[] {
  return faqPageCategories.flatMap((category) =>
    category.items.map((item) => ({
      question: item.question,
      answer: answerToPlainText(item.answer),
    })),
  );
}

export function getFaqPageTocEntries() {
  return [
    ...faqPageCategories.map((category) => ({
      id: category.id,
      title: category.tocLabel,
      level: 2 as const,
    })),
    {
      id: FAQ_PAGE_SOURCES.id,
      title: FAQ_PAGE_SOURCES.tocLabel,
      level: 2 as const,
    },
  ];
}
