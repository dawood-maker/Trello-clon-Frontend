import React, { useState } from "react";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CardItem from "./CardItem";
import { useBoard } from "../context/BoardContext";

const Column = ({ column, cards, onAddCard, boardId }) => {
  console.log("🔄 Column Rendered:", { column, cardsCount: cards.length });

  const [isEditing, setIsEditing] = useState(false);
  const [newCardText, setNewCardText] = useState("");
  const [columnTitle, setColumnTitle] = useState(column.title);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const { data, editCardText, deleteCard, renameColumn, deleteColumn } =
    useBoard();

  const currentBoard = data.boards[data.currentBoard];
  const boardColor = currentBoard?.color || "#4B5563";

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  console.log("🟡 Column Drag State:", { isDragging, columnId: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
  };

  const handleAddCard = () => {
    console.log("➕ Add Card Clicked:", newCardText);

    if (newCardText.trim()) {
      onAddCard(newCardText.trim());
      setNewCardText("");
      setShowAddCard(false);
    }
  };

  const handleRenameColumn = () => {
    console.log("✏️ Rename Column Attempt:", columnTitle);

    if (columnTitle.trim() && columnTitle !== column.title) {
      console.log("✅ Renaming Column:", column.id);
      renameColumn(data.currentBoard, column.id, columnTitle.trim());
    } else {
      setColumnTitle(column.title);
    }
    setIsEditing(false);
  };

  const handleDeleteColumn = () => {
    const cardCount = cards.length;

    console.log("🗑️ Delete Column Clicked:", {
      columnId: column.id,
      cardCount,
    });

    const confirmMessage =
      cardCount > 0
        ? `Are you sure you want to delete "${column.title}"? This will delete ${cardCount} card${cardCount > 1 ? "s" : ""}.`
        : `Are you sure you want to delete "${column.title}"?`;

    if (window.confirm(confirmMessage)) {
      console.log("🔥 Column Deleted:", column.id);
      deleteColumn(data.currentBoard, column.id);
    }

    setShowColumnMenu(false);
  };

  const handleKeyPress = (e) => {
    console.log("⌨️ Column Key Pressed:", e.key);

    if (e.key === "Enter") {
      e.preventDefault();
      handleRenameColumn();
    } else if (e.key === "Escape") {
      setColumnTitle(column.title);
      setIsEditing(false);
    }
  };

  if (isDragging) {
    console.log("🚀 Column is Dragging:", column.id);

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-72 bg-gray-700 bg-opacity-50 rounded-lg p-3 opacity-50 border-2 border-dashed border-gray-500 min-h-16 flex-shrink-0"
      />
    );
  }

  const cardIds = cards.map((card) => card.id);

  console.log("📌 Card IDs:", cardIds);

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        backgroundColor: boardColor,
        opacity: 0.95,
      }}
      className="w-72 rounded-lg flex flex-col max-h-full flex-shrink-0 shadow-lg"
    >
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between p-3 pb-2">
          <div
            {...attributes}
            {...listeners}
            className="flex items-center space-x-2 flex-1 cursor-grab active:cursor-grabbing"
          >
            {isEditing ? (
              <input
                type="text"
                value={columnTitle}
                onChange={(e) => {
                  console.log("📝 Column Title Changing:", e.target.value);
                  setColumnTitle(e.target.value);
                }}
                onBlur={handleRenameColumn}
                onKeyDown={handleKeyPress}
                className="flex-1 px-2 py-1 text-sm font-semibold bg-white text-gray-900 border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h3
                className="text-sm font-semibold text-white flex-1 cursor-pointer hover:bg-white hover:bg-opacity-10 px-2 py-1 rounded transition-colors"
                onClick={() => {
                  console.log("🖊️ Column Title Clicked");
                  setIsEditing(true);
                }}
              >
                {column.title}
              </h3>
            )}
            <span className="text-xs text-white bg-black bg-opacity-20 px-2 py-1 rounded font-medium">
              {cards.length}
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => {
                console.log("📂 Column Menu Toggled");
                setShowColumnMenu(!showColumnMenu);
              }}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition text-white"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {showColumnMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => {
                    console.log("❌ Column Menu Closed");
                    setShowColumnMenu(false);
                  }}
                />
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl z-20 py-1 border border-gray-200">
                  <button
                    onClick={() => {
                      console.log("✏️ Rename Option Clicked");
                      setIsEditing(true);
                      setShowColumnMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition-colors"
                  >
                    <span>Rename</span>
                  </button>
                  <button
                    onClick={handleDeleteColumn}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
                  >
                    <span>Delete</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          <div className="overflow-y-auto px-2 pb-2 space-y-2 custom-scrollbar max-h-[calc(100vh-300px)]">
            {cards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                columnId={column.id}
                onEditText={(newText) => {
                  console.log("📝 Edit Card Text:", card.id, newText);
                  editCardText(card.id, newText);
                }}
                onDelete={() => {
                  console.log("🗑️ Delete Card:", card.id);
                  deleteCard(card.id);
                }}
              />
            ))}
          </div>
        </SortableContext>

        {showAddCard ? (
          <div className="px-2 pb-2">
            <textarea
              placeholder="Enter a title for this card..."
              value={newCardText}
              onChange={(e) => {
                console.log("📝 New Card Text Changing:", e.target.value);
                setNewCardText(e.target.value);
              }}
              className="w-full px-3 py-2 text-sm text-gray-900 bg-white border-none rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
              autoFocus
            />
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={handleAddCard}
                disabled={!newCardText.trim()}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add card
              </button>
              <button
                onClick={() => {
                  console.log("❌ Add Card Cancelled");
                  setShowAddCard(false);
                  setNewCardText("");
                }}
                className="p-1 text-white hover:bg-white hover:bg-opacity-20 rounded focus:outline-none text-xl"
              >
                ×
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              console.log("➕ Show Add Card Clicked");
              setShowAddCard(true);
            }}
            className="mx-2 mb-2 flex items-center space-x-1 px-3 py-2 text-sm text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
          >
            <span>Add a card</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Column;
