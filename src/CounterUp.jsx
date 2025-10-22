// src/components/CounterUp.jsx
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useMotionValueEvent } from "framer-motion";

/**
 * CounterUp (smooth, reliable)
 * - Uses MotionValue + animate() for silky updates
 * - Triggers when scrolled into view (once by default)
 */
export default function CounterUp({
  from = 0,
  to = 100,
  duration = 2,
  ease = "easeOut",
  label = "",
  suffix = "",
  once = true,
  margin = "0px 0px -20% 0px",
  className = "",
  valueClassName = "text-4xl font-bold text-emerald-600 dark:text-emerald-400",
  labelClassName = "text-sm mt-1 text-neutral-600 dark:text-neutral-300",
}) {
  const elRef = useRef(null);
  const inView = useInView(elRef, { once, margin });

  // Motion value drives the animation without React re-renders
  const mv = useMotionValue(from);
  const started = useRef(false);

  // Local state only reflects the latest rounded value to display
  const [display, setDisplay] = useState(from);
  useMotionValueEvent(mv, "change", (v) => setDisplay(Math.round(v)));

  useEffect(() => {
    if (!inView) return;
    if (once && started.current) return;
    started.current = true;

    const controls = animate(mv, to, { duration, ease });
    return () => controls.stop();
  }, [inView, once, to, duration, ease, mv]);

  return (
    <div ref={elRef} className={`text-center ${className}`} aria-label={`${to}${suffix} ${label}`}>
      <div className={valueClassName}>
        {display}
        {suffix}
      </div>
      {label && <div className={labelClassName}>{label}</div>}
    </div>
  );
}
