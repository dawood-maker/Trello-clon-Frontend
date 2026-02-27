// src/components/Board/Board.jsx
import React from "react";
import { useBoard } from "../../context/BoardContext";
import Column from "./Column";
import "./Board.css";

const Board = () => {
  const { data, loading } = useBoard();
  const board = data.boards[data.currentBoard];

  if (loading) return <p>Loading...</p>;
  if (!board) return <p>No board selected.</p>;

  return (
    <div className="board-container">
      {board.columnOrder.map((columnId) => {
        const column = board.columns[columnId];
        return <Column key={column.id} column={column} />;
      })}
    </div>
  );
};

export default Board;
