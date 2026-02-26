import React, { useState } from "react";
import { useBoard } from "../../context/BoardContext";
import ColumnMenu from "./ColumnMenu";

const ColumnHeader = ({ column, cards, attributes, listeners }) => {
  const { data, renameColumn, deleteColumn } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [showMenu, setShowMenu] = useState(false);

  const handleRename = () => {
    if (title.trim() && title !== column.title) {
      renameColumn(data.currentBoard, column.id, title.trim());
    }
    setIsEditing(false);
  };

  return (
    <div
      {...attributes}
      {...listeners}
      className="p-3 cursor-grab flex justify-between items-center"
    >
      <div className="flex-1 flex items-center space-x-2">
        {isEditing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            className="flex-1 px-2 py-1 text-sm rounded"
            autoFocus
          />
        ) : (
          <h3
            onClick={() => setIsEditing(true)}
            className="text-sm font-semibold text-white cursor-pointer"
          >
            {column.title}
          </h3>
        )}

        <span className="text-xs bg-black bg-opacity-20 px-2 py-1 rounded text-white">
          {cards.length}
        </span>
      </div>

      <ColumnMenu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        onRename={() => setIsEditing(true)}
        onDelete={() => deleteColumn(data.currentBoard, column.id)}
      />
    </div>
  );
};

export default ColumnHeader;
