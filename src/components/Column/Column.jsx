import React, { useState } from "react";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBoard } from "../../context/BoardContext";
import CardItem from "../CardItem/CardItem"; // ✅ Fixed: sahi path
import ColumnHeader from "./ColumnHeader";
import AddCardForm from "./AddCardForm";

const Column = ({ column, cards, onAddCard }) => {
  const [showAddCard, setShowAddCard] = useState(false);

  const { data, editCardText, deleteCard } = useBoard();

  const currentBoard = data?.boards?.[data?.currentBoard];

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
    data: { type: "Column", column },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
  };

  const cardIds = cards?.map((card) => card.id) || [];

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-72 bg-gray-700 opacity-50 rounded-lg p-3"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, backgroundColor: boardColor }}
      className="w-72 rounded-lg flex flex-col shadow-lg"
    >
      <ColumnHeader
        column={column}
        cards={cards}
        attributes={attributes}
        listeners={listeners}
      />

      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        <div className="overflow-y-auto px-2 pb-2 space-y-2">
          {cards?.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              columnId={column.id}
              onEditText={(newText) => editCardText(card.id, newText)}
              onDelete={() => deleteCard(card.id)}
            />
          ))}
        </div>
      </SortableContext>

      <AddCardForm
        showAddCard={showAddCard}
        setShowAddCard={setShowAddCard}
        onAddCard={onAddCard}
      />
    </div>
  );
};

export default Column;