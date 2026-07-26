import Link from "next/link";
import {
  exampleImc165_50,
  exampleImc170_70,
  exampleImc180_90,
  formatEditorialNumber,
  HOME_EDITORIAL_UPDATED_AT,
  IMC_CATEGORY_ROWS,
} from "./home-editorial-data";
import { HomeFaqContent } from "./home-faq";
import { CoverFigure } from "@/site/guides/CoverFigure";
import { HOME_COVER } from "@/site/guides/covers";
import "@/framework/design/editorial-layout.css";
import "@/site/home-editorial-guide.css";

const exLow = exampleImc165_50();
const exNormal = exampleImc170_70();
const exOver = exampleImc180_90();

const revisedDateLabel = new Date(HOME_EDITORIAL_UPDATED_AT).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const FURTHER_TOOLS = [
  {
    href: "/calculateurs/masse-grasse",
    title: "Calculateur de masse grasse",
    description: "Estimer la composition corporelle au-delà du poids.",
    icon: "%",
  },
  {
    href: "/calculateurs/poids-ideal",
    title: "Calculateur de poids idéal",
    description: "Comparer plusieurs formules de poids de référence.",
    icon: "◎",
  },
] as const;

const FURTHER_GUIDES = [
  {
    href: "/guides/quest-ce-que-l-imc",
    title: "Qu'est-ce que l'IMC ?",
    description: "Définition, origine et rôle de l'indicateur.",
  },
  {
    href: "/guides/comment-calculer-son-imc",
    title: "Comment calculer son IMC ?",
    description: "Formule, unités et cas particuliers pas à pas.",
  },
  {
    href: "/guides/comment-interpreter-son-imc",
    title: "Comment interpréter son IMC ?",
    description: "Lire votre résultat selon votre situation.",
  },
  {
    href: "/guides/limites-de-l-imc",
    title: "Les limites de l'IMC",
    description: "Quand l'indicateur trompe, et comment le nuancer.",
  },
  {
    href: "/guides/calculer-son-poids-ideal",
    title: "Calculer son poids idéal",
    description: "Formules de poids de référence et lecture prudente.",
  },
] as const;

