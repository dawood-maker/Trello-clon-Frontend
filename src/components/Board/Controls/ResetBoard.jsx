import { useBoard } from "../../context/BoardContext";

const ResetBoard = () => {
  const { resetAll } = useBoard();

  return (
    <button
      onClick={resetAll}
      className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-red-500 to-red-600 shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-200 active:scale-95"
    >
      Reset All Boards
    </button>
  );
};

export default ResetBoard;
