import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBoard } from "../../context/BoardContext";
import EditCardForm from "./EditCardForm";
import DeleteConfirmModal from "./DeleteConfirmModal";
import CardContent from "./CardContent";

const CardItem = ({
  card,
  deleteCard: deleteCardProp,
  editCardText: editCardTextProp,
  isDragging = false,
}) => {
  // ── Context se functions lo (fallback) ──
  const { deleteCard: deleteCardCtx, editCardText: editCardTextCtx } = useBoard();

  // Prop available ho to use karo, warna Context ka use karo
  const deleteCard = deleteCardProp ?? ((id) => deleteCardCtx(id));
  const editCardText = editCardTextProp ?? ((id, text) => editCardTextCtx(id, text));

  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setCardText] = useState(card?.text || "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ── Drag & Drop ──
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: card?.id,
    data: { type: "card", card },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.3 : 1,
  };

  // ── Handlers ──
  const handleSave = () => {
    if (cardText.trim()) {
      editCardText(card.id, cardText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCardText(card?.text || "");
    setIsEditing(false);
  };

  // ── Delete — sirf cardId pass karo ──
  const handleDelete = () => {
    deleteCard(card.id);
    setShowDeleteModal(false);
  };

  if (!card) return null;

  // ── Drag Overlay version ──
  if (isDragging) {
    return (
      <div className="bg-white rounded-xl p-3 shadow-2xl border-2 border-blue-400 w-72 opacity-90">
        <p className="text-sm text-gray-800 font-medium">{card.text}</p>
      </div>
    );
  }

  return (
    <>
      {/* Delete Confirm Modal */}
      {showDeleteModal && (
        <DeleteConfirmModal
          text={card.text}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {/* Card */}
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white rounded-xl p-3 shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-grab active:cursor-grabbing group"
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
            text={card.text}
            onEdit={() => {
              setCardText(card.text);
              setIsEditing(true);
            }}
            onDelete={() => setShowDeleteModal(true)}
            hasDelete={true}
          />
        )}
      </div>
    </>
  );
};

export default CardItem;