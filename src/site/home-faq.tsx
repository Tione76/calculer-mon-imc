import { homeFaqRich } from "./home-faq-data";
import { renderFaqAnswer } from "./faq-page-utils";

/** FAQ page d'accueil */
export function HomeFaqContent() {
  return (
    <div className="faq-list">
      {homeFaqRich.map((item) => (
        <details key={item.question} className="faq-item">
          <summary className="faq-item__summary">
            <span>{item.question}</span>
            <span className="faq-chevron" aria-hidden="true">
              ▾
            </span>
          </summary>
          <div className="faq-item__body">{renderFaqAnswer(item.answer)}</div>
        </details>
      ))}
    </div>
  );
}
