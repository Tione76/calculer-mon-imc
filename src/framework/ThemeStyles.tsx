import type { SiteColors } from "@/framework/types";

export function ThemeStyles({ colors }: { colors: SiteColors }) {
  const primaryMuted = colors.primaryMuted ?? "#BBF7D0";
  const primaryActive = colors.primaryActive ?? "#166534";
  const accentText = colors.accentText ?? "#166534";
  const brandRgb = colors.brandRgb ?? "22, 163, 74";

  const css = `:root {
    --color-primary: ${colors.primary};
    --color-primary-hover: ${colors.primaryHover};
    --color-primary-light: ${colors.primaryLight};
    --color-accent: ${colors.accent};
    --color-background: ${colors.background};
    --color-surface: ${colors.surface};
    --color-border: ${colors.border};
    --color-text: ${colors.text};
    --color-text-muted: ${colors.textMuted};
    --color-text-inverse: ${colors.textInverse};
    --color-focus: ${colors.focus};
    --color-success: ${colors.success};
    --color-error: ${colors.error};
    --ds-brand: ${colors.primary};
    --ds-brand-dark: ${colors.primaryHover};
    --ds-brand-hover: ${colors.primaryHover};
    --ds-brand-active: ${primaryActive};
    --ds-brand-light: ${colors.primaryLight};
    --ds-brand-muted: ${primaryMuted};
    --ds-brand-accent-text: ${accentText};
    --ds-brand-rgb: ${brandRgb};
  }`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
