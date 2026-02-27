import React, { useState } from "react";
import { useBoard } from "../../context/BoardContext";

const AddColumn = () => {
  const { data, addColumn } = useBoard();
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title) return;
    addColumn(data.currentBoard, title);
    setTitle("");
  };

  return (
    <div>
      <input
        placeholder="Column title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Add Column</button>
    </div>
  );
};

export default AddColumn;
