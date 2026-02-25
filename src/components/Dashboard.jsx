import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBoard } from "../context/BoardContext";
import Sidebar from "./Sidebar";
import Column from "./Column";
import CardItem from "./CardItem";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

/* ----------------------------- Icon Components ---------------------------- */
const ShareIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
    />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.235-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.031 3c-4.938 0-8.96 4.022-8.96 8.96 0 1.551.411 3.016 1.144 4.316l-1.18 4.307 4.41-1.166c1.233.684 2.622 1.043 4.58 1.043 4.938 0 8.96-4.022 8.96-8.96s-4.022-8.96-8.96-8.96zm4.78 12.493c-.114.31-.228.444-.456.444-.228 0-.456-.076-.684-.228-.228-.152-.647-.228-1.026-.228s-.798.152-1.026.456c-.228.304-.456.444-.836.444-.38 0-.684-.152-1.026-.456s-.456-.76-.456-1.14-.076-.684.152-1.026.684-.798 1.026-1.14c.342-.342.342-.647.342-.989s-.456-.836-.608-.989-.342-.228-.57-.228-.304 0-.456.152-.57.684-.836.878-.456.228-.798.228-.684-.152-.912-.38c-.228-.228-.798-.798-.798-1.558 0-.76.38-1.14.456-1.292.076-.152.152-.304.228-.456s.228-.304.342-.38c.114-.076.228-.152.342-.152.038 0 .076 0 .152 0 .076 0 .152 0 .228 0s.152.076.228.152.19.342.342.76c.152.38.228.76.228.798s.076.38 0 .532c-.076.152-.342.456-.456.608-.114.152-.228.228-.38.38-.152.152-.152.228-.076.38s.494.684.722.912.456.342.647.418c.19.076.38.152.57.152.19 0 .418 0 .57-.076.152-.076.38-.228.532-.38.152-.152.304-.304.532-.304.228 0 .456.152.684.342s.342.494.418.722c.076.19.152.418.152.647 0 .19 0 .304-.076.532z" />
  </svg>
);

const GitHubIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.829.091-.64.351-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.949 0-1.092.39-1.983 1.029-2.682-.103-.253-.446-1.272.098-2.65 0 0 .84-.268 2.75 1.022A9.632 9.632 0 0112 5.093c.85.004 1.705.115 2.504.337 1.909-1.29 2.748-1.022 2.748-1.022.546 1.379.202 2.398.1 2.65.64.699 1.028 1.59 1.028 2.682 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .267.18.577.688.484C20.137 20.198 23 16.443 23 12.017 23 6.484 18.522 2 13 2z"
      clipRule="evenodd"
    />
  </svg>
);

const CopyIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v10a2 2 0 01-2 2h-2"
    />
  </svg>
);

/* ------------------------------- Modals ---------------------------------- */
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

