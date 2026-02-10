import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  ShieldCheck,
  Globe,
  AlertCircle,
  Ban,
  Info,
} from "lucide-react";

// Improved StatCard with clearer labeling
const StatCard = ({ label, value, subtext, color, isProjected }) => (
  <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/50 p-8 rounded-3xl relative overflow-hidden group">
    <div className={`absolute top-0 left-0 w-1.5 h-full ${color} opacity-50`} />
    <div className="flex justify-between items-start mb-4">
      <p className="text-slate-500 font-mono text-[10px] uppercase font-black tracking-[0.3em]">
        {label}
      </p>
      {isProjected && (
        <Info
          size={12}
          className="text-slate-600 hover:text-emerald-400 cursor-help"
          title="Based on current user growth and industry average loss per scam."
        />
      )}
    </div>
    <motion.h3
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl font-black text-white mb-2 tracking-tighter"
    >
      {value}
    </motion.h3>
    <p className="text-slate-400 text-xs font-bold italic">{subtext}</p>
  </div>
);

const Impact = () => {
  const targets = [
    {
      title: "Senior Citizens",
      risk: "HIGH",
      desc: "Targeted via 'Grandparent' & Social Security impersonation tactics.",
      icon: Users,
    },
    {
      title: "SME Businesses",
      risk: "CRITICAL",
      desc: "Business Email Compromise (BEC) and sophisticated invoice fraud.",
      icon: Globe,
    },
    {
      title: "Digital Investors",
      risk: "HIGH",
      desc: "Fraudulent exchanges and 'Pig Butchering' psychological schemes.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-32 bg-[#020617] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-black text-white italic leading-[0.9] mb-8 uppercase">
              THE <span className="text-red-500">CRISIS</span> VS. <br />
              OUR <span className="text-emerald-500">SOLUTION.</span>
            </h2>
            <p className="text-slate-400 max-w-lg text-lg leading-relaxed">
              Global losses to scams exceed{" "}
              <span className="text-white font-black border-b-2 border-red-500/50">
                $10 Billion annually
              </span>
              . Scam I provides the neural firewall for the human element.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StatCard
              label="SAVINGS_ESTIMATED"
              value="$1.2M+"
              subtext="Prevented loss projection"
              color="bg-emerald-500"
              isProjected={true}
            />
            <StatCard
              label="TOTAL_NEUTRALIZED"
              value="450K+"
              subtext="Unique threat signatures"
              color="bg-cyan-500"
            />
          </div>
        </div>

        {/* TARGET CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {targets.map((target, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="p-10 rounded-[2.5rem] bg-slate-900/30 border border-slate-800/50 hover:border-emerald-500/30 transition-all duration-500 group"
            >
              <div className="flex justify-between items-start mb-16">
                <div className="p-5 bg-slate-950 rounded-[1.5rem] border border-slate-800 group-hover:border-emerald-500/50 transition-all">
                  <target.icon className="w-10 h-10 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] border ${
                    target.risk === "CRITICAL"
                      ? "border-red-500/50 text-red-500 bg-red-500/5"
                      : "border-orange-500/50 text-orange-500 bg-orange-500/5"
                  }`}
                >
                  {target.risk}
                </span>
              </div>
              <h4 className="text-2xl font-black text-white mb-4 italic tracking-tight uppercase">
                {target.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {target.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* DETECTION RATE SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[3rem] bg-emerald-500 p-1"
        >
          <div className="bg-[#020617] rounded-[2.9rem] p-12 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative">
            <div className="flex-1 z-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 font-mono text-[10px] font-black tracking-[0.2em] mb-8">
                <ShieldCheck size={16} /> MISSION_PROTECT_ENABLED
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white italic mb-8 leading-tight">
                Defending the{" "}
                <span className="text-emerald-500">Human Element</span> in an
                Automated World.
              </h3>
              <ul className="space-y-6">
                {[
                  { icon: Ban, text: "Heuristic Link Sanitization" },
                  { icon: AlertCircle, text: "Behavioral Urgency Analysis" },
                  { icon: ShieldCheck, text: "Incident Reporting Gateway" },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 text-slate-300 font-bold uppercase text-xs tracking-widest"
                  >
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <item.icon className="text-emerald-500 w-5 h-5" />
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative w-full lg:w-[400px] aspect-square bg-slate-900/50 rounded-[2.5rem] border border-slate-800 flex flex-col items-center justify-center overflow-hidden">
              <div className="text-center z-10">
                <p className="text-emerald-500 font-mono text-8xl font-black tracking-tighter">
                  98%
                </p>
                <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em] font-black">
                  Accuracy_Score
                </p>
              </div>
              <motion.div
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;
