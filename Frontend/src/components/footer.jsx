import React from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  Github,
  Twitter,
  Linkedin,
  Terminal,
  Cpu,
  Globe,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Protocol: ["Neural Scan", "Encryption", "Threat Map", "Database"],
    Company: ["Our Mission", "Ethics Board", "Impact Report", "Contact"],
    Legal: ["Privacy.exe", "Terms_Of_Service", "Compliance"],
  };

  return (
    <footer className="relative bg-[#020617] pt-20 pb-10 overflow-hidden border-t border-emerald-500/10">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6 group cursor-pointer">
              <ShieldAlert className="text-emerald-500 w-8 h-8 group-hover:rotate-12 transition-transform" />
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                SCAM <span className="text-emerald-500 italic">I</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm mb-8">
              The world's first open-access Neural-Link™ scam detection engine.
              Protecting the digital frontier through advanced behavioral
              analysis and real-time threat intelligence.
            </p>

            {/* System Status Indicator */}
            <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono text-emerald-500 font-bold tracking-widest uppercase">
                Global_Network: Operational
              </span>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-mono text-xs font-black uppercase tracking-[0.3em] mb-6 underline decoration-emerald-500/50 underline-offset-8">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="group flex items-center gap-2 text-slate-500 hover:text-emerald-400 text-sm font-mono transition-colors"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500 tracking-tighter -ml-4 group-hover:ml-0">
                        {">"}
                      </span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright/Meta */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] font-mono text-slate-600">
            <p>© {currentYear} SCAM_I_PROTOCOLS. ALL_RIGHTS_RESERVED.</p>
            <span className="hidden md:inline text-slate-800">|</span>
            <div className="flex items-center gap-2">
              <Cpu size={12} className="text-emerald-500/50" />
              <span>BUILD: v.2.0.4_BETA</span>
            </div>
            <span className="hidden md:inline text-slate-800">|</span>
            <div className="flex items-center gap-2">
              <Globe size={12} className="text-emerald-500/50" />
              <span>LATENCY: 14MS</span>
            </div>
          </div>

          {/* Social Ports */}
          <div className="flex gap-4">
            {[
              { icon: Github, label: "GitHub" },
              { icon: Twitter, label: "Twitter" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Terminal, label: "API" },
            ].map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -3, backgroundColor: "rgba(16,185,129,0.1)" }}
                href="#"
                className="w-10 h-10 rounded-lg border border-slate-800 flex items-center justify-center text-slate-500 hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-inner"
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
