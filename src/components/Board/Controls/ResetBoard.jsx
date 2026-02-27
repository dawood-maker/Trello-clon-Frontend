import React from "react";
import { useBoard } from "../../context/BoardContext";

const ResetBoard = () => {
  const { resetAll } = useBoard();
  return <button onClick={resetAll}>Reset All Boards</button>;
};
export default ResetBoard;
