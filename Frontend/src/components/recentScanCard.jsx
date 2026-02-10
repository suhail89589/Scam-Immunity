import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  ChevronRight,
  Clock,
  Fingerprint,
} from "lucide-react";

// PERFORMANCE: Move configuration outside to prevent re-allocation
const RISK_THEMES = {
  HIGH: {
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: ShieldAlert,
    pulse: "bg-red-500",
  },
  MEDIUM: {
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: ShieldQuestion,
    pulse: "bg-amber-500",
  },
  LOW: {
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: ShieldCheck,
    pulse: "bg-emerald-500",
  },
};

const RecentScanCard = ({
  type = "UNKNOWN",
  date = "N/A",
  risk = "LOW",
  percentage,
}) => {
  // STABILITY: Normalize risk input to handle case-sensitivity from different API versions
  const normalizedRisk = useMemo(() => risk.toUpperCase(), [risk]);
  const theme = RISK_THEMES[normalizedRisk] || RISK_THEMES.LOW;
  const Icon = theme.icon;

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className={`relative flex items-center justify-between p-4 mb-3 bg-slate-950/40 backdrop-blur-md border ${theme.border} rounded-xl hover:bg-slate-900/60 transition-all cursor-pointer group overflow-hidden`}
      role="button"
      aria-label={`View ${type} analysis results with ${risk} risk`}
    >
      {/* SCANLINE EFFECT: GPU Optimized */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        style={{ willChange: "transform" }}
      />

      <div className="flex items-center gap-4 relative z-10">
        <div
          className={`p-2.5 rounded-lg ${theme.bg} ${theme.color} border ${theme.border} transition-transform group-hover:scale-110`}
        >
          <Icon size={20} />
        </div>

        <div className="min-w-0">
          {" "}
          {/* Prevents text overflow */}
          <div className="flex items-center gap-2">
            <h4 className="text-white text-sm font-black uppercase tracking-tighter italic truncate">
              {type.replace(/[^a-zA-Z0-9_]/g, "")}_ANALYSIS
            </h4>
            {percentage !== undefined && (
              <span className="text-[10px] font-mono text-slate-600 shrink-0">
                [{percentage}%_MATCH]
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Clock size={10} className="text-slate-600" />
            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">
              {date}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 relative z-10">
        <div className="hidden sm:flex flex-col items-end">
          <div
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded border ${theme.border} ${theme.bg}`}
          >
            <div
              className={`w-1 h-1 rounded-full animate-pulse ${theme.pulse}`}
            />
            <span
              className={`text-[9px] font-mono font-black tracking-[0.2em] ${theme.color}`}
            >
              {normalizedRisk}_RISK
            </span>
          </div>
        </div>

        <ChevronRight
          size={18}
          className="text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0"
        />
      </div>

      {/* ACCESSORY DECOR */}
      <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Fingerprint size={12} className="text-slate-800" />
      </div>
    </motion.div>
  );
};

export default RecentScanCard;
