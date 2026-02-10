import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  LayoutDashboard,
  Search,
  Zap,
  Fingerprint,
  Timer,
  Globe,
  Cpu,
  Terminal,
  Lock,
  AlertTriangle,
} from "lucide-react";

import RiskMeter from "../components/RiskMeter";

// ICON MAPPER: Hardened and outside component
const getIcon = (iconId) => {
  const iconProps = { size: 24, className: "text-cyan-500" };
  const map = {
    timer: <Timer {...iconProps} className="text-red-500" />,
    globe: <Globe {...iconProps} className="text-amber-500" />,
    fingerprint: <Fingerprint {...iconProps} className="text-red-500" />,
    terminal: <Terminal {...iconProps} />,
    lock: <Lock {...iconProps} />,
    search: <Search {...iconProps} />,
  };
  return map[iconId] || <ShieldAlert {...iconProps} />;
};

const ResultPage = () => {
  const { scanId } = useParams(); // PRODUCTION: Results should be URL-addressable
  const location = useLocation();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);

  // PRODUCTION DATA FETCHING: If state is missing (on refresh), fetch by ID
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!reportData && scanId) {
      // fetch(`${process.env.REACT_APP_API}/results/${scanId}`)
      // .then(res => res.json()).then(data => { setReportData(data); setLoading(false); });
    }
  }, [scanId, reportData]);

  // HARDENED THEME LOGIC: Handles all threat levels accurately
  const theme = useMemo(() => {
    const level = reportData?.level?.toLowerCase();
    if (level === "high" || level === "critical")
      return {
        color: "text-red-500",
        glow: "shadow-red-500/20",
        border: "border-red-500/30",
        icon: AlertTriangle,
      };
    if (level === "medium")
      return {
        color: "text-amber-500",
        glow: "shadow-amber-500/20",
        border: "border-amber-500/30",
        icon: ShieldAlert,
      };
    return {
      color: "text-emerald-500",
      glow: "shadow-emerald-500/20",
      border: "border-emerald-500/30",
      icon: ShieldCheck,
    };
  }, [reportData]);

  if (loading || !reportData)
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-emerald-500">
        <div className="animate-pulse">FETCHING_NEURAL_REPORT_{scanId}...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-10 md:p-16 rounded-[3rem] bg-slate-950/60 border ${theme.border} ${theme.glow} backdrop-blur-2xl relative overflow-hidden`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-4">
                <span
                  className={`px-4 py-1.5 rounded-xl border ${theme.border} ${theme.color} font-mono text-[10px] font-black tracking-widest uppercase`}
                >
                  Verdict: {reportData.level}_Threat
                </span>
                <span className="px-4 py-1.5 rounded-xl border border-white/5 bg-white/5 text-slate-500 font-mono text-[10px] font-black uppercase italic">
                  Confidence: {reportData.confidence}%
                </span>
              </div>

              <h1
                className={`text-7xl md:text-9xl font-black italic leading-[0.8] uppercase tracking-tighter ${theme.color}`}
              >
                {reportData.percentage}% <br />
                <span className="text-white/10 text-5xl md:text-7xl">
                  SCAM_PROB
                </span>
              </h1>

              <div className="flex items-center gap-6 p-6 bg-black/40 rounded-3xl border border-white/5">
                <div
                  className={`p-4 rounded-2xl ${theme.color} bg-current opacity-10`}
                />
                <div className="-ml-16 mr-6">
                  {" "}
                  <theme.icon className={theme.color} size={28} />{" "}
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                    Classification
                  </p>
                  <p className="text-xl font-black italic uppercase tracking-tight">
                    {reportData.category}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center scale-110">
              <RiskMeter
                percentage={reportData.percentage}
                level={reportData.level}
              />
            </div>
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-black uppercase italic tracking-[0.4em] text-slate-500 flex items-center gap-3">
              <Cpu size={16} className="text-cyan-500" /> Neural_DNA_Report
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {(reportData.signals || []).map((s, i) => (
                <div
                  key={i}
                  className="p-8 bg-slate-900/30 border border-white/5 rounded-[2rem] hover:bg-slate-900/50 transition-all group"
                >
                  <div className="mb-6 p-4 bg-black rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    {getIcon(s.iconId)}
                  </div>
                  <h4 className="font-black uppercase text-sm mb-2 italic tracking-tight">
                    {s.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase italic tracking-[0.4em] text-slate-500 flex items-center gap-3">
              <CheckCircle2 size={16} className="text-emerald-500" />{" "}
              Remediation_Protocol
            </h3>
            <div className="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem]">
              <ul className="space-y-6">
                {(reportData.actions || []).map((a, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle2
                      size={18}
                      className="text-emerald-500 shrink-0 mt-1"
                    />
                    <span className="text-emerald-100/80 text-xs font-bold uppercase leading-relaxed tracking-tight">
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
