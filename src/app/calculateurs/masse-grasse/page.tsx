import { config, seoConfig } from "@/site";
import { getCalculatorCover, coverToOgInput } from "@/site/guides/covers";
import MasseGrasseCalculator from "@/site/calculators/masse-grasse/MasseGrasseCalculator";
import { MasseGrasseToolPage } from "@/site/calculators/masse-grasse/MasseGrasseToolPage";
import { MASSE_GRASSE_EDITORIAL_UPDATED_AT, MASSE_GRASSE_FAQ } from "@/site/calculators/masse-grasse/masse-grasse-faq-data";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildCalculatorJsonLd } from "@/site/schema";
import { isPathIndexable } from "@/site/public-pages";

const calculatorSeo = seoConfig.calculators["masse-grasse"];
const path = calculatorSeo.path;

export const metadata = buildPageMetadata(config, seoConfig, {
  title: calculatorSeo.title,
  description: calculatorSeo.description,
  path,
  ogImage: coverToOgInput(getCalculatorCover("masse-grasse")),
  robots: isPathIndexable(path) ? undefined : { index: false, follow: false },
});

export default function MasseGrasseCalculatorPage() {
  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          path,
          name: calculatorSeo.h1,
          description: calculatorSeo.description,
          cover: getCalculatorCover("masse-grasse"),
          faq: MASSE_GRASSE_FAQ,
          dateModified: MASSE_GRASSE_EDITORIAL_UPDATED_AT,
        })}
      />
      <MasseGrasseToolPage
        Calculator={MasseGrasseCalculator}
        h1={calculatorSeo.h1}
        subtitle={calculatorSeo.subtitle}
      />
    </>
  );
}
