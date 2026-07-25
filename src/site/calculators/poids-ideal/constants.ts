/** 1 pouce = 2,54 cm (conversion exacte). */
export const CM_PER_INCH = 2.54;

/** 5 pieds = 60 pouces = 152,4 cm : seuil des formules cliniques US. */
export const FIVE_FEET_CM = 152.4;
export const FIVE_FEET_INCHES = 60;

export const HEIGHT_MIN_CM = 100;
export const HEIGHT_MAX_CM = 250;

/** Plage de poids affichable ; en dehors, la méthode est signalée comme peu fiable. */
export const WEIGHT_SANITY_MIN_KG = 25;
export const WEIGHT_SANITY_MAX_KG = 250;

export const IDEAL_WEIGHT_METHOD_IDS = [
  "lorentz",
  "devine",
  "miller",
  "robinson",
  "hamwi",
  "broca",
] as const;

export type IdealWeightMethodId = (typeof IDEAL_WEIGHT_METHOD_IDS)[number];

export type IdealWeightSex = "male" | "female";

export type DispersionLevel = "close" | "moderate" | "notable";
