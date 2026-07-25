import { describe, expect, it } from "vitest";
import { guidesNavigation } from "./navigation";

describe("guidesNavigation — menu principal", () => {
  it("liste les guides dans l'ordre attendu", () => {
    expect(guidesNavigation.map((item) => item.shortTitle)).toEqual([
      "Qu'est-ce que l'IMC ?",
      "Calculer son IMC",
      "Interpréter son IMC",
      "Les limites de l'IMC",
      "Poids idéal",
    ]);
  });

  it("pointe vers les slugs publiés", () => {
    expect(guidesNavigation.map((item) => item.slug)).toEqual([
      "quest-ce-que-l-imc",
      "comment-calculer-son-imc",
      "comment-interpreter-son-imc",
      "limites-de-l-imc",
      "calculer-son-poids-ideal",
    ]);
  });
});
