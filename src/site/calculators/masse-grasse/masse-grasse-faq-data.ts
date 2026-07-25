import type { FaqItem } from "@/framework/types";

export const MASSE_GRASSE_EDITORIAL_UPDATED_AT = "2026-07-24";

export const MASSE_GRASSE_FAQ: FaqItem[] = [
  {
    question: "Comment calculer son taux de masse grasse ?",
    answer:
      "Vous pouvez l'estimer avec des formules basées sur l'IMC, l'âge et le sexe (comme Deurenberg), ou avec des mensurations (RFM, YMCA, U.S. Navy). Notre calculateur propose ces approches sans matériel spécifique. Les méthodes de laboratoire (DEXA, plis cutanés, etc.) restent plus directes, mais moins accessibles au quotidien.",
  },
  {
    question: "Quel est le taux de masse grasse normal ?",
    answer:
      "Il n'existe pas un seul chiffre « normal » pour tout le monde. Chez l'homme adulte, la fourchette souvent associée à une masse grasse habituelle se situe autour de 18 % à moins de 25 %. Chez la femme, elle se situe plutôt autour de 25 % à moins de 32 %. Ces repères sont populationnels et ne remplacent pas une évaluation individuelle.",
  },
  {
    question: "Quelle différence entre masse grasse et IMC ?",
    answer:
      "L'IMC relie le poids à la taille au carré. Il ne distingue pas graisse et muscle. Le pourcentage de masse grasse estime la part de tissu adipeux dans le poids total. Les deux indicateurs sont complémentaires : l'IMC est rapide, la masse grasse est plus orientée composition corporelle, sans être pour autant une mesure directe.",
  },
  {
    question: "Quelle formule de masse grasse est la plus fiable ?",
    answer:
      "Aucune formule anthropométrique n'est parfaitement exacte pour tout le monde. Deurenberg est très pratique. RFM intègre mieux le rapport taille / tour de taille. YMCA et U.S. Navy s'appuient sur des circonférences. La méthode la plus utile est souvent celle que vous pouvez répéter correctement dans les mêmes conditions.",
  },
  {
    question: "Pourquoi les méthodes donnent-elles des résultats différents ?",
    answer:
      "Elles n'utilisent pas les mêmes données, ni les mêmes populations de calibration. L'âge, le sexe, le tour de taille ou le tour de cou n'entrent pas toujours dans la formule. Des écarts de quelques points restent fréquents et n'indiquent pas forcément qu'une méthode « ne fonctionne pas ».",
  },
  {
    question: "Comment mesurer son tour de taille correctement ?",
    answer:
      "Placez le mètre ruban horizontalement autour de l'abdomen, en général à mi-distance entre la dernière côte et le haut de la hanche. Tenez-vous détendu, respirez normalement et relevez la mesure en fin d'expiration, sans rentrer le ventre ni serrer le ruban.",
  },
  {
    question: "Peut-on calculer sa masse grasse sans balance ?",
    answer:
      "Oui, pour le pourcentage. La formule RFM, par exemple, n'utilise que le sexe, la taille et le tour de taille. En revanche, convertir ce pourcentage en kilogrammes de masse grasse ou de masse maigre nécessite de connaître votre poids.",
  },
  {
    question: "Un sportif peut-il avoir un IMC élevé et peu de masse grasse ?",
    answer:
      "Oui. Un IMC élevé peut refléter une masse musculaire importante. C'est l'une des limites classiques de l'IMC. Estimer la masse grasse, ou croiser avec le tour de taille, aide à nuancer la lecture.",
  },
  {
    question: "Peut-on perdre de la graisse sans perdre de poids ?",
    answer:
      "Oui, surtout si vous gagnez du muscle en parallèle. Le poids sur la balance peut stagner alors que la composition corporelle s'améliore. C'est pourquoi le pourcentage de masse grasse, le tour de taille et les photos complètent utilement le suivi.",
  },
  {
    question: "À quelle fréquence mesurer son taux de masse grasse ?",
    answer:
      "Toutes les deux à quatre semaines suffisent souvent pour observer une tendance, à condition d'utiliser la même méthode et les mêmes conditions. Mesurer chaque jour ajoute surtout du bruit.",
  },
  {
    question: "Pour qui le calculateur n'est-il pas adapté ?",
    answer:
      "Le mode Estimation rapide est réservé aux adultes (18 ans et plus). Il ne convient pas comme outil de suivi autonome pendant la grossesse. Les enfants, adolescents et situations médicales particulières nécessitent une interprétation professionnelle. En mode comparaison, Deurenberg dispose d'une formule pédiatrique, à manier avec prudence.",
  },
  {
    question: "Le résultat du calculateur constitue-t-il un diagnostic médical ?",
    answer:
      "Non. Le calculateur fournit une estimation indicative à partir de formules statistiques. Il ne remplace ni un examen clinique, ni une mesure de laboratoire, ni l'avis d'un professionnel de santé.",
  },
];
