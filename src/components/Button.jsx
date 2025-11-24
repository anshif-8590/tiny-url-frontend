// src/components/Button.js
import React from "react";

export default function Button({ children, className = "", disabled, ...props }) {
  return (
    <button
      disabled={disabled}
      className={
        "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium " +
        "bg-indigo-500 text-white hover:bg-indigo-600 disabled:cursor-not-allowed " +
        "disabled:opacity-60 transition " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}
