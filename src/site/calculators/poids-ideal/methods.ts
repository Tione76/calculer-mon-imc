import type { IdealWeightMethodId, IdealWeightSex } from "./constants";

export interface IdealWeightMethodDefinition {
  id: IdealWeightMethodId;
  name: string;
  author: string;
  year: string;
  shortDescription: string;
  context: string;
  strength: string;
  limitation: string;
  detailOrigin: string;
  formulaLabelMale: string;
  formulaLabelFemale: string;
  /** Calcul brut en kg, sans arrondi final. */
  calculate: (sex: IdealWeightSex, heightCm: number) => number;
}

/**
 * Formules cliniques US (Devine, Miller, Robinson, Hamwi) :
 * base + coefficient × (pouces − 60), pouces = taille_cm / 2,54.
 * Variante métrique du guide (coeff × (T − 152,4)) = coeff/2,54 × (T − 152,4) : on utilise la formule originale en pouces.
 */
function inchBasedWeight(
  sex: IdealWeightSex,
  heightCm: number,
  maleBase: number,
  femaleBase: number,
  maleCoeff: number,
  femaleCoeff: number,
): number {
  const inchesOver = heightCm / 2.54 - 60;
  const base = sex === "male" ? maleBase : femaleBase;
  const coeff = sex === "male" ? maleCoeff : femaleCoeff;
  return base + coeff * inchesOver;
}

/**
 * Lorentz (Dr Paul Lorentz, XXᵉ s.) : formule empirique francophone.
 * Homme : T − 100 − (T − 150) / 4 ; Femme : T − 100 − (T − 150) / 2,5 (T en cm).
 */
function calculateLorentz(sex: IdealWeightSex, heightCm: number): number {
  const adjustment = sex === "male" ? (heightCm - 150) / 4 : (heightCm - 150) / 2.5;
  return heightCm - 100 - adjustment;
}

/** Devine (1974, Bernard Devine) : prédiction du poids en milieu hospitalier / dosages. */
function calculateDevine(sex: IdealWeightSex, heightCm: number): number {
  return inchBasedWeight(sex, heightCm, 50, 45.5, 2.3, 2.3);
}

/** Miller (1983, D. R. Miller) : variante des formules cliniques. */
function calculateMiller(sex: IdealWeightSex, heightCm: number): number {
  return inchBasedWeight(sex, heightCm, 56.2, 53.1, 1.41, 1.36);
}

/** Robinson (1983, J. D. Robinson) : alternative à Devine. */
function calculateRobinson(sex: IdealWeightSex, heightCm: number): number {
  return inchBasedWeight(sex, heightCm, 52, 49, 1.9, 1.7);
}

/** Hamwi (1964, George Hamwi) : estimation rapide, contexte diabétologie. */
function calculateHamwi(sex: IdealWeightSex, heightCm: number): number {
  return inchBasedWeight(sex, heightCm, 48, 45.5, 2.7, 2.2);
}

/**
 * Broca (1871, Paul Broca) : règle historique T − 100.
 * Variante femme (T − 100) × 0,9 : courante en francophonie, non attribuable à Broca original ;
 * retenue ici pour cohérence avec les usages grand public distincts homme/femme.
 */
function calculateBroca(sex: IdealWeightSex, heightCm: number): number {
  const base = heightCm - 100;
  return sex === "male" ? base : base * 0.9;
}

