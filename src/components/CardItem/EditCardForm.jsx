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
    <div onClick={(e) => e.stopPropagation()}>
      <textarea
        value={cardText}
        onChange={(e) => setCardText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full border p-2 text-sm rounded mb-2"
        rows={3}
        autoFocus
      />

      <div className="flex space-x-2">
        <button
          onClick={onSave}
          disabled={!cardText.trim()}
          className="px-3 py-1 bg-blue-600 text-white text-xs rounded"
        >
          Save
        </button>

        <button
          onClick={onCancel}
          className="px-3 py-1 bg-gray-300 text-xs rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCardForm;
