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
  console.log("📋 [ProfileInfoFields] Rendering fields, isEditing:", isEditing);
  console.log("📋 [ProfileInfoFields] Current name:", user?.name, "| editName:", editName);
  console.log("📋 [ProfileInfoFields] Current gender:", user?.gender, "| editGender:", editGender);

  return (
    <div className="space-y-2 sm:space-y-3">

      {/* ── Name Field ── */}
      <div className="group flex items-center gap-2 sm:gap-4 p-2.5 sm:p-3 rounded-xl border border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 hover:border-blue-200 transition-all duration-200">
        {/* Icon */}
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md flex-shrink-0">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-0.5">
            Full Name
          </p>
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => {
                console.log("✏️ [ProfileInfoFields] Name changed to:", e.target.value);
                setEditName(e.target.value);
              }}
              className="w-full px-2 sm:px-3 py-1 sm:py-1.5 bg-white border-2 border-blue-300 rounded-lg text-gray-900 font-bold text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              placeholder="Enter your name..."
              autoFocus
            />
          ) : (
            <p className="text-sm sm:text-base font-bold text-gray-800 truncate">
              {user?.name || "Name not set"}
            </p>
          )}
        </div>
      </div>

      {/* ── Email Field ── */}
      <div className="group flex items-center gap-2 sm:gap-4 p-2.5 sm:p-3 rounded-xl border border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50 hover:border-emerald-200 transition-all duration-200">
        {/* Icon */}
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md flex-shrink-0">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-0.5">
            Email Address
          </p>
          <p className="text-sm sm:text-base font-bold text-gray-800 truncate">
            {user?.email || "email@notprovided.com"}
          </p>
        </div>

        {/* Verified badge */}
        <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full text-xs font-semibold flex-shrink-0">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="hidden xs:inline">Verified</span>
        </div>
      </div>

      {/* ── Gender Field (only in edit mode) ── */}
      {isEditing && (
        <div className="flex items-start gap-2 sm:gap-4 p-2.5 sm:p-3 rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50 transition-all duration-200">
          {/* Icon */}
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-md flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold text-violet-500 uppercase tracking-wider mb-1.5 sm:mb-2">
              Gender
            </p>
            {/* Responsive gender buttons - wrap on small screens */}
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              {[
                { value: "male",   label: "👨 Male",   active: "bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-200" },
                { value: "female", label: "👩 Female", active: "bg-pink-500 border-pink-500 text-white shadow-md shadow-pink-200" },
                { value: "other",  label: "🧑 Other",  active: "bg-purple-500 border-purple-500 text-white shadow-md shadow-purple-200" },
              ].map(({ value, label, active }) => (
                <button
                  key={value}
                  onClick={() => {
                    console.log("⚧ [ProfileInfoFields] Gender changed to:", value);
                    setEditGender(value);
                  }}
                  className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 transition-all duration-200 ${
                    editGender === value
                      ? active
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
                  }`}
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