"use client";

import { useSite } from "@/framework/SiteProvider";
import { SiteNav } from "@/framework/design/components/SiteNav";

/** Navigation du hero accueil : seul besoin client (pathname / menus). */
export function HomeToolHeaderNav() {
  const site = useSite();

  return (
    <SiteNav
      siteName={site.name}
      nav={site.navigation.header}
      logo={site.logo}
      guidesNavigation={site.guidesNavigation}
      toolsNavigation={site.toolsNavigation}
    />
  );
}
