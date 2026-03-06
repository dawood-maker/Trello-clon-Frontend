import React, { useState } from "react";
import { useBoard } from "../../context/BoardContext";

const Card = ({ card }) => {
  const { editCardText, deleteCard } = useBoard();
  const [text, setText] = useState(card.text);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-4 space-y-2 border border-gray-200 hover:shadow-lg transition-all duration-200">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => editCardText(card.id, text)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        rows={3}
      />

      <button
        onClick={() => deleteCard(card.id)}
        className="w-full py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-red-500 to-red-600 shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-200"
      >
        Delete
      </button>
    </div>
  );
};

export default Card;
