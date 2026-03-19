import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const ResetConfirmModal = ({ isOpen, onCancel, onConfirm }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* ── Keyframe Animations (only animations, no layout styles) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes rm-backdrop-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes rm-card-in {
          from { opacity: 0; transform: scale(0.88) translateY(24px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes rm-icon-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.35); }
          50%       { box-shadow: 0 0 0 14px rgba(239,68,68,0); }
        }
        @keyframes rm-icon-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes rm-shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-5px); }
          40%     { transform: translateX(5px); }
          60%     { transform: translateX(-3px); }
          80%     { transform: translateX(3px); }
        }
        @keyframes rm-stripe-move {
          from { background-position: 0 0; }
          to   { background-position: 40px 40px; }
        }
        .rm-backdrop { animation: rm-backdrop-in 0.25s ease forwards; }
        .rm-card     { animation: rm-card-in 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .rm-icon-ring { animation: rm-icon-pulse 1.8s ease-in-out infinite; }
        .rm-icon-ring:hover .rm-spin-icon { animation: rm-icon-spin 0.6s ease-in-out; }
        .rm-warning-stripe {
          background-image: repeating-linear-gradient(
            45deg,
            rgba(239,68,68,0.06) 0px, rgba(239,68,68,0.06) 10px,
            transparent 10px, transparent 20px
          );
          animation: rm-stripe-move 2.5s linear infinite;
        }
        .rm-btn-cancel { transition: all 0.18s ease; }
        .rm-btn-cancel:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .rm-btn-reset  { transition: all 0.18s ease; }
        .rm-btn-reset:hover  { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(239,68,68,0.45); }
        .rm-btn-reset:active { animation: rm-shake 0.35s ease; }
        .rm-top-glow {
          background: linear-gradient(90deg, transparent, rgba(239,68,68,0.7), transparent);
        }
        .rm-card-bg {
          background: linear-gradient(160deg, #0f172a 0%, #1e1b2e 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(239,68,68,0.12);
        }
        .rm-icon-bg {
          background: linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.08));
        }
        .rm-reset-btn-bg {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
        }
        .rm-font-syne  { font-family: 'Syne', sans-serif; }
        .rm-font-dm    { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        className="rm-backdrop fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-[rgba(2,8,20,0.72)]"
        onClick={onCancel}
      >
        {/* ── Modal Card ── */}
        <div
          className="rm-card rm-card-bg rm-font-dm relative flex flex-col items-center gap-[18px] w-[420px] rounded-3xl border border-red-500/25 p-10 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top glow line */}
          <div className="rm-top-glow absolute top-0 left-[20%] right-[20%] h-[2px] rounded-full" />

          {/* ── Reset Icon ── */}
          <div className="rm-icon-ring rm-icon-bg w-[72px] h-[72px] rounded-full border border-red-500/40 flex items-center justify-center mb-1">
            <svg
              className="rm-spin-icon"
              width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="rgba(239,68,68,0.9)" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </div>

          {/* ── Heading ── */}
          <div className="text-center">
            <h2 className="rm-font-syne font-extrabold text-[26px] text-slate-50 m-0 tracking-tight">
              Reset Everything?
            </h2>
            <p className="mt-2 text-slate-400/85 text-sm font-normal leading-relaxed">
              This action is{" "}
              <span className="text-red-400 font-semibold">permanent</span>{" "}
              and cannot be undone.
            </p>
          </div>

          {/* ── Warning Box ── */}
          <div className="rm-warning-stripe w-full border border-red-500/30 rounded-xl px-[18px] py-[14px] flex items-center gap-3 bg-red-500/[0.06]">
            <svg
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#f87171" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p className="m-0 text-red-300/90 text-[13.5px] font-medium leading-relaxed">
              All boards, columns, and cards will be{" "}
              <strong className="text-red-300">permanently deleted</strong>.
            </p>
          </div>

          {/* ── Divider ── */}
          <div className="w-full h-px bg-white/[0.06]" />

          {/* ── Buttons ── */}
          <div className="flex gap-3 w-full">
            <button
              className="rm-btn-cancel rm-font-dm flex-1 py-[13px] rounded-xl border border-white/10 bg-white/5 text-slate-300/90 font-semibold text-[15px] cursor-pointer"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="rm-btn-reset rm-reset-btn-bg rm-font-dm flex-1 py-[13px] rounded-xl border-0 text-white font-bold text-[15px] cursor-pointer tracking-wide"
              onClick={onConfirm}
            >
              Yes, Reset All
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default ResetConfirmModal;