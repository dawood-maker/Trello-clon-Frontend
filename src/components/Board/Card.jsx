import React, { useState } from "react";
import { useBoard } from "../../context/BoardContext";

const Card = ({ card }) => {
  const { editCardText, deleteCard } = useBoard();
  const [text, setText] = useState(card.text);

  return (
    <div className="card">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => editCardText(card.id, text)}
      />
      <button onClick={() => deleteCard(card.id)}>Delete</button>
    </div>
  );
};
export default Card;
