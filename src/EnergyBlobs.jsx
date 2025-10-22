// src/components/EnergyBlobs.jsx
import { motion, useReducedMotion } from "framer-motion";

export default function EnergyBlobs({ className = "" }) {
  const prefersReducedMotion = useReducedMotion();

  const loop = prefersReducedMotion
    ? {}
    : {
        animate: { x: [0, 24, -16, 12, 0], y: [0, -18, 14, -8, 0], scale: [1, 1.08, 1.02, 1.06, 1] },
        transition: { duration: 18, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {/* Emerald core */}
      <motion.div
        {...loop}
        className="absolute -top-32 -left-28 h-[46rem] w-[46rem] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(16,185,129,0.45), rgba(16,185,129,0.18), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Teal ribbon */}
      <motion.div
        {...loop}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute top-1/3 -right-40 h-[44rem] w-[44rem] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(13,148,136,0.38), rgba(13,148,136,0.16), transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Cyan trail */}
      <motion.div
        {...loop}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute -bottom-36 left-1/4 h-[40rem] w-[40rem] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(34,211,238,0.34), rgba(34,211,238,0.14), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Current streak */}
      <motion.div
        {...(prefersReducedMotion
          ? {}
          : {
              animate: { x: ["-5%", "6%", "-3%", "0%"] },
              transition: { duration: 26, repeat: Infinity, ease: "easeInOut" },
            })}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[8px]"
        style={{
          opacity: 0.35,
          background:
            "linear-gradient(90deg, transparent, rgba(16,185,129,0.55), rgba(34,211,238,0.55), transparent)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}
