import { config, seoConfig } from "@/site";
import {
  guides,
  GuidesHubSidebar,
  GuideListCard,
  GuidePageLayout,
} from "@/site/guides";
import { GuidesHubEditorial, GuidesHubWhySection, GuidesHubChooseSection, GuidesHubTransition } from "@/site/guides/guides-hub-editorial";
import { GuidesHubFaq } from "@/site/guides/guides-hub-faq";
import {
  GUIDES_HUB_FAQ,
  GUIDES_HUB_LIST_TITLE,
  GUIDES_HUB_PAGE_SUBTITLE,
} from "@/site/guides/guides-hub-data";
import { coverToOgInput, GUIDES_HUB_COVER } from "@/site/guides/covers";
import { PageBreadcrumb } from "@/framework/design/components/PageBreadcrumb";
import { JsonLd } from "@/framework/JsonLd";
import { buildPageMetadata } from "@/framework/seo/metadata";
import { buildHubJsonLd } from "@/site/schema";
import { isPathIndexable } from "@/site/public-pages";
import "@/site/guides/guide-page.css";
import "@/site/tools/tools-hub.css";

const hub = seoConfig.guidesHub;
const path = hub.path;
const indexable = isPathIndexable(path);

export const metadata = buildPageMetadata(config, seoConfig, {
  title: hub.title,
  description: hub.description,
  path,
  ogImage: coverToOgInput(GUIDES_HUB_COVER),
  robots: indexable ? undefined : { index: false, follow: false },
});

export default function GuidesHubPage() {
  return (
    <>
      <JsonLd
        data={buildHubJsonLd({
          path,
          name: hub.h1,
          description: hub.description,
          hubLabel: hub.h1,
          cover: GUIDES_HUB_COVER,
          faq: GUIDES_HUB_FAQ,
          listName: GUIDES_HUB_LIST_TITLE,
          items: guides.map((guide) => ({
            name: guide.title,
            path: `/guides/${guide.slug}`,
          })),
        })}
      />
      <GuidePageLayout
        title={hub.h1}
        subtitle={GUIDES_HUB_PAGE_SUBTITLE}
        sidebar={<GuidesHubSidebar />}
        prose={false}
      >
        <PageBreadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Guides" },
          ]}
        />
        <GuidesHubEditorial />
        {guides.length > 0 && (
          <section className="guides-hub-list" aria-labelledby="guides-hub-list-title">
            <h2 id="guides-hub-list-title" className="guides-hub-list__title">
              {GUIDES_HUB_LIST_TITLE}
            </h2>
            <GuidesHubChooseSection />
            <div className="guide-list-grid">
              {guides.map((guide) => (
                <GuideListCard key={guide.slug} guide={guide} />
              ))}
            </div>
            <GuidesHubTransition />
          </section>
        )}
        <GuidesHubWhySection />
        <GuidesHubFaq />
      </GuidePageLayout>
    </>
  );
}
