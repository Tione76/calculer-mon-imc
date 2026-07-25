import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { FORBIDDEN_PUBLIC_HREF_PATTERNS } from "./legacy-gone-routes";
import { getPublishedGuideSlugs } from "./guides/registry";

const ROOT = join(process.cwd(), "src");

/** Fichiers sources du périmètre public IMC (navigation, éditorial, légal). */
const PUBLIC_SOURCE_DIRS = [
  "site/home-editorial.tsx",
  "site/home-faq-data.ts",
  "site/home-faq.tsx",
  "site/faq-page-data.ts",
  "site/faq-page-links.ts",
  "site/guides/guides-hub-editorial.tsx",
  "site/guides/guides-hub-data.ts",
  "site/tools/tools-hub-editorial.tsx",
  "site/tools/tools-hub-data.ts",
  "site/author-page-content.tsx",
  "site/site.config.ts",
  "site/navigation",
  "site/legal",
  "site/guides/data",
  "framework/ContactForm.tsx",
  "framework/design/components/SiteNav.tsx",
  "framework/design/PageFooter.tsx",
];

function collectSourceFiles(): string[] {
  const files: string[] = [];

  for (const entry of PUBLIC_SOURCE_DIRS) {
    const absolute = join(ROOT, entry);
    const stat = statSync(absolute, { throwIfNoEntry: false });
    if (!stat) continue;

    if (stat.isFile()) {
      if (/\.(tsx|ts)$/.test(entry)) files.push(absolute);
      continue;
    }

    if (stat.isDirectory()) {
      walkDir(absolute, files);
    }
  }

  return files;
}

function walkDir(dir: string, files: string[]): void {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      walkDir(path, files);
      continue;
    }
    if (/\.(tsx|ts)$/.test(name)) {
      files.push(path);
    }
  }
}

describe("liens publics IMC — non-régression URLs retirées", () => {
  const publishedGuideSlugs = new Set(getPublishedGuideSlugs());

  it("n'expose aucun lien vers les anciennes URLs retirées", () => {
    const forbidden = [...FORBIDDEN_PUBLIC_HREF_PATTERNS];
    const violations: string[] = [];

    for (const file of collectSourceFiles()) {
      const rel = relative(process.cwd(), file).replace(/\\/g, "/");

      if (rel.includes("/guides/data/")) {
        const slugMatch = rel.match(/guides\/data\/(.+)\.ts$/);
        const slug = slugMatch?.[1];
        if (slug && !publishedGuideSlugs.has(slug) && slug !== "guide-imc-shared") {
          continue;
        }
      }

      const source = readFileSync(file, "utf8");

      for (const href of forbidden) {
        if (source.includes(`"${href}"`) || source.includes(`'${href}'`) || source.includes(`\`${href}\``)) {
          violations.push(`${rel} → ${href}`);
        }
        if (source.includes(`href: "${href}"`) || source.includes(`href: '${href}'`)) {
          violations.push(`${rel} → ${href}`);
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
