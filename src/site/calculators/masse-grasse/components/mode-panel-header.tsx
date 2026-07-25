"use client";

import type { ReactNode } from "react";
import type { CalculatorMode } from "./shared-ui";
import {
  MASSE_GRASSE_COMPARE_TITLE,
  MASSE_GRASSE_PERSONALIZED_TITLE,
  MASSE_GRASSE_QUICK_TITLE,
} from "../presentation";
import { METHOD_SCIENCE_BADGE } from "../method-science-copy";
import { MethodReferencePopover } from "./method-reference-popover";

function IconScience({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6.5 2.5h3M8 2.5V4M5 5.5h6l-1 7H6L5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.25 8.25h3.5M6.75 10.25h2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

const MODE_TITLES: Record<CalculatorMode, string> = {
  quick: MASSE_GRASSE_QUICK_TITLE,
  personalized: MASSE_GRASSE_PERSONALIZED_TITLE,
  compare: MASSE_GRASSE_COMPARE_TITLE,
};

function QuickIntro() {
  return (
    <p className="pi-quick__intro">
      Obtenez une première estimation à partir de votre <strong>âge</strong>, de votre{" "}
      <strong>taille</strong> et de votre <strong>poids</strong>.
    </p>
  );
}

function PersonalizedIntro() {
  return (
    <p className="pi-quick__intro">
      Utilisez votre <strong>taille</strong> et votre <strong>tour de taille</strong> pour obtenir une estimation
      davantage liée à votre morphologie.
    </p>
  );
}

function CompareIntro() {
  return (
    <p className="pi-quick__intro">
      Comparez 4 méthodes scientifiques reconnues afin de mieux comprendre les différences entre leurs estimations.
    </p>
  );
}

const MODE_INTROS: Record<CalculatorMode, ReactNode> = {
  quick: <QuickIntro />,
  personalized: <PersonalizedIntro />,
  compare: <CompareIntro />,
};

function MethodScienceBadge({ mode }: { mode: CalculatorMode }) {
  const badge = METHOD_SCIENCE_BADGE[mode];

  if (badge.type === "single") {
    return (
      <div className="mg-quick__method-badge">
        <IconScience className="mg-quick__method-badge-icon" />
        <span className="mg-quick__method-badge-text">
          {badge.prefix} <strong>{badge.label}</strong>
        </span>
        <MethodReferencePopover methodId={badge.methodId} compact />
      </div>
    );
  }

  return (
    <div className="mg-quick__method-badge mg-quick__method-badge--multi">
      <IconScience className="mg-quick__method-badge-icon" />
      <span className="mg-quick__method-badge-text">
        {badge.prefix}{" "}
        {badge.methods.map((method, index) => (
          <span key={method.methodId} className="mg-quick__method-badge-item">
            {index > 0 ? <span className="mg-quick__method-badge-sep" aria-hidden="true"> • </span> : null}
            <strong>{method.label}</strong>
            <MethodReferencePopover methodId={method.methodId} compact />
          </span>
        ))}
      </span>
    </div>
  );
}

export function ModePanelHeader({ mode }: { mode: CalculatorMode }) {
  return (
    <header className="pi-quick__header">
      <h2 className="pi-quick__title">{MODE_TITLES[mode]}</h2>
      {MODE_INTROS[mode]}
      <MethodScienceBadge mode={mode} />
    </header>
  );
}
