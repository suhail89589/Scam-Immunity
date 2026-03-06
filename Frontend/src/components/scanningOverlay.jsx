import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ShieldAlert,
  Cpu,
  Database,
  Activity,
  Lock,
  Globe,
} from "lucide-react";

const ScanningOverlay = () => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const SCAN_TIME = 15000; // Synchronized 40 Seconds

  const logs = useMemo(
    () => [
      "BOOTING_NEURAL_ENGINE...",
      "ESTABLISHING_SECURE_TUNNEL...",
      "DECRYPTING_PACKET_HEADERS...",
      "INJECTING_HEURISTIC_PROBES...",
      "PARSING_DOM_STRUCTURE...",
      "EXTRACTING_METADATA_ARRAY...",
      "CROSS_REFERENCING_THREAT_INTEL...",
      "DECRYPTING_HIDDEN_PAYLOADS...",
      "MAPPING_SOCIAL_ENGINEERING...",
      "IDENTIFYING_SPOOFED_ENTITIES...",
      "VALIDATING_NETWORK_HOPS...",
      "COMPILING_RISK_SCORE...",
    ],
    [],
  );

  useEffect(() => {
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / SCAN_TIME) * 100, 100);
      setProgress(newProgress);

      // Update logs sequentially based on progress percentage
      const logStep = 100 / logs.length;
      const currentLog = Math.floor(newProgress / logStep);
      setLogIndex(Math.min(currentLog, logs.length - 1));

      if (newProgress >= 100) clearInterval(timer);
    }, 50);

    return () => clearInterval(timer);
  }, [logs.length]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center font-mono overflow-hidden">
      {/* BACKGROUND AMBIANCE */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center">
        {/* BIG DATA VISUALIZER */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-16 flex items-center justify-center">
          {/* Background Rotating Ghost Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl md:text-9xl font-black text-emerald-500/5 select-none leading-none">
              {Math.round(progress)}
            </span>
          </div>

          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-emerald-500/10 rounded-full"
          />

          {/* Scanning Sweep */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full bg-gradient-to-tr from-emerald-500/20 to-transparent opacity-40"
            style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 50%)" }}
          />

          {/* Inner Shield */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 bg-[#020617] border border-emerald-500/40 rounded-full flex flex-col items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.15)]">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ShieldAlert size={48} className="text-emerald-500 mb-1" />
            </motion.div>
            <span className="text-emerald-500 text-xl font-black">
              {Math.round(progress)}%
            </span>
            <span className="text-[8px] text-emerald-500/50 tracking-[0.3em] font-bold">
              ANALYZING
            </span>
          </div>
        </div>

        {/* SYSTEM CONSOLE */}
        <div className="w-full bg-slate-950/80 border border-emerald-500/20 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="bg-slate-900/50 px-5 py-3 border-b border-emerald-500/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
              Packet_Inspector_Secure_Session
            </span>
          </div>

          <div className="p-8 space-y-8">
            {/* Progress Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-emerald-500 font-black tracking-widest">
                  THREAT_ENGINE_CORES
                </span>
                <span className="text-xs text-emerald-500/80 font-bold">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Log Stream */}
            <div className="flex items-start gap-4 h-12">
              <Terminal size={18} className="text-emerald-500 shrink-0 mt-1" />
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={logIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-emerald-400 text-sm font-bold tracking-tight uppercase"
                  >
                    {`> ${logs[logIndex]}`}
                  </motion.div>
                </AnimatePresence>
                <div className="text-[10px] text-slate-600 mt-1">
                  SECURE_LAYER_ADDR: 0x
                  {Math.random().toString(16).slice(2, 10).toUpperCase()}
                </div>
              </div>
            </div>

            {/* Metric Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-emerald-500/10">
              <Metric icon={<Cpu size={12} />} label="CPU" val="STABLE" />
              <Metric icon={<Database size={12} />} label="RAM" val="CLEARED" />
              <Metric icon={<Lock size={12} />} label="SSL" val="VALID" />
              <Metric icon={<Globe size={12} />} label="CDN" val="BYPASSED" />
            </div>
          </div>
        </div>

        {/* Pitch Hint */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-10 text-[10px] text-emerald-500/40 uppercase tracking-[0.5em] font-black"
        >
          Deep_Packet_Inspection_In_Progress
        </motion.div>
      </div>
    </div>
  );
};

const Metric = ({ icon, label, val }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-1.5 text-slate-500">
      {icon}{" "}
      <span className="text-[8px] font-black tracking-tighter uppercase">
        {label}
      </span>
    </div>
    <span className="text-[10px] text-emerald-400 font-bold">{val}</span>
  </div>
);

export default ScanningOverlay;