export const IDEAL_WEIGHT_METHODS: IdealWeightMethodDefinition[] = [
  {
    id: "lorentz",
    name: "Lorentz",
    author: "Dr Paul Lorentz",
    year: "XXᵉ s.",
    shortDescription: "Méthode historique très répandue en France.",
    context: "Grand public, France",
    strength: "Très simple",
    limitation: "Peu personnalisée",
    detailOrigin:
      "Formule empirique adaptée à la morphologie adulte, largement diffusée en médecine générale francophone.",
    formulaLabelMale: "Homme : T − 100 − (T − 150) / 4",
    formulaLabelFemale: "Femme : T − 100 − (T − 150) / 2,5",
    calculate: calculateLorentz,
  },
  {
    id: "devine",
    name: "Devine",
    author: "Bernard Devine",
    year: "1974",
    shortDescription: "Formule d'origine clinique, largement utilisée à l'international.",
    context: "Clinique",
    strength: "Référence internationale",
    limitation: "Conçue pour le dosage clinique",
    detailOrigin:
      "Développée en 1974 pour estimer un poids de référence en milieu hospitalier, notamment pour certains calculs médicamenteux.",
    formulaLabelMale: "Homme : 50 + 2,3 × (pouces − 60)",
    formulaLabelFemale: "Femme : 45,5 + 2,3 × (pouces − 60)",
    calculate: calculateDevine,
  },
  {
    id: "miller",
    name: "Miller",
    author: "D. R. Miller",
    year: "1983",
    shortDescription: "Adaptation plus récente des formules cliniques.",
    context: "Clinique",
    strength: "Estimation souvent modérée",
    limitation: "Résultats variables selon la taille",
    detailOrigin: "Proposée en 1983 pour affiner les estimations basées sur la taille et le sexe.",
    formulaLabelMale: "Homme : 56,2 + 1,41 × (pouces − 60)",
    formulaLabelFemale: "Femme : 53,1 + 1,36 × (pouces − 60)",
    calculate: calculateMiller,
  },
  {
    id: "robinson",
    name: "Robinson",
    author: "J. D. Robinson",
    year: "1983",
    shortDescription: "Formule issue de tables de taille et de poids.",
    context: "Clinique",
    strength: "Coefficients fondés sur des données",
    limitation: "Fondée sur d'anciennes tables",
    detailOrigin: "Publiée en 1983 comme alternative aux estimations Devine.",
    formulaLabelMale: "Homme : 52 + 1,9 × (pouces − 60)",
    formulaLabelFemale: "Femme : 49 + 1,7 × (pouces − 60)",
    calculate: calculateRobinson,
  },
  {
    id: "hamwi",
    name: "Hamwi",
    author: "George Hamwi",
    year: "1964",
    shortDescription: "Règle clinique simple, utilisée comme estimation rapide.",
    context: "Consultation",
    strength: "Calcul rapide",
    limitation: "Écarts possibles pour les grandes tailles",
    detailOrigin: "Proposée en 1964, notamment dans un contexte de prise en charge du diabète.",
    formulaLabelMale: "Homme : 48 + 2,7 × (pouces − 60)",
    formulaLabelFemale: "Femme : 45,5 + 2,2 × (pouces − 60)",
    calculate: calculateHamwi,
  },
  {
    id: "broca",
    name: "Broca",
    author: "Paul Broca",
    year: "1871",
    shortDescription: "Formule historique extrêmement simple.",
    context: "Culture générale",
    strength: "Facile à comprendre",
    limitation: "Peu adaptée aux morphologies actuelles",
    detailOrigin:
      "Règle empirique du XIXᵉ siècle (taille − 100). Variante femme × 0,9 : usage courant, distincte de la formule originale.",
    formulaLabelMale: "Homme : T − 100",
    formulaLabelFemale: "Femme : (T − 100) × 0,9",
    calculate: calculateBroca,
  },
];

export const IDEAL_WEIGHT_METHODS_BY_ID: Record<IdealWeightMethodId, IdealWeightMethodDefinition> =
  Object.fromEntries(IDEAL_WEIGHT_METHODS.map((method) => [method.id, method])) as Record<
    IdealWeightMethodId,
    IdealWeightMethodDefinition
  >;

export function getFormulaLabel(method: IdealWeightMethodDefinition, sex: IdealWeightSex): string {
  return sex === "male" ? method.formulaLabelMale : method.formulaLabelFemale;
}
