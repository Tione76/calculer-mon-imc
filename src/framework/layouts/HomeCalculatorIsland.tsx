"use client";

import type { ComponentType } from "react";
import { CalculatorProvider } from "@/framework/SiteProvider";

interface HomeCalculatorIslandProps {
  Calculator: ComponentType;
}

function CalculatorHero({ Calculator }: { Calculator: ComponentType }) {
  return (
    <div className="calc-tool calc-tool--main" data-clarity-mask="true">
      <Calculator />
      <p className="calc-disclaimer">
        Cette estimation est indicative. L&apos;IMC ne tient pas compte de la morphologie, de la
        masse musculaire ou de l&apos;âge. Il ne remplace pas un avis médical.
      </p>
    </div>
  );
}

/** Îlot client : formulaire IMC uniquement (header / éditorial restent serveur). */
export function HomeCalculatorIsland({ Calculator }: HomeCalculatorIslandProps) {
  return (
    <CalculatorProvider>
      <CalculatorHero Calculator={Calculator} />
    </CalculatorProvider>
  );
}
