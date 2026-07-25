import Link from "next/link";
import type { CalculatorGuideLink } from "../types";
import { ResultCard } from "./ResultCard";

interface GuideLinksProps {
  title: string;
  links: readonly CalculatorGuideLink[];
}

export function GuideLinks({ title, links }: GuideLinksProps) {
  return (
    <ResultCard label={title}>
      <ul className="calc-ui__guides imc-calc__guides">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </ResultCard>
  );
}
