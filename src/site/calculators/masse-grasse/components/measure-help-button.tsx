"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { BodyFatMeasureField } from "../method-requirements";
import { MEASURE_DETAILED_HELP } from "../measure-detailed-help";

function IconInfoCircle({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 8.25V12.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="9" cy="5.75" r="0.9" fill="currentColor" />
    </svg>
  );
}

function useIsMobileHelp() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function HelpContent({ fieldKey }: { fieldKey: BodyFatMeasureField }) {
  const help = MEASURE_DETAILED_HELP[fieldKey];
  return (
    <>
      <div className="mg-measure-help__title">{help.title}</div>
      <div className="mg-measure-help__body">{help.body}</div>
    </>
  );
}

export function MeasureHelpButton({ fieldKey }: { fieldKey: BodyFatMeasureField }) {
  const help = MEASURE_DETAILED_HELP[fieldKey];
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobileHelp();
  const panelId = useId();
  const titleId = `${panelId}-title`;
  const wrapRef = useRef<HTMLSpanElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);

    if (!isMobile) {
      const onPointerDown = (event: PointerEvent) => {
        const target = event.target as Node;
        const popover = document.getElementById(panelId);
        if (wrapRef.current?.contains(target)) return;
        if (popover?.contains(target)) return;
        close();
      };

      document.addEventListener("pointerdown", onPointerDown);
      return () => {
        document.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("keydown", onKeyDown);
      };
    }

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close, isMobile, panelId]);

  useEffect(() => {
    if (open && isMobile) {
      closeButtonRef.current?.focus();
    }
  }, [open, isMobile]);

  const openFromHover = () => {
    if (!isMobile && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setOpen(true);
    }
  };

  const closeFromHover = () => {
    if (!isMobile && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setOpen(false);
    }
  };

  return (
    <>
      <span
        ref={wrapRef}
        className="mg-measure-help"
        onMouseEnter={openFromHover}
        onMouseLeave={closeFromHover}
      >
        <button
          type="button"
          className="mg-measure-help__trigger"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={help.ariaLabel}
          onClick={() => setOpen((value) => !value)}
        >
          <IconInfoCircle className="mg-measure-help__icon" />
        </button>
        {open && !isMobile ? (
          <div
            id={panelId}
            role="dialog"
            aria-labelledby={titleId}
            className="mg-measure-help__popover"
            onMouseEnter={openFromHover}
            onMouseLeave={closeFromHover}
          >
            <div className="mg-measure-help__popover-inner">
              <div id={titleId} className="mg-measure-help__title">
                {help.title}
              </div>
              <div className="mg-measure-help__body">{help.body}</div>
            </div>
          </div>
        ) : null}
      </span>

      {open && isMobile ? (
        <div className="mg-measure-help__mobile-root" aria-hidden={false}>
          <button
            type="button"
            className="mg-measure-help__backdrop"
            aria-label="Fermer cette aide"
            onClick={close}
          />
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="mg-measure-help__modal"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="mg-measure-help__close"
              aria-label="Fermer"
              onClick={close}
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="mg-measure-help__modal-inner">
              <HelpContent fieldKey={fieldKey} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
