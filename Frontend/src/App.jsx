import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

// --- Components ---
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Impact from "./components/Impact";
import Features from "./components/features";
import Comparison from "./sections/comparison";
import Workflow from "./components/how";

// --- Pages ---
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AnalyzerPage from "./pages/AnalyzerPage";
import ResultPage from "./pages/ResultPage";

// 1. SECURITY: Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("guardian_session_token");
  // In production, verify token expiration here
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Behavior 'instant' is default for modern browsers
  }, [pathname]);
  return null;
};

const LandingPage = () => (
  <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative z-10"
  >
    <section id="home" className="scroll-mt-20">
      <Hero />
    </section>
    <section id="impact" className="scroll-mt-20">
      <Impact />
    </section>
    <section id="features" className="scroll-mt-20">
      <Features />
    </section>
    <section
      id="tech-specs"
      className="py-20 bg-slate-950/20 border-y border-emerald-500/10"
    >
      <Comparison />
    </section>
    <section id="protocol" className="bg-slate-950/40 scroll-mt-20">
      <Workflow />
    </section>
  </motion.main>
);

function App() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <ScrollToTop />
      <div className="relative bg-[#020617] min-h-screen selection:bg-emerald-500/30 selection:text-emerald-300 font-sans antialiased">
        {/* Scroll Progress Bar */}
        {!shouldReduceMotion && (
          <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-emerald-500 origin-left z-[110]"
            style={{ scaleX, willChange: "transform" }}
            aria-hidden="true"
          />
        )}

        {/* 2. OPTIMIZED BACKGROUND: Layered via CSS instead of JS objects for performance */}
        <div
          className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 opacity-[0.05] bg-cyber-grid" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/[0.03] blur-[120px]" />
        </div>

        <Navbar />

        {/* 3. PAGE TRANSITION WRAPPER */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 4. PROTECTED ROUTES: Encapsulated for security */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analyzer"
              element={
                <ProtectedRoute>
                  <AnalyzerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/result/:scanId"
              element={
                <ProtectedRoute>
                  <ResultPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}

export default App;
