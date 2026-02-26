import React from "react";

const ColumnMenu = ({ showMenu, setShowMenu, onRename, onDelete }) => {
  return (
    <div className="relative">
      <button onClick={() => setShowMenu(!showMenu)} className="p-1 text-white">
        ⋮
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 mt-1 w-40 bg-white rounded shadow">
            <button
              onClick={() => {
                onRename();
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Rename
            </button>

            <button
              onClick={onDelete}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
