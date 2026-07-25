"use client";

import { Fragment, useState } from "react";
import type { CSSProperties, RefObject } from "react";
import type { BodyFatMethodId } from "../types";
import type { BodyFatComparisonResult, BodyFatMethodResult } from "../engine";
import { formatBodyFatPercent, formatMassKg } from "../format";
import { getMethodTheme } from "../method-theme";
import { MASSE_GRASSE_CENTRAL_POINT_NOTE } from "../presentation";
import { MASSE_GRASSE_COMPARE_RESULT_HELP } from "../method-science-copy";
import { MethodReferencePopover } from "./method-reference-popover";
import {
  IconAlert,
  IconCheck,
  IconCopy,
  MethodAccentDot,
  StepHeader,
} from "./shared-ui";

function formatPercent(value: number): string {
  return `${formatBodyFatPercent(value)} %`;
}

function getMinMaxIds(results: BodyFatMethodResult[]) {
  const reliable = results.filter((row) => row.status === "ok");
  const minId =
    reliable.length > 0
      ? reliable.reduce((min, row) => (row.bodyFatPercent < min.bodyFatPercent ? row : min), reliable[0]!)
          .methodId
      : null;
  const maxId =
    reliable.length > 0
      ? reliable.reduce((max, row) => (row.bodyFatPercent > max.bodyFatPercent ? row : max), reliable[0]!)
          .methodId
      : null;
  return { minId, maxId, reliable };
}

function ExpandableMethodDetails({ row }: { row: BodyFatMethodResult }) {
  const theme = getMethodTheme(row.methodId);
  const percentLabel =
    row.status === "ok"
      ? `${formatBodyFatPercent(row.bodyFatPercent)} % (${formatMassKg(row.fatMassKg)} kg de masse grasse)`
      : row.statusMessage ?? "—";

  return (
    <div
      className="pi-compare__row-details"
      style={
        {
          "--pi-method-accent": theme.accent,
          "--pi-method-light": theme.light,
        } as CSSProperties
      }
    >
      <div className="pi-compare__row-details-head">
        <MethodAccentDot methodId={row.methodId} accent={theme.accent} />
        <h4 className="pi-compare__row-details-title">Méthode {row.method.name}</h4>
      </div>
      <div className="pi-compare__row-details-grid">
        <div>
          <h5 className="pi-compare__row-details-label">Résultat obtenu ici</h5>
          <p className="pi-compare__row-details-value">{percentLabel}</p>
        </div>
        <div>
          <h5 className="pi-compare__row-details-label">Principe</h5>
          <p>{row.method.context}</p>
        </div>
        <div>
          <h5 className="pi-compare__row-details-label">Formule appliquée</h5>
          <code className="pi-compare__row-details-formula">{row.formulaLabel}</code>
        </div>
        <div>
          <h5 className="pi-compare__row-details-label">Point fort</h5>
          <p>{row.method.strength}.</p>
        </div>
        <div>
          <h5 className="pi-compare__row-details-label">Limite principale</h5>
          <p>{row.method.limitation}.</p>
        </div>
        <div>
          <h5 className="pi-compare__row-details-label">Populations concernées</h5>
          <p>{row.method.populations}</p>
        </div>
        <div>
          <h5 className="pi-compare__row-details-label">Publication</h5>
          <p>{row.method.detailOrigin}</p>
        </div>
      </div>
    </div>
  );
}

function MethodDetailsToggle({
  row,
  expanded,
  onToggle,
  compact = false,
}: {
  row: BodyFatMethodResult;
  expanded: boolean;
  onToggle: () => void;
  compact?: boolean;
}) {
  const theme = getMethodTheme(row.methodId);
  const panelId = `mg-compare-detail-${row.methodId}`;

  return (
    <button
      type="button"
      className={`pi-compare__details-btn${compact ? " pi-compare__details-btn--compact" : ""}`}
      aria-expanded={expanded}
      aria-controls={panelId}
      onClick={onToggle}
      style={{ "--pi-method-accent": theme.accent } as CSSProperties}
      aria-label={
        expanded
          ? `Masquer les détails de la méthode ${row.method.name}`
          : `Voir les détails de la méthode ${row.method.name}`
      }
    >
      <span className="pi-compare__details-btn-text">
        {expanded ? "Masquer" : compact ? "Détails" : "Voir les détails"}
      </span>
      <span className="pi-compare__details-btn-icon" aria-hidden="true">
        {expanded ? "−" : "+"}
      </span>
    </button>
  );
}

