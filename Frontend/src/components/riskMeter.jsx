import React, { useState, useEffect, useMemo } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";

const RiskMeter = ({ percentage = 0, level = "Low" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const center = 128;
  const radius = 85;
  const circumference = 2 * Math.PI * radius;

  // PERFORMANCE: Use MotionValue for the progress to sync text and stroke perfectly
  const progress = useMotionValue(0);

  // DYNAMIC COLOR INTERPOLATION (Smooth transition, not just jumps)
  const activeColor = useTransform(
    progress,
    [0, 30, 70, 100],
    ["#10b981", "#f59e0b", "#ef4444", "#991b1b"], // Emerald -> Amber -> Red -> Dark Red
  );

  useEffect(() => {
    // Sync both the counter and the motion value
    const controls = animate(progress, percentage, {
      duration: 2,
      ease: "circOut",
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [percentage, progress]);

  // Sanitize Threat Level
  const safeLevel = useMemo(() => {
    const validLevels = ["Low", "Medium", "High", "Critical"];
    return validLevels.includes(level) ? level : "Inconclusive";
  }, [level]);

  return (
    <div className="relative flex items-center justify-center w-72 h-72 group select-none">
      {/* HUD DECORATION */}
      <div
        className="absolute inset-0 border border-slate-800/50 rounded-full animate-[spin_30s_linear_infinite]"
        aria-hidden="true"
      />

      <svg viewBox="0 0 256 256" className="w-full h-full transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#1e293b"
          strokeWidth="14"
          fill="transparent"
          className="opacity-40"
        />

        {/* Primary Progress Stroke - Sync'd with MotionValue */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke={activeColor}
          strokeWidth="12"
          fill="transparent"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: useTransform(
              progress,
              [0, 100],
              [circumference, 0],
            ),
            // Optimization: Filter handled via Motion style to prevent paint-lag
            filter: useTransform(
              activeColor,
              (c) => `drop-shadow(0 0 8px ${c}66)`,
            ),
          }}
        />

        {/* Cyber Ticks */}
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1={center + radius + 15}
            y1={center}
            x2={center + radius + 22}
            y2={center}
            stroke="#334155"
            strokeWidth="2"
            transform={`rotate(${i * 45} ${center} ${center})`}
          />
        ))}
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="relative flex flex-col items-center">
          {/* Heartbeat Glow */}
          <motion.div
            className="absolute inset-0 blur-3xl opacity-20 animate-pulse rounded-full"
            style={{ backgroundColor: activeColor }}
          />

          <span className="relative text-7xl font-black text-white tracking-tighter flex items-baseline">
            {displayValue}
            <span className="text-xl text-slate-500 ml-1 font-mono">%</span>
          </span>

          <motion.div
            className="h-[2px] w-16 my-2"
            style={{ backgroundColor: activeColor }}
          />

          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.4em] font-black">
              Analysis_Score
            </span>
            <motion.span
              className="text-[10px] font-black uppercase mt-1 px-3 py-1 rounded-sm bg-slate-950 border border-slate-800"
              style={{ color: activeColor, borderColor: activeColor }}
            >
              {safeLevel}_Threat
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMeter;
