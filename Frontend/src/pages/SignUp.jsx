import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsInitializing(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "INITIALIZATION_FAILED");

      // SUCCESS: Store token and proceed
      localStorage.setItem("guardian_token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <AuthLayout
      title="Identity Initialization"
      subtitle="// Establishing New Protocol link"
    >
      <form className="space-y-4" onSubmit={handleSignup}>
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500 text-[10px] font-mono">
            <AlertCircle size={14} /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
              Display_Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                required
                type="text"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 transition-all font-mono text-sm"
                placeholder="Agent_01"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
              Neural_Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                required
                type="email"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 transition-all font-mono text-sm"
                placeholder="agent@nexus.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
              Master_Key
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                required
                type="password"
                minLength="8"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 transition-all font-mono text-sm"
                placeholder="Min 8 Characters"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <button
          disabled={isInitializing}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-black font-black uppercase rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {isInitializing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Initialize Shield"
          )}
        </button>

        <p className="text-center text-slate-500 text-[10px] font-mono uppercase pt-4">
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
