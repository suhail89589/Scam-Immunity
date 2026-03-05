import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Search,
  Fingerprint,
  Timer,
  Globe,
  Cpu,
  Terminal,
  Lock,
  AlertTriangle,
} from "lucide-react";
import RiskMeter from "../components/RiskMeter";

const getIcon = (id) => {
  const map = {
    timer: <Timer size={24} className="text-red-500" />,
    globe: <Globe size={24} className="text-amber-500" />,
    fingerprint: <Fingerprint size={24} className="text-red-500" />,
    terminal: <Terminal size={24} className="text-cyan-500" />,
    lock: <Lock size={24} className="text-emerald-500" />,
    search: <Search size={24} className="text-cyan-500" />,
  };
  return map[id] || <ShieldAlert size={24} className="text-cyan-500" />;
};

const ResultPage = () => {
  const { state: reportData } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Safety check: If state is missing, redirect after a small delay to allow state to hydrate
    if (!reportData) {
      const timer = setTimeout(() => navigate("/analyzer"), 100);
      return () => clearTimeout(timer);
    }
  }, [reportData, navigate]);

  if (!reportData) return <div className="min-h-screen bg-[#020617]" />;

  const isHighRisk =
    reportData.level === "Critical" || reportData.level === "High";
  const themeColor = isHighRisk ? "text-red-500" : "text-emerald-500";
  const themeBorder = isHighRisk
    ? "border-red-500/30"
    : "border-emerald-500/30";

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-4 relative">
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-10 md:p-16 rounded-[3rem] bg-slate-950/60 border ${themeBorder} backdrop-blur-2xl`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span
                className={`px-4 py-1.5 rounded-xl border ${themeBorder} ${themeColor} font-mono text-[10px] font-black uppercase`}
              >
                Verdict: {reportData.level}_Threat
              </span>
              <h1
                className={`text-7xl md:text-9xl font-black italic leading-[0.8] uppercase tracking-tighter ${themeColor}`}
              >
                {reportData.percentage}% <br />
                <span className="text-white/10 text-5xl md:text-7xl">
                  SCAM_PROB
                </span>
              </h1>
              <div className="flex items-center gap-6 p-6 bg-black/40 rounded-3xl border border-white/5">
                {isHighRisk ? (
                  <AlertTriangle className={themeColor} />
                ) : (
                  <ShieldCheck className={themeColor} />
                )}
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase">
                    Classification
                  </p>
                  <p className="text-xl font-black italic uppercase">
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
            <h3 className="text-sm font-black uppercase text-slate-500 flex items-center gap-3">
              <Cpu size={16} /> Neural_DNA_Report
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {reportData.signals?.map((s, i) => (
                <div
                  key={i}
                  className="p-8 bg-slate-900/30 border border-white/5 rounded-[2rem] hover:bg-slate-900/50 transition-all group"
                >
                  <div className="mb-6 p-4 bg-black rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    {getIcon(s.iconId)}
                  </div>
                  <h4 className="font-black uppercase text-sm mb-2 italic">
                    {s.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase text-slate-500 flex items-center gap-3">
              <CheckCircle2 size={16} /> Remediation
            </h3>
            <div className="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem]">
              <ul className="space-y-6">
                {reportData.actions?.map((a, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle2
                      size={18}
                      className="text-emerald-500 shrink-0 mt-1"
                    />
                    <span className="text-emerald-100/80 text-xs font-bold uppercase">
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
