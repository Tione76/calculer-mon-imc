import { useEffect, useRef, useState } from "react";

const DEFAULT_DURATION_MS = 400;

function readReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Interpole l'angle de l'aiguille (400 ms, ease-out, respecte reduced-motion). */
export function useAnimatedNeedleAngle(targetAngle: number, durationMs = DEFAULT_DURATION_MS): number {
  const [displayAngle, setDisplayAngle] = useState(targetAngle);
  const angleRef = useRef(targetAngle);

  useEffect(() => {
    if (readReducedMotion()) {
      angleRef.current = targetAngle;
      setDisplayAngle(targetAngle);
      return;
    }

    const from = angleRef.current;
    if (Math.abs(from - targetAngle) < 0.01) {
      angleRef.current = targetAngle;
      setDisplayAngle(targetAngle);
      return;
    }

    let start: number | null = null;
    let frame = 0;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min(1, (timestamp - start) / durationMs);
      const eased = 1 - (1 - progress) ** 3;
      const value = from + (targetAngle - from) * eased;
      angleRef.current = value;
      setDisplayAngle(value);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        angleRef.current = targetAngle;
        setDisplayAngle(targetAngle);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [targetAngle, durationMs]);

  return displayAngle;
}
