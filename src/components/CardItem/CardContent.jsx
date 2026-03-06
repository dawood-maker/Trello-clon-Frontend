import React from "react";

const CardContent = ({ text, onEdit, onDelete, hasDelete }) => {
  return (
    <div className="flex justify-between items-start group">
      <p className="text-sm flex-1 pr-3 break-words text-gray-800 font-medium leading-relaxed">
        {text || "Untitled"}
      </p>

      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-0 translate-x-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="flex items-center justify-center w-7 h-7 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 hover:scale-110"
        >
          ✏️
        </button>

        {hasDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="flex items-center justify-center w-7 h-7 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 hover:scale-110"
          >
            🗑
          </button>
        )}
      </div>
    </div>
  );
};

export default CardContent;
