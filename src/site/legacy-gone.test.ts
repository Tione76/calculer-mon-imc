import { describe, expect, it } from "vitest";
import { GET, HEAD } from "@/app/calculateurs/augmentation-salaire/route";
import { GET as getHeures, HEAD as headHeures } from "@/app/calculateurs/salaire-heures-supplementaires/route";
import { GET as getIndemnite, HEAD as headIndemnite } from "@/app/calculateurs/indemnite-licenciement/route";
import { LEGACY_GONE_CALCULATOR_PATHS } from "@/site/legacy-gone-routes";

describe("routes calculateurs historiques (410 Gone)", () => {
  it("déclare les trois chemins retirés", () => {
    expect(LEGACY_GONE_CALCULATOR_PATHS).toEqual([
      "/calculateurs/augmentation-salaire",
      "/calculateurs/salaire-heures-supplementaires",
      "/calculateurs/indemnite-licenciement",
    ]);
  });

  it.each([
    ["augmentation-salaire", GET, HEAD],
    ["salaire-heures-supplementaires", getHeures, headHeures],
    ["indemnite-licenciement", getIndemnite, headIndemnite],
  ] as const)("renvoie 410 Gone pour %s", async (_slug, getHandler, headHandler) => {
    const getResponse = getHandler();
    expect(getResponse.status).toBe(410);
    expect(getResponse.headers.get("content-type")).toContain("text/html");
    const html = await getResponse.text();
    expect(html).toContain("410");
    expect(html).toContain('href="/"');

    const headResponse = headHandler();
    expect(headResponse.status).toBe(410);
  });
});
