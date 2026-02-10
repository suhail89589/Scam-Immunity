import React, { useMemo } from "react";
import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AuthLayout = ({ children, title, subtitle }) => {
  // PERFORMANCE: Pre-calculate animation props outside render cycle
  const glowVariants = {
    animate: {
      opacity: [0.05, 0.15, 0.05],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* 1. CYBER BACKGROUND: Grid & Flickering Server Glows */}
      <div
        className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-[0.05] pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* Optimized Background Glows - willChange used for GPU acceleration */}
      <motion.div
        variants={glowVariants}
        animate="animate"
        style={{ willChange: "opacity" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[150px] rounded-full"
      />
      <motion.div
        variants={glowVariants}
        animate="animate"
        style={{ willChange: "opacity" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full"
      />

      <div className="w-full max-w-[460px] relative z-[50]">
        {/* 2. LOGO: Return Home - Added A11y */}
        <Link
          to="/"
          aria-label="Return to landing page"
          className="flex items-center gap-3 mb-12 justify-center group outline-none focus:ring-2 focus:ring-emerald-500/20 rounded-lg p-2"
        >
          <ShieldAlert className="text-emerald-500 w-10 h-10 group-hover:rotate-12 transition-transform duration-500" />
          <span className="text-3xl font-black tracking-tighter text-white uppercase italic">
            SCAM <span className="text-emerald-500">I</span>
          </span>
        </Link>

        {/* 3. AUTH CARD: Glassmorphism & Scanline */}
        <div className="bg-slate-900/60 backdrop-blur-3xl border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden ring-1 ring-white/5">
          {/* Top Scanline Border Animation */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
          />

          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
              {title}
            </h1>
            <p className="text-slate-500 font-mono text-[10px] mt-3 uppercase tracking-[0.3em] font-black italic">
              {subtitle}
            </p>
          </div>

          {/* Form Content Area */}
          <main className="relative">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
