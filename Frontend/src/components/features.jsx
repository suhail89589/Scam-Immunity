import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Search, Zap, ListTree, Fingerprint } from "lucide-react";

// PERFORMANCE FIX: Separated the animation bars to use CSS transform-gpu
const LoadingBars = ({ index }) => (
  <div className="flex gap-1.5" aria-hidden="true">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="w-5 h-1 bg-emerald-500/10 rounded-full overflow-hidden"
      >
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 1.5 + index * 0.2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.3,
          }}
          style={{ willChange: "transform" }} // GPU Hint
          className="w-full h-full bg-emerald-500/60"
        />
      </div>
    ))}
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, tag, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }} // Trigger slightly before it enters
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className="group relative p-8 bg-slate-900/40 border border-slate-800 rounded-[2rem] hover:border-emerald-500/40 transition-all duration-500 overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 -mr-12 -mt-12 rounded-full group-hover:bg-emerald-500/10 transition-colors" />

    <div className="flex items-start justify-between mb-8">
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl group-hover:border-emerald-500/40 transition-colors">
        <Icon
          className="w-8 h-8 text-emerald-500 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform"
          aria-hidden="true"
        />
      </div>
      <span className="text-[10px] font-mono text-emerald-500/40 tracking-[0.2em] uppercase font-black">
        {tag}
      </span>
    </div>

    <h3 className="text-xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors italic tracking-tight">
      {title}
    </h3>
    <p className="text-slate-400 text-sm leading-relaxed font-medium mb-10">
      {desc}
    </p>

    <div className="mt-auto pt-6 border-t border-slate-800/50 flex items-center justify-between">
      <LoadingBars index={index} />
      <span className="text-[9px] font-mono text-slate-600 tracking-widest font-bold">
        CORE_LOADED
      </span>
    </div>
  </motion.article>
);

const Features = () => {
  const coreFeatures = [
    {
      icon: Search,
      tag: "MOD_01",
      title: "Real-Time Detection",
      desc: "ML models cross-reference millions of known scam signatures in milliseconds.",
    },
    {
      icon: Fingerprint,
      tag: "MOD_02",
      title: "Semantic Engine",
      desc: "Analyzes the psychology and intent behind messages to spot social engineering.",
    },
    {
      icon: ListTree,
      tag: "MOD_03",
      title: "Scam Categorization",
      desc: "Identify Phishing, Ransomware, or 'Pig Butchering' based on structural patterns.",
    },
    {
      icon: ShieldCheck,
      tag: "MOD_04",
      title: "Counter-Action",
      desc: "Receive actionable, safe steps—from reporting to securing your credentials.",
    },
  ];

  return (
    <section
      id="solutions"
      className="py-32 bg-[#020617] relative"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-24 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center md:justify-start gap-4 mb-6"
          >
            <div className="h-[1px] w-16 bg-emerald-500" aria-hidden="true" />
            <span className="text-emerald-500 font-mono font-black tracking-[0.3em] text-xs uppercase">
              Core Intelligence
            </span>
          </motion.div>
          <h2
            id="features-heading"
            className="text-5xl md:text-7xl font-black text-white italic leading-tight uppercase"
          >
            DECODING DECEPTION WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              NEURAL PRECISION.
            </span>
          </h2>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {coreFeatures.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} />
          ))}
        </div>

        {/* COMPLIANCE FIX: Added Aria labels and contextual clarity */}
        <motion.aside
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-1 rounded-[2.5rem] bg-gradient-to-r from-emerald-500/20 via-transparent to-cyan-500/20"
        >
          <div className="bg-slate-950/80 backdrop-blur-xl p-10 rounded-[2.4rem] flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-8">
              <div className="relative p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
                <Zap
                  className="text-emerald-500 w-12 h-12 animate-pulse"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
              </div>
              <div>
                <p className="text-white font-black text-2xl italic mb-1 tracking-tight uppercase">
                  Neural Analysis Active
                </p>
                <p className="text-slate-500 text-xs font-mono tracking-widest uppercase">
                  Efficiency: 99.8% Benchmarked Accuracy
                </p>
              </div>
            </div>
            <div
              className="flex -space-x-4"
              aria-label="Recent active threat nodes"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-full border-4 border-[#020617] bg-slate-900 flex items-center justify-center text-xs font-black text-emerald-500 shadow-xl"
                >
                  {i}
                </div>
              ))}
              <div className="w-14 h-14 rounded-full border-4 border-[#020617] bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xl">
                +
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

export default Features;
