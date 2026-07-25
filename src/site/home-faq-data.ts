import type { FaqItem } from "@/framework/types";
import type { FaqAnswerSegment } from "./faq-page-data";

/**
 * FAQ page d'accueil : affichage UI (segments + liens) et Schema.org (texte brut).
 * Réponses synthétiques ; les développements détaillés restent dans les guides.
 */
export type HomeFaqRichItem = {
  question: string;
  answer: FaqAnswerSegment[];
};

function toPlainText(segments: FaqAnswerSegment[]): string {
  return segments.map((seg) => (typeof seg === "string" ? seg : seg.link)).join("");
}

export const homeFaqRich: HomeFaqRichItem[] = [
  {
    question: "Comment calculer son IMC ?",
    answer: [
      "Divisez votre poids en kilogrammes par le carré de votre taille en mètres. Exemple : 70 kg pour 1,70 m donne environ 24,2. Le calculateur en haut de page applique cette formule automatiquement. Pour une méthode détaillée, voir ",
      { href: "/guides/comment-calculer-son-imc", link: "Comment calculer son IMC" },
      ".",
    ],
  },
  {
    question: "Comment connaître mon IMC rapidement ?",
    answer: [
      "Saisissez votre taille et votre poids dans le calculateur IMC gratuit de cette page. L'outil affiche immédiatement l'indice et la catégorie de référence pour les adultes.",
    ],
  },
  {
    question: "Quelle est la formule de l'IMC ?",
    answer: [
      "IMC = poids (kg) ÷ taille (m)². Convertissez d'abord la taille en mètres (170 cm = 1,70 m). Pour l'origine de la formule et les cas particuliers, consultez ",
      { href: "/guides/comment-calculer-son-imc", link: "Comment calculer son IMC" },
      ".",
    ],
  },
  {
    question: "Qu'est-ce qu'un IMC normal ?",
    answer: [
      "Chez l'adulte, la corpulence normale se situe généralement entre 18,5 et 24,9. Ce seuil reste un repère populationnel, pas un objectif médical personnalisé. Pour lire votre résultat selon votre situation, voir ",
      {
        href: "/guides/comment-interpreter-son-imc",
        link: "Comment interpréter son IMC",
      },
      ".",
    ],
  },
  {
    question: "Comment interpréter son IMC ?",
    answer: [
      "Comparez votre résultat aux catégories OMS : insuffisance pondérale, corpulence normale, surpoids ou obésité. Ce classement ne décrit pas à lui seul votre état de santé. Apprenez à interpréter votre résultat dans le guide ",
      {
        href: "/guides/comment-interpreter-son-imc",
        link: "Comment interpréter son IMC",
      },
      ".",
    ],
  },
  {
    question: "L'IMC est-il fiable pour tout le monde ?",
    answer: [
      "Pas toujours. Cet indicateur ne distingue pas muscle et graisse, et tient peu compte de la morphologie. Il est moins pertinent chez les sportifs très musclés, les enfants, les adolescents et pendant la grossesse. Voir ",
      { href: "/guides/limites-de-l-imc", link: "pourquoi l'IMC possède des limites" },
      ".",
    ],
  },
  {
    question: "Quelle différence entre IMC et masse grasse ?",
    answer: [
      "L'IMC relie le poids à la taille. Le pourcentage de masse grasse estime la part de tissu adipeux. Deux personnes au même IMC peuvent avoir des compositions très différentes. Pour affiner, utilisez le ",
      { href: "/calculateurs/masse-grasse", link: "calculateur de masse grasse" },
      ".",
    ],
  },
  {
    question: "Quelle différence entre IMC et poids idéal ?",
    answer: [
      "L'IMC décrit votre situation actuelle. Le poids idéal estime un poids de référence à partir de la taille (et souvent du sexe). Les deux restent complémentaires. Comparez les formules avec le ",
      { href: "/calculateurs/poids-ideal", link: "calculateur de poids idéal" },
      ".",
    ],
  },
  {
    question: "L'IMC suffit-il à évaluer sa santé ?",
    answer: [
      "Non. C'est un point de départ utile, à croiser avec d'autres indicateurs (tour de taille, composition corporelle, contexte médical) et, si besoin, l'avis d'un professionnel. Le guide pour ",
      { href: "/guides/limites-de-l-imc", link: "connaître les limites de l'indicateur" },
      " précise ce que l'indice ne mesure pas.",
    ],
  },
  {
    question: "Comment calculer l'IMC d'un enfant ?",
    answer: [
      "Les catégories adultes ne s'appliquent pas telles quelles. Chez l'enfant et l'adolescent, l'interprétation repose sur des courbes de référence spécifiques. Demandez conseil à un professionnel de santé. Voir aussi ",
      { href: "/guides/limites-de-l-imc", link: "comprendre les limites de l'IMC" },
      ".",
    ],
  },
  {
    question: "Peut-on calculer son IMC pendant la grossesse ?",
    answer: [
      "Le poids évolue pendant la grossesse et l'interprétation change. N'utilisez pas l'IMC comme objectif autonome : suivez les recommandations de votre professionnel de santé.",
    ],
  },
  {
    question: "Un sportif peut-il avoir un IMC élevé sans excès de graisse ?",
    answer: [
      "Oui. Une masse musculaire importante augmente le poids et donc l'IMC, sans excès de graisse. Dans ce cas, le résultat peut tromper. Pour affiner, estimez votre ",
      { href: "/calculateurs/masse-grasse", link: "masse grasse" },
      ".",
    ],
  },
  {
    question: "Faut-il viser exactement un IMC de 25 ?",
    answer: [
      "Non. La frontière 25 marque une catégorie statistique, pas une cible personnelle au dixième près. Raisonnez en zone et en contexte. Le guide ",
      {
        href: "/guides/comment-interpreter-son-imc",
        link: "Comment interpréter son IMC",
      },
      " développe cette lecture.",
    ],
  },
  {
    question: "Peut-on suivre une perte de poids avec l'IMC ?",
    answer: [
      "Oui, comme indicateur de tendance : un même protocole de mesure (même balance, même moment) aide à comparer dans le temps. Pour un suivi plus fin de la composition corporelle, croisez avec le ",
      { href: "/calculateurs/masse-grasse", link: "calculateur de masse grasse" },
      ".",
    ],
  },
  {
    question: "Le calculateur IMC est-il gratuit ?",
    answer: [
      "Oui. Cet outil gratuit ne demande aucun compte. Les données saisies servent uniquement à produire l'estimation dans votre navigateur.",
    ],
  },
];

/** FAQ plain text pour Schema.org et config.faq */
export const homeFaq: FaqItem[] = homeFaqRich.map((item) => ({
  question: item.question,
  answer: toPlainText(item.answer),
}));
