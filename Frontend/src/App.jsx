import React, { useEffect } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

// Component Imports
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Impact from "./components/Impact";
import Features from "./components/features";
import Comparison from "./sections/comparison"; // Added for credibility
import Workflow from "./components/how";
import Footer from "./components/footer";

function App() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

 return (
    /* We add a hardcoded bg-[#020617] here as a safety net */
    <div className="relative bg-[#020617] bg-cyber-dark min-h-screen selection:bg-emerald-500/30 selection:text-emerald-300 font-sans antialiased">
      
      {/* 1. Progress Bar */}
      {!shouldReduceMotion && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-emerald-500 origin-left z-[100]"
          style={{ scaleX }}
          aria-hidden="true"
        />
      )}

      {/* 2. Global Background Effects - Fixed the "White Lines" */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* We use inline styles for the grid to prevent white flicker during load */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #10b98122 1px, transparent 1px), linear-gradient(to bottom, #10b98122 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Glow Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        <section id="home"><Hero /></section>
        <section id="impact" className="relative scroll-mt-20"><Impact /></section>
        <section id="features" className="py-20 scroll-mt-20"><Features /></section>

        {/* 3. The Comparison Section - Fixed the "White Section" bug */}
        <section id="tech-specs" className="py-20 bg-[#020617]/50 border-y border-emerald-500/5">
          <Comparison />
        </section>

        <section id="protocol" className="bg-slate-950/50 scroll-mt-20"><Workflow /></section>

        {/* CTA and Footer follow... */}
      </main>
      <Footer />
    </div>
  );
}


export default App