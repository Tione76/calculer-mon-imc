# Calculateurs santé

Architecture interne pour ajouter des calculateurs santé (IMC, poids idéal, calories, etc.) en réutilisant le framework existant du site.

## Structure

```
src/site/calculators/
  core/           # Métadonnées communes (id, path)
  types/          # Modèle de résultat UI, champs numériques
  validation/     # Parsing décimal FR, bornes numériques
  format/         # Formatage nombres FR
  shared/         # Helpers transverses (seuils par catégories)
  ui/             # Composants React + calculator-ui.css
  imc/            # Première implémentation : calculateur IMC
  index.ts
  README.md
```

Chaque calculateur vit dans son propre dossier (`imc/`, puis `poids-ideal/`, etc.) avec :

| Fichier | Rôle |
|---------|------|
| `types.ts` | Entrées / sorties métier |
| `config.ts` | Constantes, seuils, limites |
| `engine.ts` | Logique de calcul pure (sans React) |
| `validation.ts` | Validateurs spécifiques (appellent `validation/` partagé) |
| `format.ts` | Formatage des valeurs affichées |
| `presentation.ts` | Projection vers `CalculatorResult` (sections UI) |
| `*Calculator.tsx` | Composant client |
| `*.css` | Styles spécifiques au layout du calculateur |
| `engine.test.ts` | Tests du moteur et de la validation |

## Ajouter un nouveau calculateur

### 1. Créer le module métier

Exemple pour `poids-ideal/` :

```typescript
// engine.ts — fonctions pures, testables
export function calculateIdealWeight(input: IdealWeightInput): IdealWeightResult { ... }
```

Réutiliser :

- `parseDecimalInput`, `validateNumericInRange`, `parseNumericInRange` depuis `validation/`
- `formatDecimalFr` depuis `format/`
- `resolveThresholdCategory` si catégories par seuils

### 2. Créer le composant UI

Composer les composants partagés :

```tsx
import { InputField, ResultSection, CalculatorResultView, ResetButton, ResultPlaceholder } from "../ui";
```

Option A : mapper le résultat via `presentation.ts` et `CalculatorResultView`.

Option B : composer `ResultCard`, `Disclaimer`, `GuideLinks` directement si le layout diffère.

### 3. Enregistrer le calculateur dans le site

Fichiers à mettre à jour (pattern actuel du framework) :

| Fichier | Action |
|---------|--------|
| `src/site/navigation/calculators-registry.ts` | Ajouter l'entrée dans `getAllCalculators()` |
| `src/site/seo.config.ts` | Entrée `calculators["mon-id"]` (title, description, path, h1) |
| `src/site/guides/covers.ts` | `CALCULATOR_COVERS["mon-id"]` |
| `src/app/calculateurs/mon-slug/page.tsx` | Page Next.js (voir `ToolCalculatorPageLayout`) |
| `src/site/public-pages.ts` | Automatique via le registre si `indexable: true` |

Navigation, sidebar, hub `/nos-outils` et sitemap se mettent à jour via `getAllCalculators()`.

### 4. SEO et Schema.org

- **Page d'accueil** : `buildHomeJsonLd` + `HealthApplication` (déjà en place pour l'IMC).
- **Calculateur secondaire** : `buildCalculatorJsonLd` dans la page (`WebApplication`, `applicationCategory: "HealthApplication"`).
- **Métadonnées** : `buildPageMetadata(config, seoConfig, { title, description, path, ogImage })`.
- **Couverture OG** : `coverToOgInput(getCalculatorCover("mon-id"))`.

### 5. Tests

- `engine.test.ts` : cas de calcul, seuils, validation.
- Tests partagés dans `validation/` si nouveaux helpers génériques.
- `public-pages.test.ts` : vérifier indexation / sitemap si pertinent.

Exécuter : `npm run test`, `npm run lint`, `npm run build`.

### 6. Couverture et navigation éditoriale

- Guides associés : liens dans `presentation.ts` ou constantes `*_GUIDE_LINKS`.
- Hub guides : `GUIDE_HUB_TEASERS` dans `guides/guides-hub-data.ts`.
- Hub calculateurs : `TOOL_HUB_TEASERS` dans `tools/tools-hub-data.ts`.

## Conventions de nommage

| Élément | Convention | Exemple |
|---------|------------|---------|
| Dossier | kebab-case | `poids-ideal/` |
| Id registre | kebab-case | `"poids-ideal"` |
| Route | `/calculateurs/<slug>` ou `/` si principal | `/calculateurs/poids-ideal` |
| Composant | PascalCase + `Calculator` | `PoidsIdealCalculator` |
| Moteur | verbe + nom | `calculateIdealWeight` |
| Validateurs | `validate*` / `parse*` | `validateHeightCm` |

## Modèle de résultat UI

`types/result.ts` définit des sections flexibles :

```typescript
type CalculatorResultSection =
  | { kind: "primary"; label: string; value: string; badge?: { label: string } }
  | { kind: "text"; paragraphs: string[] }
  | { kind: "disclaimer"; text: string }
  | { kind: "guides"; title: string; links: CalculatorGuideLink[] };
```

Le moteur métier (`ImcResult`, etc.) reste indépendant. La projection vers l'UI se fait dans `presentation.ts` (ex. `imcResultToSections`).

## Composants UI disponibles

| Composant | Usage |
|-----------|--------|
| `InputField` | Champ label + input + erreur accessible |
| `ResultCard` | Carte valeur principale ou conteneur |
| `ResultText` | Paragraphes explicatifs |
| `ResultSection` | Zone résultats avec `aria-live` |
| `ResultPlaceholder` | État vide |
| `Disclaimer` | Mention légale / prudence |
| `GuideLinks` | Liste de liens vers guides |
| `ResetButton` | Réinitialisation formulaire |
| `CalculatorResultView` | Rendu automatique des sections |

Styles partagés : `ui/calculator-ui.css` (préfixe `.calc-ui__*`).

## Rétrocompatibilité IMC

L'ancien chemin `@/site/imc-calculator` réexporte `@/site/calculators/imc`.

`src/site/calculator.tsx` réexporte `ImcCalculator` (page d'accueil inchangée côté app).

## Ce qu'il ne faut pas faire

- Ne pas dupliquer `parseDecimalInput` dans chaque calculateur.
- Ne pas imposer une structure de résultat métier unique : seul l'affichage est normalisé via sections.
- Ne pas abstraire prématurément (pas de registry dynamique, pas de moteur de formulaire générique tant qu'un 2e calculateur ne le justifie pas).

## Prochains calculateurs prévus

- Poids idéal
- IMC enfant
- Métabolisme de base (BMR)
- Besoins caloriques
- Masse grasse
- Tour de taille

Chacun suivra le même dossier `src/site/calculators/<id>/` et le même enregistrement dans les registres site existants.
