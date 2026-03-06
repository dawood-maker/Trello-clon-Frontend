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
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-4 w-72 flex-shrink-0 flex flex-col space-y-3 border border-gray-200 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-800 font-bold text-lg">{column.title}</h3>
        <button
          onClick={() => deleteColumn(data.currentBoard, column.id)}
          className="px-2 py-1 text-xs font-semibold text-white rounded-md bg-gradient-to-r from-red-500 to-red-600 shadow hover:from-red-600 hover:to-red-700 transition-all duration-200"
        >
          Delete
        </button>
      </div>

      <div className="flex flex-col space-y-2">
        {column.cardIds.map((id) => (
          <Card key={id} card={data.cards[id]} />
        ))}
      </div>

      <div className="flex space-x-2 mt-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add card"
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <button
          onClick={handleAddCard}
          className="px-3 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 shadow hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
        >
          Add Card
        </button>
      </div>
    </div>
  );
};

export default Column;
