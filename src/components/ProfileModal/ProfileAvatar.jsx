// src/components/Dashboard/ProfileModal/ProfileAvatar.js
import React from "react";
import { MaleIcon, FemaleIcon, OtherIcon } from "./GenderIcons";

const genderConfig = {
  female: {
    label: "👩 Female",
    ring: "ring-pink-400",
    glow: "shadow-[0_0_20px_rgba(236,72,153,0.5)]",
    bg: "from-pink-500 to-rose-600",
    badge: "bg-pink-100 text-pink-700 border-pink-300",
  },
  other: {
    label: "🧑 Other",
    ring: "ring-purple-400",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.5)]",
    bg: "from-purple-500 to-violet-600",
    badge: "bg-purple-100 text-purple-700 border-purple-300",
  },
  male: {
    label: "👨 Male",
    ring: "ring-blue-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.5)]",
    bg: "from-blue-500 to-indigo-600",
    badge: "bg-blue-100 text-blue-700 border-blue-300",
  },
};

const ProfileAvatar = ({ user }) => {
  console.log("🖼️ [ProfileAvatar] Rendering avatar for user:", user?.name);
  console.log("🖼️ [ProfileAvatar] profilePicture:", user?.profilePicture);
  console.log("🖼️ [ProfileAvatar] gender:", user?.gender);

  const gender = user?.gender || "male";
  const config = genderConfig[gender] || genderConfig.male;

  if (user?.profilePicture) {
    console.log("🖼️ [ProfileAvatar] Showing profile picture from URL");
    return (
      <div className="flex flex-col items-center mb-2 sm:mb-4">
        <div className={`relative p-1 rounded-full bg-gradient-to-br ${config.bg}`}>
          <div className="p-0.5 rounded-full bg-white">
            <img
              src={user.profilePicture}
              alt="Profile"
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ${config.glow}`}
              onError={(e) => {
                console.warn("⚠️ [ProfileAvatar] Profile image failed to load");
                e.target.style.display = "none";
              }}
            />
          </div>
        </div>
        <span className={`mt-1.5 sm:mt-2 px-2 sm:px-3 py-0.5 text-xs font-semibold rounded-full border ${config.badge}`}>
          {config.label}
        </span>
      </div>
    );
  }

  console.log("🖼️ [ProfileAvatar] Showing gender icon for:", gender);

  return (
    <div className="flex flex-col items-center mb-2 sm:mb-4">
      {/* ✅ animation wali line REMOVE kar di */}
      <div
        className={`relative p-1 rounded-full bg-gradient-to-br ${config.bg} ${config.glow}`}
      >
        <div className="p-0.5 rounded-full bg-white">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
            {gender === "female" ? (
              <FemaleIcon />
            ) : gender === "other" ? (
              <OtherIcon />
            ) : (
              <MaleIcon />
            )}
          </div>
        </div>
      </div>
      <span className={`mt-1.5 sm:mt-2 px-2 sm:px-3 py-0.5 text-xs font-semibold rounded-full border ${config.badge}`}>
        {config.label}
      </span>
    </div>
  );
};

export default ProfileAvatar;