import React from "react";

const ProfileModal = ({ user, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[110] p-4 backdrop-blur-sm">
    <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl transform transition-all duration-300 scale-100">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
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

      <div className="space-y-4">
        <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
          <svg
            className="w-8 h-8 text-blue-500"
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
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="text-lg font-bold text-gray-900">
              {user?.name || "User Name Not Set"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
          <svg
            className="w-8 h-8 text-blue-500"
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
      </div>
    </div>
  </div>
);

export default ProfileModal;
