"use client";

import type { ComponentType } from "react";
import { useSite } from "@/framework/SiteProvider";
import { AdSlot } from "@/framework/AdSlot";
import { SiteNav } from "@/framework/design/components/SiteNav";
import { HeaderCurveDown } from "@/framework/design/components/Curves";
import { PageFooter } from "@/framework/design/PageFooter";
import { MasseGrassePageEditorial } from "./masse-grasse-page-editorial";
import { MasseGrassePageSidebar } from "./masse-grasse-page-sidebar";
import "@/framework/design/index.css";
import "@/site/guides/guide-page.css";
import "./masse-grasse-page.css";

interface MasseGrasseToolPageProps {
  Calculator: ComponentType;
  h1: string;
  subtitle?: string;
}

export function MasseGrasseToolPage({ Calculator, h1, subtitle }: MasseGrasseToolPageProps) {
  const site = useSite();

  return (
    <>
      <section className="tool-header tool-header--compact">
        <SiteNav
          siteName={site.name}
          nav={site.navigation.header}
          logo={site.logo}
          guidesNavigation={site.guidesNavigation}
          toolsNavigation={site.toolsNavigation}
        />
        <div className="tool-header__inner">
          <h1 className="tool-header__title tool-header__title--sentence">{h1}</h1>
          {subtitle ? (
            <p className="tool-header__subtitle tool-header__subtitle--masse-grasse">{subtitle}</p>
          ) : null}
          <div className="calc-stage" id="calculateur">
            <div className="calc-tool calc-tool--main" data-clarity-mask="true">
              <Calculator />
            </div>
          </div>
        </div>
        <HeaderCurveDown />
      </section>

      <main id="main-content" className="content-main">
        <div className="content-wrap content-wrap--wide home-with-sidebar">
          <div className="article-layout">
            <div className="home-with-sidebar__main">
              <div className="content-wrap">
                <AdSlot position="after-result" />
              </div>
              <MasseGrassePageEditorial />
            </div>
            <MasseGrassePageSidebar />
          </div>
        </div>
      </main>

      <div className="content-wrap">
        <AdSlot position="before-footer" />
      </div>

      <PageFooter />
    </>
  );
}