/** Page pilier IMC : explique l'essentiel et oriente vers les guides spécialisés. */
export function HomeEditorial() {
  return (
    <section id="contenu" className="content-section">
      <div className="content-wrap">
        <div className="prose home-editorial home-pillar">
          <p className="home-editorial__lead home-editorial__prose">
            Ce <strong>calculateur IMC gratuit</strong> permet de{" "}
            <strong>calculer son IMC</strong> ou de{" "}
            <strong>connaître son indice de masse corporelle</strong> en quelques secondes à
            partir de sa taille et de son poids. Le résultat constitue un repère, pas une mesure
            médicale précise. Cette page explique brièvement la formule, la lecture du résultat
            et ses limites, puis renvoie vers les guides spécialisés pour approfondir.
          </p>

          <CoverFigure cover={HOME_COVER} />

          <nav className="home-editorial__toc home-editorial__prose" aria-label="Sommaire">
            <p className="home-editorial__toc-title">Dans cette page</p>
            <ul className="home-editorial__toc-list editorial-list editorial-list--toc">
              <li>
                <a href="#calcul-imc">Comment calculer son IMC ?</a>
              </li>
              <li>
                <a href="#utilite-imc">À quoi sert l&apos;IMC ?</a>
              </li>
              <li>
                <a href="#interpreter-imc">Comment interpréter son résultat ?</a>
              </li>
              <li>
                <a href="#limites-imc">Les limites de l&apos;IMC</a>
              </li>
              <li>
                <a href="#imc-masse-grasse">IMC et masse grasse</a>
              </li>
              <li>
                <a href="#imc-poids-ideal">IMC et poids idéal</a>
              </li>
              <li>
                <a href="#erreurs-frequentes">Les erreurs fréquentes</a>
              </li>
              <li>
                <a href="#sources-imc">Sources scientifiques</a>
              </li>
              <li>
                <a href="#faq">Questions fréquentes</a>
              </li>
            </ul>
          </nav>

          <h2 id="calcul-imc">Comment calculer son IMC ?</h2>
          <div className="home-editorial__prose">
            <p>
              Le calcul est simple, mais son interprétation demande davantage de recul. La
              formule de l&apos;indice de masse corporelle compare le poids au carré de la
              taille :
            </p>

            <div className="guide-formula-box" role="group" aria-label="Formule de l'IMC">
              <p className="guide-formula-box__line">
                IMC = poids en kilogrammes ÷ taille en mètres<sup>2</sup>
              </p>
            </div>

            <p>Points à retenir pour effectuer le calcul :</p>
            <ul className="editorial-list">
              <li>le poids s&apos;exprime en kilogrammes ;</li>
              <li>
                la taille s&apos;exprime en mètres (170 cm = 1,70 m, 165 cm = 1,65 m) ;
              </li>
              <li>
                on divise le poids par le carré de la taille, pas par la taille seule.
              </li>
            </ul>

            <aside className="prose-callout prose-callout--tip">
              <strong>Astuce unités</strong>
              <p>
                Si votre taille est en centimètres, convertissez-la d&apos;abord : divisez par
                100. Une erreur d&apos;unité (garder 170 au lieu de 1,70) fausse complètement le
                résultat.
              </p>
            </aside>

            <h3>Exemples de calcul IMC</h3>
            <p>Voici trois cas concrets, avec le même protocole :</p>
            <ul className="editorial-list">
              <li>
                {exNormal.weightKg} kg pour {formatEditorialNumber(exNormal.heightCm / 100, 2)}{" "}
                m → IMC {formatEditorialNumber(exNormal.bmi)} ({exNormal.category}) ;
              </li>
              <li>
                {exOver.weightKg} kg pour {formatEditorialNumber(exOver.heightCm / 100, 2)} m →
                IMC {formatEditorialNumber(exOver.bmi)} ({exOver.category}) ;
              </li>
              <li>
                {exLow.weightKg} kg pour {formatEditorialNumber(exLow.heightCm / 100, 2)} m → IMC{" "}
                {formatEditorialNumber(exLow.bmi)} ({exLow.category}).
              </li>
            </ul>

            <p>
              Dans le premier exemple : 1,70 × 1,70 = 2,89 ; puis 70 ÷ 2,89 ≈ 24,2. Le deuxième
              (90 ÷ 3,24) illustre un résultat en surpoids. Le troisième (50 ÷ 2,7225) se situe
              juste sous le seuil de 18,5. L&apos;arrondi au dixième facilite la lecture, mais
              ne signifie pas que l&apos;indicateur est précis à ce niveau pour chaque
              individu.
            </p>

            <aside className="prose-callout prose-callout--example">
              <strong>Conseil pratique</strong>
              <p>
                Mesurez-vous pieds nus, le matin, sur une balance stable. Pour comparer dans
                le temps, gardez le même moment de la journée et la même méthode. L&apos;outil
                gratuit situé en haut de page applique cette formule pour vous.
              </p>
            </aside>

            <aside className="prose-callout prose-callout--advice">
              <strong>Pour aller plus loin</strong>
              <p>
                Vous souhaitez comprendre l&apos;origine de la formule et ses cas particuliers
                ? Découvrez comment calculer son IMC étape par étape dans le guide{" "}
                <Link href="/guides/comment-calculer-son-imc">Comment calculer son IMC</Link>.
              </p>
            </aside>
          </div>

          <h2 id="utilite-imc">À quoi sert l&apos;IMC ?</h2>
          <div className="home-editorial__prose">
            <p>
              Connaître son IMC sert surtout de point de départ. Cet indicateur ne remplace
              pas un bilan de santé : il constitue surtout un outil de dépistage ou de
              classement statistique.
            </p>
            <p>On l&apos;utilise notamment pour :</p>
            <ul className="editorial-list">
              <li>la santé publique et le suivi de la corpulence en population ;</li>
              <li>un premier repère médical ;</li>
              <li>l&apos;orientation en nutrition ;</li>
              <li>le suivi d&apos;une évolution de poids ;</li>
              <li>la prévention, comme repère parmi d&apos;autres.</li>
            </ul>
            <p>
              Le résultat aide à se situer ; il ne raconte pas à lui seul toute la situation.
              Pour comprendre précisément ce qu&apos;est l&apos;IMC, son origine et son rôle,
              consultez{" "}
              <Link href="/guides/quest-ce-que-l-imc">Qu&apos;est-ce que l&apos;IMC ?</Link>
            </p>
          </div>

          <h2 id="interpreter-imc">Comment interpréter son résultat ?</h2>
          <div className="home-editorial__prose">
            <p>
              Une fois le calcul effectué, le chiffre se lit dans une catégorie. Chez
              l&apos;adulte, les seuils les plus cités s&apos;appuient sur l&apos;OMS et sur
              les repères diffusés en France, notamment via l&apos;Assurance Maladie.
            </p>
            <p>Les grandes familles sont :</p>
            <ul className="editorial-list">
              <li>insuffisance pondérale (maigreur) ;</li>
              <li>corpulence normale ;</li>
              <li>surpoids ;</li>
              <li>obésité (classes I, II et III).</li>
            </ul>

            <div className="home-editorial__table-wrap">
              <table className="home-editorial__table">
                <caption>Catégories OMS de l&apos;IMC (adultes)</caption>
                <thead>
                  <tr>
                    <th scope="col">IMC</th>
                    <th scope="col">Catégorie</th>
                  </tr>
                </thead>
                <tbody>
                  {IMC_CATEGORY_ROWS.map((row) => (
                    <tr key={row.label}>
                      <td data-label="IMC">{row.range}</td>
                      <td data-label="Catégorie">{row.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p>
              Ces seuils sont des repères statistiques. Un résultat situé juste de part et
              d&apos;autre d&apos;une frontière ne décrit pas deux situations radicalement
              différentes. Une différence de quelques dixièmes ne change pas fondamentalement
              l&apos;interprétation.
            </p>

            <aside className="prose-callout prose-callout--example">
              <strong>Exemple de lecture</strong>
              <p>
                Un IMC de {formatEditorialNumber(exNormal.bmi)} se situe en corpulence normale.
                Un IMC de {formatEditorialNumber(exOver.bmi)} se situe en surpoids. Un seuil
                comme 25 reste une frontière statistique, pas une coupure médicale absolue.
              </p>
            </aside>

            <aside className="prose-callout prose-callout--advice">
              <strong>Pour aller plus loin</strong>
              <p>
                Votre résultat est proche d&apos;un seuil ? Apprenez à interpréter votre
                résultat avec davantage de recul dans le guide{" "}
                <Link href="/guides/comment-interpreter-son-imc">
                  Comment interpréter son IMC
                </Link>
                .
              </p>
            </aside>
          </div>

          <h2 id="limites-imc">Les limites de l&apos;IMC</h2>
          <div className="home-editorial__prose">
            <p>Quatre limites principales à garder en tête :</p>
            <ul className="editorial-list">
              <li>cet indice ne distingue pas muscle et graisse ;</li>
              <li>il ne tient pas compte de la morphologie ;</li>
              <li>il ne mesure pas la répartition de la graisse ;</li>
              <li>
                sa précision individuelle reste limitée, notamment chez les sportifs, les
                personnes âgées ou les morphologies atypiques.
              </li>
            </ul>

            <aside className="prose-callout prose-callout--advice">
              <strong>Pour aller plus loin</strong>
              <p>
                Vous êtes sportif ou très musclé ? Découvrez dans notre guide consacré aux{" "}
                <Link href="/guides/limites-de-l-imc">limites de l&apos;IMC</Link> les
                situations dans lesquelles cet indicateur peut être moins pertinent ou
                trompeur.
              </p>
            </aside>
          </div>

          <h2 id="imc-masse-grasse">IMC et masse grasse</h2>
          <div className="home-editorial__prose">
            <p>
              Deux personnes ayant le même IMC peuvent avoir une composition corporelle très
              différente : davantage de muscle ici, davantage de graisse là.
            </p>
            <p>
              Cet indicateur ne mesure pas directement la graisse. Pour affiner la lecture
              au-delà du couple poids / taille, utilisez notre{" "}
              <Link href="/calculateurs/masse-grasse">calculateur de masse grasse</Link>. La
              page dédiée détaille aussi les méthodes d&apos;estimation et leurs limites.
            </p>
          </div>

          <h2 id="imc-poids-ideal">IMC et poids idéal</h2>
          <div className="home-editorial__prose">
            <p>
              L&apos;IMC décrit une situation actuelle à partir du poids réel. Le poids idéal
              propose une estimation théorique de référence à partir de la taille (et souvent
              du sexe).
            </p>
            <p>
              Ni l&apos;un ni l&apos;autre ne constitue un objectif médical personnalisé.
              Ensemble, ils aident simplement à cadrer une lecture.
            </p>
            <p>
              Comparez les formules avec le{" "}
              <Link href="/calculateurs/poids-ideal">calculateur de poids idéal</Link>, ou
              approfondissez les méthodes dans le guide{" "}
              <Link href="/guides/calculer-son-poids-ideal">Calculer son poids idéal</Link>.
            </p>
          </div>

          <h2 id="erreurs-frequentes">Les erreurs fréquentes</h2>
          <div className="home-editorial__prose">
            <p>Voici les pièges les plus courants lorsqu&apos;on calcule son IMC :</p>
            <ul className="editorial-list">
              <li>vouloir atteindre exactement 25 ;</li>
              <li>comparer son IMC avec celui d&apos;un sportif très musclé ;</li>
              <li>oublier la composition corporelle ;</li>
              <li>croire que l&apos;IMC suffit à évaluer la santé ;</li>
              <li>
                interpréter une variation de quelques dixièmes comme un changement important.
              </li>
            </ul>
            <p>
              Pour aller plus loin, consultez nos guides spécialisés :{" "}
              <Link href="/guides/comment-interpreter-son-imc">
                Comment interpréter son IMC
              </Link>
              ,{" "}
              <Link href="/guides/limites-de-l-imc">Les limites de l&apos;IMC</Link>, puis les
              calculateurs de{" "}
              <Link href="/calculateurs/masse-grasse">masse grasse</Link> et de{" "}
              <Link href="/calculateurs/poids-ideal">poids idéal</Link>. Pour une vue
              d&apos;ensemble des simulateurs, voir aussi{" "}
              <Link href="/nos-outils">Nos outils</Link>.
            </p>
          </div>

          <h2 id="sources-imc">Sources scientifiques</h2>
          <div className="home-editorial__prose">
            <p>
              Les seuils et repères présentés s&apos;appuient sur des classifications et
              recommandations institutionnelles :
            </p>
            <ul className="editorial-list editorial-list--sources">
              <li>
                Organisation mondiale de la Santé (OMS) : classification de la corpulence chez
                l&apos;adulte ;
              </li>
              <li>
                Haute Autorité de santé (HAS) : recommandations sur le surpoids et
                l&apos;obésité de l&apos;adulte ;
              </li>
              <li>
                Assurance Maladie : repères d&apos;interprétation de l&apos;IMC chez
                l&apos;adulte ;
              </li>
              <li>
                travaux historiques sur l&apos;indice de Quetelet, à l&apos;origine de
                l&apos;IMC moderne.
              </li>
            </ul>
            <p>
              Ces références fondent les catégories affichées. Elles ne valident pas le
              calculateur lui-même comme outil de diagnostic.
            </p>
          </div>

          <section id="faq" className="home-pillar-faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading">Questions fréquentes</h2>
            <HomeFaqContent />
          </section>

          <section id="conclusion-imc" className="guide-conclusion">
            <h2>Conclusion</h2>
            <div className="guide-conclusion__points">
              <p className="guide-conclusion__points-title">À retenir</p>
              <ul className="guide-conclusion__list">
                <li>
                  <span className="guide-conclusion__check" aria-hidden="true">
                    ✔
                  </span>
                  Le calculateur IMC est un excellent point de départ pour se situer.
                </li>
                <li>
                  <span className="guide-conclusion__check" aria-hidden="true">
                    ✔
                  </span>
                  Cet indicateur reste statistique : il ne constitue pas un diagnostic.
                </li>
                <li>
                  <span className="guide-conclusion__check" aria-hidden="true">
                    ✔
                  </span>
                  Le résultat doit être lu avec le contexte, sans le prendre au dixième près.
                </li>
                <li>
                  <span className="guide-conclusion__check" aria-hidden="true">
                    ✔
                  </span>
                  Les guides spécialisés permettent d&apos;approfondir chaque sujet.
                </li>
              </ul>
            </div>
            <p className="guide-conclusion__closing">
              L&apos;IMC est utile pour se situer et obtenir un premier repère, mais sa
              précision individuelle reste limitée : il ne décrit pas à lui seul l&apos;état
              de santé ni la composition corporelle. Pour aller plus loin, utilisez les{" "}
              <Link href="/guides">guides spécialisés</Link> du site.
            </p>
            <div className="guide-conclusion__actions">
              <a href="#calculateur" className="guide-conclusion__cta home-pillar__cta">
                Revenir au calculateur
              </a>
            </div>
          </section>

          <div className="home-pillar-further">
            <h2 id="pour-aller-plus-loin">Pour aller plus loin</h2>
            <p className="home-pillar-further__lead">
              Continuez avec les outils et guides les plus utiles pour compléter votre lecture.
            </p>

            <div className="home-pillar-further__panels">
              <div className="home-pillar-further__panel">
                <p className="home-pillar-further__panel-title">Calculateurs à essayer</p>
                <ul className="home-pillar-further__panel-list">
                  {FURTHER_TOOLS.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="home-pillar-further__link">
                        <span className="home-pillar-further__icon" aria-hidden="true">
                          {item.icon}
                        </span>
                        <span className="home-pillar-further__body">
                          <span className="home-pillar-further__title">{item.title}</span>
                          <span className="home-pillar-further__desc">{item.description}</span>
                        </span>
                        <span className="home-pillar-further__arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="home-pillar-further__panel">
                <p className="home-pillar-further__panel-title">Guides à lire</p>
                <ul className="home-pillar-further__panel-list">
                  {FURTHER_GUIDES.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="home-pillar-further__link">
                        <span className="home-pillar-further__body">
                          <span className="home-pillar-further__title">{item.title}</span>
                          <span className="home-pillar-further__desc">{item.description}</span>
                        </span>
                        <span className="home-pillar-further__arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="home-editorial__updated home-editorial__prose">
            Contenu révisé le{" "}
            <time dateTime={HOME_EDITORIAL_UPDATED_AT}>{revisedDateLabel}</time>.
          </p>
        </div>
      </div>
    </section>
  );
}
