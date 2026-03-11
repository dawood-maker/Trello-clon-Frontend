// src/components/Dashboard/ProfileModal/ProfileInfoFields.js
import React from "react";

const ProfileInfoFields = ({ user, isEditing, editName, setEditName, editGender, setEditGender }) => {
  return (
    <div className="space-y-3">

      {/* Name */}
      <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
        <svg className="w-8 h-8 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">Name</p>
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 border border-blue-300 rounded-lg text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              autoFocus
            />
          ) : (
            <p className="text-lg font-bold text-gray-900">
              {user?.name || "User Name Not Set"}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
        <svg className="w-8 h-8 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <div>
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="text-lg font-bold text-gray-900 truncate">
            {user?.email || "email@notprovided.com"}
          </p>
        </div>
      </div>

      {/* Gender - sirf edit mode mein */}
      {isEditing && (
        <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
          <span className="text-2xl shrink-0">⚧</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-2">Gender</p>
            <div className="flex gap-3">
              {["male", "female", "other"].map((g) => (
                <button
                  key={g}
                  onClick={() => setEditGender(g)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition ${
                    editGender === g
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {g === "male" ? "👨 Male" : g === "female" ? "👩 Female" : "🧑 Other"}
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