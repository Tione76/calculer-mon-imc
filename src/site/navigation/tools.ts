import { getAllCalculators } from "./calculators-registry";

/**
 * Menu « Nos calculateurs » : dérivé automatiquement du registre des calculateurs.
 */
export type ToolNavItem = {
  href: string;
  shortTitle: string;
  title: string;
};

export const toolsNavigation: ToolNavItem[] = getAllCalculators().map((calc) => ({
  href: calc.path,
  shortTitle: calc.shortTitle,
  title: calc.title,
}));
