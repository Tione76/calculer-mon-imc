import { resolveBodyFatCategory } from "./categories";
import { BODY_FAT_QUICK_AGE_MIN, BODY_FAT_SANITY_PERCENT } from "./constants";
import {
  adultOnlyMessage,
  computeBmi,
  computeComposition,
  deurenberg1991AdultBodyFatPercent,
  invalidCircumferenceMessage,
  methodSupportsAge,
  rfmBodyFatPercentFromMeasures,
} from "./formulas";
import { formatBodyFatPercent, formatMassKg, roundBodyFatPercent } from "./format";
import { getBodyFatInterpretationSentence } from "./gauge/interpretation";
import {
  getMethodMissingHint,
  hasRequiredMeasures,
} from "./method-requirements";
import {
  BODY_FAT_METHODS,
  BODY_FAT_METHODS_BY_ID,
  getBodyFatMethod,
  QUICK_BODY_FAT_METHOD_ID,
  type BodyFatMethodDefinition,
} from "./methods";
import type {
  BodyFatInput,
  BodyFatMethodId,
  BodyFatResult,
  BodyFatRfmResult,
  BodyFatSex,
} from "./types";

export type BodyFatResultStatus = "ok" | "unreliable";

export interface BodyFatMethodResult {
  methodId: BodyFatMethodId;
  method: BodyFatMethodDefinition;
  bodyFatPercentRaw: number;
  bodyFatPercent: number;
  fatMassKg: number;
  leanMassKg: number;
  status: BodyFatResultStatus;
  statusMessage?: string;
  formulaLabel: string;
}

export interface BodyFatComparisonSummary {
  minPercent: number;
  maxPercent: number;
  spreadPercent: number;
  meanPercent: number;
  medianPercent: number;
  minFatMassKg: number;
  maxFatMassKg: number;
  dispersion: "close" | "moderate" | "notable";
  dispersionMessage: string;
}

export interface BodyFatComparisonResult {
  input: BodyFatInput;
  category: BodyFatResult["category"];
  results: BodyFatMethodResult[];
  summary: BodyFatComparisonSummary;
}

function isFinitePercent(value: number): boolean {
  return Number.isFinite(value);
}

function evaluateMethod(input: BodyFatInput, method: BodyFatMethodDefinition): BodyFatMethodResult {
  if (!methodSupportsAge(method.id, input.ageYears)) {
    return {
      methodId: method.id,
      method,
      bodyFatPercentRaw: NaN,
      bodyFatPercent: NaN,
      fatMassKg: NaN,
      leanMassKg: NaN,
      status: "unreliable",
      statusMessage: adultOnlyMessage(),
      formulaLabel: method.formulaLabel,
    };
  }

  if (!hasRequiredMeasures(input, method.id)) {
    return {
      methodId: method.id,
      method,
      bodyFatPercentRaw: NaN,
      bodyFatPercent: NaN,
      fatMassKg: NaN,
      leanMassKg: NaN,
      status: "unreliable",
      statusMessage: getMethodMissingHint(input, method.id),
      formulaLabel: method.formulaLabel,
    };
  }

  const bodyFatPercentRaw = method.calculate(input);
  let status: BodyFatResultStatus = "ok";
  let statusMessage: string | undefined;

  if (!isFinitePercent(bodyFatPercentRaw)) {
    status = "unreliable";
    statusMessage = invalidCircumferenceMessage();
  } else if (
    bodyFatPercentRaw < BODY_FAT_SANITY_PERCENT.min ||
    bodyFatPercentRaw > BODY_FAT_SANITY_PERCENT.max
  ) {
    status = "unreliable";
    statusMessage = "Estimation peu fiable avec ces valeurs pour cette méthode.";
  }

  const rounded = isFinitePercent(bodyFatPercentRaw) ? roundBodyFatPercent(bodyFatPercentRaw) : NaN;
  const composition = isFinitePercent(bodyFatPercentRaw)
    ? computeComposition(rounded, input.weightKg)
    : { bodyFatPercent: NaN, fatMassKg: NaN, leanMassKg: NaN };

  return {
    methodId: method.id,
    method,
    bodyFatPercentRaw,
    bodyFatPercent: composition.bodyFatPercent,
    fatMassKg: composition.fatMassKg,
    leanMassKg: composition.leanMassKg,
    status,
    statusMessage,
    formulaLabel: method.formulaLabel,
  };
}

export function buildBodyFatInput(
  sex: BodyFatSex,
  ageYears: number,
  heightCm: number,
  weightKg: number,
  measures?: { waistCm?: number; neckCm?: number; hipCm?: number },
): BodyFatInput {
  return {
    sex,
    ageYears,
    heightCm,
    weightKg,
    ...measures,
  };
}

export function calculateBodyFatMethod(
  methodId: BodyFatMethodId,
  input: BodyFatInput,
): BodyFatMethodResult {
  return evaluateMethod(input, getBodyFatMethod(methodId));
}

export function calculateQuickBodyFat(input: BodyFatInput): BodyFatResult | null {
  if (input.ageYears < BODY_FAT_QUICK_AGE_MIN) return null;

  const bodyFatPercentRaw = deurenberg1991AdultBodyFatPercent(input);
  const bodyFatPercent = roundBodyFatPercent(bodyFatPercentRaw);
  const composition = computeComposition(bodyFatPercent, input.weightKg);
  const bmi = computeBmi(input.heightCm, input.weightKg);

  return {
    bmi,
    sex: input.sex,
    ageYears: input.ageYears,
    heightCm: input.heightCm,
    weightKg: input.weightKg,
    bodyFatPercent: composition.bodyFatPercent,
    fatMassKg: composition.fatMassKg,
    leanMassKg: composition.leanMassKg,
    category: resolveBodyFatCategory(bodyFatPercent, input.sex),
  };
}

