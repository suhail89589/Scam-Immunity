import React, { useMemo, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { Terminal, ShieldCheck, Activity, Search, Cpu } from "lucide-react";

const Hero = () => {
  const nodes = useMemo(() => [...Array(4)], []);

  // PERFORMANCE FIX: Using MotionValues instead of State to bypass React Render Cycle
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 50, damping: 20, restDelta: 0.001 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const moveX = useTransform(springX, [0, 1], [20, -20]);
  const moveY = useTransform(springY, [0, 1], [20, -20]);

  useEffect(() => {
    let frameId;
    const handleMouse = (e) => {
      // Use requestAnimationFrame to throttle mouse updates to screen refresh rate
      frameId = requestAnimationFrame(() => {
        mouseX.set(e.clientX / window.innerWidth);
        mouseY.set(e.clientY / window.innerHeight);
      });
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(frameId);
    };
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen w-full bg-[#020617] overflow-hidden flex items-center justify-center pt-20">
      {/* BACKGROUND OPTIMIZATION: added will-change-transform and pointer-events-none */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-[conic-gradient(from_0deg,transparent_0deg,#10b98115_20deg,transparent_40deg)] rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] tracking-tighter mb-8"
            role="status"
          >
            <Activity size={12} className="animate-pulse" aria-hidden="true" />
            SYSTEM_SCAN_ACTIVE: THREAT_LEVEL_LOW
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.85] mb-8">
            EXPOSE THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500">
              INVISIBLE.
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-lg mb-12 font-medium leading-relaxed italic">
            Utilizing <span className="text-emerald-400">Neural-Link™</span> to
            neutralize fraudulent signatures before they breach your network.
          </p>

          <div className="flex flex-wrap gap-6">
            <button
              aria-label="Start scam detection engine"
              className="group relative px-10 py-5 bg-emerald-500 rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3 text-slate-950 font-black tracking-widest uppercase italic">
                START_DECRYPTION <Terminal size={20} />
              </span>
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </button>
            <button
              aria-label="Query threat database"
              className="px-10 py-5 bg-slate-900 border border-slate-700 text-white font-bold rounded-xl hover:border-emerald-500/50 transition-all flex items-center gap-3 active:scale-95"
            >
              <Search size={20} className="text-emerald-500" />
              DATABASE_QUERY
            </button>
          </div>
        </motion.div>

        {/* Visual Shield Section */}
        <div
          className="relative flex items-center justify-center h-full select-none"
          aria-hidden="true"
        >
          <motion.div
            style={{ x: moveX, y: moveY }}
            className="relative w-80 h-80 md:w-[450px] md:h-[450px] flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-emerald-500/10 rounded-full"
            />
            <div className="relative z-10 bg-slate-950/80 p-12 rounded-full border border-emerald-500/50 shadow-[0_0_80px_rgba(16,185,129,0.2)] backdrop-blur-md">
              <ShieldCheck
                size={100}
                className="text-emerald-500 animate-pulse"
              />
            </div>

            {nodes.map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className={`absolute p-3 bg-slate-900/90 backdrop-blur-lg border border-emerald-500/20 rounded-xl hidden md:flex items-center gap-3 ${
                  i === 0
                    ? "-top-4 -right-8"
                    : i === 1
                      ? "top-1/2 -left-20"
                      : i === 2
                        ? "-bottom-4 right-10"
                        : "bottom-24 -right-20"
                }`}
              >
                <Cpu size={14} className="text-emerald-400" />
                <span className="text-[10px] font-mono text-emerald-100 tracking-[0.2em]">
                  NODE_PRT_0{i + 1}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
