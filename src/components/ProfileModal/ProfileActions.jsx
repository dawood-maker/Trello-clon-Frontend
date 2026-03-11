// src/components/Dashboard/ProfileModal/ProfileActions.js
import React from "react";

const ProfileActions = ({ isEditing, loading, onEdit, onCancel, onSave }) => {
  console.log("🔘 [ProfileActions] Rendering, isEditing:", isEditing, "| loading:", loading);

  if (isEditing) {
    return (
      <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-3 justify-end pt-3 border-t border-gray-100">
        {/* Cancel Button */}
        <button
          onClick={() => {
            console.log("❌ [ProfileActions] Cancel clicked");
            onCancel();
          }}
          disabled={loading}
          className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-gray-600 bg-gray-100 border-2 border-gray-200 rounded-xl hover:bg-gray-200 hover:border-gray-300 disabled:opacity-50 transition-all duration-200"
        >
          Cancel
        </button>

        {/* Save Button */}
        <button
          onClick={() => {
            console.log("💾 [ProfileActions] Save clicked");
            onSave();
          }}
          disabled={loading}
          className="relative px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white rounded-xl disabled:opacity-60 transition-all duration-200 overflow-hidden"
          style={{
            background: loading
              ? "#94A3B8"
              : "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
            boxShadow: loading ? "none" : "0 4px 15px rgba(99,102,241,0.4)",
          }}
        >
          {loading ? (
            <span className="flex items-center gap-1.5 sm:gap-2">
              <svg className="animate-spin w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 sm:mt-4 flex justify-end pt-3 border-t border-gray-100">
      <button
        onClick={() => {
          console.log("✏️ [ProfileActions] Edit Profile clicked");
          onEdit();
        }}
        className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
          boxShadow: "0 4px 15px rgba(99,102,241,0.4)",
        }}
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileActions;