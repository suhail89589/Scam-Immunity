// src/components/Layout.jsx
import Navbar from './navbar';
import Footer from './footer';

const Layout = ({ children }) => (
  <div className="bg-cyber-dark min-h-screen selection:bg-emerald-500/20">
    <div className="fixed inset-0 bg-grid-pattern bg-[size:50px_50px] pointer-events-none" />
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);