import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError(""); // Clear previous errors

    try {
      // PRODUCTION API CALL
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        // Generic error message to prevent account enumeration
        throw new Error(
          data.message || "AUTHENTICATION_FAILED: Invalid credentials.",
        );
      }

      // PERSISTENCE: Save session token
      localStorage.setItem("guardian_session_token", data.token);

      // OPTIONAL: Update a Global AuthContext here if applicable

      navigate("/dashboard");
    } catch (err) {
      console.error("AUTH_LOG:", err.message);
      setError(err.message);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <AuthLayout
      title="Terminal Access"
      subtitle="// Please enter your credentials"
    >
      <form className="space-y-6" onSubmit={handleLogin}>
        {/* Error Alert Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-500 text-[10px] font-mono uppercase"
          >
            <AlertCircle size={14} /> {error}
          </motion.div>
        )}

        <div>
          <label className="block text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em] mb-2">
            Neural_Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
            <input
              required
              type="email"
              autoComplete="email"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-mono text-sm"
              placeholder="name@nexus.com"
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
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
              required
              type="password"
              autoComplete="current-password"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-mono text-sm"
              placeholder="••••••••"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
        </div>

        <button
          disabled={isAuthenticating}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-black font-black uppercase tracking-[0.2em] rounded-xl transition-all flex items-center justify-center gap-2 group [clip-path:polygon(5%_0,100%_0,95%_100%,0%_100%)]"
        >
          {isAuthenticating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying_Identity...
            </>
          ) : (
            <>
              Authorize Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <p className="text-center text-slate-500 text-xs font-mono uppercase tracking-tight pt-4">
          New to the network?{" "}
          <Link
            to="/signup"
            className="text-emerald-500 hover:underline transition-colors"
          >
            Register Identity
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
