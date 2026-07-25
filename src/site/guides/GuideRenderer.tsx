import Link from "next/link";
import { getGuideCoverByHref } from "./covers";
import { GuideCoverImage } from "./GuideCoverImage";
import { CoverFigure } from "./CoverFigure";
import type { GuideSidebarLink, SidebarTool } from "./sidebar";
import type { GuideBlock, GuideTocEntry } from "./types";
import { GUIDE_CALLOUT_LABELS } from "./types";
import { GuideIllustration } from "./illustrations";

function blockKey(prefix: string, block: GuideBlock, index: number): string {
  return `${prefix}-${block.type}-${index}`;
}

function isPlaceholderHref(href: string): boolean {
  return href.includes("[") || href.includes("]");
}

function GuideBlockRenderer({ block, isTemplate }: { block: GuideBlock; isTemplate?: boolean }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;

    case "list":
      if (block.ordered) {
        return (
          <ol className="guide-list guide-list--ordered">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="guide-list guide-list--disc">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "definition-list":
      return (
        <dl className="guide-definition-list">
          {block.items.map((item) => (
            <div key={item.term} className="guide-definition-list__row">
              <dt>{item.term}</dt>
              <dd>{item.definition}</dd>
            </div>
          ))}
        </dl>
      );

    case "timeline":
      return (
        <ol className="guide-timeline">
          {block.items.map((item) => (
            <li key={item.period} className="guide-timeline__item">
              <p className="guide-timeline__period">{item.period}</p>
              <p className="guide-timeline__text">{item.text}</p>
            </li>
          ))}
        </ol>
      );

    case "source-list":
      return (
        <ul className="guide-source-list">
          {block.items.map((item) => (
            <li key={item.href} className="guide-source-list__item">
              <span className="guide-source-list__org">{item.org}</span>
              <a href={item.href} rel="noopener noreferrer" target="_blank" className="guide-source-list__link">
                {item.title}
              </a>
              <span className="guide-source-list__year">{item.year}</span>
            </li>
          ))}
        </ul>
      );

    case "checklist":
      return (
        <aside className="guide-checklist">
          {block.title && <p className="guide-checklist__title">{block.title}</p>}
          <ul>
            {block.items.map((item) => (
              <li key={item}>
                <span className="guide-checklist__mark" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      );

    case "mistakes":
      return (
        <aside className="guide-mistakes">
          {block.title && <p className="guide-mistakes__title">{block.title}</p>}
          <ul>
            {block.items.map((item) => (
              <li key={item}>
                <span className="guide-mistakes__mark" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M3.5 3.5l7 7M10.5 3.5l-7 7"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      );

    case "steps":
      return (
        <ol className="guide-steps">
          {block.items.map((step, i) => (
            <li key={step.title} className="guide-steps__item">
              <span className="guide-steps__num" aria-hidden="true">{i + 1}</span>
              <div className="guide-steps__body">
                <p className="guide-steps__title">{step.title}</p>
                <p className="guide-steps__desc">{step.description}</p>
                {step.href && step.linkLabel && !isTemplate && !isPlaceholderHref(step.href) ? (
                  <p className="guide-steps__link-line">
                    {step.href.startsWith("http") ? (
                      <a href={step.href} rel="noopener noreferrer" target="_blank" className="guide-steps__link">
                        {step.linkLabel} →
                      </a>
                    ) : (
                      <Link href={step.href} className="guide-steps__link">
                        {step.linkLabel} →
                      </Link>
                    )}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      );

    case "callout":
      return (
        <aside className={`prose-callout prose-callout--${block.variant}`}>
          <strong>{GUIDE_CALLOUT_LABELS[block.variant]}</strong>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </aside>
      );

    case "formula":
      return (
        <div className="guide-formula-box" role="group" aria-label="Formule">
          {block.lines.map((line) => (
            <p key={line} className="guide-formula-box__line">
              {line}
            </p>
          ))}
        </div>
      );

    case "table":
      if (block.variant === "imc-permits") {
        return (
          <figure className="guide-table-wrap guide-table-wrap--imc-permits">
            {block.caption && <p className="guide-table-wrap__lead">{block.caption}</p>}
            <div className="guide-imc-permits">
              <div className="guide-imc-permits__panel guide-imc-permits__panel--can">
                <p className="guide-imc-permits__heading">{block.headers[0]}</p>
                <ul className="guide-imc-permits__list">
                  {block.rows.map((row) => (
                    <li key={row[0]}>
                      <span className="guide-imc-permits__mark guide-imc-permits__mark--can" aria-hidden="true">
                        ✓
                      </span>
                      {row[0]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="guide-imc-permits__panel guide-imc-permits__panel--cannot">
                <p className="guide-imc-permits__heading">{block.headers[1]}</p>
                <ul className="guide-imc-permits__list">
                  {block.rows.map((row) => (
                    <li key={row[1]}>
                      <span className="guide-imc-permits__mark guide-imc-permits__mark--limit" aria-hidden="true">
                        ○
                      </span>
                      {row[1]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {block.footnote && <figcaption>{block.footnote}</figcaption>}
          </figure>
        );
      }

      return (
        <figure
          className={`guide-table-wrap${
            block.variant === "imc-categories"
              ? " guide-table-wrap--imc-categories"
              : block.variant === "editorial-comparison"
                ? " guide-table-wrap--editorial-comparison"
                : ""
          }`}
        >
          {block.caption && block.variant === "editorial-comparison" ? (
            <p className="guide-table-wrap__lead">{block.caption}</p>
          ) : null}
          <div className="guide-table-scroll">
            <table
              className={`guide-table${
                block.variant === "imc-categories"
                  ? " guide-table--imc-categories"
                  : block.variant === "editorial-comparison"
                    ? " guide-table--editorial-comparison"
                    : ""
              }`}
            >
              <thead>
                <tr>
                  {block.headers.map((header) => (
                    <th key={header} scope="col">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row.join("-")}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cell}
                        className={
                          block.variant === "imc-categories" && cellIndex === 1
                            ? "guide-table__threshold"
                            : undefined
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(block.caption || block.footnote) && block.variant !== "editorial-comparison" && (
            <figcaption>
              {block.caption ? <span>{block.caption}</span> : null}
              {block.caption && block.footnote ? " " : null}
              {block.footnote ? <span>{block.footnote}</span> : null}
            </figcaption>
          )}
          {block.footnote && block.variant === "editorial-comparison" ? (
            <figcaption>{block.footnote}</figcaption>
          ) : null}
        </figure>
      );

    case "illustration":
      return <GuideIllustration id={block.id} caption={block.caption} />;

    case "image-placeholder":
      return (
        <figure>
          <div className="prose-figure__placeholder" aria-hidden="true">
            Illustration à ajouter : {block.description}
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case "internal-link":
      if (isTemplate || isPlaceholderHref(block.href)) {
        return (
          <p className="guide-internal-link guide-internal-link--placeholder">
            {block.intro && <>{block.intro} </>}
            <span className="guide-internal-link__label">{block.label}</span>
          </p>
        );
      }
      return (
        <p className="guide-internal-link">
          {block.intro && <>{block.intro} </>}
          {block.href.startsWith("http") ? (
            <a href={block.href} rel="noopener noreferrer" target="_blank">
              {block.label}
            </a>
          ) : (
            <Link href={block.href}>{block.label}</Link>
          )}
        </p>
      );

    case "profession-faq":
      return (
        <div className="guide-profession-faq faq-list faq-list--flush">
          {block.items.map((item) => (
            <details key={item.label} className="faq-item">
              <summary className="faq-item__summary">
                <span>{item.label}</span>
                <span className="faq-chevron" aria-hidden="true">▾</span>
              </summary>
              <div className="faq-item__body">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      );

    case "contextual-cta":
      if (isTemplate || isPlaceholderHref(block.href)) {
        return (
          <aside className="guide-contextual-cta guide-contextual-cta--placeholder">
            <p className="guide-contextual-cta__text">{block.text}</p>
            <span className="guide-contextual-cta__link">{block.label} →</span>
          </aside>
        );
      }
      return (
        <aside className="guide-contextual-cta">
          <p className="guide-contextual-cta__text">{block.text}</p>
          <Link href={block.href} className="guide-contextual-cta__link">
            {block.label} →
          </Link>
        </aside>
      );
  }
}

/** Sommaire inline : H2 uniquement */
export function GuideInlineToc({
  entries,
  title = "Dans ce guide",
}: {
  entries: GuideTocEntry[];
  title?: string;
}) {
  return (
    <nav className="guide-toc" aria-label={title}>
      <p className="guide-toc__title">{title}</p>
      <ol className="guide-toc__list">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a href={`#${entry.id}`} className="guide-toc__link">
              {entry.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function GuideSidebarGuideCards({ guides }: { guides: GuideSidebarLink[] }) {
  return (
    <div className="guide-sidebar-cards">
      {guides.map((guide) => {
        const cover = getGuideCoverByHref(guide.href);
        return (
          <Link
            key={guide.href}
            href={guide.href}
            className="guide-sidebar-card guide-sidebar-card--cover"
          >
            {cover && (
              <span className="guide-sidebar-card__cover">
                <GuideCoverImage cover={cover} decorative className="guide-sidebar-card__cover-img" />
              </span>
            )}
            <span className="guide-sidebar-card__body">
              <span className="guide-sidebar-card__title">{guide.title}</span>
              {guide.description ? (
                <span className="guide-sidebar-card__desc">{guide.description}</span>
              ) : null}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function GuideSidebarGuidesSection({
  title,
  guides,
  blockClassName,
}: {
  title: string;
  guides: GuideSidebarLink[];
  blockClassName: string;
}) {
  if (guides.length === 0) return null;

  return (
    <div className={`guide-sidebar-block ${blockClassName}`}>
      <p className="guide-sidebar-block__title">{title}</p>
      <GuideSidebarGuideCards guides={guides} />
    </div>
  );
}

function GuideSidebarToolCard({ tool }: { tool: SidebarTool }) {
  return (
    <Link href={tool.href} className="guide-sidebar-card guide-sidebar-card--calculator">
      <span className="guide-sidebar-card__cover">
        <GuideCoverImage cover={tool.cover} decorative className="guide-sidebar-card__cover-img" />
      </span>
      <span className="guide-sidebar-card__body">
        <span className="guide-sidebar-card__title">{tool.title}</span>
        <span className="guide-sidebar-card__subtitle">{tool.description}</span>
        <span className="guide-sidebar-card__badge">{tool.badge ?? "✓ Outil gratuit"}</span>
      </span>
    </Link>
  );
}

interface GuideSidebarProps {
  tools?: SidebarTool[];
  guides?: GuideSidebarLink[];
  guidesSectionTitle?: string;
  guidesBlockVariant?: "guides" | "also-read";
  showTools?: boolean;
}

export function GuideSidebar({
  tools = [],
  guides = [],
  guidesSectionTitle = "À lire aussi",
  guidesBlockVariant = "also-read",
  showTools = true,
}: GuideSidebarProps) {
  const guidesBlockClass =
    guidesBlockVariant === "guides"
      ? "guide-sidebar-block--guides"
      : "guide-sidebar-block--also-read";

  return (
    <>
      {showTools && tools.length > 0 && (
        <div className="guide-sidebar-block guide-sidebar-block--calculator guide-sidebar-block--tools">
          <p className="guide-sidebar-block__title">Nos calculateurs gratuits</p>
          <div className="guide-sidebar-tools-list">
            {tools.map((tool) => (
              <GuideSidebarToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}

      <GuideSidebarGuidesSection
        title={guidesSectionTitle}
        guides={guides}
        blockClassName={guidesBlockClass}
      />
    </>
  );
}

interface GuideArticleProps {
  introduction: string[];
  introDisclaimer?: string;
  introSummary?: import("./types").Guide["introSummary"];
  quickSummary?: import("./types").GuideQuickSummary;
  toc: GuideTocEntry[];
  sections: import("./types").Guide["sections"];
  faq: import("./types").Guide["faq"];
  faqTitle?: string;
  faqIntro?: string;
  faqListClassName?: string;
  conclusion: import("./types").Guide["conclusion"];
  postConclusion?: import("./types").GuidePostConclusion;
  isTemplate?: boolean;
  cover?: import("./covers").GuideCoverImage;
}

function GuideQuickSummaryCards({ summary }: { summary: import("./types").GuideQuickSummary }) {
  const cards = summary.cards ?? [];
  return (
    <aside className="guide-quick-summary guide-quick-summary--cards" aria-label={summary.title}>
      <p className="guide-quick-summary__title">{summary.title}</p>
      <div className="guide-quick-summary__cards">
        {cards.map((card) => (
          <div key={card.label} className="guide-quick-summary__fact">
            <span className="guide-quick-summary__fact-icon" aria-hidden="true">
              {card.icon}
            </span>
            <p className="guide-quick-summary__fact-label">{card.label}</p>
            <p className="guide-quick-summary__fact-value">{card.value}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

function GuideQuickSummaryBlock({ summary }: { summary: import("./types").GuideQuickSummary }) {
  if (summary.variant === "cards") {
    return <GuideQuickSummaryCards summary={summary} />;
  }

  const isFormula = summary.variant === "formula";
  const isReadingOrder = summary.variant === "reading-order";
  const isPipeline = !isFormula && summary.items.some((item) => item.kind);

  if (isFormula || isReadingOrder || isPipeline) {
    const modifier = isFormula ? "formula" : isReadingOrder ? "reading-order" : "pipeline";
    return (
      <aside
        className={`guide-quick-summary guide-quick-summary--${modifier}`}
        aria-label={summary.title}
      >
        <p className="guide-quick-summary__title">{summary.title}</p>
        <div className="guide-quick-summary__pipeline">
          {summary.items.map((item, index) =>
            item.kind === "connector" ? (
              <div
                key={`${item.description}-${index}`}
                className="guide-quick-summary__connector"
                aria-hidden="true"
              >
                <span className="guide-quick-summary__connector-arrow">
                  {item.rate === "→" ? "→" : "↓"}
                </span>
                {item.description && (
                  <span className="guide-quick-summary__connector-text">{item.description}</span>
                )}
              </div>
            ) : (
              <div key={`${item.title ?? item.rate}-${index}`} className="guide-quick-summary__level">
                {!isFormula && <p className="guide-quick-summary__level-num">{item.rate}</p>}
                {item.title && <p className="guide-quick-summary__level-title">{item.title}</p>}
                {item.description && (
                  <p className="guide-quick-summary__level-desc">{item.description}</p>
                )}
              </div>
            ),
          )}
        </div>
        {summary.synthesis?.map((paragraph) => (
          <p key={paragraph} className="guide-quick-summary__synthesis">
            {paragraph}
          </p>
        ))}
      </aside>
    );
  }

  return (
    <aside className="guide-quick-summary" aria-label={summary.title}>
      <p className="guide-quick-summary__title">{summary.title}</p>
      <div className="guide-quick-summary__grid">
        {summary.items.map((item) => (
          <div key={item.rate} className="guide-quick-summary__card">
            <p className="guide-quick-summary__rate">{item.rate}</p>
            <p className="guide-quick-summary__desc">{item.description}</p>
          </div>
        ))}
      </div>
      {summary.synthesis?.map((paragraph) => (
        <p key={paragraph} className="guide-quick-summary__synthesis">
          {paragraph}
        </p>
      ))}
    </aside>
  );
}

function renderSectionBlocks(
  blocks: GuideBlock[],
  sectionId: string,
  isTemplate?: boolean,
) {
  return blocks.map((block, index) => (
    <GuideBlockRenderer
      key={blockKey(sectionId, block, index)}
      block={block}
      isTemplate={isTemplate}
    />
  ));
}

export function GuideArticle({
  introduction,
  introDisclaimer,
  introSummary,
  quickSummary,
  toc,
  sections,
  faq,
  faqTitle,
  faqIntro,
  faqListClassName,
  conclusion,
  postConclusion,
  isTemplate,
  cover,
}: GuideArticleProps) {
  const [firstParagraph, ...restIntroduction] = introduction;

  return (
    <>
      <div className="guide-intro">
        {firstParagraph ? <p>{firstParagraph}</p> : null}
        {cover ? <CoverFigure cover={cover} priority /> : null}
        {restIntroduction.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {introDisclaimer ? <p className="guide-intro-disclaimer">{introDisclaimer}</p> : null}
      </div>

      {introSummary ? (
        <aside className="guide-checklist guide-intro-summary">
          <p className="guide-checklist__title">{introSummary.title}</p>
          <ul>
            {introSummary.items.map((item) => (
              <li key={item}>
                <span className="guide-checklist__mark" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      <GuideInlineToc entries={toc} />

      {quickSummary && <GuideQuickSummaryBlock summary={quickSummary} />}

      {sections.map((section) => (
        <section key={section.id} id={section.id} className="guide-section">
          <h2>{section.title}</h2>
          {section.blocks?.map((block, index) => (
            <GuideBlockRenderer
              key={blockKey(section.id, block, index)}
              block={block}
              isTemplate={isTemplate}
            />
          ))}
          {section.subsections?.map((subsection) => (
            <div key={subsection.id} id={subsection.id} className="guide-subsection">
              <h3>{subsection.title}</h3>
              {subsection.blocks.map((block, index) => (
                <GuideBlockRenderer
                  key={blockKey(subsection.id, block, index)}
                  block={block}
                  isTemplate={isTemplate}
                />
              ))}
            </div>
          ))}
        </section>
      ))}

      <section id="faq" className="guide-section">
        <h2>{faqTitle ?? "Questions fréquentes"}</h2>
        {faqIntro ? <p>{faqIntro}</p> : null}
        <div className={faqListClassName ? `faq-list ${faqListClassName}` : "faq-list"}>
          {faq.map((item) => (
            <details key={item.question} className="faq-item">
              <summary className="faq-item__summary">
                <span>{item.question}</span>
                <span className="faq-chevron" aria-hidden="true">▾</span>
              </summary>
              <div className="faq-item__body">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="conclusion" className="guide-conclusion">
        <h2>{conclusion.title ?? "Conclusion"}</h2>
        <div className="guide-conclusion__points">
          <p className="guide-conclusion__points-title">À retenir</p>
          <ul className="guide-conclusion__list">
            {conclusion.keyPoints.map((point) => (
              <li key={point}>
                <span className="guide-conclusion__check" aria-hidden="true">✔</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <p className="guide-conclusion__closing">{conclusion.closingText}</p>
        {conclusion.closingPathway ? (
          <p className="guide-conclusion__pathway">{conclusion.closingPathway}</p>
        ) : null}
        <div className="guide-conclusion__actions">
          {conclusion.closingCta &&
            (isTemplate || isPlaceholderHref(conclusion.closingCta.href) ? (
              <span className="guide-conclusion__cta">{conclusion.closingCta.label}</span>
            ) : (
              <Link href={conclusion.closingCta.href} className="guide-conclusion__cta">
                {conclusion.closingCta.label}
              </Link>
            ))}
          {conclusion.secondaryLinks && conclusion.secondaryLinks.length > 0 ? (
            <p className="guide-conclusion__secondary">
              {conclusion.secondaryLinks.map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? " · " : null}
                  {isTemplate || isPlaceholderHref(link.href) ? (
                    <span>{link.label}</span>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </section>

      {postConclusion?.summary ? (
        <section id={postConclusion.summary.id} className="guide-section guide-section--post-conclusion">
          <h2>{postConclusion.summary.title}</h2>
          {postConclusion.summary.blocks
            ? renderSectionBlocks(postConclusion.summary.blocks, postConclusion.summary.id, isTemplate)
            : null}
        </section>
      ) : null}

      {postConclusion?.sources ? (
        <section id={postConclusion.sources.id} className="guide-section guide-section--post-conclusion">
          <h2>{postConclusion.sources.title}</h2>
          {postConclusion.sources.blocks
            ? renderSectionBlocks(postConclusion.sources.blocks, postConclusion.sources.id, isTemplate)
            : null}
        </section>
      ) : null}

      {postConclusion?.editorialNote ? (
        <aside className="guide-editorial-note" aria-label={postConclusion.editorialNote.title}>
          <p className="guide-editorial-note__title">{postConclusion.editorialNote.title}</p>
          {postConclusion.editorialNote.paragraphs.map((paragraph) => (
            <p key={paragraph} className="guide-editorial-note__text">
              {paragraph}
            </p>
          ))}
        </aside>
      ) : null}
    </>
  );
}
