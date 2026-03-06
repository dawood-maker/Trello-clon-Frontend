import React, { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CardContent from "./CardContent";
import EditCardForm from "./EditCardForm";
import DeleteConfirmModal from "./DeleteConfirmModal";

const CardItem = ({ card, columnId, onEditText, onDelete }) => {
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "transform 0ms" : transition,
    opacity: isDragging ? 0.6 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  useEffect(() => {
    setCardText(card?.text || "");
  }, [card?.text]);

  const handleSave = () => {
    if (cardText.trim() && cardText !== card.text) {
      onEditText(cardText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCardText(card.text);
    setIsEditing(false);
  };

  const confirmDelete = () => {
    onDelete?.();
    setShowDeleteConfirm(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-4 border-2 border-blue-500 scale-110 rotate-1 transition-all duration-200"
      >
        <p className="text-sm font-semibold text-gray-800 tracking-wide">
          {card?.text}
        </p>
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
        className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
      >
        {isEditing ? (
          <EditCardForm
            cardText={cardText}
            setCardText={setCardText}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <CardContent
            text={card?.text}
            onEdit={() => setIsEditing(true)}
            onDelete={() => setShowDeleteConfirm(true)}
            hasDelete={!!onDelete}
          />
        )}
      </div>

      {showDeleteConfirm && (
        <DeleteConfirmModal
          text={card?.text}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
};

export default CardItem;
