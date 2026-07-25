import Link from "next/link";
import { CoverFigure } from "@/site/guides/CoverFigure";
import { getCalculatorCover } from "@/site/guides/covers";
import { POIDS_IDEAL_EDITORIAL_UPDATED_AT, POIDS_IDEAL_FAQ } from "./poids-ideal-faq-data";

const revisedDateLabel = new Date(POIDS_IDEAL_EDITORIAL_UPDATED_AT).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const FURTHER_TOOLS = [
  {
    href: "/",
    title: "Calculateur d'IMC",
    description: "Situer votre poids actuel par rapport à votre taille.",
    icon: "⚖",
  },
  {
    href: "/calculateurs/masse-grasse",
    title: "Calculateur de masse grasse",
    description: "Estimer la composition corporelle, pas seulement le poids.",
    icon: "%",
  },
] as const;

const FURTHER_GUIDES = [
  {
    href: "/guides/calculer-son-poids-ideal",
    title: "Calculer son poids idéal",
    description: "Méthodes, formules et limites : le guide compagnon de cet outil.",
  },
  {
    href: "/guides/quest-ce-que-l-imc",
    title: "Qu'est-ce que l'IMC ?",
    description: "Comprendre l'indicateur complémentaire du poids idéal.",
  },
  {
    href: "/guides/comment-interpreter-son-imc",
    title: "Comment interpréter son IMC ?",
    description: "Lire un résultat selon les catégories OMS.",
  },
  {
    href: "/guides/limites-de-l-imc",
    title: "Les limites de l'IMC",
    description: "Savoir quand l'indice trompe, et comment le nuancer.",
  },
] as const;

