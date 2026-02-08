import React from "react";
import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-[440px] relative z-10">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 mb-8 justify-center group"
        >
          <ShieldAlert className="text-emerald-500 w-8 h-8 group-hover:rotate-12 transition-transform" />
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
            SCAM <span className="text-emerald-500">I</span>
          </span>
        </Link>

        {/* Auth Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-right from-transparent via-emerald-500/50 to-transparent" />

          <div className="mb-8">
            <h1 className="text-2xl font-black text-white uppercase italic tracking-tight">
              {title}
            </h1>
            <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
