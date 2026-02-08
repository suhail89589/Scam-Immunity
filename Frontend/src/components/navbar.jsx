import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Menu,
  X,
  Lock,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar background transparency
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Solutions", href: "#solutions" },
    { name: "Network", href: "#network" },
    { name: "Database", href: "#database" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative group">
          {/* Main Container */}
          <div
            className={`relative flex items-center justify-between transition-all duration-500 bg-slate-950/40 backdrop-blur-xl border border-emerald-500/10 px-6 py-3 rounded-2xl ${scrolled ? "shadow-[0_0_30px_rgba(16,185,129,0.05)]" : ""}`}
          >
            {/* LEFT: Logo "Scam I" */}
            <div className="flex items-center gap-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 cursor-pointer group/logo"
              >
                <div className="relative flex items-center justify-center">
                  <ShieldAlert className="text-emerald-500 w-8 h-8 relative z-10" />
                  {/* Pulse Effect */}
                  <div className="absolute inset-0 bg-emerald-500/30 blur-xl rounded-full animate-pulse" />
                  {/* Scan Line Animation */}
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute left-0 right-0 h-[2px] bg-emerald-400 z-20 shadow-[0_0_10px_#34d399]"
                  />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                  SCAM{" "}
                  <span className="text-emerald-500 group-hover/logo:text-emerald-400 transition-colors">
                    I
                  </span>
                </span>
              </motion.div>

              {/* Desktop Menu Items */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="relative text-xs font-mono font-bold tracking-[0.2em] text-slate-400 uppercase hover:text-emerald-400 transition-colors duration-300 py-2 group/link"
                  >
                    {link.name}
                    {/* The Green Glow Underline */}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-500 shadow-[0_0_15px_#10b981] transition-all duration-300 group-hover/link:w-full" />
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT: Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-mono font-bold text-slate-300 hover:text-emerald-400 transition-all group/contact">
                <MessageSquare
                  size={16}
                  className="text-emerald-500 group-hover/contact:rotate-12 transition-transform"
                />
                CONTACT_US
              </button>

              <button className="relative group/btn overflow-hidden px-6 py-2.5 rounded-lg border border-emerald-500/50 bg-emerald-500/5 transition-all active:scale-95">
                {/* Glow Background on Hover */}
                <div className="absolute inset-0 bg-emerald-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

                <span className="relative z-10 flex items-center gap-2 text-sm font-bold text-emerald-500 group-hover/btn:text-slate-950 transition-colors">
                  <Lock size={14} />
                  LOGIN.EXE
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-400 hover:text-emerald-400 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 mt-2 md:hidden bg-slate-950 border border-emerald-500/20 rounded-2xl overflow-hidden backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  className="text-xl font-mono font-bold text-slate-300 flex items-center justify-between group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="group-hover:text-emerald-400 transition-colors">{`> ${link.name}`}</span>
                  <ChevronRight
                    size={20}
                    className="text-emerald-500 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all"
                  />
                </motion.a>
              ))}

              <div className="h-[1px] bg-white/5 w-full" />

              <div className="flex flex-col gap-3">
                <button className="w-full py-4 text-slate-400 font-mono text-sm border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                  CONTACT_SUPPORT
                </button>
                <button className="w-full py-4 bg-emerald-500 text-slate-950 font-black rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:bg-emerald-400 transition-colors">
                  TERMINAL LOGIN
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
