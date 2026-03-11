// src/components/Dashboard/ProfileModal/index.js
import React, { useState } from "react";
import axios from "axios";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfoFields from "./ProfileInfoFields";
import ProfileActions from "./ProfileActions";

const BACKEND_URL = "http://localhost:5002";

const ProfileModal = ({ user, onClose, onUserUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editGender, setEditGender] = useState(user?.gender || "male");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        { withCredentials: true }
      );
      if (res.data.success) {
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
        if (onUserUpdate) onUserUpdate(res.data.user);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(user?.name || "");
    setEditGender(user?.gender || "male");
    setError("");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[110] px-4 backdrop-blur-sm"
      style={{ paddingTop: "10px", paddingBottom: "10px" }}
    >
      <div
        className="bg-white rounded-xl w-full max-w-lg shadow-2xl"
        style={{ paddingTop: "14px", paddingBottom: "14px", paddingLeft: "24px", paddingRight: "24px" }}
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Avatar */}
        <ProfileAvatar user={user} />

        {/* Success / Error Messages */}
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
        <ProfileInfoFields
          user={user}
          isEditing={isEditing}
          editName={editName}
          setEditName={setEditName}
          editGender={editGender}
          setEditGender={setEditGender}
        />

        {/* Action Buttons */}
        <ProfileActions
          isEditing={isEditing}
          loading={loading}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onSave={handleSave}
        />

      </div>
    </div>
  );
};

export default ProfileModal;