// src/components/ui/CyberButton.jsx
export const CyberButton = ({ children, onClick, variant = "primary" }) => (
  <button 
    onClick={onClick}
    className={`
      relative px-8 py-3 font-black uppercase tracking-widest transition-all
      [clip-path:polygon(10%_0,100%_0,90%_100%,0%_100%)]
      ${variant === "primary" ? "bg-emerald-500 text-black hover:bg-emerald-400" : "bg-slate-800 text-white hover:bg-slate-700"}
    `}
  >
    {children}
  </button>
);