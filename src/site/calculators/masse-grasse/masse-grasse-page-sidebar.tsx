import { GuideSidebar } from "@/site/guides/GuideRenderer";
import { getSidebarGuides, getSidebarTools } from "@/site/guides/sidebar";

const CURRENT_PATH = "/calculateurs/masse-grasse";

const RETAIN_POINTS = [
  "Le résultat reste une estimation, pas une mesure directe.",
  "Les méthodes ne donnent pas toujours exactement le même chiffre.",
  "L'évolution dans le temps est souvent plus utile qu'une mesure isolée.",
  "Mesurez toujours dans des conditions similaires.",
] as const;

export function MasseGrassePageSidebar() {
  const tools = getSidebarTools({ pageType: "calculator", currentPath: CURRENT_PATH });
  const guides = getSidebarGuides({ pageType: "calculator", currentPath: CURRENT_PATH });

  return (
    <aside className="article-sidebar" aria-label="Maillage interne">
      <GuideSidebar
        tools={tools}
        guides={guides}
        guidesSectionTitle="Guides à lire"
        guidesBlockVariant="also-read"
        showTools={tools.length > 0}
      />
      <div className="guide-sidebar-block mg-editorial-sidebar-retain">
        <p className="guide-sidebar-block__title">À retenir</p>
        <ul className="mg-editorial-sidebar-retain__list">
          {RETAIN_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
