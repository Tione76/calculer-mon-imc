import { seoConfig } from "../seo.config";
import { getCalculatorCover, type GuideCoverImage } from "../guides/covers";

/** Entrée calculateur : source unique pour menu, sidebar, sitemap et page Nos calculateurs */
export interface CalculatorEntry {
  id: string;
  path: string;
  title: string;
  shortTitle: string;
  description: string;
  h1: string;
  cover: GuideCoverImage;
  icon: string;
}

function getHomeCalculator(): CalculatorEntry {
  return {
    id: "imc",
    path: "/",
    title: seoConfig.home.h1,
    shortTitle: "Calculateur IMC",
    description: seoConfig.home.description,
    h1: seoConfig.home.h1,
    cover: getCalculatorCover("imc"),
    icon: "⚖",
  };
}

function getPoidsIdealCalculator(): CalculatorEntry {
  const entry = seoConfig.calculators["poids-ideal"];
  return {
    id: "poids-ideal",
    path: entry.path,
    title: entry.h1,
    shortTitle: entry.navTitle ?? entry.h1,
    description: entry.description,
    h1: entry.h1,
    cover: getCalculatorCover("poids-ideal"),
    icon: "◎",
  };
}

function getMasseGrasseCalculator(): CalculatorEntry {
  const entry = seoConfig.calculators["masse-grasse"];
  return {
    id: "masse-grasse",
    path: entry.path,
    title: entry.h1,
    shortTitle: entry.navTitle ?? entry.h1,
    description: entry.description,
    h1: entry.h1,
    cover: getCalculatorCover("masse-grasse"),
    icon: "◉",
  };
}

/** Calculateurs publics (navigation, sitemap, hubs). */
export function getAllCalculators(): CalculatorEntry[] {
  return [getHomeCalculator(), getPoidsIdealCalculator(), getMasseGrasseCalculator()];
}
