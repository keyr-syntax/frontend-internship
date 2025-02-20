import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "animate.css";
import "@/styles/globals.css";
import { Toaster } from "./components/ui/toaster.tsx";
import ContextProvider from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
        <Toaster />
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);
