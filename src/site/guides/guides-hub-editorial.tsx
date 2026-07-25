import Link from "next/link";
import { CoverFigure } from "./CoverFigure";
import { GUIDES_HUB_COVER } from "./covers";

/** Introduction éditoriale du hub /guides */
export function GuidesHubEditorial() {
  return (
    <div className="guides-hub-editorial">
      <section
        className="guides-hub-section guides-hub-section--intro"
        aria-label="Présentation des guides"
      >
        <p>
          Cette page rassemble les guides IMC et les contenus liés au poids. Elle sert de point
          d&apos;entrée pour{" "}
          <Link href="/guides/quest-ce-que-l-imc">comprendre ce qu&apos;est l&apos;IMC</Link>,{" "}
          <Link href="/guides/comment-calculer-son-imc">apprendre à calculer son IMC</Link>, puis
          pour lire un résultat avec davantage de contexte.
        </p>

        <CoverFigure cover={GUIDES_HUB_COVER} priority />

        <p>
          Vous y trouverez aussi comment{" "}
          <Link href="/guides/comment-interpreter-son-imc">interpréter un résultat d&apos;IMC</Link>
          ,{" "}
          <Link href="/guides/limites-de-l-imc">connaître les limites de l&apos;IMC</Link> et{" "}
          <Link href="/guides/calculer-son-poids-ideal">comparer les formules de poids idéal</Link>.
          L&apos;objectif reste le même : des repères clairs, sans promesse médicale.
        </p>
        <p>
          Les guides apportent le contexte nécessaire pour mieux utiliser le{" "}
          <Link href="/">calculateur IMC</Link>, le{" "}
          <Link href="/calculateurs/poids-ideal">calculateur de poids idéal</Link> et le{" "}
          <Link href="/calculateurs/masse-grasse">calculateur de masse grasse</Link>.
        </p>
      </section>
    </div>
  );
}

/** Présentation courte des parcours avant la grille */
export function GuidesHubChooseSection() {
  return (
    <div className="guides-hub-choose">
      <p className="guides-hub-list__intro">
        Selon votre question, commencez par l&apos;un de ces trois parcours. Les cartes ci-dessous
        ouvrent ensuite le guide complet.
      </p>
      <div className="guides-hub-choose__groups">
        <div className="guides-hub-choose__group">
          <h3 className="guides-hub-choose__title">Comprendre l&apos;IMC</h3>
          <p>
            Pour la définition, l&apos;origine et le rôle de l&apos;indicateur, lisez{" "}
            <Link href="/guides/quest-ce-que-l-imc">Qu&apos;est-ce que l&apos;IMC ?</Link>
          </p>
        </div>
        <div className="guides-hub-choose__group">
          <h3 className="guides-hub-choose__title">Calculer et interpréter un résultat</h3>
          <p>
            Pour la formule, les unités et la lecture des catégories, passez par{" "}
            <Link href="/guides/comment-calculer-son-imc">Comment calculer son IMC ?</Link> puis{" "}
            <Link href="/guides/comment-interpreter-son-imc">
              Comment interpréter son IMC ?
            </Link>
          </p>
        </div>
        <div className="guides-hub-choose__group">
          <h3 className="guides-hub-choose__title">Aller au-delà de l&apos;IMC</h3>
          <p>
            Pour les situations où l&apos;indicateur trompe, ou pour estimer une fourchette de
            poids, consultez{" "}
            <Link href="/guides/limites-de-l-imc">Les limites de l&apos;IMC</Link> et{" "}
            <Link href="/guides/calculer-son-poids-ideal">Calculer son poids idéal</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export function GuidesHubTransition() {
  return (
    <p className="guides-hub-transition">
      Ces contenus peuvent être lus séparément, mais ils se complètent. Commencez par{" "}
      <Link href="/guides/quest-ce-que-l-imc">la définition</Link> ou le{" "}
      <Link href="/guides/comment-calculer-son-imc">calcul de l&apos;IMC</Link>, puis approfondissez{" "}
      <Link href="/guides/comment-interpreter-son-imc">l&apos;interprétation</Link>, les limites ou
      le poids idéal selon votre besoin.
    </p>
  );
}

export function GuidesHubWhySection() {
  return (
    <section
      className="guides-hub-section guides-hub-section--tinted"
      aria-labelledby="guides-hub-why-title"
    >
      <h2 id="guides-hub-why-title">Pourquoi consulter nos guides ?</h2>
      <p>
        Un chiffre isolé peut prêter à confusion. Nos articles aident à comprendre les formules,
        à lire les résultats avec recul et à mieux utiliser les calculateurs du site.
      </p>
      <ul className="guides-hub-benefits">
        <li>comprendre les formules utilisées pour l&apos;IMC et le poids idéal ;</li>
        <li>lire les catégories et les seuils avec discernement ;</li>
        <li>connaître les limites des indicateurs et les profils où ils trompent ;</li>
        <li>comparer IMC, poids idéal et composition corporelle ;</li>
        <li>préparer une lecture informée avant d&apos;utiliser un calculateur.</li>
      </ul>
      <p>
        Pour commencer, lisez{" "}
        <Link href="/guides/quest-ce-que-l-imc">Qu&apos;est-ce que l&apos;IMC ?</Link>,{" "}
        <Link href="/guides/comment-calculer-son-imc">Comment calculer son IMC ?</Link> ou{" "}
        <Link href="/guides/calculer-son-poids-ideal">Calculer son poids idéal</Link>.
      </p>
    </section>
  );
}
