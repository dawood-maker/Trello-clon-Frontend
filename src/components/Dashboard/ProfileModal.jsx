// src/components/Dashboard/ProfileModal.js
import React, { useState } from "react";
import axios from "axios";

// ✅ Gender Icons
const MaleIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
    <circle cx="32" cy="32" r="32" fill="#4A90D9" />
    <ellipse cx="32" cy="52" rx="14" ry="10" fill="#5BA3E8" />
    <circle cx="32" cy="24" r="12" fill="#FDDBB4" />
    <ellipse cx="32" cy="14" rx="12" ry="6" fill="#4A3728" />
    <path
      d="M22 42 Q32 46 42 42"
      stroke="#3A7BD5"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const FemaleIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
    <circle cx="32" cy="32" r="32" fill="#E91E8C" />
    <ellipse cx="32" cy="54" rx="16" ry="11" fill="#F06292" />
    <circle cx="32" cy="24" r="12" fill="#FDDBB4" />
    <ellipse cx="32" cy="13" rx="13" ry="7" fill="#3E2723" />
    <rect x="19" y="18" width="5" height="14" rx="2" fill="#3E2723" />
    <rect x="40" y="18" width="5" height="14" rx="2" fill="#3E2723" />
  </svg>
);

const OtherIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
    <circle cx="32" cy="32" r="32" fill="#7B1FA2" />
    <circle cx="32" cy="24" r="12" fill="#FDDBB4" />
    <ellipse cx="32" cy="52" rx="14" ry="10" fill="#9C27B0" />
    <ellipse cx="32" cy="14" rx="12" ry="6" fill="#4A3728" />
  </svg>
);

const BACKEND_URL = "http://localhost:5002";

const ProfileModal = ({ user, onClose, onUserUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editGender, setEditGender] = useState(user?.gender || "male");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const renderAvatar = () => {
    if (user?.profilePicture) {
      return (
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-4 border-blue-400 shadow-lg"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      );
    }
    return (
      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg">
        {user?.gender === "female" ? (
          <FemaleIcon />
        ) : user?.gender === "other" ? (
          <OtherIcon />
        ) : (
          <MaleIcon />
        )}
      </div>
    );
  };

  const handleSave = async () => {
    if (!editName.trim()) {
      setError("Name cannot be empty");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/auth/profile`,
        { name: editName.trim(), gender: editGender },
        { withCredentials: true },
      );
      if (res.data.success) {
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
        if (onUserUpdate) onUserUpdate(res.data.user);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Update failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[110] px-4 backdrop-blur-sm"
      style={{ paddingTop: "10px", paddingBottom: "10px" }}
    >
      <div
        className="bg-white rounded-xl w-full max-w-lg shadow-2xl"
        style={{
          paddingTop: "14px",
          paddingBottom: "14px",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-3">
          <h3 className="text-2xl font-extrabold text-gray-900">
            👤 User Profile
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-900 rounded-full transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-3">
          {renderAvatar()}
          {!user?.profilePicture && (
            <p className="text-xs text-gray-400 mt-1">
              {user?.gender === "female"
                ? "👩 Female"
                : user?.gender === "other"
                  ? "🧑 Other"
                  : "👨 Male"}
            </p>
          )}
        </div>

        {/* Messages */}
        {success && (
          <div className="mb-2 p-2 bg-green-50 border border-green-300 rounded-lg text-green-700 text-sm text-center">
            ✅ {success}
          </div>
        )}
        {error && (
          <div className="mb-2 p-2 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm text-center">
            ❌ {error}
          </div>
        )}

        {/* Info Fields */}
        <div className="space-y-3">
          {/* Name */}
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <svg
              className="w-8 h-8 text-blue-500 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
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
            <svg
              className="w-8 h-8 text-blue-500 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
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
                      {g === "male"
                        ? "👨 Male"
                        : g === "female"
                          ? "👩 Female"
                          : "🧑 Other"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-3 justify-end">
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditName(user?.name || "");
                  setEditGender(user?.gender || "male");
                  setError("");
                }}
                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition disabled:opacity-60"
              >
                {loading ? "Saving..." : "💾 Save Changes"}
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsEditing(true);
                setError("");
                setSuccess("");
              }}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
