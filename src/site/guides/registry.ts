import type { Guide } from "./types";
import { attachGuideCover } from "./covers";
import { questCeQueLImcGuide } from "./data/quest-ce-que-l-imc";
import { commentCalculerSonImcGuide } from "./data/comment-calculer-son-imc";
import { commentInterpreterSonImcGuide } from "./data/comment-interpreter-son-imc";
import { limitesDeLImcGuide } from "./data/limites-de-l-imc";
import { calculerSonPoidsIdealGuide } from "./data/calculer-son-poids-ideal";

/** Guides publiés */
export const guides: Guide[] = [
  attachGuideCover(questCeQueLImcGuide),
  attachGuideCover(commentCalculerSonImcGuide),
  attachGuideCover(commentInterpreterSonImcGuide),
  attachGuideCover(limitesDeLImcGuide),
  attachGuideCover(calculerSonPoidsIdealGuide),
];

export const GUIDE_MODEL_SLUG = "modele";

export function getGuideBySlug(slug: string): Guide | undefined {
  if (slug === GUIDE_MODEL_SLUG) return undefined;
  return guides.find((guide) => guide.slug === slug);
}

export function getPublishedGuideSlugs(): string[] {
  return guides.map((guide) => guide.slug);
}

export function getAllGuideSlugs(): string[] {
  return getPublishedGuideSlugs();
}
