import { useState } from "react";

const css = `
  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 1s linear infinite; transform-origin: center; }
`;

export default function Loading() {
  return (
    <>
      <style>{css}</style>
      <div className="min-h-screen flex items-center justify-center">
        <svg width="56" height="56" viewBox="0 0 48 48" className="spin">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="#E92F3030"
            strokeWidth="4"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="#006aff"
            strokeWidth="4"
            strokeDasharray="31.4 94.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
}