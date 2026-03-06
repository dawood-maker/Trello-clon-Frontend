import React from "react";

const ColumnMenu = ({ showMenu, setShowMenu, onRename, onDelete }) => {
  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-1 text-white rounded-full hover:bg-white/20 transition-all duration-200"
      >
        ⋮
      </button>

      {showMenu && (
        <>
          {/* Click outside to close */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />

          <div className="absolute right-0 mt-2 w-44 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg z-20 border border-gray-200 transition-all duration-200">
            <button
              onClick={() => {
                onRename();
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-t-lg transition-all duration-150"
            >
              Rename
            </button>

            <button
              onClick={onDelete}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg transition-all duration-150"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ColumnMenu;