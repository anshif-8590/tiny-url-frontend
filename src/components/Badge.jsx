// src/components/Badge.js
import React from "react";

export default function Badge({ children, color = "slate" }) {
  const map = {
    slate: "bg-slate-800 text-slate-200 border-slate-700",
    green: "bg-emerald-900/40 text-emerald-300 border-emerald-700",
    red: "bg-rose-900/40 text-rose-300 border-rose-700",
  };
  const cls = map[color] || map.slate;

  return (
    <span
      className={
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium " +
        cls
      }
    >
      {children}
    </span>
  );
}
