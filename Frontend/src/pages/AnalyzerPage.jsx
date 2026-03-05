import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Link2,
  FileText,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import ScanningOverlay from "../components/scanningOverlay";

const MOCK_MODE = true;

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
    if (!content.trim() || content.length > 5000 || isAnalyzing) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      if (MOCK_MODE) {
        // Simulated Scan Time
        await new Promise((resolve) => setTimeout(resolve, 2500));

        const mockResult = {
          level: "Critical",
          percentage: 98.2,
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

        // CRITICAL FIX: Set analyzing to false BEFORE navigating to prevent state collisions
        setIsAnalyzing(false);
        navigate("/result", { state: mockResult, replace: true });
        return;
      }

      // Production Fetch
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

      if (!response.ok) throw new Error("UPSTREAM_SERVICE_FAILURE");
      const result = await response.json();

      setIsAnalyzing(false);
      navigate("/result", {
        state: { ...result, analyzedAt: new Date().toLocaleTimeString() },
      });
    } catch (err) {
      setError("System Offline: Use Mock Mode for presentation.");
      setIsAnalyzing(false);
    }
  }, [content, activeTab, isAnalyzing, navigate]);

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-12 px-4 relative overflow-hidden">
      <AnimatePresence>
        {isAnalyzing && (
          <ScanningOverlay onTimeout={() => setIsAnalyzing(false)} />
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          opacity: isAnalyzing ? 0.3 : 1,
          filter: isAnalyzing ? "blur(10px)" : "blur(0px)",
        }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase">
            Verify_ <span className="text-emerald-500">Packet</span>
          </h1>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[2.5rem] overflow-hidden">
          <div className="flex bg-slate-950/80 border-b border-slate-800 p-3 gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setContent("");
                }}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-mono text-[11px] uppercase transition-all ${
                  activeTab === tab.id
                    ? "bg-emerald-500 text-slate-950 font-black"
                    : "text-slate-500 hover:bg-white/5"
                }`}
              >
                <tab.icon size={16} />{" "}
                <span className="hidden sm:inline">{tab.id}</span>
              </button>
            ))}
          </div>

          <div className="p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-mono">
                {error}
              </div>
            )}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={tabs.find((t) => t.id === activeTab).placeholder}
              className="w-full h-80 bg-transparent border-none p-0 text-emerald-100 font-mono text-base focus:ring-0 resize-none"
            />
            <div className="mt-12 flex flex-col items-center gap-8">
              <button
                onClick={handleAnalysis}
                disabled={!content.trim() || isAnalyzing}
                className="w-full max-w-md py-6 bg-emerald-500 disabled:bg-slate-800 text-slate-950 font-black uppercase tracking-[0.4em]"
              >
                {isAnalyzing ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "Initialize_Scan"
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyzerPage;
