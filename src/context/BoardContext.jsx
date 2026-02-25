import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { arrayMove } from "@dnd-kit/sortable";

// Initial State
const initialState = {
  boards: {
    "board-1": {
      id: "board-1",
      name: "Welcome Board",
      color: "#60A5FA",
      columnOrder: ["column-1", "column-2", "column-3", "column-4"],
      columns: {
        "column-1": { id: "column-1", title: "To Do", cardIds: ["card-1"] },
        "column-2": {
          id: "column-2",
          title: "In Progress",
          cardIds: ["card-2"],
        },
        "column-3": { id: "column-3", title: "Done", cardIds: ["card-3"] },
        "column-4": { id: "column-4", title: "", cardIds: [] },
      },
    },
  },
  boardOrder: ["board-1"],
  currentBoard: "board-1",
  cards: {
    "card-1": {
      id: "card-1",
      text: "First task for the day",
      columnId: "column-1",
    },
    "card-2": {
      id: "card-2",
      text: "Currently working on this item",
      columnId: "column-2",
    },
    "card-3": {
      id: "card-3",
      text: "Item completed and ready for review",
      columnId: "column-3",
    },
  },
};

const BoardContext = createContext();

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};

export const BoardProvider = ({ children }) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);

  // Data Persistence
  useEffect(() => {
    console.log("Loading saved data from localStorage...");
    setLoading(true);
    const savedData = localStorage.getItem("trello_clone_data");
    if (savedData) {
      console.log("Saved data found:", JSON.parse(savedData));
      setData(JSON.parse(savedData));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log("Saving data to localStorage:", data);
      localStorage.setItem("trello_clone_data", JSON.stringify(data));
    }
  }, [data, loading]);

  // Core Functions
  const addBoard = useCallback((name, color) => {
    const newBoardId = uuidv4();
    const newBoard = {
      id: newBoardId,
      name,
      color,
      columnOrder: [],
      columns: {},
    };

    console.log("Adding new board:", newBoard);

    setData((prevData) => ({
      ...prevData,
      boards: {
        ...prevData.boards,
        [newBoardId]: newBoard,
      },
      boardOrder: [...prevData.boardOrder, newBoardId],
      currentBoard: newBoardId,
    }));
  }, []);

  const selectBoard = useCallback((boardId) => {
    console.log("Selecting board:", boardId);
    setData((prevData) => ({
      ...prevData,
      currentBoard: boardId,
    }));
  }, []);

  const addColumn = useCallback((boardId, title) => {
    const newColumnId = uuidv4();
    const newColumn = {
      id: newColumnId,
      title,
      cardIds: [],
    };

    console.log(`Adding column "${title}" to board ${boardId}:`, newColumn);

    setData((prevData) => ({
      ...prevData,
      boards: {
        ...prevData.boards,
        [boardId]: {
          ...prevData.boards[boardId],
          columnOrder: [...prevData.boards[boardId].columnOrder, newColumnId],
          columns: {
            ...prevData.boards[boardId].columns,
            [newColumnId]: newColumn,
          },
        },
      },
    }));
  }, []);

  const deleteColumn = useCallback((boardId, columnId) => {
    console.log(`Deleting column ${columnId} from board ${boardId}`);
    setData((prevData) => {
      const board = prevData.boards[boardId];
      const column = board.columns[columnId];

      const newCards = { ...prevData.cards };
      column.cardIds.forEach((cardId) => {
        console.log("Deleting card:", cardId);
        delete newCards[cardId];
      });

      const newColumns = { ...board.columns };
      delete newColumns[columnId];

      const newColumnOrder = board.columnOrder.filter((id) => id !== columnId);

      const newBoard = {
        ...board,
        columnOrder: newColumnOrder,
        columns: newColumns,
      };

      return {
        ...prevData,
        boards: {
          ...prevData.boards,
          [boardId]: newBoard,
        },
        cards: newCards,
      };
    });
  }, []);

  const renameColumn = useCallback((boardId, columnId, newName) => {
    console.log(
      `Renaming column ${columnId} on board ${boardId} to "${newName}"`,
    );
    setData((prevData) => ({
      ...prevData,
      boards: {
        ...prevData.boards,
        [boardId]: {
          ...prevData.boards[boardId],
          columns: {
            ...prevData.boards[boardId].columns,
            [columnId]: {
              ...prevData.boards[boardId].columns[columnId],
              title: newName,
            },
          },
        },
      },
    }));
  }, []);

  const addCard = useCallback((boardId, columnId, text) => {
    const newCardId = uuidv4();
    const newCard = {
      id: newCardId,
      text,
      columnId,
    };

    console.log(
      `Adding card to column ${columnId} on board ${boardId}:`,
      newCard,
    );

    setData((prevData) => ({
      ...prevData,
      cards: {
        ...prevData.cards,
        [newCardId]: newCard,
      },
      boards: {
        ...prevData.boards,
        [boardId]: {
          ...prevData.boards[boardId],
          columns: {
            ...prevData.boards[boardId].columns,
            [columnId]: {
              ...prevData.boards[boardId].columns[columnId],
              cardIds: [
                ...prevData.boards[boardId].columns[columnId].cardIds,
                newCardId,
              ],
            },
          },
        },
      },
    }));
  }, []);

  const deleteCard = useCallback((cardId) => {
    console.log("Deleting card:", cardId);
    setData((prevData) => {
      const cardToDelete = prevData.cards[cardId];
      if (!cardToDelete) return prevData;

      const boardId = prevData.currentBoard;
      const columnId = cardToDelete.columnId;

      const newCardIds = prevData.boards[boardId].columns[
        columnId
      ].cardIds.filter((id) => id !== cardId);

      const newCards = { ...prevData.cards };
      delete newCards[cardId];

      return {
        ...prevData,
        cards: newCards,
        boards: {
          ...prevData.boards,
          [boardId]: {
            ...prevData.boards[boardId],
            columns: {
              ...prevData.boards[boardId].columns,
              [columnId]: {
                ...prevData.boards[boardId].columns[columnId],
                cardIds: newCardIds,
              },
            },
          },
        },
      };
    });
  }, []);

  const editCardText = useCallback((cardId, newText) => {
    console.log(`Editing card ${cardId} text to: "${newText}"`);
    setData((prevData) => ({
      ...prevData,
      cards: {
        ...prevData.cards,
        [cardId]: {
          ...prevData.cards[cardId],
          text: newText,
        },
      },
    }));
  }, []);

  const resetAll = useCallback(() => {
    if (
      window.confirm(
        "Are you sure you want to delete all boards and data? This action cannot be undone.",
      )
    ) {
      console.log("Resetting all data to initial state");
      setData(initialState);
      localStorage.removeItem("trello_clone_data");
    }
  }, []);

  // ✅ NEW DND-KIT DRAG LOGIC - Trello Style
  const onDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      console.log("Drag ended. Active:", active, "Over:", over);

      if (!over || active.id === over.id) return;

      const activeData = active.data.current;
      const overData = over.data.current;
      const boardId = data.currentBoard;

      // CASE 1: Column Reordering
      if (activeData?.type === "Column" && overData?.type === "Column") {
        console.log("Reordering columns...");
        setData((prevData) => {
          const board = prevData.boards[boardId];
          const oldIndex = board.columnOrder.indexOf(active.id);
          const newIndex = board.columnOrder.indexOf(over.id);

          const newColumnOrder = arrayMove(
            board.columnOrder,
            oldIndex,
            newIndex,
          );

          return {
            ...prevData,
            boards: {
              ...prevData.boards,
              [boardId]: {
                ...board,
                columnOrder: newColumnOrder,
              },
            },
          };
        });
        return;
      }

      // CASE 2: Card Dragging
      if (activeData?.type === "card") {
        console.log("Dragging card...");
        const activeColumnId = activeData.columnId;
        let overColumnId;

        // Determine where card is being dropped
        if (overData?.type === "card") {
          overColumnId = overData.columnId;
        } else if (overData?.type === "Column") {
          overColumnId = over.id;
        } else {
          overColumnId = over.id;
        }

        setData((prevData) => {
          const board = prevData.boards[boardId];
          const sourceColumn = board.columns[activeColumnId];
          const destColumn = board.columns[overColumnId];

          if (!sourceColumn || !destColumn) return prevData;

          const sourceCardIds = [...sourceColumn.cardIds];
          const destCardIds =
            activeColumnId === overColumnId
              ? sourceCardIds
              : [...destColumn.cardIds];

          // Remove from source
          const activeIndex = sourceCardIds.indexOf(active.id);
          sourceCardIds.splice(activeIndex, 1);

          // Add to destination
          if (overData?.type === "card") {
            const overIndex = destCardIds.indexOf(over.id);
            destCardIds.splice(overIndex, 0, active.id);
          } else {
            destCardIds.push(active.id);
          }

          console.log(
            `Moved card ${active.id} from ${activeColumnId} to ${overColumnId}`,
          );

          // Update card's columnId
          const updatedCards = {
            ...prevData.cards,
            [active.id]: {
              ...prevData.cards[active.id],
              columnId: overColumnId,
            },
          };

          return {
            ...prevData,
            cards: updatedCards,
            boards: {
              ...prevData.boards,
              [boardId]: {
                ...board,
                columns: {
                  ...board.columns,
                  [activeColumnId]: {
                    ...sourceColumn,
                    cardIds: sourceCardIds,
                  },
                  [overColumnId]: {
                    ...destColumn,
                    cardIds: destCardIds,
                  },
                },
              },
            },
          };
        });
      }
    },
    [data.currentBoard],
  );

  const value = {
    data,
    loading,
    addBoard,
    selectBoard,
    resetAll,
    addColumn,
    addCard,
    onDragEnd,
    deleteColumn,
    renameColumn,
    deleteCard,
    editCardText,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
