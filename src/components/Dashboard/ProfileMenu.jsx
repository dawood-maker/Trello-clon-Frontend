import React from "react";

const ProfileMenu = ({
  user,
  showProfileMenu,
  setShowProfileMenu,
  onViewProfile,
  onLogout,
}) => {
  return (
    <div className="relative profile-menu-container">
      <button
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </button>

      {showProfileMenu && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 overflow-hidden z-[100]">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-900">
              {user?.name || "User Name"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "email@notprovided.com"}
            </p>
          </div>

          <div className="py-1">
            <button
              onClick={onViewProfile}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
            >
              <svg
                className="w-5 h-5 text-gray-500"
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
              <span>View Profile</span>
            </button>

            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3"
            >
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
