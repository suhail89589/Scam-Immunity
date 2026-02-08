import React from "react";
import AuthLayout from "./AuthLayout";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <AuthLayout
      title="Identity Initialization"
      subtitle="// Establishing New Protocol link"
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em] mb-2">
              Display_Name
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-mono text-sm"
                placeholder="Agent_01"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em] mb-2">
              Neural_Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="email"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-mono text-sm"
                placeholder="agent@nexus.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em] mb-2">
              Master_Key
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="password"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all font-mono text-sm"
                placeholder="Create Password"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 py-4">
          <input
            type="checkbox"
            className="accent-emerald-500 bg-slate-900 border-slate-800 rounded"
          />
          <p className="text-[10px] text-slate-500 font-mono leading-none">
            I accept the{" "}
            <span className="text-emerald-500">Neural Privacy Protocol</span>
          </p>
        </div>

        <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2 group [clip-path:polygon(5%_0,100%_0,95%_100%,0%_100%)]">
          Initialize Shield
          <ShieldCheck className="w-4 h-4" />
        </button>

        <p className="text-center text-slate-500 text-xs font-mono uppercase tracking-tight pt-4">
          Identity exists?{" "}
          <Link to="/login" className="text-emerald-500 hover:underline">
            Access Terminal
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
