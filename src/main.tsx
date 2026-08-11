// @ts-nocheck
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import SKLoveApp from "./sk-love/App";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminPanelPage } from "./pages/AdminPanelPage";
import { AudioPartyPage } from "./sk-love/pages/AudioPartyPage";
import { VideoStreamPage } from "./sk-love/pages/VideoStreamPage";
import { PKBattlePage } from "./sk-love/pages/PKBattlePage";
import { GamesPage } from "./sk-love/pages/GamesPage";
import { GiftsPage } from "./sk-love/pages/GiftsPage";
import { useKeepScreenAwake } from "./hooks/useKeepScreenAwake";
import "./styles.css";

const queryClient = new QueryClient();

function AppRoutes() {
  useKeepScreenAwake();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<SKLoveApp />} />
      <Route
        path="/party"
        element={<AudioPartyPage onBack={() => navigate("/")} />}
      />
      <Route
        path="/live-video"
        element={<VideoStreamPage onBack={() => navigate("/")} />}
      />
      <Route
        path="/pk-battle"
        element={<PKBattlePage onBack={() => navigate("/")} />}
      />
      <Route
        path="/games"
        element={<GamesPage onBack={() => navigate("/")} />}
      />
      <Route
        path="/gifts"
        element={<GiftsPage onBack={() => navigate("/")} />}
      />
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/admin-panel" element={<AdminPanelPage />} />
    </Routes>
  );
}

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster position="top-center" richColors closeButton />
    </QueryClientProvider>
  </StrictMode>
);
