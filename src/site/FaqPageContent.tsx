import { GuideInlineToc } from "@/site/guides";
import { CoverFigure } from "@/site/guides/CoverFigure";
import { FAQ_COVER } from "@/site/guides/covers";
import {
  FAQ_PAGE_INTRO_PARAGRAPHS,
  FAQ_PAGE_OUTRO_SEGMENTS,
  FAQ_PAGE_SOURCES,
  FAQ_PAGE_UPDATED,
  faqPageCategories,
  getFaqPageTocEntries,
} from "./faq-page-data";
import { renderFaqAnswer, renderFaqSegments } from "./faq-page-utils";

export function FaqPageContent() {
  const toc = getFaqPageTocEntries();

  return (
    <div className="faq-page">
      <div className="faq-page__header">
        {FAQ_PAGE_INTRO_PARAGRAPHS.map((segments, index) => (
          <p key={index} className="faq-page__intro">
            {renderFaqSegments(segments)}
          </p>
        ))}
        <CoverFigure cover={FAQ_COVER} priority />
        <p className="faq-page__updated">Dernière mise à jour : {FAQ_PAGE_UPDATED}</p>
        <GuideInlineToc entries={toc} title="Sommaire" />
      </div>

      {faqPageCategories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="faq-page__category"
          aria-labelledby={`${category.id}-title`}
        >
          <h2 id={`${category.id}-title`} className="faq-page__category-title">
            {category.title}
          </h2>
          <div className="faq-list faq-list--flush">
            {category.items.map((item) => (
              <details key={item.question} className="faq-item">
                <summary className="faq-item__summary">
                  <h3 className="faq-item__question">{item.question}</h3>
                  <span className="faq-chevron" aria-hidden="true">
                    ▾
                  </span>
                </summary>
                <div className="faq-item__body">{renderFaqAnswer(item.answer)}</div>
              </details>
            ))}
          </div>
        </section>
      ))}

      <section
        id={FAQ_PAGE_SOURCES.id}
        className="faq-page__sources"
        aria-labelledby={`${FAQ_PAGE_SOURCES.id}-title`}
      >
        <h2 id={`${FAQ_PAGE_SOURCES.id}-title`} className="faq-page__category-title">
          {FAQ_PAGE_SOURCES.title}
        </h2>
        <p className="faq-page__sources-intro">{FAQ_PAGE_SOURCES.intro}</p>
        <ul className="faq-page__sources-list">
          {FAQ_PAGE_SOURCES.items.map((item) => (
            <li key={item.href}>
              {item.label}{" "}
              <a href={item.href} rel="noopener noreferrer" target="_blank">
                {item.linkText}
              </a>
            </li>
          ))}
        </ul>
        <p className="faq-page__sources-note">{FAQ_PAGE_SOURCES.methodsNote}</p>
      </section>

      <div className="faq-page__outro">{renderFaqAnswer(FAQ_PAGE_OUTRO_SEGMENTS)}</div>
    </div>
  );
}
