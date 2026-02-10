import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const observer = useRef(null);

  // SECURE NAVIGATION LOGIC: Handle hash links across different pages
  const handleNavClick = (e, href) => {
    if (location.pathname !== "/") {
      e.preventDefault();
      // Navigate to home first, then the hash
      navigate(`/${href}`);
    }
    setIsOpen(false);
  };

  // PERFORMANCE: Optimized Scroll with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // STABILITY: Robust Section Observer
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }, // Better detection for mobile
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.current.observe(section));

    return () => observer.current?.disconnect();
  }, [location.pathname]); // Re-run if path changes to re-bind elements

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
        <div
          className={`relative flex items-center justify-between transition-all duration-500 bg-slate-950/60 backdrop-blur-2xl border-t border-white/10 border-x border-b border-emerald-500/10 px-6 py-3 rounded-2xl ${scrolled ? "shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-emerald-500/20" : ""}`}
        >
          <div className="flex items-center gap-10">
            <Link to="/" aria-label="Home" className="group/logo">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <ShieldAlert className="text-emerald-500 w-8 h-8 relative z-10 group-hover/logo:rotate-12 transition-transform" />
                  <div className="absolute inset-0 bg-emerald-500/30 blur-xl rounded-full animate-pulse" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                  SCAM <span className="text-emerald-500">I</span>
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-xs font-mono font-bold tracking-[0.2em] uppercase transition-all duration-300 py-2 group/link ${
                    activeSection === link.href.slice(1)
                      ? "text-emerald-400"
                      : "text-slate-400 hover:text-emerald-400"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-emerald-500 transition-all duration-300 ${activeSection === link.href.slice(1) ? "w-full shadow-[0_0_10px_#10b981]" : "w-0 group-hover/link:w-full"}`}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-mono font-bold text-slate-300 hover:text-emerald-400 transition-all group/contact">
              <MessageSquare
                size={16}
                className="text-emerald-500 group-hover:scale-110 transition-transform"
              />
              CONTACT_US
            </button>
            <Link to="/login">
              <button className="relative group/btn overflow-hidden px-6 py-2.5 rounded-lg border border-emerald-500/50 bg-emerald-500/5 transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2 text-sm font-bold text-emerald-500 group-hover/btn:text-slate-950 transition-colors">
                  <Lock size={14} /> LOGIN.EXE
                </span>
              </button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-slate-400"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-4 right-4 mt-2 md:hidden bg-slate-950 border border-emerald-500/20 rounded-2xl overflow-hidden backdrop-blur-3xl shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xl font-mono font-bold text-slate-300 flex items-center justify-between group"
                >
                  <span className="group-hover:text-emerald-400 transition-colors">{`> ${link.name}`}</span>
                  <ChevronRight
                    size={20}
                    className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all"
                  />
                </a>
              ))}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-emerald-500 text-slate-950 font-black text-center rounded-xl"
              >
                TERMINAL LOGIN
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
