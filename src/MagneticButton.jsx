// src/components/MagneticButton.jsx
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function MagneticButton({
  href,
  onClick,
  children,
  className = "",
  variant = "solid", // "solid" | "outline"
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);

  // motion values for the inner “magnet”
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // spring so it feels alive but not jittery
  const x = useSpring(mx, { stiffness: 300, damping: 20, mass: 0.3 });
  const y = useSpring(my, { stiffness: 300, damping: 20, mass: 0.3 });

  function handleMove(e) {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    // distance from center
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    // cap the pull so it never jumps too far
    const MAX = 14; // px
    mx.set(Math.max(-MAX, Math.min(MAX, relX * 0.25)));
    my.set(Math.max(-MAX, Math.min(MAX, relY * 0.25)));
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  const base =
    "relative inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500";
  const styles =
    variant === "outline"
      ? "border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 dark:hover:bg-neutral-900"
      : "bg-emerald-600 text-white hover:bg-emerald-700";

  const Inner = (
    <motion.span
      style={{ x, y }}
      className="pointer-events-none"
      // a little tap spring
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.span>
  );

  const commonProps = {
    ref,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className: `${base} ${styles} ${className}`,
  };

  return href ? (
    <motion.a href={href} {...commonProps}>
      {Inner}
    </motion.a>
  ) : (
    <motion.button type="button" onClick={onClick} {...commonProps}>
      {Inner}
    </motion.button>
  );
}
