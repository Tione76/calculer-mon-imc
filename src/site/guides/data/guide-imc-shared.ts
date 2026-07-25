import type { GuideSidebarLinks } from "../types";

export const IMC_CALCULATOR_SIDEBAR: GuideSidebarLinks["calculator"] = {
  title: "Calculateur IMC",
  description: "Estimez votre indice de masse corporelle à partir de votre taille et de votre poids.",
  href: "/",
};

export function imcGuideSidebar(
  relatedGuides: GuideSidebarLinks["relatedGuides"] = [],
): GuideSidebarLinks {
  return {
    calculator: IMC_CALCULATOR_SIDEBAR,
    relatedGuides,
  };
}
