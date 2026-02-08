import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  ShieldCheck,
  Globe,
  AlertCircle,
  Ban,
} from "lucide-react";

const StatCard = ({ label, value, subtext, color }) => (
  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
    <div className={`absolute top-0 left-0 w-1 h-full ${color}`} />
    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-2">
      {label}
    </p>
    <h3 className="text-3xl font-black text-white mb-1">{value}</h3>
    <p className="text-slate-400 text-xs font-medium">{subtext}</p>
  </div>
);

const Impact = () => {
  const targets = [
    {
      title: "Senior Citizens",
      risk: "HIGH",
      desc: "Targeted via 'Grandparent' & Social Security scams.",
      icon: Users,
    },
    {
      title: "SME Businesses",
      risk: "CRITICAL",
      desc: "Business Email Compromise (BEC) and invoice fraud.",
      icon: Globe,
    },
    {
      title: "Digital Investors",
      risk: "HIGH",
      desc: "Fake exchanges and 'Pig Butchering' crypto schemes.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-24 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* SECTION HEADER */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-white italic leading-none mb-6">
              THE <span className="text-red-500">CRISIS</span> VS. <br />
              OUR <span className="text-emerald-500">SOLUTION.</span>
            </h2>
            <p className="text-slate-400 max-w-lg font-medium">
              Scammers steal over{" "}
              <span className="text-white font-bold">$10 Billion annually</span>{" "}
              through social engineering. Scam I provides the first line of
              defense for the most vulnerable targets.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label="GLOBAL_LOSS_PREVENTED"
              value="$1.2M+"
              subtext="Projected savings for users"
              color="bg-emerald-500"
            />
            <StatCard
              label="THREATS_NEUTRALIZED"
              value="450K"
              subtext="Detected malicious patterns"
              color="bg-cyan-500"
            />
          </div>
        </div>

        {/* TARGET ANALYSIS GRID */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {targets.map((target, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800 relative group transition-all"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 group-hover:border-red-500/50 transition-colors">
                  <target.icon className="w-8 h-8 text-slate-400 group-hover:text-red-500 transition-colors" />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest border ${
                    target.risk === "CRITICAL"
                      ? "border-red-500 text-red-500 bg-red-500/10"
                      : "border-orange-500 text-orange-500 bg-orange-500/10"
                  }`}
                >
                  {target.risk}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                {target.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {target.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* THE "HOW WE SAVE THEM" VISUAL */}
        <div className="relative rounded-[40px] bg-emerald-500 p-1 overflow-hidden">
          <div className="bg-[#020617] rounded-[38px] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-mono text-xs mb-6">
                <ShieldCheck size={14} />
                MISSION_PROTECT_ENABLED
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white italic mb-6">
                Bridging the{" "}
                <span className="text-emerald-500">Security Gap.</span>
              </h3>

              <ul className="space-y-4">
                {[
                  { icon: Ban, text: "Zero-Trust Link Sanitization" },
                  {
                    icon: AlertCircle,
                    text: "Real-time Urgency & Pressure Detection",
                  },
                  {
                    icon: ShieldCheck,
                    text: "Automated Reporting to Local Authorities",
                  },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-300 font-medium"
                  >
                    <item.icon className="text-emerald-500 w-5 h-5" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative w-full lg:w-1/3 aspect-square bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center">
              {/* Visual Placeholder for a 'Impact Graph' or 'Heatmap' */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#10b981_0%,transparent_70%)]" />
              <div className="text-center z-10">
                <p className="text-emerald-500 font-mono text-6xl font-black">
                  98%
                </p>
                <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em] mt-2">
                  Detection Rate
                </p>
              </div>
              {/* Decorative scanning line */}
              <motion.div
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-emerald-500/20 z-20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
