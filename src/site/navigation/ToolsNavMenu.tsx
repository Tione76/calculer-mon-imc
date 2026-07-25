import type { ToolNavItem } from "./tools";
import { NavDropdownMenu } from "./NavDropdownMenu";

interface ToolsNavMenuProps {
  items: ToolNavItem[];
}

export function ToolsNavMenu({ items }: ToolsNavMenuProps) {
  return (
    <NavDropdownMenu
      label="Nos calculateurs"
      menuAriaLabel="Nos calculateurs"
      items={items}
    />
  );
}
