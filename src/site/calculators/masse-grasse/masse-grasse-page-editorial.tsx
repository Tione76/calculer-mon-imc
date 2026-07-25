import Link from "next/link";
import { MASSE_GRASSE_EDITORIAL_UPDATED_AT, MASSE_GRASSE_FAQ } from "./masse-grasse-faq-data";
import { getCalculatorCover } from "@/site/guides/covers";
import { CoverFigure } from "@/site/guides/CoverFigure";

const revisedDateLabel = new Date(MASSE_GRASSE_EDITORIAL_UPDATED_AT).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const FURTHER_LINKS = [
  {
    href: "/",
    title: "Calculateur d'IMC",
    description: "Obtenir rapidement votre indice poids / taille.",
    icon: "⚖",
  },
  {
    href: "/calculateurs/poids-ideal",
    title: "Calculateur de poids idéal",
    description: "Comparer Lorentz, Devine et Miller.",
    icon: "◎",
  },
  {
    href: "/guides/quest-ce-que-l-imc",
    title: "Qu'est-ce que l'IMC ?",
    description: "Comprendre la définition et le rôle de l'indicateur.",
    icon: "①",
  },
  {
    href: "/guides/comment-interpreter-son-imc",
    title: "Comment interpréter son IMC ?",
    description: "Lire un résultat selon les catégories OMS.",
    icon: "②",
  },
  {
    href: "/guides/limites-de-l-imc",
    title: "Les limites de l'IMC",
    description: "Savoir quand l'indice trompe, et comment le nuancer.",
    icon: "③",
  },
  {
    href: "/guides/calculer-son-poids-ideal",
    title: "Calculer son poids idéal",
    description: "Découvrir les formules et leur lecture prudente.",
    icon: "④",
  },
] as const;

