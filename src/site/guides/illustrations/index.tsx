import type { ReactElement } from "react";

/**
 * Illustrations SVG embarquées dans les guides.
 * Les guides IMC actuels n'utilisent pas encore ce registre ; le composant
 * reste disponible pour de futures illustrations publiées.
 */
const ILLUSTRATIONS: Record<string, () => ReactElement> = {};

export function GuideIllustration({ id, caption }: { id: string; caption?: string }) {
  const Illustration = ILLUSTRATIONS[id];

  if (!Illustration) {
    return (
      <figure className="guide-illustration">
        <div className="prose-figure__placeholder" aria-hidden="true">
          Illustration à venir : {id}
        </div>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className="guide-illustration">
      <Illustration />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
