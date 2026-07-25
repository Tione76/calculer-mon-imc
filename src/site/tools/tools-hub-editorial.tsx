import Link from "next/link";
import { CoverFigure } from "@/site/guides/CoverFigure";
import { TOOLS_HUB_COVER } from "@/site/guides/covers";

/** Introduction éditoriale du hub /nos-outils */
export function ToolsHubEditorial() {
  return (
    <div className="tools-hub-editorial">
      <section
        className="tools-hub-section tools-hub-section--intro"
        aria-label="Présentation des calculateurs"
      >
        <p>
          Cette page rassemble tous nos calculateurs santé gratuits liés au poids et à la
          composition corporelle. Le{" "}
          <Link href="/">calculateur IMC</Link> situe le rapport entre le poids et la taille, le{" "}
          <Link href="/calculateurs/poids-ideal">calculateur de poids idéal</Link> compare
          plusieurs formules théoriques, et le{" "}
          <Link href="/calculateurs/masse-grasse">calculateur de masse grasse</Link> propose une
          estimation du pourcentage de graisse corporelle.
        </p>

        <CoverFigure cover={TOOLS_HUB_COVER} priority />

        <p>
          Chaque résultat reste indicatif : ces outils en ligne servent à mieux comprendre
          quelques repères chiffrés, sans fournir de diagnostic médical ni d&apos;objectif
          personnalisé. Aucune inscription n&apos;est nécessaire.
        </p>
      </section>

      <ToolsHubOverviewSection />
    </div>
  );
}

/** Présentation équilibrée des trois outils après l'image */
export function ToolsHubOverviewSection() {
  return (
    <section
      className="tools-hub-section"
      aria-labelledby="tools-hub-overview-title"
    >
      <h2 id="tools-hub-overview-title" className="sr-only">
        Présentation des trois calculateurs
      </h2>
      <div className="tools-hub-key-grid">
        <article className="tools-hub-key-card">
          <div className="tools-hub-key-card__title">Calculateur IMC</div>
          <p>
            Calculez l&apos;indice de masse corporelle, obtenez la catégorie correspondante et
            disposez d&apos;un premier repère statistique. Pour{" "}
            <Link href="/guides/quest-ce-que-l-imc">comprendre ce qu&apos;est l&apos;IMC</Link> ou{" "}
            <Link href="/guides/comment-calculer-son-imc">découvrir la formule de l&apos;IMC</Link>
            , consultez ensuite nos guides.
          </p>
          <p>
            <Link href="/" className="tools-hub-cta">
              Utiliser le calculateur IMC →
            </Link>
          </p>
        </article>
        <article className="tools-hub-key-card">
          <div className="tools-hub-key-card__title">Calculateur de poids idéal</div>
          <p>
            Comparez plusieurs formules, obtenez différentes estimations et constatez qu&apos;il
            n&apos;existe pas de poids idéal universel. Approfondissez avec le guide pour{" "}
            <Link href="/guides/calculer-son-poids-ideal">
              comparer les formules de poids idéal
            </Link>
            .
          </p>
          <p>
            <Link href="/calculateurs/poids-ideal" className="tools-hub-cta">
              Estimer son poids idéal →
            </Link>
          </p>
        </article>
        <article className="tools-hub-key-card">
          <div className="tools-hub-key-card__title">Calculateur de masse grasse</div>
          <p>
            Estimez le pourcentage de masse grasse, complétez l&apos;IMC et distinguez davantage
            poids total et composition corporelle. Pour{" "}
            <Link href="/guides/limites-de-l-imc">connaître les limites de l&apos;IMC</Link>, le
            guide dédié reste utile.
          </p>
          <p>
            <Link href="/calculateurs/masse-grasse" className="tools-hub-cta">
              Estimer sa masse grasse →
            </Link>
          </p>
        </article>
      </div>
    </section>
  );
}

export function ToolsHubChoiceHelp() {
  return (
    <p className="tools-hub-choice-help">
      Vous ne savez pas quel outil utiliser ? Commencez par le{" "}
      <Link href="/">calculateur IMC</Link> pour obtenir un repère général. Le{" "}
      <Link href="/calculateurs/poids-ideal">calculateur de poids idéal</Link> permet ensuite de
      comparer plusieurs formules, tandis que le{" "}
      <Link href="/calculateurs/masse-grasse">calculateur de masse grasse</Link> apporte une
      estimation plus directement liée à la composition corporelle.
    </p>
  );
}

export function ToolsHubWhySection() {
  return (
    <section
      className="tools-hub-section tools-hub-section--tinted"
      aria-labelledby="tools-hub-why-title"
    >
      <h2 id="tools-hub-why-title">Pourquoi utiliser nos calculateurs ?</h2>
      <p>
        Un calculateur santé en ligne ne remplace pas un bilan clinique, mais il aide à situer
        rapidement un résultat avant de lire nos contenus pédagogiques.
      </p>
      <ul className="tools-hub-benefits">
        <li>obtenir rapidement une estimation gratuite, sans inscription ;</li>
        <li>comparer plusieurs indicateurs (IMC, poids idéal, masse grasse) ;</li>
        <li>visualiser un résultat de manière claire et immédiate ;</li>
        <li>
          accéder aux guides pour{" "}
          <Link href="/guides/comment-interpreter-son-imc">
            apprendre à interpréter son résultat
          </Link>{" "}
          ou comprendre le calcul ;
        </li>
        <li>
          <Link href="/guides">consulter tous nos guides</Link> pour approfondir formules, seuils
          et limites.
        </li>
      </ul>
      <p>
        Ces résultats constituent des repères pédagogiques et statistiques. Ils ne remplacent ni
        une mesure clinique, ni un diagnostic, ni un suivi personnalisé.
      </p>
    </section>
  );
}
