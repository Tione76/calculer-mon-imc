import type { CalculatorResultSection } from "../types";
import { Disclaimer } from "./Disclaimer";
import { GuideLinks } from "./GuideLinks";
import { ResultCard, ResultText } from "./ResultCard";

interface CalculatorResultViewProps {
  sections: CalculatorResultSection[];
}

/** Affiche une liste de sections de résultat selon le modèle commun. */
export function CalculatorResultView({ sections }: CalculatorResultViewProps) {
  return (
    <>
      {sections.map((section, index) => {
        switch (section.kind) {
          case "primary":
            return (
              <ResultCard
                key={`primary-${index}`}
                variant="primary"
                label={section.label}
                value={section.value}
                badge={section.badge?.label}
              />
            );
          case "text":
            return <ResultText key={`text-${index}`} paragraphs={section.paragraphs} />;
          case "disclaimer":
            return <Disclaimer key={`disclaimer-${index}`} text={section.text} />;
          case "guides":
            return (
              <GuideLinks key={`guides-${index}`} title={section.title} links={section.links} />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
