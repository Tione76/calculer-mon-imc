import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const analyticsSource = readFileSync(
  join(process.cwd(), "src/framework/AnalyticsScripts.tsx"),
  "utf8",
);
const siteConfigSource = readFileSync(
  join(process.cwd(), "src/site/site.config.ts"),
  "utf8",
);
const providerSource = readFileSync(
  join(process.cwd(), "src/framework/SiteProvider.tsx"),
  "utf8",
);
const layoutSource = readFileSync(join(process.cwd(), "src/app/layout.tsx"), "utf8");
const envExampleSource = readFileSync(join(process.cwd(), ".env.example"), "utf8");

describe("Google Analytics 4 integration", () => {
  it("lit NEXT_PUBLIC_GA_MEASUREMENT_ID depuis la config centralisée", () => {
    expect(siteConfigSource).toContain("NEXT_PUBLIC_GA_MEASUREMENT_ID");
    expect(siteConfigSource).toContain("googleAnalyticsId");
    expect(envExampleSource).toContain("NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XECS76B3RJ");
  });

  it("ne charge GA4 qu'après consentement analytique et sans GTM", () => {
    expect(analyticsSource).toContain("@next/third-parties/google");
    expect(analyticsSource).toContain("GoogleAnalytics");
    expect(analyticsSource).toMatch(
      /if \(!gaId \|\| status === "pending" \|\| !preferences\.analytics\)/,
    );
    expect(analyticsSource).not.toContain("GTM-");
    expect(analyticsSource).not.toContain("GoogleTagManager");
  });

  it("suit les navigations App Router via page_view après le chargement initial", () => {
    expect(analyticsSource).toContain("GaRouteTracker");
    expect(analyticsSource).toContain("usePathname");
    expect(analyticsSource).toContain('gtag("event", "page_view"');
    expect(analyticsSource).toContain("isFirstPath");
  });

  it("monte AnalyticsScripts une seule fois via SiteProvider", () => {
    expect(providerSource).toContain("<AnalyticsScripts />");
    expect(providerSource.match(/<AnalyticsScripts\s*\/>/g)?.length).toBe(1);
  });

  it("définit Consent Mode par défaut à denied avant tout chargement GA", () => {
    expect(layoutSource).toContain("gtag('consent','default'");
    expect(layoutSource).toContain("analytics_storage:'denied'");
    expect(providerSource).toContain("updateConsentMode");
  });

  it("n'embarque qu'une seule intégration gtag/js via GoogleAnalytics", () => {
    expect(analyticsSource.match(/gtag\/js/g)?.length ?? 0).toBe(0);
    expect(layoutSource.match(/gtag\/js/g)?.length ?? 0).toBe(0);
    expect(analyticsSource).toContain("<GoogleAnalytics");
  });
});

describe("Microsoft Clarity integration", () => {
  it("lit NEXT_PUBLIC_CLARITY_PROJECT_ID depuis la config centralisée", () => {
    expect(siteConfigSource).toContain("NEXT_PUBLIC_CLARITY_PROJECT_ID");
    expect(siteConfigSource).toContain("microsoftClarityId");
  });

  it("charge Clarity une seule fois via SiteProvider", () => {
    expect(providerSource).toContain("<ClarityLoader />");
    expect(providerSource.match(/ClarityLoader/g)?.length).toBe(2);
  });

  it("utilise Consent API V2 et n'initialise Clarity qu'après consentement analytique", () => {
    expect(analyticsSource).toContain("Clarity.consentV2");
    expect(analyticsSource).toContain("Clarity.init(projectId)");
    expect(analyticsSource).toContain("preferences.analytics");
    expect(analyticsSource).toContain("clarityInitialized");
    expect(analyticsSource).toContain('analytics_Storage: "denied"');
  });

  it("ne s'appuie pas sur Google Consent Mode pour piloter Clarity", () => {
    expect(analyticsSource).not.toContain("updateConsentMode");
  });

  it("ne charge pas GA4, Clarity ni AdSense sans identifiant configuré", () => {
    expect(analyticsSource).toMatch(/if \(!gaId \|\| status === "pending" \|\| !preferences\.analytics\)/);
    expect(analyticsSource).toMatch(/if \(!clientId \|\| status === "pending" \|\| !preferences\.advertising\) return null/);
    expect(analyticsSource).toMatch(/if \(!IS_PRODUCTION \|\| !projectId \|\| status === "pending"\) return/);
  });
});
