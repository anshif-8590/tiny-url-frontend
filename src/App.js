// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import StatsPage from "./pages/StatsPage";
import HealthPage from "./pages/HealthPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold">
                T
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-tight">
                  TinyLink
                </span>
                <span className="text-[11px] text-slate-400">
                  Simple URL shortener
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-3 text-sm">
              <Link to="/" className="rounded-full px-3 py-1 text-slate-300 hover:bg-slate-800 hover:text-slate-50">
                Dashboard
              </Link>
              <Link to="/healthz" className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/40 hover:bg-emerald-500/20">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Health
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/code/:code" element={<StatsPage />} />
            <Route path="/healthz" element={<HealthPage />} />
          </Routes>
        </main>

       
      </div>
    </BrowserRouter>
  );
}

export default App;
