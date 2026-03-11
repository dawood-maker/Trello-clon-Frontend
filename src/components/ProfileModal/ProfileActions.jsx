// src/components/Dashboard/ProfileModal/ProfileActions.js
import React from "react";

const ProfileActions = ({ isEditing, loading, onEdit, onCancel, onSave }) => {
  if (isEditing) {
    return (
      <div className="mt-4 flex gap-3 justify-end">
        <button
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={loading}
          className="px-5 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition disabled:opacity-60"
        >
          {loading ? "Saving..." : " Save Changes"}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 flex gap-3 justify-end">
      <button
        onClick={onEdit}
        className="px-5 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
      >
         Edit Profile
      </button>
    </div>
  );
};

export default ProfileActions;