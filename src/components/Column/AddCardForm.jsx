import React, { useState } from "react";

const AddCardForm = ({ showAddCard, setShowAddCard, onAddCard }) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAddCard(text.trim());
    setText("");
    setShowAddCard(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
    if (e.key === "Escape") {
      setText("");
      setShowAddCard(false);
    }
  };

  if (!showAddCard) {
    return (
      <button
        onClick={() => setShowAddCard(true)}
        className="w-full text-left text-white/80 hover:text-white hover:bg-white/10 px-2 py-2 rounded-xl text-sm transition-colors flex items-center gap-1"
      >
        <span className="text-lg leading-none">+</span> Add Card
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
        placeholder="Enter card title..."
        className="w-full p-2 text-sm rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-white/50 resize-none shadow-inner"
        autoFocus
      />
      <div className="flex gap-2">
        <button
          onClick={handleAdd}
          disabled={!text.trim()}
          className="flex-1 bg-white text-blue-600 font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Add Card
        </button>
        <button
          onClick={() => {
            setText("");
            setShowAddCard(false);
          }}
          className="px-3 py-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AddCardForm;
