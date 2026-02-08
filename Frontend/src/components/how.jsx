import React from "react";
import { motion } from "framer-motion";
import {
  Share2,
  Cpu,
  ShieldAlert,
  FileSearch,
  ArrowRight,
  Radio,
} from "lucide-react";

const Step = ({ number, title, desc, icon: Icon, isLast }) => (
  <div className="relative flex flex-col items-center group">
    {/* Connection Line (Desktop) */}
    {!isLast && (
      <div className="hidden lg:block absolute top-16 left-1/2 w-full h-[2px] bg-slate-800">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_10px_#10b981]"
        />
      </div>
    )}

    {/* Step Icon Hexagon */}
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="relative z-10 w-32 h-32 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-emerald-500/10 rotate-45 rounded-2xl border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors" />
      <div className="relative z-20 flex flex-col items-center">
        <Icon size={32} className="text-emerald-500 mb-1" />
        <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-tighter uppercase">
          {number}
        </span>
      </div>
    </motion.div>

    {/* Text Content */}
    <div className="mt-8 text-center max-w-[200px]">
      <h3 className="text-white font-bold text-lg mb-2 italic">{title}</h3>
      <p className="text-slate-500 text-xs font-medium leading-relaxed uppercase tracking-tighter font-mono">
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
      desc: "Paste your suspicious link, email header, or SMS text into our secure portal.",
    },
    {
      number: "SCAN_02",
      icon: FileSearch,
      title: "Neural Scan",
      desc: "Our ML engine breaks down the syntax, intent, and domain reputation in real-time.",
    },
    {
      number: "PROC_03",
      icon: Cpu,
      title: "Categorization",
      desc: "AI identifies the scam type—from Whaling to Phishing—matching structural signatures.",
    },
    {
      number: "OUT_04",
      icon: ShieldAlert,
      title: "The Verdict",
      desc: "Receive a threat score, a 'Why it's a scam' breakdown, and a safe action plan.",
    },
  ];

  return (
    <section className="py-24 bg-[#020617] border-t border-white/5 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 font-mono text-xs mb-4">
            <Radio size={14} className="animate-pulse" />
            PROTOCOL_V7: OPERATIONAL_FLOW
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white italic">
            HOW <span className="text-emerald-500 tracking-widest">SCAM I</span>{" "}
            PROTECTS YOU
          </h2>
          <p className="text-slate-500 font-mono text-sm mt-4 uppercase tracking-[0.2em]">
            End-to-End Encryption & AI Analysis
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
          {steps.map((step, index) => (
            <Step key={index} {...step} isLast={index === steps.length - 1} />
          ))}
        </div>

        {/* Safe Action Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-24 p-8 border border-emerald-500/20 bg-slate-900/40 rounded-3xl flex flex-col lg:flex-row items-center gap-8 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-full">
            Security Guarantee
          </div>

          <div className="flex-1">
            <h4 className="text-white font-bold text-xl mb-2 italic">
              Privacy-First Architecture
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              We never store the content of your scans. Every query is processed
              in a transient memory environment and wiped within 60 seconds of
              the verdict being issued. Your data is your business—keeping it
              safe is ours.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-mono font-bold">
                AES
              </div>
              <span className="text-[9px] text-slate-500 font-mono">
                ENCRYPTED
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-mono font-bold">
                TLS
              </div>
              <span className="text-[9px] text-slate-500 font-mono">
                TUNNEL
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Workflow;
