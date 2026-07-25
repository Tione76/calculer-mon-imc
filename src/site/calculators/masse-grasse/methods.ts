import type { BodyFatInput, BodyFatMethodId } from "./types";
import {
  deurenberg1991BodyFatPercent,
  rfmBodyFatPercent,
  usNavyBodyFatPercent,
  ymcaBodyFatPercent,
} from "./formulas";

export interface BodyFatMethodDefinition {
  id: BodyFatMethodId;
  name: string;
  author: string;
  year: string;
  shortDescription: string;
  context: string;
  strength: string;
  limitation: string;
  populations: string;
  detailOrigin: string;
  formulaLabel: string;
  calculate: (input: BodyFatInput) => number;
}

export const BODY_FAT_METHODS: BodyFatMethodDefinition[] = [
  {
    id: "deurenberg-1991",
    name: "Deurenberg",
    author: "Deurenberg, Weststrate & Seidell",
    year: "1991",
    shortDescription: "Estimation à partir de l'IMC, de l'âge et du sexe.",
    context:
      "Formule historique publiée dans le British Journal of Nutrition, calibrée sur la densitométrie. Aucune mesure de circonférence requise.",
    strength: "Très simple, idéale pour une première estimation en quelques secondes",
    limitation: "Ne distingue pas la masse musculaire de la masse grasse",
    populations: "Adultes et enfants (formule pédiatrique jusqu'à 15 ans)",
    detailOrigin: "British Journal of Nutrition, 1991, 65(2):105-114.",
    formulaLabel:
      "Adulte : %MG = 1,20 × IMC + 0,23 × âge − 10,8 × sexe − 5,4 ; enfant (≤ 15 ans) : %MG = 1,51 × IMC − 0,70 × âge − 3,6 × sexe + 1,4",
    calculate: deurenberg1991BodyFatPercent,
  },
  {
    id: "rfm",
    name: "RFM",
    author: "Woolcott & Bergman",
    year: "2018",
    shortDescription: "Relative Fat Mass : ratio taille / tour de taille.",
    context:
      "Indice développé sur les données NHANES (DXA). Deux mesures seulement : taille et tour de taille.",
    strength: "Meilleure corrélation que l'IMC seul pour estimer le % de masse grasse",
    limitation: "Validée sur des adultes américains ; sensible à la mesure du tour de taille",
    populations: "Adultes (18 ans et plus)",
    detailOrigin: "Scientific Reports, 2018, 8:10980 ; NHANES 1999-2006.",
    formulaLabel:
      "Homme : 64 − 20 × (taille ÷ tour de taille) ; femme : 76 − 20 × (taille ÷ tour de taille)",
    calculate: rfmBodyFatPercent,
  },
  {
    id: "ymca",
    name: "YMCA",
    author: "YMCA / Golding et al.",
    year: "1989",
    shortDescription: "Formule poids + tour de taille (au nombril).",
    context:
      "Méthode développée pour les centres YMCA et reprisée dans les manuels de fitness (Golding, Heyward).",
    strength: "Rapide et accessible avec un simple mètre ruban",
    limitation: "Précision modérée (±5 à 7 % selon les validations)",
    populations: "Adultes en bonne santé générale",
    detailOrigin: "YMCA Fitness Testing and Assessment Manual ; Golding et al., Y's Way to Physical Fitness.",
    formulaLabel:
      "Homme : ((4,15 × T − 0,082 × P − 98,42) / P) × 100 ; femme : ((4,15 × T − 0,082 × P − 76,76) / P) × 100 (T en pouces, P en livres)",
    calculate: ymcaBodyFatPercent,
  },
  {
    id: "us-navy",
    name: "U.S. Navy",
    author: "Hodgdon & Beckett",
    year: "1984",
    shortDescription: "Méthode officielle de l'U.S. Navy à partir de circonférences.",
    context:
      "Protocole de mesure par ruban utilisé dans le programme de conditionnement de la marine américaine (OPNAVINST).",
    strength: "L'une des méthodes anthropométriques les plus répandues au monde",
    limitation: "Dépend fortement de la rigueur des mesures (nombril, cou, hanches)",
    populations: "Adultes ; protocole distinct homme/femme",
    detailOrigin:
      "Naval Health Research Center Reports 84-11 (hommes) et 84-29 (femmes), Hodgdon & Beckett, 1984.",
    formulaLabel:
      "Homme : %MG = 495/densité − 450, densité = 1,0324 − 0,19077 × log₁₀(abdomen − cou) + 0,15456 × log₁₀(taille) ; femme : densité = 1,29579 − 0,35004 × log₁₀(taille + hanches − cou) + 0,221 × log₁₀(taille), mesures en cm",
    calculate: usNavyBodyFatPercent,
  },
];

export const BODY_FAT_METHODS_BY_ID = Object.fromEntries(
  BODY_FAT_METHODS.map((method) => [method.id, method]),
) as Record<BodyFatMethodId, BodyFatMethodDefinition>;

export const QUICK_BODY_FAT_METHOD_ID: BodyFatMethodId = "deurenberg-1991";

export function getBodyFatMethod(id: BodyFatMethodId): BodyFatMethodDefinition {
  return BODY_FAT_METHODS_BY_ID[id];
}
