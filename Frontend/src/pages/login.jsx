import React from "react";
import AuthLayout from "./AuthLayout";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <AuthLayout
      title="Terminal Access"
      subtitle="// Please enter your credentials"
    >
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em] mb-2">
            Neural_Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="email"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-mono text-sm"
              placeholder="name@nexus.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em] mb-2">
            Access_Key
          </label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="password"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-mono text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2 group [clip-path:polygon(5%_0,100%_0,95%_100%,0%_100%)]">
          Authorize Access
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-center text-slate-500 text-xs font-mono uppercase tracking-tight pt-4">
          New to the network?{" "}
          <Link to="/signup" className="text-emerald-500 hover:underline">
            Register Identity
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
