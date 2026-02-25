import React from "react";

const Sidebar = ({
  boards,
  currentBoard,
  boardOrder,
  onSelectBoard,
  onAddBoard,
  onResetAll,
  user,
  onLogout,
  onClose,
}) => {
  return (
    <div className="w-64 bg-gray-900 h-full flex flex-col text-white shadow-2xl">
      {/* Header - Trello Clone Icon */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded font-bold text-lg">
              T
            </div>
            <h2 className="text-xl font-bold">Trello Clone</h2>
          </div>
          <button
            onClick={() => {
              console.log("Sidebar close button clicked");
              onClose();
            }}
            className="lg:hidden p-1 hover:bg-gray-800 rounded"
          >
            <svg
              className="w-5 h-5"
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
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* My Boards Section */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">
            My Boards
          </h3>
          <div className="space-y-1">
            {boardOrder && boardOrder.length > 0 ? (
              boardOrder.map((boardId) => {
                const board = boards[boardId];
                return (
                  <button
                    key={board.id}
                    onClick={() => {
                      console.log("Board selected:", board);
                      onSelectBoard(board.id);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between group ${
                      currentBoard === board.id
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <span className="flex items-center space-x-2 flex-1">
                      {/* Color Indicator Dot */}
                      <div
                        className="w-3 h-3 rounded-sm flex-shrink-0"
                        style={{ backgroundColor: board.color || "#808080" }}
                      />
                      <span className="truncate">{board.name}</span>
                    </span>
                    {currentBoard === board.id && (
                      <div className="w-2 h-2 bg-gray-400 rounded-sm flex-shrink-0"></div>
                    )}
                  </button>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm px-3">No boards yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <button
          onClick={() => {
            console.log("Add new board button clicked");
            onAddBoard();
          }}
          className="w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <span>+</span>
          <span>New Board</span>
        </button>

        <button
          onClick={() => {
            console.log("Reset all button clicked");
            onResetAll();
          }}
          className="w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
        >
          Reset All
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
