// src/components/Board/Board.jsx
import React from "react";
import { useBoard } from "../../context/BoardContext";
import Column from "./Column";
import "./Board.css";

const Board = () => {
  const { data, loading } = useBoard();
  const board = data.boards[data.currentBoard];

  if (loading)
    return (
      <p className="text-gray-500 text-sm italic text-center mt-8 animate-pulse">
        Loading...
      </p>
    );

  if (!board)
    return (
      <p className="text-gray-500 text-sm italic text-center mt-8">
        No board selected.
      </p>
    );

  return (
    <div className="board-container flex space-x-4 overflow-x-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {board.columnOrder.map((columnId) => {
        const column = board.columns[columnId];
        return <Column key={column.id} column={column} />;
      })}
    </div>
  );
};

export default Board;