function ComparisonDispersionScale({
  results,
  minPercent,
  maxPercent,
  meanPercent,
  minId,
  maxId,
}: {
  results: BodyFatMethodResult[];
  minPercent: number;
  maxPercent: number;
  meanPercent: number;
  minId: BodyFatMethodId | null;
  maxId: BodyFatMethodId | null;
}) {
  const span = maxPercent - minPercent || 1;
  const minRow = results.find((row) => row.methodId === minId);
  const maxRow = results.find((row) => row.methodId === maxId);
  const [activeMarker, setActiveMarker] = useState<BodyFatMethodId | null>(null);

  const accessibleSummary =
    minRow && maxRow
      ? `Les estimations vont de ${formatPercent(minPercent)} avec ${minRow.method.name} à ${formatPercent(maxPercent)} avec ${maxRow.method.name}. Le point central est de ${formatPercent(meanPercent)}.`
      : `Le point central des estimations est de ${formatPercent(meanPercent)}.`;

  const centralLeft = ((meanPercent - minPercent) / span) * 100;

  return (
    <div className="pi-compare__scale">
      <p className="sr-only">{accessibleSummary}</p>
      <div className="pi-compare__scale-inner">
        <div
          className="pi-compare__scale-central"
          style={{ left: `${centralLeft}%` } as CSSProperties}
          aria-hidden="true"
        >
          <span className="pi-compare__scale-central-line" />
          <span className="pi-compare__scale-central-label">Point central</span>
          <span className="pi-compare__scale-central-value">{formatPercent(meanPercent)}</span>
        </div>
        <div className="pi-compare__scale-track" aria-hidden="true" />
        <ul className="pi-compare__scale-markers" aria-hidden="false">
          {results.map((row) => {
            if (row.status !== "ok") return null;
            const theme = getMethodTheme(row.methodId);
            const left = ((row.bodyFatPercent - minPercent) / span) * 100;
            const isMin = row.methodId === minId;
            const isMax = row.methodId === maxId;
            const isActive = activeMarker === row.methodId;

            return (
              <li key={row.methodId} style={{ left: `${left}%` } as CSSProperties}>
                <button
                  type="button"
                  className={`pi-compare__scale-marker${isActive ? " pi-compare__scale-marker--active" : ""}`}
                  style={
                    {
                      "--pi-method-accent": theme.accent,
                      backgroundColor: theme.accent,
                    } as CSSProperties
                  }
                  aria-label={`${row.method.name} : ${formatPercent(row.bodyFatPercentRaw)}${isMin ? ", estimation la plus basse" : ""}${isMax ? ", estimation la plus haute" : ""}`}
                  aria-expanded={isActive}
                  onClick={() =>
                    setActiveMarker((current) => (current === row.methodId ? null : row.methodId))
                  }
                  onFocus={() => setActiveMarker(row.methodId)}
                  onBlur={() => setActiveMarker((current) => (current === row.methodId ? null : current))}
                >
                  <span
                    className={`pi-compare__scale-marker-tooltip${isActive ? " pi-compare__scale-marker-tooltip--visible" : ""}`}
                    role="tooltip"
                  >
                    <strong>{row.method.name}</strong>
                    <span>{formatPercent(row.bodyFatPercentRaw)}</span>
                    {isMin ? <span className="pi-compare__scale-marker-badge">Estimation la plus basse</span> : null}
                    {isMax ? <span className="pi-compare__scale-marker-badge">Estimation la plus haute</span> : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pi-compare__scale-bounds" aria-hidden="true">
        <span className="pi-compare__scale-bound pi-compare__scale-bound--min">{formatPercent(minPercent)}</span>
        <span className="pi-compare__scale-bound pi-compare__scale-bound--max">{formatPercent(maxPercent)}</span>
      </div>
      <p className="pi-compare__scale-summary" aria-hidden="true">
        {accessibleSummary}
      </p>
    </div>
  );
}

function ComparisonSummary({
  comparison,
  minId,
  maxId,
}: {
  comparison: BodyFatComparisonResult;
  minId: BodyFatMethodId | null;
  maxId: BodyFatMethodId | null;
}) {
  const { summary } = comparison;
  if (!Number.isFinite(summary.minPercent) || !Number.isFinite(summary.maxPercent)) return null;

  const minLabel = formatPercent(summary.minPercent);
  const maxLabel = formatPercent(summary.maxPercent);
  const meanLabel = formatPercent(summary.medianPercent);

  return (
    <div className="pi-compare__summary-card">
      <h4 className="pi-compare__summary-heading">Fourchette obtenue</h4>
      <p className="pi-compare__summary-range" aria-label={`De ${minLabel} à ${maxLabel}`}>
        <span className="pi-compare__summary-range-value">{minLabel.replace(" %", "")}</span>
        <span className="pi-compare__summary-range-sep"> à </span>
        <span className="pi-compare__summary-range-value">{maxLabel.replace(" %", "")}</span>
        <span className="pi-compare__summary-range-unit"> %</span>
      </p>
      <p className="pi-compare__summary-note">
        Les quatre méthodes donnent ici des estimations comprises dans cette fourchette.
      </p>
      <div className="pi-compare__central-point">
        <h5 className="pi-compare__central-point-title">Point central des estimations</h5>
        <p className="pi-compare__central-point-value">{meanLabel}</p>
        <p className="pi-compare__central-point-note">{MASSE_GRASSE_CENTRAL_POINT_NOTE}</p>
      </div>
      <ComparisonDispersionScale
        results={comparison.results}
        minPercent={summary.minPercent}
        maxPercent={summary.maxPercent}
        meanPercent={summary.medianPercent}
        minId={minId}
        maxId={maxId}
      />
      <p className="pi-compare__dispersion-msg">{summary.dispersionMessage}</p>
    </div>
  );
}

function ComparisonTable({
  comparison,
  minId,
  maxId,
  expandedMethod,
  setExpandedMethod,
}: {
  comparison: BodyFatComparisonResult;
  minId: BodyFatMethodId | null;
  maxId: BodyFatMethodId | null;
  expandedMethod: BodyFatMethodId | null;
  setExpandedMethod: (id: BodyFatMethodId | null) => void;
}) {
  const toggleMethod = (methodId: BodyFatMethodId) => {
    setExpandedMethod(expandedMethod === methodId ? null : methodId);
  };

  return (
    <div className="pi-compare__table-card">
      <div className="pi-compare__table-wrap">
        <table className="pi-compare__table">
          <caption className="sr-only">Comparatif des estimations de masse grasse par méthode</caption>
          <colgroup>
            <col className="pi-compare__col pi-compare__col--method" />
            <col className="pi-compare__col pi-compare__col--estimation" />
            <col className="pi-compare__col pi-compare__col--context" />
            <col className="pi-compare__col pi-compare__col--strength" />
            <col className="pi-compare__col pi-compare__col--limit" />
            <col className="pi-compare__col pi-compare__col--details" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Méthode</th>
              <th scope="col">Estimation</th>
              <th scope="col">Contexte</th>
              <th scope="col">Point fort</th>
              <th scope="col">Limite principale</th>
              <th scope="col">En savoir plus</th>
            </tr>
          </thead>
          <tbody>
            {comparison.results.map((row) => {
              const theme = getMethodTheme(row.methodId);
              const expanded = expandedMethod === row.methodId;
              const panelId = `mg-compare-detail-${row.methodId}`;

              return (
                <Fragment key={row.methodId}>
                  <tr
                    className={expanded ? "pi-compare__table-row--expanded" : undefined}
                    style={
                      {
                        "--pi-method-accent": theme.accent,
                        "--pi-method-light": theme.light,
                      } as CSSProperties
                    }
                  >
                    <td>
                      <span className="pi-compare__table-method">
                        <MethodAccentDot methodId={row.methodId} accent={theme.accent} />
                        <span>
                          <strong>{row.method.name}</strong>
                          <MethodReferencePopover methodId={row.methodId} compact />
                          <span className="pi-compare__table-year"> ({row.method.year})</span>
                          {row.methodId === minId ? (
                            <span className="pi-compare__row-badge pi-compare__row-badge--inline">
                              Estimation la plus basse
                            </span>
                          ) : null}
                          {row.methodId === maxId ? (
                            <span className="pi-compare__row-badge pi-compare__row-badge--inline">
                              Estimation la plus haute
                            </span>
                          ) : null}
                        </span>
                      </span>
                    </td>
                    <td className="pi-compare__table-weight">
                      {row.status === "ok" ? (
                        <strong>{formatPercent(row.bodyFatPercentRaw)}</strong>
                      ) : (
                        row.statusMessage
                      )}
                    </td>
                    <td className="pi-compare__table-context">{row.method.shortDescription}</td>
                    <td>
                      <span className="pi-compare__table-strength">
                        <IconCheck className="pi-compare__table-strength-icon" />
                        {row.method.strength}
                      </span>
                    </td>
                    <td>
                      <span className="pi-compare__table-limit">
                        <IconAlert className="pi-compare__table-limit-icon" />
                        {row.method.limitation}
                      </span>
                    </td>
                    <td className="pi-compare__table-details-cell">
                      <MethodDetailsToggle
                        row={row}
                        expanded={expanded}
                        onToggle={() => toggleMethod(row.methodId)}
                        compact
                      />
                    </td>
                  </tr>
                  {expanded ? (
                    <tr className="pi-compare__table-detail-row">
                      <td colSpan={6} id={panelId}>
                        <ExpandableMethodDetails row={row} />
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ComparisonMobileCards({
  comparison,
  expandedMethod,
  setExpandedMethod,
  minId,
  maxId,
}: {
  comparison: BodyFatComparisonResult;
  expandedMethod: BodyFatMethodId | null;
  setExpandedMethod: (id: BodyFatMethodId | null) => void;
  minId: BodyFatMethodId | null;
  maxId: BodyFatMethodId | null;
}) {
  const toggleMethod = (methodId: BodyFatMethodId) => {
    setExpandedMethod(expandedMethod === methodId ? null : methodId);
  };

  return (
    <div className="pi-compare__mobile-cards">
      {comparison.results.map((row) => {
        const theme = getMethodTheme(row.methodId);
        const expanded = expandedMethod === row.methodId;
        const panelId = `mg-compare-detail-mobile-${row.methodId}`;

        return (
          <article
            key={row.methodId}
            className={`pi-compare__mobile-card${expanded ? " pi-compare__mobile-card--expanded" : ""}`}
            style={
              {
                "--pi-method-accent": theme.accent,
                "--pi-method-light": theme.light,
              } as CSSProperties
            }
          >
            <div className="pi-compare__mobile-card-head">
              <MethodAccentDot methodId={row.methodId} accent={theme.accent} />
              <div className="pi-compare__mobile-card-title" role="heading" aria-level={4}>
                {row.method.name} ({row.method.year})
                <MethodReferencePopover methodId={row.methodId} compact />
              </div>
            </div>
            <p className="pi-compare__mobile-card-value">
              {row.status === "ok" ? formatPercent(row.bodyFatPercentRaw) : "—"}
            </p>
            {row.methodId === minId ? (
              <span className="pi-compare__row-badge">Estimation la plus basse</span>
            ) : null}
            {row.methodId === maxId ? (
              <span className="pi-compare__row-badge">Estimation la plus haute</span>
            ) : null}
            <p className="pi-compare__mobile-meta">
              <strong>Contexte :</strong> {row.method.shortDescription}
            </p>
            <p className="pi-compare__mobile-meta pi-compare__mobile-strength">
              <IconCheck className="pi-compare__table-strength-icon" />
              <span>
                <strong>Point fort :</strong> {row.method.strength}
              </span>
            </p>
            <p className="pi-compare__mobile-meta pi-compare__mobile-limit">
              <IconAlert className="pi-compare__table-limit-icon" />
              <span>
                <strong>Limite :</strong> {row.method.limitation}
              </span>
            </p>
            <MethodDetailsToggle
              row={row}
              expanded={expanded}
              onToggle={() => toggleMethod(row.methodId)}
              compact
            />
            {expanded ? (
              <div id={panelId}>
                <ExpandableMethodDetails row={row} />
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export function CopyResultsButton({
  onCopy,
  copied,
}: {
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <button type="button" className="pi-compare__copy-btn" onClick={onCopy} aria-live="polite">
      {copied ? (
        <>
          <IconCheck className="pi-compare__copy-btn-icon" />
          Résultats copiés
        </>
      ) : (
        <>
          <IconCopy className="pi-compare__copy-btn-icon" />
          Copier les résultats
        </>
      )}
    </button>
  );
}

export function CompareModePanel({
  comparison,
  expandedMethod,
  setExpandedMethod,
  comparisonResultsStartRef,
  copyCopied,
  onCopy,
}: {
  comparison: BodyFatComparisonResult;
  expandedMethod: BodyFatMethodId | null;
  setExpandedMethod: (id: BodyFatMethodId | null) => void;
  comparisonResultsStartRef: RefObject<HTMLElement | null>;
  copyCopied: boolean;
  onCopy: () => void;
}) {
  const { minId, maxId } = getMinMaxIds(comparison.results);

  return (
    <div className="pi-compare__results" aria-live="polite" aria-atomic="true">
      <section
        ref={comparisonResultsStartRef}
        className="pi-quick__step pi-calc__comparison-result-step comparison-results-section"
        aria-labelledby="mg-compare-step-4"
      >
        <StepHeader
          step={4}
          title="Comparez les résultats"
          help={MASSE_GRASSE_COMPARE_RESULT_HELP}
        />
        <ComparisonSummary comparison={comparison} minId={minId} maxId={maxId} />
        <ComparisonTable
          comparison={comparison}
          minId={minId}
          maxId={maxId}
          expandedMethod={expandedMethod}
          setExpandedMethod={setExpandedMethod}
        />
        <ComparisonMobileCards
          comparison={comparison}
          expandedMethod={expandedMethod}
          setExpandedMethod={setExpandedMethod}
          minId={minId}
          maxId={maxId}
        />
        <CopyResultsButton onCopy={onCopy} copied={copyCopied} />
      </section>
    </div>
  );
}
