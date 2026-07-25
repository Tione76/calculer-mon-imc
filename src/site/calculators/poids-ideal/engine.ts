import type { IdealWeightMethodId, IdealWeightSex } from "./constants";
import {
  HEIGHT_MAX_CM,
  HEIGHT_MIN_CM,
  WEIGHT_SANITY_MAX_KG,
  WEIGHT_SANITY_MIN_KG,
} from "./constants";
import { roundIdealWeightKg } from "./format";
import {
  getFormulaLabel,
  IDEAL_WEIGHT_METHODS,
  IDEAL_WEIGHT_METHODS_BY_ID,
  type IdealWeightMethodDefinition,
} from "./methods";

export type IdealWeightResultStatus = "ok" | "unreliable";

export interface IdealWeightMethodResult {
  methodId: IdealWeightMethodId;
  method: IdealWeightMethodDefinition;
  weightKgRaw: number;
  weightKg: number;
  status: IdealWeightResultStatus;
  statusMessage?: string;
  formulaLabel: string;
}

export interface IdealWeightComparisonSummary {
  minKg: number;
  maxKg: number;
  spreadKg: number;
  meanKg: number;
  medianKg: number;
  dispersion: "close" | "moderate" | "notable";
  dispersionMessage: string;
}

export interface IdealWeightComparisonResult {
  sex: IdealWeightSex;
  heightCm: number;
  results: IdealWeightMethodResult[];
  summary: IdealWeightComparisonSummary;
}

function isFiniteWeight(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

function evaluateMethodResult(
  method: IdealWeightMethodDefinition,
  sex: IdealWeightSex,
  heightCm: number,
): IdealWeightMethodResult {
  const weightKgRaw = method.calculate(sex, heightCm);
  let status: IdealWeightResultStatus = "ok";
  let statusMessage: string | undefined;

  if (!isFiniteWeight(weightKgRaw)) {
    status = "unreliable";
    statusMessage = "Estimation non calculable à cette taille pour cette méthode.";
  } else if (weightKgRaw < WEIGHT_SANITY_MIN_KG || weightKgRaw > WEIGHT_SANITY_MAX_KG) {
    status = "unreliable";
    statusMessage = "Estimation peu fiable à cette taille pour cette méthode.";
  }

  return {
    methodId: method.id,
    method,
    weightKgRaw,
    weightKg: isFiniteWeight(weightKgRaw) ? roundIdealWeightKg(weightKgRaw) : NaN,
    status,
    statusMessage,
    formulaLabel: getFormulaLabel(method, sex),
  };
}

export function calculateIdealWeightMethod(
  methodId: IdealWeightMethodId,
  sex: IdealWeightSex,
  heightCm: number,
): IdealWeightMethodResult {
  const method = IDEAL_WEIGHT_METHODS_BY_ID[methodId];
  return evaluateMethodResult(method, sex, heightCm);
}

export function compareIdealWeightMethods(
  sex: IdealWeightSex,
  heightCm: number,
): IdealWeightComparisonResult {
  const results = IDEAL_WEIGHT_METHODS.map((method) => evaluateMethodResult(method, sex, heightCm));
  const reliable = results.filter((result) => result.status === "ok");
  const values = reliable.map((result) => result.weightKg).sort((a, b) => a - b);

  if (values.length === 0) {
    return {
      sex,
      heightCm,
      results,
      summary: {
        minKg: NaN,
        maxKg: NaN,
        spreadKg: NaN,
        meanKg: NaN,
        medianKg: NaN,
        dispersion: "notable",
        dispersionMessage:
          "Aucune estimation fiable n'a pu être produite à cette taille. Vérifiez la valeur saisie.",
      },
    };
  }

  const minKg = values[0]!;
  const maxKg = values[values.length - 1]!;
  const spreadKg = roundIdealWeightKg(maxKg - minKg);
  const meanKg = roundIdealWeightKg(values.reduce((sum, value) => sum + value, 0) / values.length);
  const medianKg =
    values.length % 2 === 1
      ? values[(values.length - 1) / 2]!
      : roundIdealWeightKg((values[values.length / 2 - 1]! + values[values.length / 2]!) / 2);

  let dispersion: IdealWeightComparisonSummary["dispersion"] = "close";
  let dispersionMessage = "Les résultats sont relativement proches entre les différentes formules.";

  if (spreadKg >= 6) {
    dispersion = "notable";
    dispersionMessage =
      "L'écart entre les méthodes est notable. Il est particulièrement important de raisonner en fourchette plutôt qu'en chiffre unique.";
  } else if (spreadKg >= 3) {
    dispersion = "moderate";
    dispersionMessage = "Les méthodes affichent une variation modérée : raisonnez en fourchette.";
  }

  return {
    sex,
    heightCm,
    results,
    summary: {
      minKg,
      maxKg,
      spreadKg,
      meanKg,
      medianKg,
      dispersion,
      dispersionMessage,
    },
  };
}

export function buildCopyText(comparison: IdealWeightComparisonResult): string {
  const sexLabel = comparison.sex === "male" ? "un homme" : "une femme";
  const lines = comparison.results
    .filter((result) => result.status === "ok")
    .map(
      (result) =>
        `${result.method.name} : ${result.weightKg.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kg`,
    );

  const rangeLine =
    Number.isFinite(comparison.summary.minKg) && Number.isFinite(comparison.summary.maxKg)
      ? `\n\nFourchette obtenue : ${comparison.summary.minKg.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} à ${comparison.summary.maxKg.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kg`
      : "";

  const meanLine = Number.isFinite(comparison.summary.meanKg)
    ? `\nPoint central des estimations : ${comparison.summary.meanKg.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kg`
    : "";

  return `Estimation de poids de référence pour ${sexLabel} de ${comparison.heightCm} cm :\n\n${lines.join("\n")}${rangeLine}${meanLine}\n\nCes résultats sont des estimations théoriques et non des objectifs médicaux.`;
}

export { HEIGHT_MIN_CM, HEIGHT_MAX_CM };
