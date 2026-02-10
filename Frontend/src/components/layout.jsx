import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  // 1. PRODUCTION SCROLL FIX: Instant jump for navigation
  useEffect(() => {
    // Disable smooth scroll for route changes to ensure instant context switch
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col relative">
      {/* SKIP LINK: Accessibility Requirement */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:p-4 focus:bg-emerald-500 focus:text-slate-950"
      >
        Skip to content
      </a>

      {/* 2. OPTIMIZED BACKGROUND: Using opacity instead of heavy blur re-paints */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Hardware Accelerated Glows */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full"
          style={{ transform: "translateZ(0)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"
          style={{ transform: "translateZ(0)" }}
        />
      </div>

      <Navbar />

      {/* 3. OPTIMIZED PAGE TRANSITIONS: Opacity only to prevent Layout Thrashing */}
      <main
        id="main-content"
        className="flex-grow relative z-10 outline-none"
        tabIndex="-1"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
            style={{ willChange: "opacity" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
