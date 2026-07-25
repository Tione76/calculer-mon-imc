import { IconInfo } from "./icons";

export function EducationalNotice({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: readonly string[];
}) {
  return (
    <aside className="calc-shell__keep-in-mind">
      <IconInfo className="calc-shell__keep-in-mind-icon" />
      <div className="calc-shell__keep-in-mind-body">
        <h3 className="calc-shell__keep-in-mind-title">{title}</h3>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </aside>
  );
}