/* --------------------------------- Main ---------------------------------- */
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {
    data,
    addBoard,
    selectBoard,
    resetAll,
    addColumn,
    addCard,
    onDragEnd,
    loading,
    deleteColumn,
    renameColumn,
    deleteCard,
    editCardText,
  } = useBoard();

  // UI state
  const [activeId, setActiveId] = useState(null);
  const [newColumnName, setNewColumnName] = useState("");
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // New Board Modal
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardColor, setNewBoardColor] = useState("#60A5FA");

  const currentBoard = data?.boards?.[data?.currentBoard];
  const currentBoardUrl = `${window.location.origin}/board/${data?.currentBoard || ""}`;

  // Predefined colors
  const colorPalette = [
    { name: "Blue", value: "#60A5FA" },
    { name: "Purple", value: "#A78BFA" },
    { name: "Pink", value: "#F472B6" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Yellow", value: "#FBBF24" },
    { name: "Green", value: "#10B981" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Cyan", value: "#06B6D4" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Gray", value: "#6B7280" },
    { name: "Dark", value: "#1F2937" },
  ];

  /* --------------------------- Responsive checks -------------------------- */
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest(".profile-menu-container")) {
        setShowProfileMenu(false);
      }
      if (showShareMenu && !event.target.closest(".share-menu-container")) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileMenu, showShareMenu]);

  /* ------------------------------- DnD setup ------------------------------ */
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const handleDragStart = (event) => setActiveId(event?.active?.id || null);
  const handleDragEnd = (event) => {
    setActiveId(null);
    onDragEnd(event);
  };
  const handleDragCancel = () => setActiveId(null);

  /* ---------------------------- Action handlers --------------------------- */
  const handleAddColumn = () => {
    if (newColumnName.trim() && currentBoard) {
      addColumn(data.currentBoard, newColumnName.trim());
      setNewColumnName("");
      setShowAddColumn(false);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleLogout = () => {
    setShowProfileMenu(false);
    logout();
    navigate("/login");
  };

  const handleViewProfile = () => {
    setShowProfileMenu(false);
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => setShowProfileModal(false);

  const handleOpenNewBoardModal = () => setShowNewBoardModal(true);

  const handleCreateBoard = async () => {
    if (newBoardName.trim()) {
      await addBoard(newBoardName.trim(), newBoardColor);
      setNewBoardName("");
      setNewBoardColor("#60A5FA");
      setShowNewBoardModal(false);
    }
  };

  const handleShareBoard = useCallback(
    (platform) => {
      setShowShareMenu(false);
      const boardUrl = currentBoardUrl;
      const boardTitle = `Check out my ${currentBoard?.name || "Board"}:`;

      if (["linkedin", "whatsapp"].includes(platform)) {
        const url =
          platform === "linkedin"
            ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(boardUrl)}`
            : `https://wa.me/?text=${encodeURIComponent(boardTitle + " " + boardUrl)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        navigator.clipboard
          .writeText(boardUrl)
          .then(() => alert("Board URL copied to clipboard!"))
          .catch((err) => console.error("Failed to copy URL:", err));
      }
    },
    [currentBoardUrl, currentBoard],
  );

  /* --------------------------- Active drag item --------------------------- */
  const isColumnId = (id) => currentBoard?.columnOrder?.includes(id);

  const getActiveDragItem = () => {
    if (!activeId || !currentBoard) return null;
    if (isColumnId(activeId)) {
      const activeColumn = currentBoard.columns[activeId];
      const cards = activeColumn.cardIds.map((cardId) => data.cards[cardId]);
      return { type: "column", data: activeColumn, cards };
    } else if (data.cards?.[activeId]) {
      return { type: "card", data: data.cards[activeId] };
    }
    return null;
  };

  const activeDragItem = getActiveDragItem();

  /* -------------------------------- Loading -------------------------------- */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto"></div>
          <p className="mt-4 text-white">Loading your boards...</p>
        </div>
      </div>
    );
  }

  /* -------------------------------- Render -------------------------------- */
  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-800 to-gray-900 font-inter">
      {showProfileModal && (
        <ProfileModal user={user} onClose={handleCloseProfileModal} />
      )}

      {/* New Board Modal */}
      {showNewBoardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Create New Board
              </h3>
              <button
                onClick={() => {
                  setShowNewBoardModal(false);
                  setNewBoardName("");
                  setNewBoardColor("#60A5FA");
                }}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"
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

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Board Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder="e.g., Marketing Campaign, Sprint Planning"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                autoFocus
                maxLength={50}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && newBoardName.trim())
                    handleCreateBoard();
                }}
              />
              <p className="mt-1 text-xs text-gray-500">
                {newBoardName.length}/50 characters
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Board Color
              </label>
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className="w-20 h-20 rounded-xl shadow-lg border-4 border-white ring-2 ring-gray-200 transition-all duration-200"
                  style={{ backgroundColor: newBoardColor }}
                />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Selected Color</p>
                  <p className="text-sm font-mono font-semibold text-gray-900">
                    {newBoardColor}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-2 mb-3">
                {colorPalette.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setNewBoardColor(color.value)}
                    className={`w-full aspect-square rounded-lg transition-all duration-200 ${newBoardColor === color.value ? "ring-4 ring-offset-2 ring-blue-500 scale-110" : "hover:scale-110 hover:shadow-lg"}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Or enter custom hex color:
                </label>
                <input
                  type="text"
                  value={newBoardColor}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.startsWith("#") && value.length <= 7)
                      setNewBoardColor(value);
                  }}
                  placeholder="#60A5FA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                  maxLength={7}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Format: #RRGGBB (e.g., #60A5FA for blue)
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowNewBoardModal(false);
                  setNewBoardName("");
                  setNewBoardColor("#60A5FA");
                }}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBoard}
                disabled={!newBoardName.trim()}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Board
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={`${isMobile ? "fixed inset-y-0 left-0 z-50 transform" : "relative"} ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out w-64 lg:translate-x-0 lg:static flex-shrink-0 bg-gray-900 shadow-2xl`}
      >
        <div className="flex justify-end p-4 border-b border-gray-700 lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition"
            title="Close Sidebar"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        </div>

        <Sidebar
          boards={data.boards}
          currentBoardId={data.currentBoard}
          boardOrder={data.boardOrder}
          onSelectBoard={(boardId) => {
            selectBoard(boardId);
            if (isMobile) setIsSidebarOpen(false);
          }}
          onAddBoard={handleOpenNewBoardModal}
          onResetAll={resetAll}
          user={user}
          onLogout={handleLogout}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="bg-gray-800 bg-opacity-80 backdrop-blur-sm p-4 border-b border-gray-700 sticky top-0 z-20 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isMobile && !isSidebarOpen && (
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-md text-white hover:bg-gray-700 lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              )}
              <h1 className="text-xl font-bold text-blue-400 hidden lg:block">
                Trello Clone
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative share-menu-container">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!currentBoard}
                >
                  <ShareIcon className="w-5 h-5" />
                </button>

                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 overflow-hidden z-[100]">
                    <p className="px-4 py-2 text-xs font-semibold text-gray-500 border-b border-gray-200">
                      Share Board Link
                    </p>
                    <div className="grid grid-cols-4 gap-1 p-2">
                      <button
                        onClick={() => handleShareBoard("copy")}
                        className="flex flex-col items-center justify-center p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition group"
                        title="Copy Board URL"
                      >
                        <CopyIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition" />
                        <span className="text-xs mt-1">Copy URL</span>
                      </button>
                      <button
                        onClick={() => handleShareBoard("linkedin")}
                        className="flex flex-col items-center justify-center p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition group"
                        title="Share on LinkedIn"
                      >
                        <LinkedInIcon className="w-6 h-6 text-[#0A66C2] transition" />
                        <span className="text-xs mt-1">LinkedIn</span>
                      </button>
                      <button
                        onClick={() => handleShareBoard("whatsapp")}
                        className="flex flex-col items-center justify-center p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition group"
                        title="Share on WhatsApp"
                      >
                        <WhatsAppIcon className="w-6 h-6 text-[#25D366] transition" />
                        <span className="text-xs mt-1">WhatsApp</span>
                      </button>
                      <button
                        onClick={() => handleShareBoard("github")}
                        className="flex flex-col items-center justify-center p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition group"
                        title="GitHub (URL Copy)"
                      >
                        <GitHubIcon className="w-6 h-6 text-[#181717] transition" />
                        <span className="text-xs mt-1">GitHub</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative profile-menu-container">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
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
                        onClick={handleViewProfile}
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
                        onClick={handleLogout}
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
            </div>
          </div>
        </header>

        <div
          className="px-4 py-3 relative flex-shrink-0"
          style={{
            backgroundColor: currentBoard?.color || "#374151",
            opacity: 0.95,
            zIndex: 10,
          }}
        >
          <h2 className="text-xl font-bold text-white shadow-text">
            {currentBoard?.name || "My Board"}
          </h2>
        </div>

        {/* Main content - columns (horizontal scroll automatic) */}
        <main className="flex-1 overflow-x-auto overflow-y-hidden p-4">
          {currentBoard ? (
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <div className="flex items-start space-x-4 min-h-full pb-4">
                <SortableContext
                  items={currentBoard.columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  {currentBoard.columnOrder.map((columnId) => {
                    const column = currentBoard.columns[columnId];
                    const cards = column.cardIds.map(
                      (cardId) => data.cards[cardId],
                    );
                    return (
                      <Column
                        key={columnId}
                        boardId={data.currentBoard}
                        column={column}
                        cards={cards}
                        onAddCard={(text) =>
                          addCard(data.currentBoard, columnId, text)
                        }
                        deleteColumn={() =>
                          deleteColumn(data.currentBoard, columnId)
                        }
                        renameColumn={(title) =>
                          renameColumn(data.currentBoard, columnId, title)
                        }
                        deleteCard={(cardId) =>
                          deleteCard(data.currentBoard, columnId, cardId)
                        }
                        editCardText={(cardId, text) =>
                          editCardText(
                            data.currentBoard,
                            columnId,
                            cardId,
                            text,
                          )
                        }
                      />
                    );
                  })}
                </SortableContext>

                {showAddColumn ? (
                  <div className="w-72 bg-gray-700 rounded-xl p-3 flex-shrink-0 shadow-lg">
                    <input
                      type="text"
                      value={newColumnName}
                      onChange={(e) => setNewColumnName(e.target.value)}
                      placeholder="Enter list title..."
                      className="w-full px-3 py-2 mb-2 text-sm bg-white border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                      onKeyPress={(e) => {
                        if (e.key === "Enter") handleAddColumn();
                      }}
                    />
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleAddColumn}
                        disabled={!newColumnName.trim()}
                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add list
                      </button>
                      <button
                        onClick={() => {
                          setShowAddColumn(false);
                          setNewColumnName("");
                        }}
                        className="p-1 text-white hover:bg-gray-600 rounded text-xl"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddColumn(true)}
                    className="w-72 bg-gray-700 bg-opacity-50 hover:bg-opacity-70 rounded-xl p-3 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-start min-h-16 text-base font-medium flex-shrink-0 shadow-md transform hover:scale-[1.01]"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add another list
                  </button>
                )}
              </div>

              {createPortal(
                <DragOverlay
                  dropAnimation={{
                    duration: 100,
                    easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
                  }}
                >
                  {activeDragItem ? (
                    activeDragItem.type === "column" ? (
                      <div className="w-72 bg-gray-700 rounded-lg p-3 opacity-90 shadow-2xl border-2 border-blue-400">
                        <h3 className="text-sm font-semibold text-white mb-2">
                          {activeDragItem.data.title}
                        </h3>
                        <div className="space-y-2">
                          {activeDragItem.cards.slice(0, 3).map((card) => (
                            <div
                              key={card.id}
                              className="bg-white rounded-md p-2 text-sm text-gray-900"
                            >
                              {card.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <CardItem card={activeDragItem.data} isDragging />
                    )
                  ) : null}
                </DragOverlay>,
                document.body,
              )}
            </DndContext>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center bg-gray-700 bg-opacity-50 p-8 rounded-xl shadow-2xl">
                <p className="text-white text-xl mb-6 font-semibold">
                  No board selected
                </p>
                <button
                  onClick={handleOpenNewBoardModal}
                  className="px-8 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-4 focus:ring-white/50 transform hover:scale-[1.02]"
                >
                  Create Your First Board
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
