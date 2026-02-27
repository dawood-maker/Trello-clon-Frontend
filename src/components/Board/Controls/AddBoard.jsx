import React, { useState } from "react";
import { useBoard } from "../../../context/BoardContext";

const AddBoard = () => {
  const { addBoard } = useBoard();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#14213d");

  return (
    <div>
      <input
        placeholder="Board Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button
        onClick={() => {
          if (name) {
            addBoard(name, color);
            setName("");
          }
        }}
      >
        Add Board
      </button>
    </div>
  );
};
export default AddBoard;
