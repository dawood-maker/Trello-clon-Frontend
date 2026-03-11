import React, { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CardItem from "../CardItem/CardItem";
import AddCardForm from "./AddCardForm";

// ─────────────────────────────────────────
// Column Menu (3-dot dropdown)
// ─────────────────────────────────────────
const ColumnMenu = ({ onRename, onDelete, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-8 z-50 bg-white rounded-xl shadow-2xl border border-gray-100 w-44 py-1 overflow-hidden"
    >
      <button
        onClick={() => { onRename(); onClose(); }}
        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
      >
        ✏️ Rename List
      </button>
      <div className="border-t border-gray-100 my-1" />
      <button
        onClick={() => { onDelete(); onClose(); }}
        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors"
      >
        🗑️ Delete List
      </button>
    </div>
  );
};

// ─────────────────────────────────────────
// Main Column Component
// ─────────────────────────────────────────
const Column = ({
  boardId,
  column,
  cards = [],
  onAddCard,
  deleteColumn,
  renameColumn,
  deleteCard,
  editCardText,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(column.title);
  const [showAddCard, setShowAddCard] = useState(false);
  const renameInputRef = useRef(null);

  // ── Drag & Drop ──
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "column", column },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  // ── Auto-focus rename input ──
  useEffect(() => {
    if (isRenaming && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [isRenaming]);

  const handleRenameSubmit = () => {
    if (newTitle.trim() && newTitle.trim() !== column.title) {
      renameColumn(newTitle.trim());
    }
    setIsRenaming(false);
  };

  const handleRenameKeyDown = (e) => {
    if (e.key === "Enter") handleRenameSubmit();
    if (e.key === "Escape") {
      setNewTitle(column.title);
      setIsRenaming(false);
    }
  };

  const validCards = cards.filter(Boolean);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-72 flex-shrink-0 flex flex-col rounded-2xl shadow-lg overflow-hidden"
      style={{ ...style, backgroundColor: "#2563EB" }}
    >
      {/* ── Column Header ── */}
      <div
        className="px-3 pt-3 pb-2 flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
        {...attributes}
        {...listeners}
      >
        {/* Title / Rename */}
        {isRenaming ? (
          <input
            ref={renameInputRef}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleRenameSubmit}
            onKeyDown={handleRenameKeyDown}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-white/90 text-gray-800 text-sm font-semibold px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-white mr-2"
          />
        ) : (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h3 className="text-white font-bold text-sm truncate">
              {column.title}
            </h3>
            {/* Card Count Badge */}
            <span className="bg-white/30 text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
              {validCards.length}
            </span>
          </div>
        )}

        {/* 3-dot Menu Button */}
        <div className="relative flex-shrink-0 ml-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prev) => !prev);
            }}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {showMenu && (
            <ColumnMenu
              onRename={() => setIsRenaming(true)}
              onDelete={deleteColumn}
              onClose={() => setShowMenu(false)}
            />
          )}
        </div>
      </div>

      {/* ── Cards List ── */}
      <div className="flex-1 px-2 pb-1 overflow-y-auto max-h-[calc(100vh-220px)] scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent">
        <SortableContext
          items={validCards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2 py-1">
            {validCards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                deleteCard={() => deleteCard(card.id)}
                editCardText={(text) => editCardText(card.id, text)}
              />
            ))}
          </div>
        </SortableContext>
      </div>

      {/* ── Add Card Form ── */}
      <div className="px-2 pb-2">
        <AddCardForm
          showAddCard={showAddCard}
          setShowAddCard={setShowAddCard}
          onAddCard={onAddCard}
        />
      </div>
    </div>
  );
};

export default Column;