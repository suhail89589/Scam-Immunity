import React from "react";
import { motion } from "framer-motion";
import { Terminal, ShieldCheck, Activity, Search, Cpu } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#020617] overflow-hidden flex items-center justify-center pt-20">
      {/* 1. CYBER BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Radar Scanning Effect */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[conic-gradient(from_0deg,transparent_0deg,#10b98120_20deg,transparent_40deg)] rounded-full"
        />
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Copy & CTA */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs mb-6">
            <Activity size={14} className="animate-pulse" />
            LIVE_SCANNING_ACTIVE: v4.0.2
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-6">
            EXPOSE THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              INVISIBLE.
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-10 font-medium leading-relaxed">
            Scam I uses proprietary{" "}
            <span className="text-emerald-400">Neural-Link™</span> technology to
            identify and neutralize fraudulent infrastructure before it reaches
            your network.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="group relative px-8 py-4 bg-emerald-500 rounded-lg overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              <span className="relative z-10 flex items-center gap-2 text-slate-950 font-black italic">
                START_DECRYPTION <Terminal size={18} />
              </span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.2 }}
              />
            </button>

            <button className="px-8 py-4 bg-slate-900 border border-slate-700 text-white font-bold rounded-lg hover:bg-slate-800 hover:border-emerald-500/50 transition-all flex items-center gap-2 group">
              <Search
                size={18}
                className="text-emerald-500 group-hover:scale-125 transition-transform"
              />
              DATABASE_QUERY
            </button>
          </div>
        </motion.div>

        {/* Right Side: The "Hero Visual" (The Shield/Core) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex items-center justify-center"
        >
          {/* Animated Shield Core */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
            {/* Outer Rotating Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-emerald-500/20 rounded-full"
            />
            {/* Inner Rotating Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 border border-emerald-500/40 rounded-full border-t-emerald-400 border-l-emerald-400"
            />

            {/* The Main Icon */}
            <div className="relative z-10 bg-slate-950 p-10 rounded-full border border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
              <ShieldCheck
                size={80}
                className="text-emerald-500 animate-pulse"
              />
            </div>

            {/* Floating Data Nodes */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className={`absolute p-3 bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 rounded-lg flex items-center gap-2 ${
                  i === 0
                    ? "-top-4 -right-4"
                    : i === 1
                      ? "top-1/2 -left-12"
                      : i === 2
                        ? "-bottom-4 right-10"
                        : "bottom-20 -right-10"
                }`}
              >
                <Cpu size={14} className="text-emerald-400" />
                <span className="text-[10px] font-mono text-emerald-100 tracking-widest uppercase">
                  Node_{i + 204}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 3. FOOTER LOGS (The "Hacker" Detail) */}
      <div className="absolute bottom-8 left-8 hidden xl:block">
        <div className="text-[10px] font-mono text-slate-500 space-y-1">
          <p className="text-emerald-500/50 underline">SYSTEM_LOGS:</p>
          <p>INITIALIZING_HASH_CHECK... [OK]</p>
          <p>SCANNING_LOCAL_STORAGE... [CLEAN]</p>
          <p className="text-emerald-400">PACKET_FILTER_ENABLED</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
