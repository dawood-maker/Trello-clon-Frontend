import React from "react";

const EditCardForm = ({ cardText, setCardText, onSave, onCancel }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSave();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="space-y-2">
      <textarea
        value={cardText}
        onChange={(e) => setCardText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full border border-gray-200 p-2.5 text-sm rounded-lg mb-2 bg-white/90 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
        rows={3}
        autoFocus
      />

      <div className="flex space-x-2">
        <button
          onClick={onSave}
          disabled={!cardText.trim()}
          className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-md shadow-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save
        </button>

        <button
          onClick={onCancel}
          className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-300 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCardForm;