export function MasseGrassePageEditorial() {
  const cover = getCalculatorCover("masse-grasse");

  return (
    <section id="contenu" className="content-section">
      <div className="prose home-editorial guide-article--imc-reference mg-editorial">
        <p className="home-editorial__lead home-editorial__prose">
          La masse grasse désigne la part de tissu adipeux dans le poids corporel. Avec le{" "}
          <a href="#calculateur">calculateur</a> et ce guide, vous pouvez l&apos;estimer, choisir
          une méthode adaptée, comprendre pourquoi les formules divergent, puis interpréter votre
          résultat avec méthode.
        </p>

        <CoverFigure cover={cover} />

        <nav className="home-editorial__toc home-editorial__prose" aria-label="Sommaire du guide">
          <p className="home-editorial__toc-title">Dans ce guide</p>
          <ul className="home-editorial__toc-list editorial-list editorial-list--toc">
            <li>
              <a href="#quest-ce-que-masse-grasse">Qu&apos;est-ce que la masse grasse ?</a>
            </li>
            <li>
              <a href="#comment-calculer-masse-grasse">
                Comment calculer son taux de masse grasse ?
              </a>
            </li>
            <li>
              <a href="#fonctionnement-calculateur">
                Comment fonctionne notre calculateur ?
              </a>
            </li>
            <li>
              <a href="#methodes-calcul">Les méthodes de calcul utilisées</a>
            </li>
            <li>
              <a href="#comparatif-methodes">Comparatif Deurenberg, RFM, YMCA et U.S. Navy</a>
            </li>
            <li>
              <a href="#prendre-mensurations">Prendre correctement ses mensurations</a>
            </li>
            <li>
              <a href="#interpreter-pourcentage">Interpréter son pourcentage</a>
            </li>
            <li>
              <a href="#bon-taux">Quel est un bon taux de masse grasse ?</a>
            </li>
            <li>
              <a href="#imc-vs-masse-grasse">Différence entre IMC et masse grasse</a>
            </li>
            <li>
              <a href="#ecarts-methodes">Pourquoi les résultats diffèrent-ils ?</a>
            </li>
            <li>
              <a href="#methode-fiable">Quelle méthode est la plus fiable ?</a>
            </li>
            <li>
              <a href="#suivre-evolution">Suivre l&apos;évolution de sa masse grasse</a>
            </li>
            <li>
              <a href="#reduire-masse-grasse">Réduire son taux de masse grasse</a>
            </li>
            <li>
              <a href="#erreurs-frequentes">Erreurs fréquentes</a>
            </li>
            <li>
              <a href="#limites-calculateur">Limites du calculateur</a>
            </li>
            <li>
              <a href="#exemples">Exemples de calcul</a>
            </li>
            <li>
              <a href="#faq-masse-grasse">Questions fréquentes</a>
            </li>
            <li>
              <a href="#sources-scientifiques">Sources scientifiques</a>
            </li>
          </ul>
        </nav>

        <h2 id="quest-ce-que-masse-grasse">Qu&apos;est-ce que la masse grasse ?</h2>
        <div className="home-editorial__prose">
          <p>
            La masse grasse, ou masse adipeuse, est la part du poids constituée de lipides stockés.
          </p>
          <p>
            Elle n&apos;est pas qu&apos;une « réserve » : elle participe à l&apos;énergie disponible,
            à la protection de certains organes et à des fonctions hormonales.
          </p>
          <p>
            Un organisme a besoin d&apos;une quantité minimale de graisse, souvent appelée graisse
            essentielle, pour fonctionner correctement.
          </p>

          <p>On distingue en général :</p>
          <ul className="editorial-list">
            <li>
              <strong>la graisse essentielle</strong>, indispensable au fonctionnement du corps ;
            </li>
            <li>
              <strong>la graisse de stockage</strong>, qui varie selon l&apos;alimentation,
              l&apos;activité, l&apos;âge et la génétique.
            </li>
          </ul>

          <p>
            Chez beaucoup d&apos;adultes, une partie de cette graisse se concentre autour de
            l&apos;abdomen. D&apos;autres profils stockent davantage au niveau des hanches ou des
            cuisses. La répartition compte autant que le pourcentage global pour comprendre un
            résultat.
          </p>

          <aside className="prose-callout prose-callout--example">
            <strong>Exemple</strong>
            <p>
              Si vous pesez 70 kg et qu&apos;une formule estime 20 % de masse grasse, cela
              correspond à environ 14 kg de graisse estimée et 56 kg de masse maigre estimée.
            </p>
            <p>
              Ces chiffres restent des approximations statistiques : ils aident à situer une
              tendance, pas à compter chaque gramme de lipides.
            </p>
          </aside>

          <aside className="prose-callout prose-callout--retain">
            <strong>À retenir</strong>
            <p>
              La masse grasse est un indicateur de composition corporelle. Un pourcentage trop bas
              ou trop élevé peut signaler un déséquilibre, sans que le calculateur ne pose de
              diagnostic médical.
            </p>
          </aside>
        </div>

        <h2 id="comment-calculer-masse-grasse">Comment calculer son taux de masse grasse ?</h2>
        <div className="home-editorial__prose">
          <p>
            Une fois le concept posé, reste la question pratique : comment estimer ce pourcentage
            au quotidien ?
          </p>

          <p>Plusieurs approches existent :</p>
          <ul className="editorial-list">
            <li>
              <strong>Méthodes de laboratoire</strong> (DEXA, pesée hydrostatique,
              pléthysmographie) : plus directes, mais coûteuses et peu adaptées au suivi
              quotidien.
            </li>
            <li>
              <strong>Balances à impédancemétrie</strong> : simples à domicile, mais sensibles à
              l&apos;hydratation et à l&apos;heure de mesure.
            </li>
            <li>
              <strong>Formules anthropométriques</strong> : utilisées ici, à partir de données
              faciles à recueillir (poids, taille, âge, sexe, parfois circonférences).
            </li>
          </ul>

          <p>
            Ces formules ont été calibrées sur des populations de référence, puis publiées dans des
            revues ou manuels scientifiques. Leur force est la praticité. Leur limite est
            l&apos;estimation : deux formules peuvent diverger de quelques points sans qu&apos;aucune
            ne soit « fausse » au sens strict.
          </p>

          <p>Avec notre calculateur, vous pouvez procéder de trois façons :</p>
          <ul className="editorial-list">
            <li>
              <strong>Estimation rapide</strong> via Deurenberg (adultes) ;
            </li>
            <li>
              <strong>Estimation personnalisée</strong> via RFM (taille et tour de taille) ;
            </li>
            <li>
              <strong>Comparaison des méthodes</strong> côte à côte.
            </li>
          </ul>
          <p>Le détail de chaque mode suit juste après.</p>

          <aside className="prose-callout prose-callout--tip">
            <strong>Bon à savoir</strong>
            <p>
              Pour convertir un pourcentage en kilogrammes de masse grasse, il faut connaître le
              poids.
            </p>
            <p>
              À l&apos;inverse, la formule RFM peut estimer un pourcentage sans balance, à partir
              de la taille et du tour de taille seulement.
            </p>
          </aside>
        </div>

        <h2 id="fonctionnement-calculateur">
          Comment fonctionne notre calculateur de masse grasse ?
        </h2>
        <div className="home-editorial__prose">
          <p>
            Voici comment ces trois modes se traduisent concrètement dans le calculateur. Chacun
            répond à un besoin différent.
          </p>

          <ul className="editorial-list">
            <li>
              <strong>Estimation rapide</strong> : formule de Deurenberg pour adultes (18 ans et
              plus), à partir du sexe, de l&apos;âge, de la taille et du poids. Aucune mesure au
              ruban n&apos;est demandée.
            </li>
            <li>
              <strong>Estimation personnalisée</strong> : formule RFM (Woolcott et Bergman, 2018).
              Elle utilise le sexe, la taille et le tour de taille.
            </li>
            <li>
              <strong>Comparaison des méthodes</strong> : Deurenberg, RFM, YMCA et U.S. Navy. Le
              tour de taille active RFM et YMCA ; le tour de cou (et les hanches chez la femme)
              active progressivement U.S. Navy.
            </li>
          </ul>

          <p>
            Quelle que soit l&apos;option choisie, le résultat reste lisible de la même façon.
          </p>
          <p>Dans tous les cas, le calculateur affiche :</p>
          <ul className="editorial-list">
            <li>un pourcentage estimé ;</li>
            <li>une catégorie adaptée au sexe ;</li>
            <li>
              lorsque le poids est connu, une masse grasse et une masse maigre estimées en
              kilogrammes.
            </li>
          </ul>

          <aside className="prose-callout prose-callout--advice">
            <strong>Conseil</strong>
            <p>
              Le mode rapide est réservé aux adultes. Les enfants et adolescents nécessitent une
              interprétation spécifique.
            </p>
            <p>
              En mode comparaison, Deurenberg dispose d&apos;une variante pédiatrique, à manier
              avec prudence. RFM, YMCA et U.S. Navy sont conçues pour des populations adultes.
            </p>
          </aside>

          <p>
            Après le calcul, une jauge colorée situe votre estimation parmi sept catégories (de la
            graisse essentielle à la masse grasse très élevée). Relancez le même protocole
            quelques semaines plus tard pour observer une tendance, plutôt qu&apos;un chiffre
            isolé.
          </p>
        </div>

        <h2 id="methodes-calcul">Les différentes méthodes de calcul utilisées</h2>
        <div className="home-editorial__prose">
          <p>
            Pour bien choisir un mode, il est utile de savoir ce que chaque formule mesure vraiment.
            Quatre méthodes scientifiques sont disponibles. Elles n&apos;estiment pas la graisse
            « directement » : elles s&apos;appuient sur des relations statistiques observées dans
            des études.
          </p>

          <h3 id="methode-deurenberg">Deurenberg (1991)</h3>
          <p>
            Publiée dans le <em>British Journal of Nutrition</em> par Deurenberg, Weststrate et
            Seidell, cette formule relie l&apos;IMC, l&apos;âge et le sexe au pourcentage de masse
            grasse.
          </p>
          <div className="guide-formula-box" role="group" aria-label="Formule Deurenberg">
            <p className="guide-formula-box__line">
              %MG = 1,20 × IMC + 0,23 × âge − 10,8 × sexe − 5,4
            </p>
            <p className="guide-formula-box__line">(sexe = 1 pour un homme, 0 pour une femme)</p>
          </div>
          <p>
            <strong>Points forts</strong>
          </p>
          <ul className="editorial-list">
            <li>Idéale pour une première estimation sans mètre ruban.</li>
          </ul>
          <p>
            <strong>Limites</strong>
          </p>
          <ul className="editorial-list">
            <li>
              Un IMC élevé peut refléter du muscle autant que de la graisse, ce que la formule ne
              distingue pas. Voir aussi les{" "}
              <Link href="/guides/limites-de-l-imc">limites de l&apos;IMC</Link>.
            </li>
          </ul>

          <h3 id="methode-rfm">RFM - Relative Fat Mass (2018)</h3>
          <p>
            Développée par Woolcott et Bergman à partir de données NHANES (référence DXA), la RFM
            s&apos;appuie sur le rapport entre la taille et le tour de taille. C&apos;est la
            formule du mode personnalisé.
          </p>
          <div className="guide-formula-box" role="group" aria-label="Formule RFM">
            <p className="guide-formula-box__line">
              Homme : 64 − 20 × (taille ÷ tour de taille)
            </p>
            <p className="guide-formula-box__line">
              Femme : 76 − 20 × (taille ÷ tour de taille)
            </p>
          </div>
          <p>
            <strong>Points forts</strong>
          </p>
          <ul className="editorial-list">
            <li>N&apos;exige ni poids ni âge.</li>
          </ul>
          <p>
            <strong>Limites</strong>
          </p>
          <ul className="editorial-list">
            <li>
              La qualité de la mesure du tour de taille conditionne fortement le résultat.
            </li>
          </ul>

          <h3 id="methode-ymca">YMCA (Golding et al.)</h3>
          <p>
            Issue des manuels de fitness YMCA / Golding, cette méthode combine le poids et le tour
            de taille (au nombril). Les calculs internes convertissent les unités vers livres et
            pouces, conformément à la formule d&apos;origine.
          </p>
          <p>
            <strong>Points forts</strong>
          </p>
          <ul className="editorial-list">
            <li>Rapide dès que le tour de taille est renseigné.</li>
          </ul>
          <p>
            <strong>Limites</strong>
          </p>
          <ul className="editorial-list">
            <li>Précision décrite comme modérée dans la littérature de fitness.</li>
          </ul>

          <h3 id="methode-us-navy">U.S. Navy (Hodgdon et Beckett, 1984)</h3>
          <p>
            Protocole de la marine américaine (rapports NHRC 84-11 pour les hommes et 84-29 pour
            les femmes). Il estime d&apos;abord une densité corporelle à partir de circonférences,
            puis convertit en pourcentage de masse grasse.
          </p>
          <p>Mensurations utilisées :</p>
          <ul className="editorial-list">
            <li>
              <strong>Homme</strong> : abdomen (nombril) et cou.
            </li>
            <li>
              <strong>Femme</strong> : taille (point le plus étroit), hanches et cou.
            </li>
          </ul>
          <p>
            <strong>Points forts</strong>
          </p>
          <ul className="editorial-list">
            <li>L&apos;une des méthodes anthropométriques les plus répandues.</li>
          </ul>
          <p>
            <strong>Limites</strong>
          </p>
          <ul className="editorial-list">
            <li>Dépend fortement de la rigueur des mensurations.</li>
          </ul>
        </div>

        <h2 id="comparatif-methodes">
          Comparatif des méthodes Deurenberg, RFM, YMCA et U.S. Navy
        </h2>
        <div className="home-editorial__prose">
          <p>
            Pour visualiser ces différences d&apos;un seul coup d&apos;œil, le tableau ci-dessous
            résume les données nécessaires, le point fort et la limite principale de chaque
            formule.
          </p>
          <p>
            En mode comparaison, le calculateur active progressivement les méthodes dès que les
            mesures requises sont disponibles.
          </p>

          <figure className="guide-table-wrap guide-table-wrap--editorial-comparison">
            <p className="guide-table-wrap__lead">
              Comparaison des formules utilisées dans le calculateur
            </p>
            <div className="guide-table-scroll">
              <table className="guide-table guide-table--editorial-comparison">
                <thead>
                  <tr>
                    <th scope="col">Méthode</th>
                    <th scope="col">Données requises</th>
                    <th scope="col">Point fort</th>
                    <th scope="col">Limite principale</th>
                    <th scope="col">Public</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Deurenberg (1991)</td>
                    <td>Sexe, âge, taille, poids (IMC)</td>
                    <td>Très simple, sans ruban</td>
                    <td>Ne distingue pas muscle et graisse</td>
                    <td>Adultes (rapide) ; variante pédiatrique en comparaison</td>
                  </tr>
                  <tr>
                    <td>RFM (2018)</td>
                    <td>Sexe, taille, tour de taille</td>
                    <td>Intègre la morphologie abdominale</td>
                    <td>Sensible à la mesure du tour de taille</td>
                    <td>Adultes (18 ans et plus)</td>
                  </tr>
                  <tr>
                    <td>YMCA</td>
                    <td>Sexe, poids, tour de taille</td>
                    <td>Rapide avec un mètre ruban</td>
                    <td>Précision modérée</td>
                    <td>Adultes</td>
                  </tr>
                  <tr>
                    <td>U.S. Navy (1984)</td>
                    <td>Taille, tour de taille, cou (+ hanches femme)</td>
                    <td>Protocole anthropométrique très répandu</td>
                    <td>Exige des mensurations rigoureuses</td>
                    <td>Adultes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </figure>

          <aside className="prose-callout prose-callout--hint">
            <strong>Astuce</strong>
            <p>
              En mode comparaison, commencez par les données de base et le tour de taille.
            </p>
            <p>
              Ajoutez ensuite le tour de cou, puis le tour de hanches si vous êtes une femme, pour
              débloquer U.S. Navy.
            </p>
            <p>
              Les écarts entre formules font partie du fonctionnement normal de ces estimateurs.
            </p>
          </aside>
        </div>

        <h2 id="prendre-mensurations">Comment prendre correctement ses mensurations ?</h2>
        <div className="home-editorial__prose">
          <p>
            Une formule n&apos;est jamais meilleure que la mesure qui l&apos;alimente. Un mètre
            ruban souple, une posture stable et un moment répétable valent mieux qu&apos;une
            précision affichée au dixième de pourcent.
          </p>

          <p>Bonnes pratiques générales :</p>
          <ul className="editorial-list">
            <li>mesurer sur peau ou vêtement très fin ;</li>
            <li>ne pas compresser les tissus ;</li>
            <li>garder le ruban horizontal ;</li>
            <li>noter le même protocole à chaque fois.</li>
          </ul>

          <h3 id="mesure-tour-taille">Tour de taille</h3>
          <p>C&apos;est la mensuration la plus utilisée dans le calculateur.</p>
          <ul className="editorial-list">
            <li>
              <strong>Repère général</strong> : mi-distance entre la dernière côte et le haut de
              la hanche.
            </li>
            <li>
              <strong>YMCA et U.S. Navy homme</strong> : le protocole historique vise souvent le
              nombril.
            </li>
            <li>
              <strong>U.S. Navy femme</strong> : plutôt le point le plus étroit du buste.
            </li>
            <li>
              Rester détendu, respirer normalement, relever la mesure en fin d&apos;expiration,
              sans rentrer le ventre.
            </li>
          </ul>

          <h3 id="mesure-tour-cou">Tour de cou</h3>
          <p>Cette mesure sert surtout à la formule U.S. Navy.</p>
          <ul className="editorial-list">
            <li>Mesurer juste sous le larynx, autour de la partie la plus étroite du cou.</li>
            <li>Garder la tête droite, le regard horizontal.</li>
            <li>Placer le ruban à plat, sans serrer.</li>
          </ul>

          <h3 id="mesure-tour-hanches">Tour de hanches</h3>
          <p>Cette mesure est demandée pour U.S. Navy chez la femme.</p>
          <ul className="editorial-list">
            <li>Placer le ruban au point le plus large des fesses et des hanches.</li>
            <li>Pieds rapprochés, posture droite, ruban parallèle au sol.</li>
          </ul>

          <aside className="prose-callout prose-callout--retain">
            <strong>À retenir</strong>
            <p>
              Choisissez toujours le même moment (souvent le matin, avant le petit-déjeuner), la
              même méthode et le même protocole.
            </p>
            <p>
              Évitez de comparer une mesure à jeun avec une mesure après un repas copieux ou un
              entraînement intense.
            </p>
            <p>Notez aussi le tour de taille : il complète utilement le pourcentage.</p>
          </aside>
        </div>

        <h2 id="interpreter-pourcentage">
          Comment interpréter son pourcentage de masse grasse ?
        </h2>
        <div className="home-editorial__prose">
          <p>
            Une fois le chiffre obtenu, encore faut-il savoir le lire. Notre jauge répartit
            l&apos;estimation en sept catégories, avec des seuils distincts pour les hommes et les
            femmes.
          </p>
          <p>
            Ces fourchettes s&apos;inspirent de repères populationnels (notamment Gallagher et
            al., 2000, et des références de type ACE), adaptées pour une lecture grand public.
            Elles ne constituent pas un diagnostic, ni un objectif médical personnalisé.
          </p>

          <aside className="prose-callout prose-callout--tip">
            <strong>Bon à savoir</strong>
            <p>
              Un résultat proche d&apos;une frontière peut basculer d&apos;une catégorie à
              l&apos;autre d&apos;une mesure à l&apos;autre.
            </p>
            <p>
              Lisez plutôt la zone et la tendance que le libellé exact du jour. Croisez aussi avec
              votre activité, votre sensation de forme et, si besoin, votre{" "}
              <Link href="/">IMC</Link> ou votre{" "}
              <Link href="/calculateurs/poids-ideal">poids idéal</Link>.
            </p>
          </aside>

          <figure className="guide-table-wrap guide-table-wrap--imc-categories">
            <p className="guide-table-wrap__lead">
              Catégories pour les hommes (jauge du calculateur)
            </p>
            <div className="guide-table-scroll">
              <table className="guide-table guide-table--imc-categories">
                <thead>
                  <tr>
                    <th scope="col">Catégorie</th>
                    <th scope="col">Pourcentage de masse grasse</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Graisse essentielle</td>
                    <td>&lt; 6 %</td>
                  </tr>
                  <tr>
                    <td>Très athlétique</td>
                    <td>6 % à moins de 10 %</td>
                  </tr>
                  <tr>
                    <td>Athlétique</td>
                    <td>10 % à moins de 14 %</td>
                  </tr>
                  <tr>
                    <td>Bonne composition</td>
                    <td>14 % à moins de 18 %</td>
                  </tr>
                  <tr>
                    <td>Masse grasse normale</td>
                    <td>18 % à moins de 25 %</td>
                  </tr>
                  <tr>
                    <td>Masse grasse élevée</td>
                    <td>25 % à moins de 30 %</td>
                  </tr>
                  <tr>
                    <td>Masse grasse très élevée</td>
                    <td>30 % et plus</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </figure>

          <figure className="guide-table-wrap guide-table-wrap--imc-categories">
            <p className="guide-table-wrap__lead">
              Catégories pour les femmes (jauge du calculateur)
            </p>
            <div className="guide-table-scroll">
              <table className="guide-table guide-table--imc-categories">
                <thead>
                  <tr>
                    <th scope="col">Catégorie</th>
                    <th scope="col">Pourcentage de masse grasse</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Graisse essentielle</td>
                    <td>&lt; 14 %</td>
                  </tr>
                  <tr>
                    <td>Très athlétique</td>
                    <td>14 % à moins de 18 %</td>
                  </tr>
                  <tr>
                    <td>Athlétique</td>
                    <td>18 % à moins de 21 %</td>
                  </tr>
                  <tr>
                    <td>Bonne composition</td>
                    <td>21 % à moins de 25 %</td>
                  </tr>
                  <tr>
                    <td>Masse grasse normale</td>
                    <td>25 % à moins de 32 %</td>
                  </tr>
                  <tr>
                    <td>Masse grasse élevée</td>
                    <td>32 % à moins de 38 %</td>
                  </tr>
                  <tr>
                    <td>Masse grasse très élevée</td>
                    <td>38 % et plus</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </figure>

          <p>
            Les catégories les plus basses ne sont pas automatiquement « meilleures ». Un taux
            durablement très bas peut manquer de réserves. À l&apos;inverse, une catégorie élevée
            invite à la vigilance et au suivi, sans conclure seule sur l&apos;état de santé.
          </p>
        </div>

        <h2 id="bon-taux">Quel est un bon taux de masse grasse ?</h2>
        <div className="home-editorial__prose">
          <p>
            Les tableaux ci-dessus donnent le cadre. Reste une question fréquente : quel taux viser
            au quotidien ?
          </p>
          <p>Il n&apos;existe pas un pourcentage unique idéal pour tout le monde.</p>

          <p>Repères fréquents chez les adultes :</p>
          <p>
            <strong>Hommes</strong>
          </p>
          <ul className="editorial-list">
            <li>« bonne composition » : 14 % à moins de 18 % ;</li>
            <li>« masse grasse normale » : 18 % à moins de 25 %.</li>
          </ul>
          <p>
            <strong>Femmes</strong>
          </p>
          <ul className="editorial-list">
            <li>« bonne composition » : 21 % à moins de 25 % ;</li>
            <li>« masse grasse normale » : 25 % à moins de 32 %.</li>
          </ul>

          <p>Ce qui compte aussi :</p>
          <ul className="editorial-list">
            <li>l&apos;âge ;</li>
            <li>le sexe ;</li>
            <li>le niveau d&apos;activité ;</li>
            <li>la répartition de la graisse ;</li>
            <li>la stabilité ou l&apos;amélioration progressive du résultat.</li>
          </ul>

          <aside className="prose-callout prose-callout--warning">
            <strong>Attention</strong>
            <p>
              Viser un niveau très athlétique n&apos;est ni nécessaire ni souhaitable pour tout le
              monde.
            </p>
            <p>
              La visibilité des abdominaux dépend aussi de la génétique, de l&apos;hydratation et
              du développement musculaire : il n&apos;existe pas de seuil unique à atteindre.
            </p>
          </aside>

          <aside className="prose-callout prose-callout--tip">
            <strong>Bon à savoir</strong>
            <p>
              Si votre pourcentage stagne alors que votre tour de taille diminue et que vous vous
              sentez mieux, la composition peut déjà s&apos;améliorer.
            </p>
            <p>Le poids seul ne raconte pas toute l&apos;histoire.</p>
          </aside>
        </div>

        <h2 id="imc-vs-masse-grasse">Quelle différence entre IMC et masse grasse ?</h2>
        <div className="home-editorial__prose">
          <p>
            L&apos;IMC et la masse grasse répondent à des questions différentes. L&apos;IMC
            relie le poids à la taille au carré : c&apos;est un repère rapide de corpulence,
            largement utiliséé en population.
          </p>
          <p>
            Le pourcentage de masse grasse, lui, cherche à estimer la part de tissu adipeux. Il
            complète l&apos;IMC sans le remplacer.
          </p>
          <p>
            Pour la définition et le calcul de l&apos;indicateur, voir{" "}
            <Link href="/guides/quest-ce-que-l-imc">qu&apos;est-ce que l&apos;IMC</Link> et{" "}
            <Link href="/guides/comment-calculer-son-imc">comment calculer son IMC</Link>.
          </p>

          <figure className="guide-table-wrap guide-table-wrap--editorial-comparison">
            <p className="guide-table-wrap__lead">
              IMC et masse grasse : deux repères complémentaires
            </p>
            <div className="guide-table-scroll">
              <table className="guide-table guide-table--editorial-comparison">
                <thead>
                  <tr>
                    <th scope="col">Critère</th>
                    <th scope="col">IMC</th>
                    <th scope="col">Masse grasse estimée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ce que ça mesure</td>
                    <td>Rapport poids / taille²</td>
                    <td>Part estimée de tissu adipeux</td>
                  </tr>
                  <tr>
                    <td>Données minimales</td>
                    <td>Poids et taille</td>
                    <td>Selon la formule (IMC + âge, ou circonférences…)</td>
                  </tr>
                  <tr>
                    <td>Point fort</td>
                    <td>Rapide, standardisé, très répandu</td>
                    <td>Plus orienté composition corporelle</td>
                  </tr>
                  <tr>
                    <td>Limite clé</td>
                    <td>Ne sépare pas muscle et graisse</td>
                    <td>Reste une estimation, variable selon la méthode</td>
                  </tr>
                  <tr>
                    <td>Usage utile</td>
                    <td>Premier repère de corpulence</td>
                    <td>Nuancer l&apos;IMC et suivre une tendance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </figure>

          <aside className="prose-callout prose-callout--example">
            <strong>Exemple</strong>
            <p>
              Un sportif musclé peut avoir un IMC élevé avec une masse grasse modérée.
            </p>
            <p>
              À l&apos;inverse, une personne au poids « normal » selon l&apos;IMC peut présenter
              davantage de graisse abdominale.
            </p>
          </aside>

          <p>
            Pour approfondir la lecture de l&apos;IMC :{" "}
            <Link href="/guides/comment-interpreter-son-imc">
              comment interpréter son IMC
            </Link>{" "}
            et les{" "}
            <Link href="/guides/limites-de-l-imc">limites de l&apos;IMC</Link>. Vous pouvez aussi
            utiliser le <Link href="/">calculateur d&apos;IMC</Link>.
          </p>
        </div>

        <h2 id="ecarts-methodes">Pourquoi les résultats diffèrent-ils selon les méthodes ?</h2>
        <div className="home-editorial__prose">
          <p>
            Si vous comparez plusieurs formules, vous verrez souvent des écarts. Ce n&apos;est pas
            un bug : chaque méthode a été calibrée sur des populations et des références
            différentes (densitométrie, DXA, protocoles militaires, manuels de fitness).
          </p>

          <p>Elles n&apos;utilisent pas non plus les mêmes variables :</p>
          <ul className="editorial-list">
            <li>
              <strong>âge</strong> dans Deurenberg ;
            </li>
            <li>
              <strong>tour de taille</strong> dans RFM et YMCA ;
            </li>
            <li>
              <strong>cou</strong> (et hanches) dans U.S. Navy.
            </li>
          </ul>

          <p>
            Un profil très musclé, une répartition de graisse atypique, ou une mesure de tour de
            taille légèrement décalée amplifient encore ces différences. Des écarts de quelques
            points restent donc fréquents et attendus.
          </p>

          <aside className="prose-callout prose-callout--advice">
            <strong>Conseil</strong>
            <p>
              En mode comparaison, lisez la fourchette comme une zone, puis choisissez une méthode
              unique pour le suivi.
            </p>
            <p>
              Comparer une fois pour comprendre, puis stabiliser le protocole : c&apos;est en
              général la stratégie la plus claire.
            </p>
          </aside>
        </div>

        <h2 id="methode-fiable">
          Quelle est la méthode la plus fiable pour mesurer la masse grasse ?
        </h2>
        <div className="home-editorial__prose">
          <p>
            Une fois ces écarts compris, reste le choix pratique : quelle méthode privilégier ?
          </p>
          <p>
            Aucune formule anthropométrique n&apos;est parfaitement exacte pour chaque individu.
            Les méthodes de laboratoire restent plus directes, mais peu accessibles au quotidien.
            Parmi les estimateurs du calculateur, la « meilleure » option dépend surtout de votre
            objectif.
          </p>

          <ul className="editorial-list">
            <li>
              <strong>Deurenberg</strong> : la plus pratique pour démarrer, sans ruban.
            </li>
            <li>
              <strong>RFM</strong> : souvent pertinente dès que le tour de taille est bien
              mesuré.
            </li>
            <li>
              <strong>YMCA</strong> : simple dès que poids et tour de taille sont connus.
            </li>
            <li>
              <strong>U.S. Navy</strong> : utile si vous acceptez un protocole de mensurations
              plus complet.
            </li>
          </ul>

          <aside className="prose-callout prose-callout--retain">
            <strong>À retenir</strong>
            <p>
              Pour le suivi, la méthode la plus fiable est souvent celle que vous pouvez répéter
              correctement, dans les mêmes conditions.
            </p>
            <p>
              Fiabilité pratique = même formule + mêmes conditions + tendance sur plusieurs
              semaines. Pas un résultat isolé lu au dixième près.
            </p>
          </aside>

          <p>
            Une balance impédancemètre peut compléter le tableau, à condition de l&apos;utiliser
            toujours au même moment de la journée.
          </p>
        </div>

        <h2 id="suivre-evolution">Comment suivre l&apos;évolution de sa masse grasse ?</h2>
        <div className="home-editorial__prose">
          <p>
            Une bonne méthode ne suffit pas : encore faut-il la suivre dans le temps. Mesurer
            chaque jour ajoute surtout du bruit (hydratation, transit, fatigue, posture).
          </p>

          <p>Pour un suivi utile :</p>
          <ul className="editorial-list">
            <li>mesurez toutes les deux à quatre semaines ;</li>
            <li>gardez la même méthode ;</li>
            <li>notez le pourcentage, le poids et le tour de taille ;</li>
            <li>
              ajoutez éventuellement une photo de face dans les mêmes conditions
              d&apos;éclairage.
            </li>
          </ul>

          <aside className="prose-callout prose-callout--hint">
            <strong>Astuce</strong>
            <p>
              Si vous commencez avec RFM, continuez avec RFM. Si vous comparez quatre formules une
              fois pour situer une fourchette, choisissez ensuite un estimateur principal.
            </p>
          </aside>

          <p>
            On peut perdre de la graisse sans perdre beaucoup de poids, surtout si la masse
            musculaire augmente. Dans ce cas, le pourcentage et le tour de taille évoluent parfois
            plus clairement que la balance. À l&apos;inverse, une perte de poids rapide peut
            mélanger eau, glycogène, graisse et muscle : la prudence reste de mise.
          </p>
        </div>

        <h2 id="reduire-masse-grasse">Comment réduire son taux de masse grasse ?</h2>
        <div className="home-editorial__prose">
          <p>
            Si votre objectif est de faire baisser le pourcentage, le suivi devient un outil, pas
            une fin en soi. Réduire durablement la masse grasse repose surtout sur un déficit
            énergétique modéré, une activité physique régulière et des habitudes tenables.
          </p>

          <p>Leviers généraux :</p>
          <ul className="editorial-list">
            <li>un volume d&apos;activité adapté (marche, endurance, renforcement) ;</li>
            <li>une alimentation globalement équilibrée ;</li>
            <li>un sommeil suffisant ;</li>
            <li>une progression réaliste sur plusieurs semaines.</li>
          </ul>

          <aside className="prose-callout prose-callout--warning">
            <strong>Attention</strong>
            <p>
              Il n&apos;existe pas de méthode fiable pour « brûler uniquement la graisse du
              ventre ».
            </p>
            <p>
              Les exercices localisés renforcent les muscles de la zone, sans cibler exclusivement
              le tissu adipeux adjacent. Aller trop vite augmente aussi le risque de reprendre du
              poids et de perdre de la masse maigre.
            </p>
          </aside>

          <aside className="prose-callout prose-callout--advice">
            <strong>Conseil</strong>
            <p>
              Suivez plutôt 2 à 3 indicateurs ensemble : pourcentage estimé, tour de taille et
              ressenti (énergie, régularité).
            </p>
            <p>Un seul chiffre ne suffit presque jamais.</p>
          </aside>

          <p>
            Ce calculateur n&apos;est pas un programme de perte de poids ni un conseil médical. En
            cas de pathologie, de grossesse, de trouble du comportement alimentaire ou de doute,
            adressez-vous à un professionnel de santé.
          </p>
          <p>
            Pour situer d&apos;autres repères de corpulence, consultez le{" "}
            <Link href="/calculateurs/poids-ideal">calculateur de poids idéal</Link> et le guide{" "}
            <Link href="/guides/calculer-son-poids-ideal">calculer son poids idéal</Link>.
          </p>
        </div>

        <h2 id="erreurs-frequentes">
          Les erreurs fréquentes lors du calcul de la masse grasse
        </h2>
        <div className="home-editorial__prose">
          <p>
            Avant de conclure, un point pratique : beaucoup d&apos;écarts viennent du protocole,
            pas de la formule. Voici les pièges les plus courants.
          </p>

          <ul className="editorial-list">
            <li>
              <strong>Changer de méthode à chaque mesure</strong> : comparez une fois, puis
              stabilisez.
            </li>
            <li>
              <strong>Mesurer le tour de taille trop haut ou trop bas</strong> : gardez le même
              repère anatomique.
            </li>
            <li>
              <strong>Rentrer le ventre ou serrer le ruban</strong> : la mesure doit rester
              détendue.
            </li>
            <li>
              <strong>Comparer matin et soir</strong> : choisissez un créneau stable.
            </li>
            <li>
              <strong>Lire le résultat comme un diagnostic</strong> : c&apos;est une estimation
              statistique.
            </li>
            <li>
              <strong>Ignorer le contexte sportif</strong> : un IMC élevé chez un athlète
              n&apos;a pas la même signification.
            </li>
            <li>
              <strong>Viser un taux extrêmement bas</strong> : la graisse essentielle existe pour
              une raison.
            </li>
            <li>
              <strong>Négliger les unités</strong> : taille en cm, poids en kg, circonférences en
              cm dans le formulaire.
            </li>
          </ul>

          <aside className="prose-callout prose-callout--example">
            <strong>Exemple</strong>
            <p>
              Deux mesures RFM prises le même jour, l&apos;une à jeun et l&apos;autre après un
              repas copieux, peuvent différer simplement parce que le tour de taille a changé.
            </p>
            <p>
              Ce n&apos;est pas une « erreur » de la formule : c&apos;est une variation de la
              donnée d&apos;entrée.
            </p>
          </aside>
        </div>

        <h2 id="limites-calculateur">Limites du calculateur de masse grasse</h2>
        <div className="home-editorial__prose">
          <aside className="prose-callout prose-callout--warning">
            <strong>Attention</strong>
            <p>
              Ce calculateur fournit une estimation indicative. Il ne remplace ni un examen
              clinique, ni une mesure de laboratoire (DEXA, etc.), ni l&apos;avis d&apos;un
              professionnel de santé.
            </p>
          </aside>

          <p>Limites principales à garder en tête :</p>
          <ul className="editorial-list">
            <li>il ne convient pas comme outil de suivi autonome pendant la grossesse ;</li>
            <li>le mode estimation rapide est réservé aux adultes (18 ans et plus) ;</li>
            <li>
              les formules peuvent être moins pertinentes chez les sportifs très musclés, les
              personnes âgées fragiles, ou en cas de morphologie très éloignée des populations de
              calibration ;
            </li>
            <li>des écarts entre méthodes sont normaux.</li>
          </ul>

          <p>
            Comme pour l&apos;IMC, l&apos;intérêt de l&apos;outil est de donner un point de départ
            clair et reproductible. Pour comprendre ce qu&apos;un indicateur ne dit pas, voir
            aussi notre guide sur les{" "}
            <Link href="/guides/limites-de-l-imc">limites de l&apos;IMC</Link>.
          </p>
        </div>

        <h2 id="exemples">Exemples de calcul et d&apos;interprétation</h2>
        <div className="home-editorial__prose">
          <p>
            Pour ancrer ces repères, voici trois cas illustratifs. Les pourcentages sont arrondis
            et servent à montrer la lecture des catégories, pas à promettre une précision
            individuelle.
          </p>

          <aside className="prose-callout prose-callout--example">
            <strong>Exemple 1 - Estimation rapide (homme)</strong>
            <p>
              Homme de 35 ans, 175 cm, 75 kg. L&apos;IMC interne est d&apos;environ 24,5.
            </p>
            <p>
              Avec Deurenberg adulte, l&apos;estimation se situe autour de 21 % de masse grasse,
              soit la catégorie « masse grasse normale » (18 % à moins de 25 %).
            </p>
          </aside>

          <aside className="prose-callout prose-callout--example">
            <strong>Exemple 2 - RFM (femme)</strong>
            <p>Femme, 165 cm, tour de taille 75 cm. La RFM donne environ 32 %.</p>
            <p>
              Sur la jauge féminine, cela correspond à « masse grasse élevée » (32 % à moins de
              38 %). Sans le poids, le pourcentage reste lisible ; avec le poids, vous obtenez
              aussi les kilogrammes estimés.
            </p>
          </aside>

          <aside className="prose-callout prose-callout--example">
            <strong>Exemple 3 - Comparaison de méthodes</strong>
            <p>
              Reprenez un profil adulte avec poids, taille, âge et tour de taille. Deurenberg, RFM
              et YMCA s&apos;activent.
            </p>
            <p>
              Ajoutez le tour de cou (et les hanches pour une femme) pour inclure U.S. Navy. Vous
              obtiendrez souvent une fourchette de quelques points : lisez la zone commune, puis
              choisissez une méthode pour le suivi mensuel.
            </p>
          </aside>

          <p>
            Pour croiser avec d&apos;autres repères, calculez aussi votre{" "}
            <Link href="/">IMC</Link> et explorez les formules de{" "}
            <Link href="/calculateurs/poids-ideal">poids idéal</Link>.
          </p>
        </div>

        <h2 id="faq-masse-grasse">Questions fréquentes</h2>
        <div className="home-editorial__prose">
          <p>
            Les réponses ci-dessous complètent le guide. Elles restent générales et ne remplacent
            pas un accompagnement personnalisé.
          </p>
          <div className="faq-list">
            {MASSE_GRASSE_FAQ.map((item) => (
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
            Les formules et repères utilisés dans le calculateur et ce guide s&apos;appuient
            notamment sur :
          </p>
          <ul className="editorial-list editorial-list--sources">
            <li>
              Deurenberg P., Weststrate J.A., Seidell J.C. (1991). Body mass index as a measure of
              body fatness: age- and sex-specific prediction formulas.{" "}
              <em>British Journal of Nutrition</em>, 65(2), 105-114.
            </li>
            <li>
              Woolcott O.O., Bergman R.N. (2018). Relative fat mass (RFM) as a new estimator of
              whole-body fat percentage. <em>Scientific Reports</em>, 8, 10980.
            </li>
            <li>
              Hodgdon J.A., Beckett M.B. (1984). Prediction of percent body fat for U.S. Navy men
              from body circumferences and height. Naval Health Research Center Report 84-11 ;
              Report 84-29 (femmes).
            </li>
            <li>
              Golding L.A. et al. Y&apos;s Way to Physical Fitness / YMCA Fitness Testing and
              Assessment Manual (formule YMCA).
            </li>
            <li>
              Gallagher D. et al. (2000). Healthy percentage body fat ranges: an approach for
              developing guidelines based on body mass index.{" "}
              <em>American Journal of Clinical Nutrition</em>, 72(3), 694-701 (repères ayant
              inspiré les catégories de la jauge).
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
                Le pourcentage de masse grasse estime la part de tissu adipeux : c&apos;est un
                repère de composition, pas un diagnostic.
              </li>
              <li>
                <span className="guide-conclusion__check" aria-hidden="true">
                  ✔
                </span>
                Estimation rapide = Deurenberg (adultes) ; personnalisé = RFM ; comparaison =
                Deurenberg, RFM, YMCA et U.S. Navy.
              </li>
              <li>
                <span className="guide-conclusion__check" aria-hidden="true">
                  ✔
                </span>
                Les catégories de la jauge diffèrent selon le sexe ; un taux très bas n&apos;est
                pas un objectif universel.
              </li>
              <li>
                <span className="guide-conclusion__check" aria-hidden="true">
                  ✔
                </span>
                Les écarts entre méthodes sont normaux : pour suivre une évolution, gardez la même
                formule et les mêmes conditions.
              </li>
              <li>
                <span className="guide-conclusion__check" aria-hidden="true">
                  ✔
                </span>
                IMC et masse grasse se complètent : l&apos;un est rapide, l&apos;autre plus
                orienté composition corporelle.
              </li>
            </ul>
          </div>
          <p className="guide-conclusion__closing">
            Utilisez le calculateur pour obtenir une estimation claire, puis relisez le résultat
            avec mesure. La régularité du protocole compte davantage que la quête d&apos;un chiffre
            unique.
          </p>
          <div className="guide-conclusion__actions">
            <a href="#calculateur" className="guide-conclusion__cta mg-editorial__cta">
              Revenir au calculateur
            </a>
          </div>
        </section>

        <div className="home-editorial__prose mg-further">
          <h2 id="pour-aller-plus-loin">Pour aller plus loin</h2>
          <p className="mg-further__lead">
            Pour croiser votre estimation avec d&apos;autres repères, voici les ressources les
            plus utiles, en complément de la colonne latérale.
          </p>

          <ul className="mg-further__list">
            {FURTHER_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="mg-further__link">
                  <span className="mg-further__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="mg-further__body">
                    <span className="mg-further__title">{item.title}</span>
                    <span className="mg-further__desc">{item.description}</span>
                  </span>
                  <span className="mg-further__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mg-further__hubs">
            Voir aussi{" "}
            <Link href="/guides">tous les guides</Link>
            {" "}et{" "}
            <Link href="/nos-outils">nos outils</Link>.
          </p>

          <p className="home-editorial__updated">
            Contenu révisé le{" "}
            <time dateTime={MASSE_GRASSE_EDITORIAL_UPDATED_AT}>{revisedDateLabel}</time>.
          </p>
        </div>
      </div>
    </section>
  );
}