export function calculatePersonalizedBodyFat(
  sex: BodyFatSex,
  heightCm: number,
  waistCm: number,
): BodyFatRfmResult | null {
  const bodyFatPercentRaw = rfmBodyFatPercentFromMeasures(sex, heightCm, waistCm);
  if (!Number.isFinite(bodyFatPercentRaw)) return null;

  const bodyFatPercent = roundBodyFatPercent(bodyFatPercentRaw);
  if (
    bodyFatPercent < BODY_FAT_SANITY_PERCENT.min ||
    bodyFatPercent > BODY_FAT_SANITY_PERCENT.max
  ) {
    return null;
  }

  return {
    sex,
    heightCm,
    waistCm,
    bodyFatPercent,
    category: resolveBodyFatCategory(bodyFatPercent, sex),
  };
}

export function buildRfmCompositionFromWeight(
  bodyFatPercent: number,
  weightKg: number,
): { fatMassKg: number; leanMassKg: number } {
  const fatMassKg = (weightKg * bodyFatPercent) / 100;
  return { fatMassKg, leanMassKg: weightKg - fatMassKg };
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1]! + sorted[mid]!) / 2;
  }
  return sorted[mid]!;
}

function buildDispersion(spreadPercent: number): Pick<BodyFatComparisonSummary, "dispersion" | "dispersionMessage"> {
  if (spreadPercent <= 3) {
    return {
      dispersion: "close",
      dispersionMessage: "Les méthodes convergent étroitement sur une même estimation.",
    };
  }
  if (spreadPercent <= 6) {
    return {
      dispersion: "moderate",
      dispersionMessage: "Les méthodes restent proches, avec quelques écarts attendus.",
    };
  }
  return {
    dispersion: "notable",
    dispersionMessage: "Les écarts entre méthodes sont plus marqués : comparez les limites de chaque formule.",
  };
}

export function compareBodyFatMethods(input: BodyFatInput): BodyFatComparisonResult {
  const results = BODY_FAT_METHODS.map((method) => evaluateMethod(input, method));
  const reliable = results.filter((row) => row.status === "ok");
  const percents = reliable.map((row) => row.bodyFatPercent);
  const fatMasses = reliable.map((row) => row.fatMassKg);

  if (reliable.length === 0) {
    return {
      input,
      category: resolveBodyFatCategory(NaN, input.sex),
      results,
      summary: {
        minPercent: NaN,
        maxPercent: NaN,
        spreadPercent: NaN,
        meanPercent: NaN,
        medianPercent: NaN,
        minFatMassKg: NaN,
        maxFatMassKg: NaN,
        dispersion: "notable",
        dispersionMessage: "Aucune méthode n'a pu produire une estimation fiable avec les mesures saisies.",
      },
    };
  }

  const minPercent = Math.min(...percents);
  const maxPercent = Math.max(...percents);
  const spreadPercent = maxPercent - minPercent;
  const meanPercent = percents.reduce((sum, value) => sum + value, 0) / percents.length;
  const referencePercent = median(percents);

  return {
    input,
    category: resolveBodyFatCategory(referencePercent, input.sex),
    results,
    summary: {
      minPercent,
      maxPercent,
      spreadPercent,
      meanPercent,
      medianPercent: referencePercent,
      minFatMassKg: Math.min(...fatMasses),
      maxFatMassKg: Math.max(...fatMasses),
      ...buildDispersion(spreadPercent),
    },
  };
}

export function buildPersonalizedBodyFatCopyText(
  result: BodyFatRfmResult,
  weightKg?: number,
): string {
  const lines = [
    `Masse grasse (RFM) : ${formatBodyFatPercent(result.bodyFatPercent)} %`,
    `Catégorie : ${result.category.label}`,
    getBodyFatInterpretationSentence(result.category.id),
  ];
  if (weightKg !== undefined && Number.isFinite(weightKg)) {
    const { fatMassKg, leanMassKg } = buildRfmCompositionFromWeight(result.bodyFatPercent, weightKg);
    lines.splice(2, 0, `Masse grasse : ${formatMassKg(fatMassKg)} kg`, `Masse maigre : ${formatMassKg(leanMassKg)} kg`);
  }
  return lines.join("\n");
}

export function buildQuickBodyFatCopyText(result: BodyFatResult): string {
  return [
    `Masse grasse (Deurenberg 1991) : ${formatBodyFatPercent(result.bodyFatPercent)} %`,
    `Catégorie : ${result.category.label}`,
    `Masse grasse : ${formatMassKg(result.fatMassKg)} kg`,
    `Masse maigre : ${formatMassKg(result.leanMassKg)} kg`,
    getBodyFatInterpretationSentence(result.category.id),
  ].join("\n");
}

export function buildBodyFatCopyText(result: BodyFatComparisonResult): string {
  const lines = [
    `Comparatif masse grasse (${result.input.sex === "male" ? "homme" : "femme"}, ${result.input.ageYears} ans)`,
    `Fourchette : ${formatBodyFatPercent(result.summary.minPercent)} % à ${formatBodyFatPercent(result.summary.maxPercent)} %`,
    `Point central : ${formatBodyFatPercent(result.summary.medianPercent)} %`,
  ];
  for (const row of result.results) {
    if (row.status === "ok") {
      lines.push(`${row.method.name} (${row.method.year}) : ${formatBodyFatPercent(row.bodyFatPercent)} %`);
    }
  }
  return lines.join("\n");
}

export { QUICK_BODY_FAT_METHOD_ID, BODY_FAT_METHODS, BODY_FAT_METHODS_BY_ID };
