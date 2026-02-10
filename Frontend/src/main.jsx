import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";



const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "CRITICAL_ERROR: Root element not found. Failed to mount Neural Shield.",
  );
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </BrowserRouter>
  </StrictMode>,
);
