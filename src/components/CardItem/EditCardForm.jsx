import React from "react";

const EditCardForm = ({ cardText, setCardText, onSave, onCancel }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSave();
    }
    if (e.key === "Escape") onCancel();
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="space-y-2">
      <textarea
        value={cardText}
        onChange={(e) => setCardText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full border border-blue-300 p-2.5 text-sm rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
        rows={3}
        autoFocus
      />
      <div className="flex gap-2">
        <button
          onClick={onSave}
          disabled={!cardText.trim()}
          className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCardForm;