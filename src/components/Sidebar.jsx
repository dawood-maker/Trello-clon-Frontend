import React, { useState } from "react";
import ResetConfirmModal from "./Resetconfirmmodal";


const Sidebar = ({
  boards,
  currentBoardId: currentBoard,
  boardOrder,
  onSelectBoard,
  onAddBoard,
  onResetAll,
  user,
  onLogout,
  onClose,
}) => {
  const [showResetModal, setShowResetModal] = useState(false);

  const handleResetClick = () => {
    setShowResetModal(true);
  };

  const handleResetConfirm = () => {
    onResetAll();
    setShowResetModal(false);
  };

  const handleResetCancel = () => {
    setShowResetModal(false);
  };

  return (
    <>
      {/* Reset Modal — document.body mein render hoga (center screen) */}
      <ResetConfirmModal
        isOpen={showResetModal}
        onCancel={handleResetCancel}
        onConfirm={handleResetConfirm}
      />

      {/* ===== SIDEBAR ===== */}
      <div className="w-64 bg-[#031926] h-full flex flex-col text-white shadow-2xl">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-[#14213d] text-white p-2 rounded font-bold text-lg">
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

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">
              My Boards
            </h3>
            <div className="space-y-2">
              {boardOrder && boardOrder.length > 0 ? (
                boardOrder.map((boardId) => {
                  const board = boards[boardId];
                  const isActive = currentBoard === board.id;
                  const boardColor = board.color || "#60A5FA";

                  return (
                    <button
                      key={board.id}
                      onClick={() => {
                        console.log("Board selected:", board);
                        onSelectBoard(board.id);
                      }}
                      style={
                        isActive
                          ? {
                              background: `linear-gradient(135deg, ${boardColor}33, ${boardColor}15)`,
                              borderLeft: `4px solid ${boardColor}`,
                              boxShadow: `0 0 12px ${boardColor}44, inset 0 0 20px ${boardColor}11`,
                            }
                          : {}
                      }
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between transition-all duration-300 ${
                        isActive
                          ? "text-white font-semibold scale-[1.02]"
                          : "text-gray-400 hover:bg-white/5 hover:text-white hover:scale-[1.01] border-l-4 border-transparent"
                      }`}
                    >
                      <span className="flex items-center space-x-2 flex-1">
                        <div
                          className="w-3 h-3 rounded-sm flex-shrink-0 transition-all duration-300"
                          style={{
                            backgroundColor: boardColor,
                            boxShadow: isActive
                              ? `0 0 8px ${boardColor}`
                              : "none",
                          }}
                        />
                        <span className="truncate">{board.name}</span>
                      </span>

                      {isActive && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-bold ml-1 flex-shrink-0 animate-pulse"
                          style={{
                            backgroundColor: boardColor,
                            color: "#fff",
                            boxShadow: `0 0 8px ${boardColor}`,
                            fontSize: "10px",
                          }}
                        >
                          ● LIVE
                        </span>
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

        <div className="p-4 border-t border-gray-800 space-y-2">
          <button
            onClick={() => {
              console.log("Add new board button clicked");
              onAddBoard();
            }}
            className="w-full px-4 py-2.5 bg-[#283618] hover:bg-[#606c38] text-white rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <span>+</span>
            <span>New Board</span>
          </button>

          {/* Reset All — pehle modal aayega, phir reset hoga */}
          <button
            onClick={handleResetClick}
            className="w-full px-4 py-2.5 bg-[#780000] hover:bg-[#c1121f] text-white rounded-md text-sm font-medium transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;