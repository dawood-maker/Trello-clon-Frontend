import React from "react";

const CardContent = ({ text, onEdit, onDelete, hasDelete }) => {
  return (
    <div className="flex justify-between items-start group">
      <p className="text-sm flex-1 pr-2 break-words">{text || "Untitled"}</p>

      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="text-gray-400 hover:text-blue-600"
        >
          ✏️
        </button>

        {hasDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-gray-400 hover:text-red-600"
          >
            🗑
          </button>
        )}
      </div>
    </div>
  );
};

export default CardContent;
