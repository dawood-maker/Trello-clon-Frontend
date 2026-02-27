import React, { useState } from "react";
import { useBoard } from "../../context/BoardContext";
import Card from "./Card";

const Column = ({ column }) => {
  const { data, addCard, deleteColumn } = useBoard();
  const [text, setText] = useState("");

  const handleAddCard = () => {
    if (!text) return;
    addCard(data.currentBoard, column.id, text);
    setText("");
  };

  return (
    <div className="column">
      <h3>{column.title}</h3>
      <button onClick={() => deleteColumn(data.currentBoard, column.id)}>
        Delete Column
      </button>
      {column.cardIds.map((id) => (
        <Card key={id} card={data.cards[id]} />
      ))}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add card"
      />
      <button onClick={handleAddCard}>Add Card</button>
    </div>
  );
};
export default Column;
