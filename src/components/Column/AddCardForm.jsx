import React, { useState } from "react";

const AddCardForm = ({ showAddCard, setShowAddCard, onAddCard }) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;

    onAddCard(text.trim());
    setText("");
    setShowAddCard(false);
  };

  if (!showAddCard) {
    return (
      <button
        onClick={() => setShowAddCard(true)}
        className="m-2 text-sm text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded"
      >
        + Add Card
      </button>
    );
  }

  return (
    <div className="p-2 space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        placeholder="Enter card title..."
        className="w-full p-2 text-sm rounded text-black"
        autoFocus
      />
      <div className="flex gap-2">
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Add
        </button>
        <button
          onClick={() => setShowAddCard(false)}
          className="bg-gray-300 px-3 py-1 rounded text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddCardForm;
