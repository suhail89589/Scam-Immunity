import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Search,
  Zap,
  ListTree,
  AlertTriangle,
  Fingerprint,
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, desc, tag, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="group relative p-8 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-emerald-500/50 transition-all duration-500 overflow-hidden"
  >
    {/* Animated Corner Accent */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 -mr-8 -mt-8 rounded-full group-hover:bg-emerald-500/10 transition-colors" />

    {/* Header */}
    <div className="flex items-start justify-between mb-6">
      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl group-hover:border-emerald-500/30 transition-colors">
        <Icon className="w-8 h-8 text-emerald-500 shadow-[0_0_15px_#10b981]" />
      </div>
      <span className="text-[10px] font-mono text-emerald-500/50 tracking-tighter uppercase font-bold">
        {tag}
      </span>
    </div>

    {/* Content */}
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
      {title}
    </h3>
    <p className="text-slate-400 text-sm leading-relaxed font-medium">{desc}</p>

    {/* Bottom Status Bar */}
    <div className="mt-8 pt-6 border-t border-slate-800/50 flex items-center justify-between">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-4 h-1 bg-emerald-500/20 rounded-full overflow-hidden"
          >
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              className="w-full h-full bg-emerald-500"
            />
          </div>
        ))}
      </div>
      <span className="text-[10px] font-mono text-slate-500">SYSTEM_READY</span>
    </div>
  </motion.div>
);

const Features = () => {
  const coreFeatures = [
    {
      icon: Search,
      tag: "Analysis_Module_01",
      title: "Real-Time Fraud Detection",
      desc: "Paste any suspicious email, link, or message. Our ML models cross-reference millions of known scam signatures in milliseconds.",
    },
    {
      icon: Fingerprint,
      tag: "Analysis_Module_02",
      title: "Semantic Intent Engine",
      desc: "Our models don't just look for keywords; they analyze the psychology and intent behind the message to spot sophisticated social engineering.",
    },
    {
      icon: ListTree,
      tag: "Analysis_Module_03",
      title: "Scam Categorization",
      desc: "Instantly identify if you're dealing with Phishing, Ransomware lures, or 'Pig Butchering' schemes based on structural patterns.",
    },
    {
      icon: ShieldCheck,
      tag: "Analysis_Module_04",
      title: "Counter-Action Protocol",
      desc: "Receive actionable, safe steps. From reporting to the provider to securing your credentials—never guess your next move.",
    },
  ];

  return (
    <section id="solutions" className="py-24 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-[2px] w-12 bg-emerald-500" />
            <span className="text-emerald-500 font-mono font-bold tracking-widest text-sm uppercase">
              Core Intelligence
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tight">
            DECODING DECEPTION WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              NEURAL PRECISION.
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreFeatures.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        {/* Feature Visual Detail: The "Processing" Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-8 rounded-3xl bg-slate-900/20 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="relative">
              <Zap className="text-emerald-500 w-10 h-10 animate-bounce" />
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl" />
            </div>
            <div>
              <p className="text-white font-bold text-lg italic">
                Neural Analysis Active
              </p>
              <p className="text-slate-500 text-sm font-mono">
                Current Efficiency: 99.8% Accuracy Rate
              </p>
            </div>
          </div>
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-[10px] font-bold text-emerald-500"
              >
                0{i}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-[#020617] bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs">
              +
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
