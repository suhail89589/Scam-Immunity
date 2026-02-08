import React from "react";
import { motion } from "framer-motion";

const Comparison = () => {
  const features = [
    {
      label: "0-Day Phishing Detection",
      legacy: "24-48h Delay",
      scami: "Real-time Neural",
    },
    {
      label: "Social Engineering Analysis",
      legacy: "None",
      scami: "Behavioral Patterns",
    },
    {
      label: "Deep-Link Interception",
      legacy: "Blacklist Only",
      scami: "Sandboxed Execution",
    },
    {
      label: "Neural Link Encryption",
      legacy: "No",
      scami: "AES-512 Protocol",
    },
  ];

  return (
    // Added 'relative z-10' and forced text-white to prevent inheritance issues
    <div className="relative z-10 max-w-5xl mx-auto py-20 px-4 bg-transparent text-white">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-emerald-500 font-mono text-sm tracking-[0.5em] uppercase mb-4"
        >
          Core_Comparison
        </motion.h2>
        <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
          Legacy vs <span className="text-emerald-500">SCAM I</span>
        </h3>
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-3 gap-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-6 px-6">
        <span>Feature_Set</span>
        <span className="text-center">Standard_Web</span>
        <span className="text-right text-emerald-500 underline decoration-emerald-500/20">
          SCAM_I_OS
        </span>
      </div>

      <div className="space-y-3">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            // Fixed: Explicitly used bg-[#0f172a]/40 (Slate 900) to ensure it stays dark
            className="flex justify-between items-center p-6 bg-[#0f172a]/40 border border-slate-800 rounded-lg hover:border-emerald-500/30 transition-all hover:bg-[#0f172a]/60 group"
          >
            <span className="text-white font-bold text-sm md:text-base group-hover:text-emerald-50 hover:transition-colors">
              {f.label}
            </span>

            <span className="text-slate-500 line-through decoration-red-500/50 text-xs md:text-sm">
              {f.legacy}
            </span>

            <span className="text-emerald-400 font-black text-xs md:text-sm shadow-emerald-500/20 drop-shadow-sm">
              {f.scami}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Footer Meta-data for that 'connected' feel */}
      <div className="mt-8 text-center">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
          // Comparison_Data: Verified_By_Neural_Audit_2026 //
        </p>
      </div>
    </div>
  );
};

export default Comparison;
