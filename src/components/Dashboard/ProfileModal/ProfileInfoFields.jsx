// src/components/Dashboard/ProfileModal/ProfileInfoFields.js
import React from "react";

const ProfileInfoFields = ({
  user,
  isEditing,
  editName,
  setEditName,
  editGender,
  setEditGender,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

      {/* ── Name Field ── */}
      <div
        className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 border border-gray-100 hover:border-blue-200 rounded-xl transition-all duration-200"
        style={{ gap: "10px", padding: "10px" }}
      >
        <div
          className="flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md flex-shrink-0"
          style={{ width: "36px", height: "36px" }}
        >
          <svg style={{ width:"18px", height:"18px" }} className="text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="font-semibold text-blue-500 uppercase tracking-wider" style={{ fontSize: "10px", marginBottom: "3px" }}>
            Full Name
          </p>
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-white border-2 border-blue-300 rounded-lg text-gray-900 font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              style={{ padding: "5px 10px", fontSize: "14px" }}
              placeholder="Enter your name..."
              autoFocus
            />
          ) : (
            <p className="font-bold text-gray-800 truncate" style={{ fontSize: "14px" }}>
              {user?.name || "Name not set"}
            </p>
          )}
        </div>
      </div>

      {/* ── Email Field ── */}
      <div
        className="flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 border border-gray-100 hover:border-emerald-200 rounded-xl transition-all duration-200"
        style={{ gap: "10px", padding: "10px" }}
      >
        <div
          className="flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md flex-shrink-0"
          style={{ width: "36px", height: "36px" }}
        >
          <svg style={{ width:"18px", height:"18px" }} className="text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="font-semibold text-emerald-500 uppercase tracking-wider" style={{ fontSize: "10px", marginBottom: "3px" }}>
            Email Address
          </p>
          <p className="font-bold text-gray-800 truncate" style={{ fontSize: "14px" }}>
            {user?.email || "email@notprovided.com"}
          </p>
        </div>

        {/* Verified badge */}
        <div
          className="flex items-center gap-1 bg-emerald-100 text-emerald-600 rounded-full font-semibold flex-shrink-0"
          style={{ padding: "2px 8px", fontSize: "11px" }}
        >
          <svg style={{ width:"11px", height:"11px" }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Verified
        </div>
      </div>

      {/* ── Gender Field ── */}
      {isEditing && (
        <div
          className="flex items-start bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl transition-all duration-200"
          style={{ gap: "10px", padding: "10px" }}
        >
          <div
            className="flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-md flex-shrink-0"
            style={{ width: "36px", height: "36px", marginTop: "2px" }}
          >
            <svg style={{ width:"18px", height:"18px" }} className="text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="font-semibold text-violet-500 uppercase tracking-wider" style={{ fontSize: "10px", marginBottom: "8px" }}>
              Gender
            </p>
            <div style={{ display: "flex", gap: "6px" }}>
              {[
                { value: "male",   label: "👨 Male",   active: { background: "#3B82F6", borderColor: "#3B82F6", color: "white", boxShadow: "0 4px 10px rgba(59,130,246,0.35)" } },
                { value: "female", label: "👩 Female", active: { background: "#EC4899", borderColor: "#EC4899", color: "white", boxShadow: "0 4px 10px rgba(236,72,153,0.35)" } },
                { value: "other",  label: "🧑 Other",  active: { background: "#8B5CF6", borderColor: "#8B5CF6", color: "white", boxShadow: "0 4px 10px rgba(139,92,246,0.35)" } },
              ].map(({ value, label, active }) => (
                <button
                  key={value}
                  onClick={() => setEditGender(value)}
                  style={{
                    flex: 1,
                    padding: "5px 4px",
                    borderRadius: "9999px",
                    border: "2px solid",
                    fontSize: "clamp(10px, 2.8vw, 13px)",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                    ...(editGender === value
                      ? active
                      : { background: "white", borderColor: "#E5E7EB", color: "#6B7280" }),
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfoFields;