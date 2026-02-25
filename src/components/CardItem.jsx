import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const CardItem = ({ card, columnId, onEditText, onDelete }) => {
  console.log("🔄 CardItem Rendered:", { card, columnId });

  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setCardText] = useState(card?.text || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "card",
      card,
      columnId,
    },
  });

  console.log("🟡 Drag State:", { isDragging, cardId: card?.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "transform 0ms" : transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  const handleSave = () => {
    console.log("💾 Save Clicked:", cardText);

    if (cardText.trim() && cardText !== card.text) {
      console.log("✏️ Updating Text:", cardText.trim());
      onEditText(cardText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    console.log("❌ Edit Cancelled");
    setCardText(card.text);
    setIsEditing(false);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    console.log("🗑️ Delete Button Clicked");
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    console.log("🔥 Confirm Delete:", card?.id);

    if (onDelete) {
      onDelete();
    }
    setShowDeleteConfirm(false);
  };

  const handleKeyPress = (e) => {
    console.log("⌨️ Key Pressed:", e.key);

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  React.useEffect(() => {
    console.log("🔁 card.text Updated:", card?.text);
    setCardText(card?.text || "");
  }, [card?.text]);

  if (isDragging) {
    console.log("🚀 Card is Dragging:", card?.id);

    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          transform: `${CSS.Transform.toString(transform)} rotate(5deg)`,
        }}
        className="bg-white rounded-lg shadow-2xl p-3 border-2 border-blue-400 scale-105 z-50"
      >
        <p className="text-sm text-gray-900 font-medium">{card?.text}</p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`
          bg-white rounded-lg shadow-sm hover:shadow-lg 
          p-3 transition-all duration-200 
          group relative cursor-grab active:cursor-grabbing
          border border-gray-100 hover:border-blue-200
          ${isEditing ? "ring-2 ring-blue-500" : ""}
        `}
      >
        {isEditing ? (
          <div onClick={(e) => e.stopPropagation()}>
            <textarea
              value={cardText}
              onChange={(e) => {
                console.log("📝 Text Changing:", e.target.value);
                setCardText(e.target.value);
              }}
              onKeyDown={handleKeyPress}
              className="w-full px-2 py-1 text-sm text-gray-900 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-2"
              rows={3}
              autoFocus
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                disabled={!cardText.trim()}
                className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <p className="text-sm text-gray-900 flex-1 break-words pr-2 leading-relaxed">
              {card?.text || "Untitled"}
            </p>

            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("✏️ Edit Button Clicked");
                  setIsEditing(true);
                }}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-150 transform hover:scale-110"
                title="Edit card"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>

              {onDelete && (
                <button
                  onClick={handleDeleteClick}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all duration-150 transform hover:scale-110"
                  title="Delete card"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl transform transition-all duration-300 scale-100 animate-fadeIn">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Delete Card?
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700 line-clamp-3">
                "{card?.text}"
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  console.log("❌ Delete Cancelled");
                  setShowDeleteConfirm(false);
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardItem;
