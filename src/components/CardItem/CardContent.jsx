import React from "react";

const CardContent = ({ text, onEdit, onDelete, hasDelete }) => {
  return (
    <div className="flex justify-between items-start group/card">
      {/* Card Text */}
      <p className="text-sm flex-1 pr-2 break-words text-gray-800 font-medium leading-relaxed">
        {text || "Untitled"}
      </p>

      {/* Action Buttons - hover pe dikhenge */}
      <div className="flex gap-1 opacity-0 group-hover/card:opacity-100 transition-all duration-200 flex-shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          title="Edit"
          className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all text-xs"
        >
          ✏️
        </button>
        {hasDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            title="Delete"
            className="w-6 h-6 flex items-center justify-center rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all text-xs"
          >
            🗑
          </button>
        )}
      </div>
    </div>
  );
};

export default CardContent;