import type { BodyFatMethodId } from "./types";

/** Noms affichés dans les badges et popovers pédagogiques. */
export const METHOD_DISPLAY_NAMES: Record<BodyFatMethodId, string> = {
  "deurenberg-1991": "Deurenberg (1991)",
  rfm: "Relative Fat Mass (RFM)",
  ymca: "YMCA",
  "us-navy": "U.S. Navy",
};

export interface MethodScienceBadgeSingle {
  type: "single";
  prefix: string;
  label: string;
  methodId: BodyFatMethodId;
}

export interface MethodScienceBadgeMulti {
  type: "multi";
  prefix: string;
  methods: Array<{ label: string; methodId: BodyFatMethodId }>;
}

export type MethodScienceBadge = MethodScienceBadgeSingle | MethodScienceBadgeMulti;

export const METHOD_SCIENCE_BADGE: Record<"quick" | "personalized" | "compare", MethodScienceBadge> = {
  quick: {
    type: "single",
    prefix: "Méthode utilisée :",
    label: "Deurenberg (1991)",
    methodId: "deurenberg-1991",
  },
  personalized: {
    type: "single",
    prefix: "Méthode utilisée :",
    label: "RFM – Relative Fat Mass (Woolcott & Bergman, 2018)",
    methodId: "rfm",
  },
  compare: {
    type: "multi",
    prefix: "Méthodes utilisées :",
    methods: [
      { label: "Deurenberg (1991)", methodId: "deurenberg-1991" },
      { label: "RFM (2018)", methodId: "rfm" },
      { label: "YMCA", methodId: "ymca" },
      { label: "U.S. Navy", methodId: "us-navy" },
    ],
  },
};

export const MASSE_GRASSE_QUICK_STEP1_HELP =
  "Indiquez les données nécessaires à la formule Deurenberg (1991).";

export const MASSE_GRASSE_QUICK_STEP2_HELP =
  "Lancez le calcul selon la méthode Deurenberg (1991).";

export const MASSE_GRASSE_QUICK_RESULT_HELP =
  "Résultat calculé selon la formule scientifique Deurenberg (1991).";

export const MASSE_GRASSE_PERSONALIZED_STEP1_HELP =
  "Indiquez les mesures requises par la formule Relative Fat Mass (RFM).";

export const MASSE_GRASSE_PERSONALIZED_STEP2_HELP =
  "Lancez le calcul selon la méthode Relative Fat Mass (RFM).";

export const MASSE_GRASSE_PERSONALIZED_RESULT_HELP =
  "Estimation obtenue grâce à la méthode Relative Fat Mass (RFM) de Woolcott et Bergman (2018).";

export const MASSE_GRASSE_COMPARE_STEP1_HELP =
  "Renseignez les données communes aux quatre méthodes scientifiques comparées.";

export const MASSE_GRASSE_COMPARE_STEP2_HELP =
  "Ajoutez les mesures facultatives pour inclure les méthodes anthropométriques avancées.";

export const MASSE_GRASSE_COMPARE_STEP3_HELP =
  "Lancez la comparaison entre Deurenberg, RFM, YMCA et U.S. Navy.";

export const MASSE_GRASSE_COMPARE_RESULT_HELP =
  "Résultats calculés selon chaque méthode scientifique, à partir des informations saisies.";
