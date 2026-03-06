import React, { useState } from "react";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBoard } from "../../context/BoardContext";
import CardItem from "../CardItem/CardItem";
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
        className="w-72 bg-gray-700/50 rounded-xl p-3 animate-pulse"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, backgroundColor: boardColor }}
      className="w-72 rounded-2xl flex flex-col shadow-2xl border border-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:shadow-3xl"
    >
      <ColumnHeader
        column={column}
        cards={cards}
        attributes={attributes}
        listeners={listeners}
      />

      <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
        <div className="overflow-y-auto px-2 pb-2 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[calc(100vh-200px)]">
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

      <div className="px-2 pb-3">
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