import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>

    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 3500,

        style: {
          background: "#0F172A",
          color: "#FFFFFF",
          border: "1px solid rgba(34,211,238,0.25)",
          borderRadius: "16px",
          padding: "16px",
          fontSize: "14px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
        },

        success: {
          iconTheme: {
            primary: "#22C55E",
            secondary: "#FFFFFF",
          },
        },

        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "#FFFFFF",
          },
        },

        loading: {
          iconTheme: {
            primary: "#06B6D4",
            secondary: "#FFFFFF",
          },
        },
      }}
    />

  </StrictMode>
);