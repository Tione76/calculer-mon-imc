import { GuideSidebar } from "@/site/guides/GuideRenderer";
import { getSidebarGuides, getSidebarTools } from "@/site/guides/sidebar";

const CURRENT_PATH = "/calculateurs/poids-ideal";

export function PoidsIdealPageSidebar() {
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
    </aside>
  );
}