export function PoidsIdealPageEditorial() {
  const cover = getCalculatorCover("poids-ideal");

  return (
    <section id="contenu" className="content-section">
      <div className="prose home-editorial guide-article--imc-reference pi-editorial">
        <p className="home-editorial__lead home-editorial__prose">
          Notre <a href="#calculateur">calculateur de poids idéal</a> estime un poids de référence
          à partir de plusieurs formules reconnues. Le résultat se lit comme une{" "}
          <strong>fourchette</strong>, pas comme un objectif absolu. Cette page explique les
          méthodes, leurs différences, leurs limites, et comment interpréter votre estimation. Pour
          une lecture structurée hors outil, consultez aussi le guide{" "}
          <Link href="/guides/calculer-son-poids-ideal">Calculer son poids idéal</Link>.
        </p>

        <CoverFigure cover={cover} />

        <nav className="home-editorial__toc home-editorial__prose pi-toc" aria-label="Sommaire du guide">
          <details className="pi-toc__details" open>
            <summary className="pi-toc__summary">
              <span className="home-editorial__toc-title">Dans ce guide</span>
              <span className="pi-toc__hint" aria-hidden="true">
                Afficher / masquer
              </span>
            </summary>
            <div className="pi-toc__groups">
              <div className="pi-toc__group">
                <p className="pi-toc__group-title">Comprendre le poids idéal</p>
                <ul className="home-editorial__toc-list editorial-list editorial-list--toc">
                  <li>
                    <a href="#quest-ce-que-poids-ideal">Qu&apos;est-ce que le poids idéal ?</a>
                  </li>
                  <li>
                    <a href="#pourquoi-pas-universel">Pourquoi n&apos;existe-t-il pas de poids idéal universel ?</a>
                  </li>
                  <li>
                    <a href="#fonctionnement-calculateur">Comment fonctionne le calculateur ?</a>
                  </li>
                </ul>
              </div>
              <div className="pi-toc__group">
                <p className="pi-toc__group-title">Interpréter le résultat</p>
                <ul className="home-editorial__toc-list editorial-list editorial-list--toc">
                  <li>
                    <a href="#interpreter-resultat">Comment interpréter son résultat ?</a>
                  </li>
                  <li>
                    <a href="#pourquoi-resultats-different">Pourquoi les résultats diffèrent-ils ?</a>
                  </li>
                  <li>
                    <a href="#formule-la-plus-fiable">Quelle formule est la plus fiable ?</a>
                  </li>
                </ul>
              </div>
              <div className="pi-toc__group">
                <p className="pi-toc__group-title">Comparer les méthodes</p>
                <ul className="home-editorial__toc-list editorial-list editorial-list--toc">
                  <li>
                    <a href="#formules-disponibles">Les formules disponibles</a>
                  </li>
                  <li>
                    <a href="#comparatif-formules">Comparatif des formules</a>
                  </li>
                </ul>
              </div>
              <div className="pi-toc__group">
                <p className="pi-toc__group-title">Mettre en perspective</p>
                <ul className="home-editorial__toc-list editorial-list editorial-list--toc">
                  <li>
                    <a href="#poids-ideal-vs-imc">Poids idéal et IMC</a>
                  </li>
                  <li>
                    <a href="#poids-ideal-vs-poids-de-forme">Poids idéal et poids de forme</a>
                  </li>
                  <li>
                    <a href="#bonne-sante-sans-poids-ideal">Bonne santé sans poids idéal ?</a>
                  </li>
                  <li>
                    <a href="#poids-ideal-trop-de-graisse">Poids idéal et masse grasse</a>
                  </li>
                </ul>
              </div>
              <div className="pi-toc__group">
                <p className="pi-toc__group-title">Situations particulières</p>
                <ul className="home-editorial__toc-list editorial-list editorial-list--toc">
                  <li>
                    <a href="#objectif-perte-de-poids">Perte de poids</a>
                  </li>
                  <li>
                    <a href="#objectif-musculation">Musculation</a>
                  </li>
                  <li>
                    <a href="#erreurs-frequentes">Erreurs fréquentes</a>
                  </li>
                  <li>
                    <a href="#limites-calculateur">Limites du calculateur</a>
                  </li>
                </ul>
              </div>
              <div className="pi-toc__group">
                <p className="pi-toc__group-title">Pour approfondir</p>
                <ul className="home-editorial__toc-list editorial-list editorial-list--toc">
                  <li>
                    <a href="#exemples">Exemples concrets</a>
                  </li>
                  <li>
                    <a href="#faq-poids-ideal">Questions fréquentes</a>
                  </li>
                  <li>
                    <a href="#sources-scientifiques">Sources scientifiques</a>
                  </li>
                </ul>
              </div>
            </div>
          </details>
        </nav>

        <h2 id="quest-ce-que-poids-ideal">Qu&apos;est-ce que le poids idéal ?</h2>
        <div className="home-editorial__prose">
          <p>
            Le <strong>poids idéal</strong> est une estimation théorique obtenue par une formule,
            le plus souvent à partir de la taille et du sexe. On parle aussi de{" "}
            <strong>poids de référence</strong> : même idée, formulation plus neutre.
          </p>
          <p>
            Ce n&apos;est ni un diagnostic, ni une garantie de bonne santé. Deux personnes de même
            taille peuvent être en bonne forme avec plusieurs kilos d&apos;écart.
          </p>

          <aside className="prose-callout prose-callout--retain">
            <strong>À retenir</strong>
            <p>
              Un poids idéal calculé est un repère. Il ouvre une réflexion sur la corpulence ; il ne
              la clôt pas.
            </p>
          </aside>
        </div>

        <h2 id="pourquoi-pas-universel">
          Pourquoi n&apos;existe-t-il pas un poids idéal universel ?
        </h2>
        <div className="home-editorial__prose">
          <p>
            Le corps humain varie trop pour qu&apos;une règle unique soit juste dans tous les cas.
            Voici les principaux facteurs individuels :
          </p>
          <ul className="editorial-list">
            <li>
              <strong>le sexe</strong> : la plupart des formules appliquent des coefficients
              distincts ;
            </li>
            <li>
              <strong>la taille</strong> : donnée centrale de toutes les méthodes du calculateur ;
            </li>
            <li>
              <strong>l&apos;âge</strong> : la composition corporelle évolue, même si les formules
              classiques ne l&apos;intègrent pas ;
            </li>
            <li>
              <strong>la morphologie</strong> : carrure, proportions et silhouette ;
            </li>
            <li>
              <strong>la masse musculaire</strong> : un sportif peut peser plus lourd sans excès de
              graisse ;
            </li>
            <li>
              <strong>l&apos;ossature</strong> : une structure osseuse plus large déplace le poids
              de référence ;
            </li>
            <li>
              <strong>la génétique</strong> : elle oriente la répartition des tissus et la
              facilité à maintenir un certain poids.
            </li>
          </ul>
        </div>

        <h2 id="fonctionnement-calculateur">Comment fonctionne le calculateur ?</h2>
        <div className="home-editorial__prose">
          <p>
            Le calculateur utilise uniquement la taille et le sexe. Votre poids actuel n&apos;entre
            pas dans les formules.
          </p>
          <ul className="editorial-list">
            <li>
              <strong>Estimation rapide</strong> : une formule au choix, résultat clair en
              kilogrammes ;
            </li>
            <li>
              <strong>Comparaison des méthodes</strong> : Lorentz, Devine, Robinson, Miller, Hamwi
              et Broca côte à côte, avec fourchette, moyenne et médiane.
            </li>
          </ul>

          <aside className="prose-callout prose-callout--advice">
            <strong>Conseil</strong>
            <p>
              Commencez par une formule simple, puis passez en mode comparaison. Une fourchette de
              quelques kilos évite un objectif trop étroit.
            </p>
          </aside>
        </div>

        <h2 id="interpreter-resultat">Comment interpréter son résultat ?</h2>
        <div className="home-editorial__prose">
          <p>
            Obtenir un chiffre ne suffit pas. Quatre niveaux de lecture aident à garder le sens
            des proportions.
          </p>

          <div className="pi-interpret-grid" role="list">
            <div className="pi-interpret-card" role="listitem">
              <p className="pi-interpret-card__title">Poids théorique</p>
              <p className="pi-interpret-card__text">
                Le résultat brut d&apos;une formule : un ordre de grandeur, pas une obligation.
              </p>
            </div>
            <div className="pi-interpret-card" role="listitem">
              <p className="pi-interpret-card__title">Poids santé</p>
              <p className="pi-interpret-card__text">
                Zone générale compatible avec plusieurs indicateurs de corpulence, sans constituer
                un diagnostic.
              </p>
            </div>
            <div className="pi-interpret-card" role="listitem">
              <p className="pi-interpret-card__title">Marge acceptable</p>
              <p className="pi-interpret-card__text">
                Quelques kilogrammes autour de l&apos;estimation, à lire dans le contexte global.
              </p>
            </div>
            <div className="pi-interpret-card" role="listitem">
              <p className="pi-interpret-card__title">Poids réaliste</p>
              <p className="pi-interpret-card__text">
                Objectif soutenable selon votre morphologie, votre mode de vie et votre historique.
              </p>
            </div>
          </div>

          <aside className="prose-callout prose-callout--example">
            <strong>Exemple</strong>
            <p>
              Pour 1,70 m, la fourchette IMC 18,5 à 24,9 correspond à environ 53,5 à 72 kg. Une
              formule peut indiquer 63 ou 65 kg : la zone compte davantage que le dixième de kilo.
            </p>
          </aside>
        </div>

        <h2 id="pourquoi-resultats-different">
          Pourquoi plusieurs formules donnent-elles des résultats différents ?
        </h2>
        <div className="home-editorial__prose">
          <p>
            Un écart de quelques kilos entre Lorentz et Devine n&apos;est pas une erreur. Ce sont
            des outils distincts.
          </p>
          <ul className="editorial-list">
            <li>coefficients homme / femme différents ;</li>
            <li>populations et périodes historiques distinctes ;</li>
            <li>sensibilité variable à la taille, surtout au-delà de 1,80 m ;</li>
            <li>
              objectifs d&apos;origine différents (repère grand public, dosage, consultation).
            </li>
          </ul>
          <p>
            Le mode comparaison traduit ces différences en fourchette. Plus la dispersion est
            notable, plus il vaut mieux raisonner en zone.
          </p>
        </div>

        <h2 id="formule-la-plus-fiable">Quelle formule est la plus fiable ?</h2>
        <div className="home-editorial__prose">
          <p>
            La « meilleure » formule dépend surtout de votre usage, pas d&apos;une exactitude
            universelle.
          </p>
          <ul className="editorial-list">
            <li>
              <strong>Lorentz</strong> : premier repère très répandu en France.
            </li>
            <li>
              <strong>Devine</strong> : référence clinique internationale.
            </li>
            <li>
              <strong>Robinson, Miller, Hamwi</strong> : utiles pour construire une fourchette.
            </li>
            <li>
              <strong>Broca</strong> : pédagogique, à croiser systématiquement.
            </li>
          </ul>

          <aside className="prose-callout prose-callout--tip">
            <strong>Bon à savoir</strong>
            <p>
              Croisez ensuite avec l&apos;
              <Link href="/">IMC</Link> et, si besoin, la{" "}
              <Link href="/calculateurs/masse-grasse">masse grasse</Link>.
            </p>
          </aside>
        </div>

        <h2 id="formules-disponibles">Les formules disponibles</h2>
        <div className="home-editorial__prose">
          <p>
            Six méthodes sont intégrées. Lorentz et Devine sont détaillées ci-dessous ; les autres
            sont présentées de façon plus synthétique. Les équations affichées sont celles
            réellement exécutées par le calculateur.
          </p>

          <h3 id="formule-lorentz">Formule de Lorentz</h3>
          <p>
            Popularisée au XXᵉ siècle par le Dr Paul Lorentz, c&apos;est l&apos;une des formules
            les plus utilisées en France pour un poids de référence grand public.
          </p>
          <div className="guide-formula-box" role="group" aria-label="Formule de Lorentz">
            <p className="guide-formula-box__line">Homme : T − 100 − (T − 150) / 4</p>
            <p className="guide-formula-box__line">Femme : T − 100 − (T − 150) / 2,5</p>
            <p className="guide-formula-box__line">T = taille en centimètres</p>
          </div>
          <p>
            <strong>Points forts</strong>
          </p>
          <ul className="editorial-list">
            <li>Simple et très répandue en médecine générale francophone.</li>
            <li>Distingue clairement homme et femme.</li>
          </ul>
          <p>
            <strong>Limites</strong>
          </p>
          <ul className="editorial-list">
            <li>Ne tient pas compte de l&apos;âge ni de la morphologie fine.</li>
            <li>Peu personnalisée au-delà de la taille et du sexe.</li>
          </ul>
          <p>Usage : premier repère pour un adulte sans particularité majeure.</p>

          <h3 id="formule-devine">Formule de Devine</h3>
          <p>
            Publiée en 1974 par Bernard Devine, cette méthode a d&apos;abord servi à estimer un
            poids de référence en milieu hospitalier, notamment pour certains calculs
            médicamenteux.
          </p>
          <div className="guide-formula-box" role="group" aria-label="Formule de Devine">
            <p className="guide-formula-box__line">Homme : 50 + 2,3 × (pouces − 60)</p>
            <p className="guide-formula-box__line">Femme : 45,5 + 2,3 × (pouces − 60)</p>
            <p className="guide-formula-box__line">pouces = taille en cm ÷ 2,54</p>
          </div>
          <p>
            <strong>Points forts</strong>
          </p>
          <ul className="editorial-list">
            <li>Référence internationale encore citée en clinique.</li>
            <li>Logique claire : base + surplus lié à la taille.</li>
          </ul>
          <p>
            <strong>Limites</strong>
          </p>
          <ul className="editorial-list">
            <li>Conçue pour un usage clinique, pas pour un objectif esthétique.</li>
            <li>Moins pertinente chez les sportifs très musclés.</li>
          </ul>
          <p>Usage : comparaison internationale ou lecture plus clinique.</p>

          <h3 id="formule-robinson">Formule de Robinson (1983)</h3>
          <p>
            Alternative à Devine, proposée par J. D. Robinson à partir de tables de taille et de
            poids.
          </p>
          <div className="guide-formula-box" role="group" aria-label="Formule de Robinson">
            <p className="guide-formula-box__line">Homme : 52 + 1,9 × (pouces − 60)</p>
            <p className="guide-formula-box__line">Femme : 49 + 1,7 × (pouces − 60)</p>
          </div>
          <p>
            <strong>Points forts</strong>
          </p>
          <ul className="editorial-list">
            <li>Utile pour croiser une estimation Devine.</li>
          </ul>
          <p>
            <strong>Limites</strong>
          </p>
          <ul className="editorial-list">
            <li>Fondée sur d&apos;anciennes tables de référence.</li>
          </ul>
          <p>Usage : enrichir une fourchette clinique.</p>

          <h3 id="formule-miller">Formule de Miller (1983)</h3>
          <p>
            Variante clinique de D. R. Miller, avec des coefficients différents de Devine et
            Robinson.
          </p>
          <div className="guide-formula-box" role="group" aria-label="Formule de Miller">
            <p className="guide-formula-box__line">Homme : 56,2 + 1,41 × (pouces − 60)</p>
            <p className="guide-formula-box__line">Femme : 53,1 + 1,36 × (pouces − 60)</p>
          </div>
          <p>
            <strong>Points forts</strong>
          </p>
          <ul className="editorial-list">
            <li>Estimation souvent plus modérée selon les tailles.</li>
          </ul>
          <p>
            <strong>Limites</strong>
          </p>
          <ul className="editorial-list">
            <li>Résultats variables selon la stature.</li>
          </ul>
          <p>Usage : affiner le comparatif plutôt que viser un chiffre unique.</p>

          <h3 id="formule-hamwi">Formule de Hamwi (1964)</h3>
          <p>
            Règle d&apos;estimation rapide proposée par George Hamwi, notamment en contexte de
            diabétologie.
          </p>
          <div className="guide-formula-box" role="group" aria-label="Formule de Hamwi">
            <p className="guide-formula-box__line">Homme : 48 + 2,7 × (pouces − 60)</p>
            <p className="guide-formula-box__line">Femme : 45,5 + 2,2 × (pouces − 60)</p>
          </div>
          <p>
            <strong>Points forts</strong>
          </p>
          <ul className="editorial-list">
            <li>Calcul rapide et lisible.</li>
          </ul>
          <p>
            <strong>Limites</strong>
          </p>
          <ul className="editorial-list">
            <li>Écarts possibles pour les grandes tailles.</li>
          </ul>
          <p>Usage : estimation rapide à comparer avec Lorentz ou Devine.</p>

          <h3 id="formule-broca">Formule de Broca (1871)</h3>
          <p>
            Règle historique « taille − 100 ». Notre calculateur utilise pour les femmes la
            variante francophone (T − 100) × 0,9, courante mais distincte de la formulation
            originale. Aujourd&apos;hui, Broca reste surtout pédagogique et très sommaire.
          </p>
          <div className="guide-formula-box" role="group" aria-label="Formule de Broca">
            <p className="guide-formula-box__line">Homme : T − 100</p>
            <p className="guide-formula-box__line">Femme : (T − 100) × 0,9</p>
          </div>
          <p>
            <strong>Points forts</strong>
          </p>
          <ul className="editorial-list">
            <li>Extrêmement simple à mémoriser.</li>
          </ul>
          <p>
            <strong>Limites</strong>
          </p>
          <ul className="editorial-list">
            <li>Peu adaptée aux morphologies actuelles ; souvent plus grossière.</li>
          </ul>
          <p>Usage : ordre de grandeur pédagogique, à croiser ensuite.</p>
        </div>

        <h2 id="comparatif-formules">Comparatif des formules</h2>
        <div className="home-editorial__prose">
          <p>Vue d&apos;ensemble pour choisir une lecture, pas pour départager une « vérité ».</p>

          <figure className="guide-table-wrap guide-table-wrap--editorial-comparison pi-table">
            <figcaption className="guide-table-wrap__lead">
              Six méthodes de poids idéal du calculateur
            </figcaption>
            <div className="guide-table-scroll">
              <table className="guide-table guide-table--editorial-comparison pi-table__el">
                <thead>
                  <tr>
                    <th scope="col">Méthode</th>
                    <th scope="col">Contexte</th>
                    <th scope="col">Données</th>
                    <th scope="col">Avantage</th>
                    <th scope="col">Limite</th>
                    <th scope="col">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Méthode">Lorentz</td>
                    <td data-label="Contexte">XXᵉ s., France</td>
                    <td data-label="Données">Taille, sexe</td>
                    <td data-label="Avantage">Simple, très répandue</td>
                    <td data-label="Limite">Peu personnalisée</td>
                    <td data-label="Usage">Premier repère</td>
                  </tr>
                  <tr>
                    <td data-label="Méthode">Devine</td>
                    <td data-label="Contexte">1974, clinique</td>
                    <td data-label="Données">Taille, sexe</td>
                    <td data-label="Avantage">Référence internationale</td>
                    <td data-label="Limite">Pensée pour l&apos;hôpital</td>
                    <td data-label="Usage">Lecture clinique</td>
                  </tr>
                  <tr>
                    <td data-label="Méthode">Robinson</td>
                    <td data-label="Contexte">1983, tables</td>
                    <td data-label="Données">Taille, sexe</td>
                    <td data-label="Avantage">Alternative à Devine</td>
                    <td data-label="Limite">Anciennes tables</td>
                    <td data-label="Usage">Fourchette</td>
                  </tr>
                  <tr>
                    <td data-label="Méthode">Miller</td>
                    <td data-label="Contexte">1983, clinique</td>
                    <td data-label="Données">Taille, sexe</td>
                    <td data-label="Avantage">Souvent modérée</td>
                    <td data-label="Limite">Variable selon taille</td>
                    <td data-label="Usage">Affiner</td>
                  </tr>
                  <tr>
                    <td data-label="Méthode">Hamwi</td>
                    <td data-label="Contexte">1964, consultation</td>
                    <td data-label="Données">Taille, sexe</td>
                    <td data-label="Avantage">Calcul rapide</td>
                    <td data-label="Limite">Grandes tailles</td>
                    <td data-label="Usage">Estimation rapide</td>
                  </tr>
                  <tr>
                    <td data-label="Méthode">Broca</td>
                    <td data-label="Contexte">1871, historique</td>
                    <td data-label="Données">Taille, sexe*</td>
                    <td data-label="Avantage">Très facile</td>
                    <td data-label="Limite">Très sommaire</td>
                    <td data-label="Usage">Pédagogique</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="pi-table__note">
              * Variante femme (T − 100) × 0,9 : usage francophone retenu dans le calculateur.
            </p>
          </figure>
        </div>

        <h2 id="poids-ideal-vs-imc">Quelle différence entre poids idéal et IMC ?</h2>
        <div className="home-editorial__prose">
          <p>
            L&apos;IMC décrit votre situation actuelle. Le poids idéal propose une référence
            théorique. Pour approfondir :{" "}
            <Link href="/guides/quest-ce-que-l-imc">comprendre l&apos;IMC</Link>,{" "}
            <Link href="/guides/comment-interpreter-son-imc">interpréter votre indice</Link>, ou{" "}
            <Link href="/">calculer votre IMC</Link>.
          </p>

          <figure className="guide-table-wrap guide-table-wrap--editorial-comparison pi-table">
            <figcaption className="guide-table-wrap__lead">
              IMC et poids idéal : deux repères complémentaires
            </figcaption>
            <div className="guide-table-scroll">
              <table className="guide-table guide-table--editorial-comparison pi-table__el">
                <thead>
                  <tr>
                    <th scope="col">Critère</th>
                    <th scope="col">IMC</th>
                    <th scope="col">Poids idéal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="Critère">Données</td>
                    <td data-label="IMC">Poids actuel et taille</td>
                    <td data-label="Poids idéal">Taille (et souvent sexe)</td>
                  </tr>
                  <tr>
                    <td data-label="Critère">Résultat</td>
                    <td data-label="IMC">Indice en kg/m²</td>
                    <td data-label="Poids idéal">Estimation en kg</td>
                  </tr>
                  <tr>
                    <td data-label="Critère">Avantage</td>
                    <td data-label="IMC">Standard OMS</td>
                    <td data-label="Poids idéal">Ordre de grandeur de poids</td>
                  </tr>
                  <tr>
                    <td data-label="Critère">Limite</td>
                    <td data-label="IMC">Ignore muscle / graisse</td>
                    <td data-label="Poids idéal">Ignore la composition</td>
                  </tr>
                  <tr>
                    <td data-label="Critère">Usage</td>
                    <td data-label="IMC">Situer la corpulence actuelle</td>
                    <td data-label="Poids idéal">Visualiser une référence</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </figure>
        </div>

        <h2 id="poids-ideal-vs-poids-de-forme">
          Quelle différence entre poids idéal et poids de forme ?
        </h2>
        <div className="home-editorial__prose">
          <ul className="editorial-list">
            <li>
              <strong>Poids idéal</strong> : estimation théorique, comparable, mais impersonnelle.
            </li>
            <li>
              <strong>Poids de forme</strong> : poids auquel vous vous sentez durablement bien et
              fonctionnel.
            </li>
          </ul>
          <p>
            Les deux peuvent différer de plusieurs kilos. Si votre poids de forme s&apos;écarte du
            poids théorique alors que vos indicateurs et votre ressenti sont bons, la priorité va
            souvent au poids de forme.
          </p>
        </div>

        <h2 id="bonne-sante-sans-poids-ideal">
          Peut-on être en bonne santé sans être à son poids idéal ?
        </h2>
        <div className="home-editorial__prose">
          <p>
            Oui. Un écart modéré autour de l&apos;estimation est fréquent et compatible avec une
            bonne condition. L&apos;activité, l&apos;alimentation, le sommeil et le contexte
            médical comptent autant que le kilogramme théorique.
          </p>
        </div>

        <h2 id="poids-ideal-trop-de-graisse">
          Peut-on être à son poids idéal tout en ayant trop de graisse ?
        </h2>
        <div className="home-editorial__prose">
          <p>
            Oui. Deux personnes au même poids peuvent avoir des compositions très différentes.
            Pour nuancer,{" "}
            <Link href="/calculateurs/masse-grasse">estimez votre masse grasse</Link> et observez
            le tour de taille.
          </p>
        </div>

        <h2 id="objectif-perte-de-poids">Quel poids viser lorsqu&apos;on veut perdre du poids ?</h2>
        <div className="home-editorial__prose">
          <p>
            Le poids idéal peut servir de repère distant, pas de cible immédiate. Une formule ne
            constitue pas un programme.
          </p>
          <ul className="editorial-list">
            <li>fixez un premier palier réaliste ;</li>
            <li>stabilisez, puis réévaluez ;</li>
            <li>surveillez aussi le tour de taille et le ressenti ;</li>
            <li>évitez un objectif au kilogramme près issu d&apos;une seule méthode.</li>
          </ul>
        </div>

        <h2 id="objectif-musculation">Quel poids viser lorsqu&apos;on fait de la musculation ?</h2>
        <div className="home-editorial__prose">
          <p>
            Le poids seul ne distingue pas muscle, graisse et eau. Une personne musclée peut
            dépasser les formules sans présenter un excès de graisse.
          </p>
          <ul className="editorial-list">
            <li>ne pas forcer le poids théorique comme plafond ;</li>
            <li>
              suivre le tour de taille, les performances et le{" "}
              <Link href="/calculateurs/masse-grasse">pourcentage de masse grasse</Link> ;
            </li>
            <li>
              accepter qu&apos;un poids de forme sportif soit supérieur à l&apos;estimation.
            </li>
          </ul>
        </div>

        <h2 id="erreurs-frequentes">Les erreurs fréquentes</h2>
        <div className="home-editorial__prose">
          <ul className="editorial-list">
            <li>
              <strong>Viser exactement le chiffre</strong> : préférez une fourchette.
            </li>
            <li>
              <strong>Comparer à une autre personne</strong> : la taille ne dit pas tout.
            </li>
            <li>
              <strong>Oublier le muscle</strong> : un écart n&apos;égale pas un excès de graisse.
            </li>
            <li>
              <strong>Croire qu&apos;une formule est exacte</strong> : ce sont des estimateurs.
            </li>
            <li>
              <strong>Changer de méthode chaque semaine</strong> : comparez une fois, puis
              stabilisez.
            </li>
            <li>
              <strong>Ignorer le contexte</strong> : grossesse, pathologies et âge changent la
              donne.
            </li>
          </ul>
        </div>

        <h2 id="limites-calculateur">Limites du calculateur de poids idéal</h2>
        <div className="home-editorial__prose">
          <aside className="prose-callout prose-callout--warning">
            <strong>Attention</strong>
            <p>
              Estimation indicative uniquement. Ne remplace ni un examen clinique, ni l&apos;avis
              d&apos;un professionnel de santé.
            </p>
          </aside>
          <ul className="editorial-list">
            <li>pas d&apos;objectif autonome pendant la grossesse ;</li>
            <li>pas conçu pour le suivi des enfants et adolescents ;</li>
            <li>peut sous-estimer le poids pertinent des sportifs très musclés ;</li>
            <li>ignore largement les spécificités des personnes âgées ;</li>
            <li>situations médicales particulières : accompagnement professionnel ;</li>
            <li>écarts entre formules : normaux.</li>
          </ul>
          <p>
            Même logique appliquée à l&apos;IMC :{" "}
            <Link href="/guides/limites-de-l-imc">connaître les limites de l&apos;indicateur</Link>.
          </p>
        </div>

        <h2 id="exemples">Exemples concrets</h2>
        <div className="home-editorial__prose">
          <p>
            Valeurs recalculées avec les mêmes formules que le calculateur (arrondi à 1 décimale).
          </p>

          <aside className="prose-callout prose-callout--example">
            <strong>Exemple 1 - Homme de 175 cm</strong>
            <ul className="editorial-list">
              <li>Lorentz : 68,8 kg</li>
              <li>Devine : 70,5 kg</li>
              <li>Miller : 68,7 kg</li>
              <li>Robinson : 68,9 kg</li>
              <li>Hamwi : 72,0 kg</li>
              <li>Broca : 75,0 kg</li>
            </ul>
            <p>
              Fourchette globale : 68,7 à 75 kg. Zone centrale hors Broca : environ 69 à 72 kg.
            </p>
          </aside>

          <aside className="prose-callout prose-callout--example">
            <strong>Exemple 2 - Femme de 165 cm</strong>
            <ul className="editorial-list">
              <li>Lorentz : 59,0 kg</li>
              <li>Devine : 56,9 kg</li>
              <li>Miller : 59,8 kg</li>
              <li>Robinson : 57,4 kg</li>
              <li>Hamwi : 56,4 kg</li>
              <li>Broca : 58,5 kg</li>
            </ul>
            <p>Fourchette : 56,4 à 59,8 kg. Zone utile autour de 57 à 60 kg.</p>
          </aside>

          <aside className="prose-callout prose-callout--example">
            <strong>Exemple 3 - Profil sportif</strong>
            <p>
              Un pratiquant de musculation de 175 cm peut se situer au-dessus de Lorentz ou Devine
              avec une masse grasse modérée. Dans ce cas, le{" "}
              <Link href="/calculateurs/masse-grasse">calculateur de masse grasse</Link> complète
              mieux le poids idéal que la balance seule.
            </p>
          </aside>
        </div>

        <h2 id="faq-poids-ideal">Questions fréquentes</h2>
        <div className="home-editorial__prose">
          <p>
            Réponses synthétiques. Elles ne remplacent pas un accompagnement personnalisé.
          </p>
          <div className="faq-list">
            {POIDS_IDEAL_FAQ.map((item) => (
              <details key={item.question} className="faq-item">
                <summary className="faq-item__summary">
                  <span>{item.question}</span>
                  <span className="faq-chevron" aria-hidden="true">
                    ▾
                  </span>
                </summary>
                <div className="faq-item__body">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        <h2 id="sources-scientifiques">Sources scientifiques</h2>
        <div className="home-editorial__prose">
          <p>
            Références et niveaux de preuve distingués : publication identifiable, usage clinique,
            ou formule empirique / historique.
          </p>
          <ul className="editorial-list editorial-list--sources">
            <li>
              <strong>Devine B.J. (1974)</strong> : publication clinique (dosage / poids de
              référence hospitalier).
            </li>
            <li>
              <strong>Robinson J.D. et al. (1983)</strong> :{" "}
              <em>American Journal of Hospital Pharmacy</em>, 40(6), 1016-1019.
            </li>
            <li>
              <strong>Miller D.R. (1983)</strong> : variante clinique d&apos;estimation du poids
              idéal, citée dans la littérature pharmaceutique.
            </li>
            <li>
              <strong>Hamwi G.J. (1964)</strong> : règle d&apos;estimation rapide en diabétologie
              (<em>Diabetes Mellitus: Diagnosis and Treatment</em>).
            </li>
            <li>
              <strong>Broca P. (1871)</strong> : règle historique taille − 100 ; variante femme
              × 0,9 : adaptation francophone ultérieure retenue dans le calculateur.
            </li>
            <li>
              <strong>Lorentz</strong> : formule historique largement diffusée dans la littérature
              grand public et la médecine générale francophone (pas de publication originale
              unique clairement identifiable dans nos sources).
            </li>
            <li>
              <strong>OMS / Assurance Maladie</strong> : repères IMC (corpulence), complémentaires
              du poids idéal.
            </li>
          </ul>
        </div>

        <section id="conclusion" className="guide-conclusion">
          <h2>Conclusion</h2>
          <div className="guide-conclusion__points">
            <p className="guide-conclusion__points-title">À retenir</p>
            <ul className="guide-conclusion__list">
              <li>
                <span className="guide-conclusion__check" aria-hidden="true">
                  ✔
                </span>
                Le poids idéal est une estimation de référence, pas un objectif absolu.
              </li>
              <li>
                <span className="guide-conclusion__check" aria-hidden="true">
                  ✔
                </span>
                Plusieurs formules permettent d&apos;obtenir une fourchette.
              </li>
              <li>
                <span className="guide-conclusion__check" aria-hidden="true">
                  ✔
                </span>
                Quelques kilogrammes d&apos;écart sont normaux.
              </li>
              <li>
                <span className="guide-conclusion__check" aria-hidden="true">
                  ✔
                </span>
                L&apos;IMC, la masse grasse, la morphologie et le poids de forme complètent
                l&apos;interprétation.
              </li>
            </ul>
          </div>
          <p className="guide-conclusion__closing">
            Une fourchette bien comprise vaut mieux qu&apos;un chiffre poursuivi au kilogramme près.
          </p>
          <div className="guide-conclusion__actions">
            <a href="#calculateur" className="guide-conclusion__cta pi-editorial__cta">
              Revenir au calculateur
            </a>
          </div>
        </section>

        <div className="home-editorial__prose pi-further">
          <h2 id="pour-aller-plus-loin">Pour aller plus loin</h2>
          <p className="pi-further__lead">
            Ressources complémentaires pour croiser votre estimation, distinctes de la colonne
            latérale. Vous pouvez aussi parcourir{" "}
            <Link href="/guides">tous nos guides</Link> ou{" "}
            <Link href="/nos-outils">nos outils</Link>.
          </p>

          <div className="pi-further__panels">
            <div className="pi-further__panel">
              <p className="pi-further__panel-title">Calculateurs à essayer</p>
              <ul className="pi-further__panel-list">
                {FURTHER_TOOLS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="pi-further__link">
                      <span className="pi-further__icon" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span className="pi-further__body">
                        <span className="pi-further__title">{item.title}</span>
                        <span className="pi-further__desc">{item.description}</span>
                      </span>
                      <span className="pi-further__arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pi-further__panel">
              <p className="pi-further__panel-title">Guides à lire</p>
              <ul className="pi-further__panel-list">
                {FURTHER_GUIDES.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="pi-further__link">
                      <span className="pi-further__body">
                        <span className="pi-further__title">{item.title}</span>
                        <span className="pi-further__desc">{item.description}</span>
                      </span>
                      <span className="pi-further__arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="home-editorial__updated">
            Contenu révisé le{" "}
            <time dateTime={POIDS_IDEAL_EDITORIAL_UPDATED_AT}>{revisedDateLabel}</time>.
          </p>
        </div>
      </div>
    </section>
  );
}
