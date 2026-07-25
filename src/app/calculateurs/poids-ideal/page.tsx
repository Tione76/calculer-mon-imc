import { config, seoConfig } from "@/site";
import { getCalculatorCover, coverToOgInput } from "@/site/guides/covers";
import PoidsIdealCalculator from "@/site/calculators/poids-ideal/PoidsIdealCalculator";
import { PoidsIdealToolPage } from "@/site/calculators/poids-ideal/PoidsIdealToolPage";
import {
  POIDS_IDEAL_EDITORIAL_UPDATED_AT,
  POIDS_IDEAL_FAQ,
} from "@/site/calculators/poids-ideal/poids-ideal-faq-data";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildCalculatorJsonLd } from "@/site/schema";
import { isPathIndexable } from "@/site/public-pages";

const calculatorSeo = seoConfig.calculators["poids-ideal"];
const path = calculatorSeo.path;

export const metadata = buildPageMetadata(config, seoConfig, {
  title: calculatorSeo.title,
  description: calculatorSeo.description,
  path,
  ogImage: coverToOgInput(getCalculatorCover("poids-ideal")),
  robots: isPathIndexable(path) ? undefined : { index: false, follow: false },
});

export default function PoidsIdealCalculatorPage() {
  return (
    <>
      <JsonLd
        data={buildCalculatorJsonLd({
          path,
          name: calculatorSeo.h1,
          description: calculatorSeo.description,
          cover: getCalculatorCover("poids-ideal"),
          faq: POIDS_IDEAL_FAQ,
          dateModified: POIDS_IDEAL_EDITORIAL_UPDATED_AT,
        })}
      />
      <PoidsIdealToolPage
        Calculator={PoidsIdealCalculator}
        h1={calculatorSeo.h1}
        subtitle={calculatorSeo.subtitle}
      />
    </>
  );
}
