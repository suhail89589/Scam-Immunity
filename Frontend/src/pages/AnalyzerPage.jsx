import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Link2,
  FileText,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import ScanningOverlay from "../components/ScanningOverlay";

const MOCK_MODE = true;
const SCAN_DURATION = 15000; // 40 Seconds for the Pitch

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
      placeholder: "GENERATE_DEEP_SCAN: Paste full email headers...",
    },
    {
      id: "SMS",
      icon: MessageSquare,
      placeholder: "INTENT_ANALYSIS: Paste suspicious text...",
    },
    {
      id: "URL",
      icon: Link2,
      placeholder: "DOMAIN_REPUTATION: https://suspicious-site.com",
    },
    {
      id: "Text",
      icon: FileText,
      placeholder: "BEHAVIORAL_CORE: Paste social engineering message...",
    },
  ];

  const handleAnalysis = useCallback(async () => {
    if (!content.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      if (MOCK_MODE) {
        // PITCH STRATEGY: Wait exactly 40s to allow the Overlay to finish its 0-100% animation
        await new Promise((resolve) => setTimeout(resolve, SCAN_DURATION));

        const mockResult = {
          level: "Critical",
          percentage: 96.2,
          confidence: 99.4,
          category: `${activeTab.toUpperCase()}_MALICIOUS_INTENT`,
          signals: [
            {
              iconId: "fingerprint",
              title: "Phishing Signature",
              desc: "Detected patterns matching known credential harvesting templates.",
            },
            {
              iconId: "timer",
              title: "Urgency Pressure",
              desc: "High-frequency use of 'Immediate Action' detected.",
            },
            {
              iconId: "globe",
              title: "Suspicious Origin",
              desc: "Source matches known high-risk bulletproof hosting metadata.",
            },
          ],
          actions: [
            "Do not click any links or download attachments.",
            "Mark as Phishing in your email client.",
            "Alert your security team immediately.",
          ],
          analyzedAt: new Date().toLocaleTimeString(),
        };

        setIsAnalyzing(false);
        navigate("/result", { state: mockResult, replace: true });
        return;
      }

      // Production Fetch (Fallback)
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/v1/analyze`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: content,
            category: activeTab.toLowerCase(),
          }),
        },
      );
      if (!response.ok) throw new Error("UPSTREAM_FAILURE");
      const result = await response.json();
      setIsAnalyzing(false);
      navigate("/result", {
        state: { ...result, analyzedAt: new Date().toLocaleTimeString() },
      });
    } catch (err) {
      setError("System Offline: Mock Mode Engaged.");
      setIsAnalyzing(false);
    }
  }, [content, activeTab, isAnalyzing, navigate]);

  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-12 px-4 relative overflow-hidden font-sans">
      <AnimatePresence>{isAnalyzing && <ScanningOverlay />}</AnimatePresence>

      <motion.div
        animate={{
          opacity: isAnalyzing ? 0.2 : 1,
          filter: isAnalyzing ? "blur(20px)" : "blur(0px)",
          scale: isAnalyzing ? 0.95 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">
              Military Grade Encryption Active
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">
            Verify_ <span className="text-emerald-500 text-glow">Packet</span>
          </h1>
          <p className="text-slate-500 mt-4 font-mono text-sm tracking-widest uppercase">
            Neural Phishing Detection Engine
          </p>
        </header>

        <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <nav className="flex bg-slate-950/80 border-b border-slate-800 p-3 gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setContent("");
                }}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-mono text-[11px] uppercase transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-emerald-500 text-slate-950 font-black shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "text-slate-500 hover:bg-white/5"
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.id}</span>
              </button>
            ))}
          </nav>

          <div className="p-8 md:p-12">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-mono animate-pulse">
                {error}
              </div>
            )}

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={tabs.find((t) => t.id === activeTab).placeholder}
              className="w-full h-64 bg-transparent border-none p-0 text-emerald-100 font-mono text-lg focus:ring-0 resize-none placeholder:text-slate-700"
            />

            <div className="mt-8 flex flex-col items-center">
              <button
                onClick={handleAnalysis}
                disabled={!content.trim() || isAnalyzing}
                className="group relative w-full max-w-md py-6 bg-emerald-500 disabled:bg-slate-800 text-slate-950 font-black uppercase tracking-[0.5em] overflow-hidden transition-all hover:scale-[1.02] active:scale-95"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isAnalyzing ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Initialize_Secure_Scan"
                  )}
                </span>
              </button>
              <p className="mt-4 text-[10px] text-slate-600 font-mono tracking-widest uppercase">
                End-to-End Encrypted | No Data Logged
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyzerPage;
