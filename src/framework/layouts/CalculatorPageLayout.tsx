import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { AdSlot } from "@/framework/AdSlot";
import { HeaderCurveDown } from "@/framework/design/components/Curves";
import { PageFooter } from "@/framework/design/PageFooter";
import { HomeCalculatorIsland } from "@/framework/layouts/HomeCalculatorIsland";
import { HomeToolHeaderNav } from "@/framework/layouts/HomeToolHeaderNav";
import "@/framework/design/home-shell.css";
import "@/site/home-page.css";

export interface HomeBlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  href: string;
}

interface CalculatorPageLayoutProps {
  h1: string;
  subtitle?: string;
  Calculator: ComponentType;
  children: ReactNode;
  sidebar?: ReactNode;
  blogPosts?: HomeBlogPost[];
}

/**
 * Layout accueil (Server Component) : H1, sous-titre LCP, éditorial et sidebar
 * sont rendus côté serveur. Seuls la nav, le calculateur, les pubs et le footer
 * restent des Client Components.
 */
export function CalculatorPageLayout({
  h1,
  subtitle,
  Calculator,
  children,
  sidebar,
  blogPosts = [],
}: CalculatorPageLayoutProps) {
  const showSidebar = Boolean(sidebar);

  return (
    <>
      <section className="tool-header tool-header--compact">
        <HomeToolHeaderNav />
        <div className="tool-header__inner">
          <h1 className="tool-header__title tool-header__title--sentence">{h1}</h1>
          {subtitle ? (
            <p className="tool-header__subtitle tool-header__subtitle--imc">{subtitle}</p>
          ) : null}
          <div className="calc-stage" id="calculateur">
            <HomeCalculatorIsland Calculator={Calculator} />
          </div>
        </div>
        <HeaderCurveDown />
      </section>

      <main id="main-content" className="content-main">
        <div className="content-wrap content-wrap--wide home-with-sidebar">
          <div className={`article-layout${showSidebar ? "" : " article-layout--single"}`}>
            <div className="home-with-sidebar__main">
              {children}

              {blogPosts.length > 0 ? (
                <section id="blog" className="content-section content-section--border">
                  <div className="content-wrap">
                    <div className="section-heading">
                      <div>
                        <p className="section-eyebrow section-eyebrow--dark">Blog</p>
                        <h2 className="section-title section-title--dark">Derniers articles</h2>
                      </div>
                    </div>
                    <div className="blog-grid">
                      {blogPosts.map((post) => (
                        <article key={post.title} className="blog-card">
                          <div className="blog-card__thumb">
                            <span className="blog-card__meta">
                              {post.date} · {post.readTime}
                            </span>
                          </div>
                          <div className="blog-card__body">
                            <h3 className="blog-card__title">
                              <Link href={post.href}>{post.title}</Link>
                            </h3>
                            <p className="blog-card__excerpt">{post.excerpt}</p>
                            <Link href={post.href} className="blog-card__cta">
                              Lire l&apos;article →
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </section>
              ) : null}

              <div className="content-wrap">
                <AdSlot position="after-result" />
              </div>
            </div>
            {sidebar}
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
