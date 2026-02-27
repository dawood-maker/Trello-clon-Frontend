// src/context/BoardContext.jsx

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { arrayMove } from "@dnd-kit/sortable";

const initialState = {
  boards: {
    "board-1": {
      id: "board-1",
      name: "Welcome Board",
      color: "#60A5FA",
      columnOrder: ["column-1", "column-2", "column-3"],
      columns: {
        "column-1": { id: "column-1", title: "To Do", cardIds: ["card-1"] },
        "column-2": {
          id: "column-2",
          title: "In Progress",
          cardIds: ["card-2"],
        },
        "column-3": { id: "column-3", title: "Done", cardIds: ["card-3"] },
      },
    },
  },
  boardOrder: ["board-1"],
  currentBoard: "board-1",
  cards: {
    "card-1": { id: "card-1", text: "First task", columnId: "column-1" },
    "card-2": { id: "card-2", text: "Working on this", columnId: "column-2" },
    "card-3": { id: "card-3", text: "Completed", columnId: "column-3" },
  },
};

const BoardContext = createContext();

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("useBoard must be used within BoardProvider");
  return context;
};

export const BoardProvider = ({ children }) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("trello_clone_data");
    if (saved) setData(JSON.parse(saved));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("trello_clone_data", JSON.stringify(data));
    }
  }, [data, loading]);

  // =========================
  // 🔥 DRAG END FUNCTION
  // =========================

  const onDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      if (!over) return;

      const boardId = data.currentBoard;
      const board = data.boards[boardId];

      // COLUMN DRAG
      if (board.columnOrder.includes(active.id)) {
        const oldIndex = board.columnOrder.indexOf(active.id);
        const newIndex = board.columnOrder.indexOf(over.id);

        const newOrder = arrayMove(board.columnOrder, oldIndex, newIndex);

        setData((prev) => ({
          ...prev,
          boards: {
            ...prev.boards,
            [boardId]: {
              ...board,
              columnOrder: newOrder,
            },
          },
        }));

        return;
      }

      // CARD DRAG
      const activeCard = data.cards[active.id];
      if (!activeCard) return;

      const sourceColumnId = activeCard.columnId;
      const destinationColumnId =
        board.columns[over.id]?.id || data.cards[over.id]?.columnId;

      if (!destinationColumnId) return;

      setData((prev) => {
        const newBoards = { ...prev.boards };
        const newCards = { ...prev.cards };

        const sourceColumn = newBoards[boardId].columns[sourceColumnId];
        const destColumn = newBoards[boardId].columns[destinationColumnId];

        // Remove from source
        sourceColumn.cardIds = sourceColumn.cardIds.filter(
          (id) => id !== active.id,
        );

        // Add to destination
        destColumn.cardIds.push(active.id);

        // Update card columnId
        newCards[active.id] = {
          ...newCards[active.id],
          columnId: destinationColumnId,
        };

        return {
          ...prev,
          boards: newBoards,
          cards: newCards,
        };
      });
    },
    [data],
  );

  // =========================
  // OTHER FUNCTIONS
  // =========================

  const addColumn = useCallback((boardId, title) => {
    const id = uuidv4();
    setData((prev) => ({
      ...prev,
      boards: {
        ...prev.boards,
        [boardId]: {
          ...prev.boards[boardId],
          columnOrder: [...prev.boards[boardId].columnOrder, id],
          columns: {
            ...prev.boards[boardId].columns,
            [id]: { id, title, cardIds: [] },
          },
        },
      },
    }));
  }, []);

  const addCard = useCallback((boardId, columnId, text) => {
    const id = uuidv4();
    setData((prev) => ({
      ...prev,
      cards: {
        ...prev.cards,
        [id]: { id, text, columnId },
      },
      boards: {
        ...prev.boards,
        [boardId]: {
          ...prev.boards[boardId],
          columns: {
            ...prev.boards[boardId].columns,
            [columnId]: {
              ...prev.boards[boardId].columns[columnId],
              cardIds: [...prev.boards[boardId].columns[columnId].cardIds, id],
            },
          },
        },
      },
    }));
  }, []);

  const value = {
    data,
    loading,
    addColumn,
    addCard,
    onDragEnd, // 🔥 IMPORTANT
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
