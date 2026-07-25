import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const LEGAL_FILES = [
  "mentions-legales-content.tsx",
  "privacy-policy-content.tsx",
  "cookie-policy-content.tsx",
  "cookie-policy-toc.ts",
];

describe("pages légales — marque MVP", () => {
  for (const file of LEGAL_FILES) {
    // Garde-fou volontaire : empêche la réapparition de l'ancienne marque.
    it(`n'affiche plus l'ancienne marque dans ${file}`, () => {
      const source = readFileSync(join(process.cwd(), "src/site/legal", file), "utf8");
      expect(source).not.toMatch(/brut-vers-net/i);
      expect(source).not.toContain("contact@brut-vers-net.fr");
    });
  }

  it("référence le domaine Calculer Mon IMC", () => {
    const mentions = readFileSync(
      join(process.cwd(), "src/site/legal/mentions-legales-content.tsx"),
      "utf8",
    );
    expect(mentions).toContain("CALCULER-MON-IMC.FR");
    expect(mentions).toContain("calculer-mon-imc.fr");
    expect(mentions).toContain("contact@calculer-mon-imc.fr");
  });
});
