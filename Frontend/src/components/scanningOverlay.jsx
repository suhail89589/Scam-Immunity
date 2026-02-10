import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, Activity, Cpu, Database } from "lucide-react";

// PERFORMANCE: Pre-generate data stream outside component to prevent re-calculating random strings
const BINARY_STREAM = Array.from({ length: 100 })
  .map(() => Math.random().toString(2).substring(2, 50))
  .join("\n");

const ScanningOverlay = ({ isError = false, onTimeout }) => {
  const [logIndex, setLogIndex] = useState(0);

  const logs = useMemo(
    () => [
      "INITIALIZING_NEURAL_VECTORS...",
      "EXTRACTING_METADATA_HEADERS...",
      "ANALYZING_SEMANTIC_INTENT...",
      "CROSS_REFERENCING_PHISHING_DB...",
      "CHECKING_DOMAIN_REPUTATION...",
      "SCANNED_PACKETS_WIPED_FROM_RAM...",
      "FINALIZING_THREAT_VERDICT...",
    ],
    [],
  );

  useEffect(() => {
    // LOGIC: Added a watchdog timer to prevent infinite looping if backend hangs
    const timeout = setTimeout(() => {
      if (onTimeout) onTimeout();
    }, 15000); // 15s Max Scan Time

    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % logs.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [logs.length, onTimeout]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020617]/98 backdrop-blur-2xl flex flex-col items-center justify-center overflow-hidden select-none">
      {/* 1. OPTIMIZED BACKGROUND DATA STREAM */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none font-mono text-[10px] text-emerald-500/40 overflow-hidden">
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
          className="whitespace-pre-wrap break-all leading-none p-4"
        >
          {BINARY_STREAM}
          {BINARY_STREAM}
        </motion.div>
      </div>

      <div className="relative scale-110 md:scale-125">
        <div className="relative w-80 h-[450px] border border-emerald-500/30 bg-slate-950/80 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.15)]">
          {/* SCANNER LINE */}
          <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[2px] z-20 bg-emerald-400 shadow-[0_0_15px_#10b981]"
            style={{ willChange: "top" }}
          />

          <div className="absolute inset-0 p-6 flex flex-col items-center">
            <div className="relative w-24 h-24 mb-10 mt-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-emerald-500/40 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldAlert
                  className="text-emerald-500 animate-pulse"
                  size={32}
                />
              </div>
            </div>

            <div className="w-full space-y-4 font-mono">
              <div className="flex items-center gap-2 border-b border-emerald-500/20 pb-2">
                <Terminal size={14} className="text-emerald-500" />
                <span className="text-white font-black text-[10px] uppercase tracking-widest">
                  Process_ID: {Math.floor(Math.random() * 9000) + 1000}
                </span>
              </div>

              <div className="min-h-[60px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={logIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-emerald-400 text-[9px] font-bold uppercase tracking-widest"
                  >
                    {`> ${logs[logIndex]}`}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-3 opacity-60">
                <Activity size={10} className="text-emerald-500" />
                <div className="h-[1px] flex-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: ["10%", "90%", "10%"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-emerald-500/10">
                <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 uppercase">
                  <Cpu size={10} /> Core: ACTIVE
                </div>
                <div className="flex items-center gap-2 text-[8px] font-black text-slate-500 uppercase">
                  <Database size={10} /> RAM: WIPED
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-8 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-full"
        >
          <span className="text-emerald-500 font-mono text-xs font-black tracking-[0.4em] uppercase">
            ANALYSIS_IN_PROGRESS
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default ScanningOverlay;
