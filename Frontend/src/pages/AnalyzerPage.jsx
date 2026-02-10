import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Link2,
  FileText,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";
import ScanningOverlay from "../components/scanningOverlay";

const AnalyzerPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Email");
  const [content, setContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const tabs = [
    {
      id: "Email",
      icon: Mail,
      placeholder: "GENERATE_DEEP_SCAN: Paste full email headers or content...",
    },
    {
      id: "SMS",
      icon: MessageSquare,
      placeholder: "INTENT_ANALYSIS: Paste suspicious text or sender ID...",
    },
    {
      id: "URL",
      icon: Link2,
      placeholder: "DOMAIN_REPUTATION: https://suspicious-site.com/login",
    },
    {
      id: "Text",
      icon: FileText,
      placeholder:
        "BEHAVIORAL_CORE: Paste any suspicious social engineering message...",
    },
  ];

  const handleAnalysis = useCallback(async () => {
    // 1. INPUT VALIDATION: Ensure content isn't empty or excessively long (Max 5000 chars)
    if (!content.trim() || content.length > 5000 || isAnalyzing) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // 2. REAL PRODUCTION API CALL
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/v1/analyze`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: content,
            category: activeTab.toLowerCase(),
            timestamp: new Date().toISOString(),
          }),
        },
      );

      if (!response.ok) throw new Error("UPSTREAM_SERVICE_FAILURE");

      const result = await response.json();

      // 3. NAVIGATION TO RESULT WITH REAL DATA
      navigate("/result", {
        state: {
          ...result,
          analyzedAt: new Date().toLocaleTimeString(),
        },
      });
    } catch (err) {
      console.error("ANALYSIS_ERROR:", err);
      setError(
        "Analysis failed. Please check your network or try a shorter input.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  }, [content, activeTab, isAnalyzing, navigate]);

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      
      <AnimatePresence>
        {isAnalyzing && (
          <ScanningOverlay onTimeout={() => setIsAnalyzing(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`max-w-4xl mx-auto transition-all duration-1000 ${isAnalyzing ? "blur-2xl scale-110 pointer-events-none" : ""}`}
      >
        <div className="text-center mb-12">
          {/* ... Header remains visually similar ... */}
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-4">
            Verify_ <span className="text-emerald-500">Packet</span>
          </h1>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[2.5rem] overflow-hidden relative">
          <div className="flex bg-slate-950/80 border-b border-slate-800 p-3 gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setContent("");
                  setError(null);
                }}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-mono text-[11px] uppercase tracking-widest transition-all ${
                  activeTab === tab.id
                    ? "bg-emerald-500 text-slate-950 font-black"
                    : "text-slate-500 hover:bg-white/5"
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.id}</span>
              </button>
            ))}
          </div>

          <div className="p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-xs font-mono">
                <AlertTriangle size={16} /> {error}
              </div>
            )}

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={tabs.find((t) => t.id === activeTab).placeholder}
              className="w-full h-80 bg-transparent border-none p-0 text-emerald-100 font-mono text-base placeholder:text-slate-800 focus:ring-0 resize-none"
            />

            <div className="mt-12 flex flex-col items-center gap-8">
              <button
                onClick={handleAnalysis}
                disabled={!content.trim() || isAnalyzing}
                className="group relative w-full max-w-md py-6 bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black uppercase tracking-[0.4em] transition-all"
              >
                <span className="flex items-center justify-center gap-4 relative z-10">
                  {isAnalyzing ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Initialize_Scan"
                  )}
                </span>
              </button>
              <p className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.2em]">
                Protocol: Secure Sandbox v4.2 // Max_Chars: 5000
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyzerPage;
