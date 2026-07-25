import type { BodyFatInput, BodyFatMethodId, BodyFatSex } from "./types";

export type BodyFatMeasureField = "waistCm" | "neckCm" | "hipCm";

export interface MeasureFieldMeta {
  field: BodyFatMeasureField;
  label: string;
  help: string;
  unit: string;
  placeholder: string;
}

export const MEASURE_FIELD_META: Record<BodyFatMeasureField, MeasureFieldMeta> = {
  waistCm: {
    field: "waistCm",
    label: "Tour de taille",
    help: "Mesurez horizontalement au nombril (homme) ou au point le plus étroit du buste (femme).",
    unit: "cm",
    placeholder: "85",
  },
  neckCm: {
    field: "neckCm",
    label: "Tour de cou",
    help: "Mesurez juste sous le larynx, sans serrer le mètre ruban.",
    unit: "cm",
    placeholder: "38",
  },
  hipCm: {
    field: "hipCm",
    label: "Tour de hanches",
    help: "Mesurez horizontalement au point le plus large des fesses.",
    unit: "cm",
    placeholder: "98",
  },
};

/** Mesures complémentaires facultatives en mode comparatif. */
export function getOptionalCompareMeasureFields(sex: BodyFatSex): BodyFatMeasureField[] {
  if (sex === "female") return ["neckCm", "hipCm"];
  return ["neckCm"];
}

/** Toutes les mesures de circonférence utilisées en mode comparatif. */
export function getAllCompareMeasureFields(sex: BodyFatSex): BodyFatMeasureField[] {
  return ["waistCm", ...getOptionalCompareMeasureFields(sex)];
}

/** @deprecated Utiliser getOptionalCompareMeasureFields. */
export function getProgressiveMeasureFields(sex: BodyFatSex): BodyFatMeasureField[] {
  return getAllCompareMeasureFields(sex);
}

export function getMethodRequiredMeasures(
  methodId: BodyFatMethodId,
  sex: BodyFatSex,
): BodyFatMeasureField[] {
  switch (methodId) {
    case "deurenberg-1991":
      return [];
    case "rfm":
      return ["waistCm"];
    case "ymca":
      return ["waistCm"];
    case "us-navy":
      return sex === "female" ? ["waistCm", "neckCm", "hipCm"] : ["waistCm", "neckCm"];
    default:
      return [];
  }
}

export function hasRequiredMeasures(input: BodyFatInput, methodId: BodyFatMethodId): boolean {
  const required = getMethodRequiredMeasures(methodId, input.sex);
  return required.every((field) => {
    const value = input[field];
    return value !== undefined && Number.isFinite(value) && value > 0;
  });
}

export function getMissingMeasureLabels(input: BodyFatInput, methodId: BodyFatMethodId): string[] {
  return getMethodRequiredMeasures(methodId, input.sex)
    .filter((field) => {
      const value = input[field];
      return value === undefined || !Number.isFinite(value) || value <= 0;
    })
    .map((field) => MEASURE_FIELD_META[field].label.toLowerCase());
}

export function getMethodMissingHint(input: BodyFatInput, methodId: BodyFatMethodId): string {
  const required = getMethodRequiredMeasures(methodId, input.sex);
  const missingField = required.find((field) => {
    const value = input[field];
    return value === undefined || !Number.isFinite(value) || value <= 0;
  });

  if (!missingField) return "Mesures insuffisantes pour cette méthode.";

  switch (missingField) {
    case "neckCm":
      return "Ajoutez votre tour de cou pour inclure cette méthode.";
    case "hipCm":
      return "Ajoutez votre tour de hanches pour inclure cette méthode.";
    case "waistCm":
      return "Ajoutez votre tour de taille pour inclure cette méthode.";
    default:
      return "Mesures insuffisantes pour cette méthode.";
  }
}
