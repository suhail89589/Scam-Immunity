import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
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

// Move static data outside to prevent re-allocation
const FOOTER_LINKS = {
  Protocol: ["Neural Scan", "Encryption", "Threat Map", "Database"],
  Company: ["Our Mission", "Ethics Board", "Impact Report", "Contact"],
  Legal: ["Privacy", "Terms Of Service", "Compliance"],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Helper to handle cross-page hash navigation
  const getLinkHref = (link) => {
    const hash = link.toLowerCase().replace(/ /g, "_");
    return location.pathname === "/" ? `#${hash}` : `/#${hash}`;
  };

  return (
    <footer className="relative bg-[#020617] pt-24 pb-12 overflow-hidden border-t border-emerald-500/10">
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <ShieldAlert className="text-emerald-500 w-8 h-8 group-hover:rotate-12 transition-transform" />
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                SCAM <span className="text-emerald-500">I</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm font-bold leading-relaxed max-w-sm">
              The world's first open-access Neural-Link™ scam detection engine.
              Behavioral analysis for the digital frontier.
            </p>

            <div
              className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 shadow-inner"
              role="status"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-mono text-emerald-500 font-black tracking-[0.3em] uppercase">
                System_Status: Optimal
              </span>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-8 underline decoration-emerald-500/50 decoration-2 underline-offset-8">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={getLinkHref(link)}
                      className="group flex items-center gap-3 text-slate-500 hover:text-emerald-400 text-xs font-black font-mono transition-all uppercase tracking-widest"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-all text-emerald-500 -ml-4 group-hover:ml-0">
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

        <div className="pt-10 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 text-[9px] font-mono text-slate-600 font-black tracking-[0.2em] uppercase">
            <p>© {currentYear} SCAM_I_CORE</p>
            <div className="flex items-center gap-2">
              <Cpu size={12} className="text-emerald-500/30" />
              <span>ENC_NODE: ACTIVE</span> {/* obfuscated version info */}
            </div>
            <div className="flex items-center gap-2">
              <Globe size={12} className="text-emerald-500/30" />
              <span>REGION: GLOBAL_EDGE</span>
            </div>
          </div>

          <div className="flex gap-4">
            {[
              {
                icon: Github,
                label: "GitHub",
                url: "https://github.com/scami",
              },
              {
                icon: Twitter,
                label: "Twitter",
                url: "https://twitter.com/scami",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                url: "https://linkedin.com/company/scami",
              },
              { icon: Terminal, label: "API_Docs", url: "/docs" },
            ].map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -4, backgroundColor: "rgba(16,185,129,0.1)" }}
                target="_blank"
                rel="noopener noreferrer"
                href={social.url}
                aria-label={social.label}
                className="w-12 h-12 rounded-xl border border-slate-800 flex items-center justify-center text-slate-500 hover:text-emerald-400 transition-all"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
