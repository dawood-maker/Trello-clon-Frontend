// src/components/Dashboard/ProfileModal/ProfileAvatar.js
import React from "react";
import { MaleIcon, FemaleIcon, OtherIcon } from "./GenderIcons";

const ProfileAvatar = ({ user }) => {
  if (user?.profilePicture) {
    return (
      <div className="flex flex-col items-center mb-3">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-4 border-blue-400 shadow-lg"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mb-3">
      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg">
        {user?.gender === "female" ? (
          <FemaleIcon />
        ) : user?.gender === "other" ? (
          <OtherIcon />
        ) : (
          <MaleIcon />
        )}
      </div>
      <p className="text-xs text-gray-400 mt-1">
        {user?.gender === "female"
          ? "👩 Female"
          : user?.gender === "other"
          ? "🧑 Other"
          : "👨 Male"}
      </p>
    </div>
  );
};

export default ProfileAvatar;