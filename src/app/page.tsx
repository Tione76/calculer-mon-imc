import { config, seoConfig, Calculator } from "@/site";
import { coverToOgInput, HOME_COVER } from "@/site/guides/covers";
import { CalculatorPageLayout } from "@/framework/layouts/CalculatorPageLayout";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildHomeJsonLd } from "@/site/schema";
import { HomeEditorial } from "@/site/home-editorial";
import { HOME_EDITORIAL_UPDATED_AT } from "@/site/home-editorial-data";
import { HomePageSidebar } from "@/site/guides/GuidePageSidebar";
import { hasSidebarContent } from "@/site/guides/sidebar";

export const metadata = buildPageMetadata(config, seoConfig, {
  title: seoConfig.home.title,
  description: seoConfig.home.description,
  path: "/",
  ogImage: coverToOgInput(HOME_COVER),
});

export default function HomePage() {
  const subtitle = config.home.intro[0];
  const showSidebar = hasSidebarContent({ pageType: "home", currentPath: "/" });

  return (
    <>
      <JsonLd
        data={buildHomeJsonLd({
          name: seoConfig.home.h1,
          description: seoConfig.home.description,
          cover: HOME_COVER,
          faq: config.faq,
          dateModified: HOME_EDITORIAL_UPDATED_AT,
        })}
      />
      <CalculatorPageLayout
        h1={config.home.h1}
        subtitle={subtitle}
        Calculator={Calculator}
        blogPosts={config.blogPosts}
        sidebar={showSidebar ? <HomePageSidebar /> : undefined}
      >
        <HomeEditorial />
      </CalculatorPageLayout>
    </>
  );
}
