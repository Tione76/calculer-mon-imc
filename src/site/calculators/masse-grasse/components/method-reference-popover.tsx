"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { BodyFatMethodId } from "../types";
import { getBodyFatMethod } from "../methods";
import { METHOD_DISPLAY_NAMES } from "../method-science-copy";
import { IconInfo } from "./shared-ui";

function MethodPopoverContent({ methodId }: { methodId: BodyFatMethodId }) {
  const method = getBodyFatMethod(methodId);
  const displayName = METHOD_DISPLAY_NAMES[methodId];

  return (
    <div className="mg-method-ref__content">
      <div className="mg-method-ref__title">{displayName}</div>
      <div className="mg-method-ref__meta">
        {method.author} · {method.year}
      </div>
      <div className="mg-method-ref__text">{method.context}</div>
      <dl className="mg-method-ref__facts">
        <div>
          <dt>Pourquoi elle est reconnue</dt>
          <dd>{method.strength}.</dd>
        </div>
        <div>
          <dt>Usage recommandé</dt>
          <dd>{method.populations}.</dd>
        </div>
        <div>
          <dt>Limite principale</dt>
          <dd>{method.limitation}.</dd>
        </div>
      </dl>
      <div className="mg-method-ref__source">
        <span className="mg-method-ref__source-label">Source</span> {method.detailOrigin}
      </div>
    </div>
  );
}

export function MethodReferencePopover({
  methodId,
  compact = false,
}: {
  methodId: BodyFatMethodId;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const popoverId = useId();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const method = getBodyFatMethod(methodId);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const openFromHover = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setOpen(true);
    }
  };

  const closeFromHover = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setOpen(false);
    }
  };

  return (
    <span
      ref={wrapRef}
      className={`mg-method-ref${compact ? " mg-method-ref--compact" : ""}`}
      onMouseEnter={openFromHover}
      onMouseLeave={closeFromHover}
    >
      <button
        type="button"
        className="mg-method-ref__trigger"
        aria-expanded={open}
        aria-controls={popoverId}
        aria-label={`En savoir plus sur la méthode ${method.name}`}
        onClick={() => setOpen((value) => !value)}
      >
        <IconInfo className="mg-method-ref__icon" />
      </button>
      {open ? (
        <div
          id={popoverId}
          role="dialog"
          aria-label={`Référence scientifique : ${method.name}`}
          className="mg-method-ref__popover"
        >
          <MethodPopoverContent methodId={methodId} />
        </div>
      ) : null}
    </span>
  );
}
