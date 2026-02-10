import React from "react";
import { motion } from "framer-motion";
import {
  Share2,
  Cpu,
  ShieldAlert,
  FileSearch,
  Radio,
  ChevronDown,
} from "lucide-react";

const Step = ({ number, title, desc, icon: Icon, isLast }) => (
  <div className="relative flex flex-col items-center group">
    {/* Connection Line (Desktop) */}
    {!isLast && (
      <div className="hidden lg:block absolute top-16 left-1/2 w-full h-[2px] bg-slate-800/50 overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
        />
      </div>
    )}

    {/* Mobile Down Arrow */}
    {!isLast && (
      <div className="lg:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 text-slate-800 animate-bounce">
        <ChevronDown size={24} />
      </div>
    )}

    <motion.div
      whileHover={{ scale: 1.1, rotate: 2 }}
      className="relative z-10 w-32 h-32 flex items-center justify-center cursor-help"
    >
      <div className="absolute inset-0 bg-emerald-500/5 rotate-45 rounded-[2rem] border border-emerald-500/20 group-hover:border-emerald-500/60 transition-all duration-500 shadow-inner" />
      <div className="relative z-20 flex flex-col items-center">
        <Icon
          size={36}
          className="text-emerald-500 mb-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        />
        <span className="text-[9px] font-mono text-emerald-400 font-black tracking-widest uppercase">
          {number}
        </span>
      </div>
    </motion.div>

    <div className="mt-10 text-center max-w-[220px]">
      <h3 className="text-white font-black text-xl mb-3 italic tracking-tight uppercase group-hover:text-emerald-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-500 text-xs font-bold leading-relaxed uppercase tracking-widest font-mono">
        {desc}
      </p>
    </div>
  </div>
);

const Workflow = () => {
  const steps = [
    {
      number: "INIT_01",
      icon: Share2,
      title: "Input Data",
      desc: "Secure portal for suspicious link/email/SMS ingestion.",
    },
    {
      number: "SCAN_02",
      icon: FileSearch,
      title: "Neural Scan",
      desc: "Breaks down syntax, intent, and domain reputation.",
    },
    {
      number: "PROC_03",
      icon: Cpu,
      title: "Categorization",
      desc: "AI identifies threat type matching structural signatures.",
    },
    {
      number: "OUT_04",
      icon: ShieldAlert,
      title: "The Verdict",
      desc: "Receive threat score and a safe action plan.",
    },
  ];

  return (
    <section
      id="network"
      className="py-32 bg-[#020617] border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 font-mono text-[10px] font-black mb-6">
            <Radio size={14} className="animate-pulse" /> PROTOCOL_V7:
            OPERATIONAL_FLOW
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-4">
            HOW <span className="text-emerald-500">SCAM I</span> PROTECTS YOU
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-0 relative">
          {steps.map((s, i) => (
            <Step key={i} {...s} isLast={i === steps.length - 1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 p-10 border border-emerald-500/10 bg-slate-950/40 backdrop-blur-3xl rounded-[3rem] flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />
          <div className="flex-1 text-center lg:text-left">
            <h4 className="text-white font-black text-2xl mb-4 italic uppercase tracking-tight">
              Privacy-First Architecture
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl font-medium">
              We never store content. Every query is processed in a{" "}
              <span className="text-emerald-400 font-bold">
                Volatile RAM Environment
              </span>{" "}
              and wiped within 60 seconds of the verdict.
            </p>
          </div>
          <div className="flex gap-6">
            {[
              { t: "AES", l: "ENCRYPTED" },
              { t: "TLS", l: "TUNNEL" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center text-emerald-500 font-mono font-black text-lg shadow-[inset_0_0_10px_rgba(16,185,129,0.1)]">
                  {item.t}
                </div>
                <span className="text-[9px] text-slate-500 font-black tracking-widest">
                  {item.l}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Workflow;
