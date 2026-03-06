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
    <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-md p-4 space-y-3 w-full max-w-xs hover:shadow-lg transition-all duration-200">
      <input
        placeholder="Column title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />

      <button
        onClick={handleAdd}
        className="w-full py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-md hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200"
      >
        Add Column
      </button>
    </div>
  );
};

export default AddColumn;
