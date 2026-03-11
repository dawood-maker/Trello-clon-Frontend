import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useBoard } from "../../context/BoardContext";

import Sidebar from "../Sidebar";
import Column from "../Column/Column";
import CardItem from "../CardItem/CardItem";
import Index from "../ProfileModal/Index";
import NewBoardModal from "./NewBoardModal";
import ShareMenu from "./ShareMenu";
import ProfileMenu from "./ProfileMenu";

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

  // ✅ Local user state — profile update hone par yahan bhi update hoga
  const [currentUser, setCurrentUser] = useState(user);

  // ✅ Jab bhi AuthContext ka user badle, local state bhi sync ho
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  // ── UI State ──
  const [activeId, setActiveId] = useState(null);
  const [newColumnName, setNewColumnName] = useState("");
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNewBoardModal, setShowNewBoardModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardColor, setNewBoardColor] = useState("#60A5FA");

  const currentBoard = data?.boards?.[data?.currentBoard];
  const currentBoardUrl = `${window.location.origin}/board/${data?.currentBoard || ""}`;

  // ── Responsive ──
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
    const handleClickOutside = (e) => {
      if (showProfileMenu && !e.target.closest(".profile-menu-container"))
        setShowProfileMenu(false);
      if (showShareMenu && !e.target.closest(".share-menu-container"))
        setShowShareMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileMenu, showShareMenu]);

  // ── Drag & Drop ──
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragStart = (e) => setActiveId(e?.active?.id || null);
  const handleDragEnd = (e) => { setActiveId(null); onDragEnd(e); };
  const handleDragCancel = () => setActiveId(null);

  // ── Add Column ──
  const handleAddColumn = () => {
    if (newColumnName.trim() && currentBoard) {
      addColumn(data.currentBoard, newColumnName.trim());
      setNewColumnName("");
      setShowAddColumn(false);
    }
  };

  // ── Board Handlers ──
  const handleLogout = () => { setShowProfileMenu(false); logout(); navigate("/login"); };
  const handleViewProfile = () => { setShowProfileMenu(false); setShowProfileModal(true); };
  const handleOpenNewBoardModal = () => setShowNewBoardModal(true);
  const handleCloseNewBoardModal = () => {
    setShowNewBoardModal(false);
    setNewBoardName("");
    setNewBoardColor("#60A5FA");
  };
  const handleCreateBoard = async () => {
    if (newBoardName.trim()) {
      await addBoard(newBoardName.trim(), newBoardColor);
      setNewBoardName("");
      setNewBoardColor("#60A5FA");
      setShowNewBoardModal(false);
    }
  };

  // ✅ Profile update hone par local state update karo
  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  const handleShareBoard = useCallback(
    (platform) => {
      setShowShareMenu(false);
      const boardTitle = `Check out my ${currentBoard?.name || "Board"}:`;
      if (["linkedin", "whatsapp"].includes(platform)) {
        const url =
          platform === "linkedin"
            ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentBoardUrl)}`
            : `https://wa.me/?text=${encodeURIComponent(boardTitle + " " + currentBoardUrl)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        navigator.clipboard
          .writeText(currentBoardUrl)
          .then(() => alert("Board URL copied!"))
          .catch((err) => console.error("Copy failed:", err));
      }
    },
    [currentBoardUrl, currentBoard]
  );

  // ── Active Drag Item ──
  const isColumnId = (id) => currentBoard?.columnOrder?.includes(id);
  const getActiveDragItem = () => {
    if (!activeId || !currentBoard) return null;
    if (isColumnId(activeId)) {
      const col = currentBoard.columns[activeId];
      const cards = col.cardIds.map((id) => data.cards[id]);
      return { type: "column", data: col, cards };
    } else if (data.cards?.[activeId]) {
      return { type: "card", data: data.cards[activeId] };
    }
    return null;
  };
  const activeDragItem = getActiveDragItem();

  // ── Loading ──
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto" />
          <p className="mt-4 text-white">Loading your boards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-800 to-gray-900 font-inter">
      {/* ✅ ProfileModal — currentUser aur onUserUpdate dono pass ho rahe hain */}
      {showProfileModal && (
        <Index
          user={currentUser}
          onClose={() => setShowProfileModal(false)}
          onUserUpdate={handleUserUpdate}
        />
      )}
      {showNewBoardModal && (
        <NewBoardModal
          newBoardName={newBoardName}
          setNewBoardName={setNewBoardName}
          newBoardColor={newBoardColor}
          setNewBoardColor={setNewBoardColor}
          onClose={handleCloseNewBoardModal}
          onCreate={handleCreateBoard}
        />
      )}

      {/* Sidebar Overlay (Mobile) */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile ? "fixed inset-y-0 left-0 z-50 transform" : "relative"
        } ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 w-64 lg:translate-x-0 lg:static flex-shrink-0 bg-gray-900 shadow-2xl`}
      >
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
          user={currentUser}
          onLogout={handleLogout}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="bg-gray-800/80 backdrop-blur-sm p-4 border-b border-gray-700 sticky top-0 z-20 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isMobile && !isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 rounded-md text-white hover:bg-gray-700 lg:hidden"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              <h1 className="text-xl font-bold text-blue-400 hidden lg:block">
                Trello Clone
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ShareMenu
                showShareMenu={showShareMenu}
                setShowShareMenu={setShowShareMenu}
                onShare={handleShareBoard}
                currentBoard={currentBoard}
              />
              {/* ✅ ProfileMenu ko bhi currentUser pass ho raha hai */}
              <ProfileMenu
                user={currentUser}
                showProfileMenu={showProfileMenu}
                setShowProfileMenu={setShowProfileMenu}
                onViewProfile={handleViewProfile}
                onLogout={handleLogout}
              />
            </div>
          </div>
        </header>

        {/* Board Title Bar */}
        <div
          className="px-4 py-3 flex-shrink-0"
          style={{ backgroundColor: currentBoard?.color || "#374151" }}
        >
          <h2 className="text-xl font-bold text-white">
            {currentBoard?.name || "My Board"}
          </h2>
        </div>

        {/* Columns Area */}
        <main className="flex-1 overflow-x-auto overflow-y-hidden p-4">
          {currentBoard ? (
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <div className="flex items-start gap-4 min-h-full pb-4">
                <SortableContext
                  items={currentBoard.columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  {currentBoard.columnOrder.map((columnId) => {
                    const column = currentBoard.columns[columnId];
                    const cards = column.cardIds.map((id) => data.cards[id]);
                    return (
                      <Column
                        key={columnId}
                        boardId={data.currentBoard}
                        column={column}
                        cards={cards}
                        onAddCard={(text) => addCard(data.currentBoard, columnId, text)}
                        deleteColumn={() => deleteColumn(data.currentBoard, columnId)}
                        renameColumn={(title) => renameColumn(data.currentBoard, columnId, title)}
                        deleteCard={(cardId) => deleteCard(data.currentBoard, columnId, cardId)}
                        editCardText={(cardId, text) => editCardText(data.currentBoard, columnId, cardId, text)}
                      />
                    );
                  })}
                </SortableContext>

                {/* Add Another List */}
                {showAddColumn ? (
                  <div className="w-72 bg-gray-700 rounded-2xl p-3 flex-shrink-0 shadow-lg">
                    <input
                      type="text"
                      value={newColumnName}
                      onChange={(e) => setNewColumnName(e.target.value)}
                      placeholder="Enter list title..."
                      className="w-full px-3 py-2 mb-2 text-sm bg-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddColumn();
                        if (e.key === "Escape") {
                          setShowAddColumn(false);
                          setNewColumnName("");
                        }
                      }}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddColumn}
                        disabled={!newColumnName.trim()}
                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Add list
                      </button>
                      <button
                        onClick={() => { setShowAddColumn(false); setNewColumnName(""); }}
                        className="px-3 py-1.5 text-white hover:bg-gray-600 rounded-lg text-lg leading-none transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddColumn(true)}
                    className="w-72 bg-white/10 hover:bg-white/20 rounded-2xl p-3 text-white transition-all duration-200 flex items-center gap-2 min-h-[56px] text-sm font-medium flex-shrink-0 shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add another list
                  </button>
                )}
              </div>

              {/* Drag Overlay */}
              {createPortal(
                <DragOverlay dropAnimation={{ duration: 100, easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)" }}>
                  {activeDragItem ? (
                    activeDragItem.type === "column" ? (
                      <div className="w-72 bg-blue-600 rounded-2xl p-3 opacity-90 shadow-2xl border-2 border-white/50">
                        <h3 className="text-sm font-bold text-white mb-2">{activeDragItem.data.title}</h3>
                        <div className="space-y-2">
                          {activeDragItem.cards.slice(0, 3).filter(Boolean).map((card) => (
                            <div key={card.id} className="bg-white rounded-lg p-2 text-sm text-gray-800">
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
                document.body
              )}
            </DndContext>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center bg-gray-700/50 p-8 rounded-2xl shadow-2xl">
                <p className="text-white text-xl mb-6 font-semibold">No board selected</p>
                <button
                  onClick={handleOpenNewBoardModal}
                  className="px-8 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition duration-200"
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