import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ChevronRight,
  UserCircle,
  Activity,
  Zap,
  ShieldAlert,
  Fingerprint,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // MOCK REPLACEMENT: In production, fetch this from /api/v1/user/history
  const recentScans = useMemo(
    () => [
      {
        id: 1,
        type: "Email",
        target: "re-verify-account.support",
        risk: "High",
        score: 87,
        date: "Feb 08",
      },
      {
        id: 2,
        type: "URL",
        target: "bit.ly/secure-login-302",
        risk: "Medium",
        score: 45,
        date: "Feb 07",
      },
      {
        id: 3,
        type: "SMS",
        target: "+1 (855) XXX-XX",
        risk: "Low",
        score: 12,
        date: "Feb 05",
      },
    ],
    [],
  );

  // SECURE NAVIGATION: Pass the specific scan ID or state
  const viewDetails = (scan) => {
    navigate(`/result/${scan.id}`, { state: { ...scan, fromHistory: true } });
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#10b98108_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        {/* HEADER: OPERATOR STATUS */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-slate-900/20 p-8 rounded-[2rem] border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 flex items-center justify-center">
                <UserCircle size={48} className="text-emerald-500" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#020617] border border-emerald-500/50 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                Operator_01
              </h1>
              <p className="text-slate-500 font-mono text-[10px] mt-1 uppercase tracking-widest">
                SHIELD_MODE: <span className="text-emerald-500">ACTIVE</span> |
                AUTH: SR_GUARDIAN
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            {[
              { l: "SCANS_TOTAL", v: "142" },
              { l: "LOSS_PREVENTED", v: "$12.4k" },
            ].map((stat, i) => (
              <div
                key={i}
                className="px-6 py-3 bg-white/5 rounded-xl border border-white/5 text-center min-w-[120px]"
              >
                <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">
                  {stat.l}
                </p>
                <p className="text-xl font-black text-white italic">{stat.v}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* CTA CARD */}
            <motion.div
              whileHover={{ y: -4 }}
              className="relative p-12 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-[3rem] group cursor-pointer"
              onClick={() => navigate("/analyzer")}
            >
              <div className="max-w-sm">
                <div className="p-4 bg-emerald-500 text-slate-950 w-fit rounded-2xl mb-8 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <Zap size={32} />
                </div>
                <h2 className="text-3xl font-black text-white uppercase italic leading-none mb-4">
                  Initialize_Neural_Audit
                </h2>
                <p className="text-slate-400 font-medium mb-8">
                  Intercept and decode malicious behavioral patterns in
                  real-time.
                </p>
                <span className="flex items-center gap-2 text-emerald-500 font-mono text-xs font-black tracking-[0.3em] group-hover:gap-4 transition-all uppercase">
                  Open_Terminal <ChevronRight size={16} />
                </span>
              </div>
            </motion.div>

            {/* ACTIVITY FEED */}
            <section className="space-y-6">
              <h3 className="text-white font-black uppercase italic tracking-[0.2em] flex items-center gap-3 text-sm">
                <Fingerprint className="text-emerald-500" size={18} />{" "}
                Analysis_History_Log
              </h3>
              <div className="space-y-4" role="log" aria-live="polite">
                {recentScans.map((scan) => (
                  <div
                    key={scan.id}
                    onClick={() => viewDetails(scan)}
                    className="flex items-center justify-between p-6 bg-slate-900/30 border border-slate-800/50 rounded-3xl hover:border-emerald-500/30 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`p-4 rounded-2xl ${scan.risk === "High" ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"}`}
                      >
                        {scan.risk === "High" ? (
                          <ShieldAlert size={20} />
                        ) : (
                          <ShieldCheck size={20} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-black uppercase italic text-sm tracking-tight truncate">
                          {scan.type}_SCAN:{" "}
                          {scan.target.length > 20
                            ? scan.target.substring(0, 17) + "..."
                            : scan.target}
                        </p>
                        <p className="text-[10px] font-mono text-slate-600 uppercase mt-1">
                          {scan.date} // NEURAL_SCORE: {scan.score}%
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-slate-700 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-8">
            <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-[2.5rem]">
              <h4 className="text-white font-black uppercase italic tracking-widest text-xs mb-8 flex items-center gap-2">
                <Activity size={14} className="text-emerald-500" />{" "}
                Global_Risk_Index
              </h4>
              <div className="space-y-8">
                {[
                  { l: "Phishing", v: 78, c: "text-red-500" },
                  { l: "Soc_Eng", v: 42, c: "text-amber-500" },
                  { l: "Malware", v: 12, c: "text-emerald-500" },
                ].map((m, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono uppercase font-black">
                      <span className="text-slate-500">{m.l}</span>
                      <span className={m.c}>{m.v}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${m.v}%` }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className={`h-full bg-current ${m.c}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
