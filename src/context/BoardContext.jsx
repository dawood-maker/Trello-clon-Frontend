// src/context/BoardContext.jsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { arrayMove } from "@dnd-kit/sortable";

const API_URL = "http://localhost:5002/api";
const BoardContext = createContext();

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("useBoard must be used within BoardProvider");
  return context;
};

// =============================================
// MongoDB array → Legacy frontend structure
// =============================================
const transformToLegacy = (boardsArray) => {
  const boardsObj = {};
  const boardOrder = [];
  const allCards = {};

  (boardsArray || []).forEach((board) => {
    const boardId = board._id;
    boardOrder.push(boardId);

    const columnsObj = {};
    const columnOrder = [];

    (board.columns || []).forEach((col) => {
      const colId = col._id;
      columnOrder.push(colId);

      const cardIds = [];
      (col.cards || []).forEach((card) => {
        const cardId = card._id;
        cardIds.push(cardId);
        allCards[cardId] = {
          id: cardId,
          _id: cardId,
          text: card.text,
          columnId: colId,
        };
      });

      columnsObj[colId] = { id: colId, _id: colId, title: col.title, cardIds };
    });

    boardsObj[boardId] = {
      id: boardId,
      _id: boardId,
      name: board.name,
      color: board.color,
      isPermanent: board.isPermanent || false,
      columnOrder,
      columns: columnsObj,
    };
  });

  return { boardsObj, boardOrder, allCards };
};

export const BoardProvider = ({ children }) => {
  const [boardsRaw, setBoardsRaw] = useState([]);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =============================================
  // API Helper
  // =============================================
  const apiCall = async (endpoint, method = "GET", body = null) => {
    const options = {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(`${API_URL}${endpoint}`, options);
    const result = await res.json();
    if (!result.success) throw new Error(result.message || "API Error");
    return result;
  };

  // =============================================
  // SILENT REFRESH — UI flicker nahi hoga
  // =============================================
  const silentRefresh = useCallback(async () => {
    try {
      const result = await apiCall("/boards");
      const fetched = result.boards || [];
      setBoardsRaw(fetched);
      return fetched;
    } catch (err) {
      console.error("[BoardContext] silentRefresh error:", err.message);
    }
  }, []);

  // =============================================
  // INITIAL LOAD
  // =============================================
  const loadBoards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall("/boards");
      const fetched = result.boards || [];
      setBoardsRaw(fetched);
      if (fetched.length > 0) {
        setCurrentBoardId((prev) => prev || fetched[0]._id);
      } else {
        setCurrentBoardId(null);
      }
    } catch (err) {
      console.error("[BoardContext] loadBoards error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  const { boardsObj, boardOrder, allCards } = transformToLegacy(boardsRaw);

  const data = {
    boards: boardsObj,
    boardOrder,
    currentBoard: currentBoardId,
    cards: allCards,
  };

  // =============================================
  // ADD BOARD
  // =============================================
  const addBoard = useCallback(async (name, color) => {
    try {
      const result = await apiCall("/boards", "POST", {
        name,
        color,
        description: "",
        isPublic: false,
      });
      const allBoards = result.boards || [];
      setBoardsRaw(allBoards);
      if (result.board?._id) setCurrentBoardId(result.board._id);
      return result.board;
    } catch (err) {
      console.error("[BoardContext] addBoard error:", err.message);
      setError(err.message);
      throw err;
    }
  }, []);

  // =============================================
  // SELECT BOARD
  // =============================================
  const selectBoard = useCallback((boardId) => {
    setCurrentBoardId(boardId);
  }, []);

  // =============================================
  // DELETE ONE BOARD
  // =============================================
  const deleteBoard = useCallback(
    async (boardId) => {
      try {
        const result = await apiCall(`/boards/${boardId}`, "DELETE");
        const allBoards = result.boards || [];
        setBoardsRaw(allBoards);
        if (currentBoardId === boardId) {
          setCurrentBoardId(allBoards.length > 0 ? allBoards[0]._id : null);
        }
      } catch (err) {
        console.error("[BoardContext] deleteBoard error:", err.message);
      }
    },
    [currentBoardId],
  );

  // =============================================
  // RESET ALL
  // =============================================
  const resetAll = useCallback(async () => {
    try {
      console.log("[BoardContext] Reset All called...");
      const result = await apiCall("/boards/all", "DELETE");
      const remainingBoards = result.boards || [];
      setBoardsRaw(remainingBoards);
      if (remainingBoards.length > 0) {
        setCurrentBoardId(remainingBoards[0]._id);
      } else {
        setCurrentBoardId(null);
      }
      console.log(
        "[BoardContext] Reset complete. Remaining:",
        remainingBoards.length,
      );
    } catch (err) {
      console.error("[BoardContext] resetAll error:", err.message);
      setError(err.message);
      await silentRefresh();
    }
  }, [silentRefresh]);

  // =============================================
  // ADD COLUMN
  // =============================================
  const addColumn = useCallback(
    async (boardId, title) => {
      try {
        await apiCall("/columns", "POST", { title, boardId });
        await silentRefresh();
      } catch (err) {
        console.error("[BoardContext] addColumn error:", err.message);
      }
    },
    [silentRefresh],
  );

  // =============================================
  // DELETE COLUMN
  // =============================================
  const deleteColumn = useCallback(
    async (boardId, columnId) => {
      try {
        await apiCall(`/columns/${columnId}`, "DELETE");
        await silentRefresh();
      } catch (err) {
        console.error("[BoardContext] deleteColumn error:", err.message);
      }
    },
    [silentRefresh],
  );

  // =============================================
  // RENAME COLUMN
  // =============================================
  const renameColumn = useCallback(
    async (boardId, columnId, title) => {
      try {
        await apiCall(`/columns/${columnId}`, "PUT", { title });
        await silentRefresh();
      } catch (err) {
        console.error("[BoardContext] renameColumn error:", err.message);
      }
    },
    [silentRefresh],
  );

  // =============================================
  // ADD CARD
  // =============================================
  const addCard = useCallback(
    async (boardId, columnId, text) => {
      try {
        await apiCall("/cards", "POST", { text, columnId, boardId });
        await silentRefresh();
      } catch (err) {
        console.error("[BoardContext] addCard error:", err.message);
      }
    },
    [silentRefresh],
  );

  // =============================================
  // DELETE CARD
  // =============================================
  const deleteCard = useCallback(
    async (...args) => {
      const cardId = args.length === 1 ? args[0] : args[2];
      try {
        if (!cardId || cardId === "undefined") {
          console.error("[BoardContext] deleteCard: invalid cardId:", cardId);
          return;
        }
        console.log("[BoardContext] Deleting card:", cardId);
        await apiCall(`/cards/${cardId}`, "DELETE");
        await silentRefresh();
      } catch (err) {
        console.error("[BoardContext] deleteCard error:", err.message);
      }
    },
    [silentRefresh],
  );

  // =============================================
  // EDIT CARD TEXT
  // =============================================
  const editCardText = useCallback(
    async (...args) => {
      const cardId = args.length === 2 ? args[0] : args[2];
      const newText = args.length === 2 ? args[1] : args[3];
      try {
        if (!cardId || cardId === "undefined") {
          console.error("[BoardContext] editCardText: invalid cardId:", cardId);
          return;
        }
        console.log("[BoardContext] Updating card:", cardId, "->", newText);
        await apiCall(`/cards/${cardId}`, "PUT", { text: newText });
        await silentRefresh();
      } catch (err) {
        console.error("[BoardContext] editCardText error:", err.message);
      }
    },
    [silentRefresh],
  );

  // =============================================
  // ✅ FIXED: DRAG END
  // Column reorder + Same-column card reorder + Cross-column card move
  // =============================================
  const onDragEnd = useCallback(
    async (event) => {
      const { active, over } = event;

      // Agar koi over nahi ya same jagah drop kiya to kuch mat karo
      if (!over || !currentBoardId || active.id === over.id) return;

      const board = boardsObj[currentBoardId];
      if (!board) return;

      const activeId = active.id;
      const overId = over.id;

      const isActiveColumn = board.columnOrder.includes(activeId);
      const isOverColumn = board.columnOrder.includes(overId);

      // ------------------------------------------
      // CASE 1: Column reorder
      // ------------------------------------------
      if (isActiveColumn && isOverColumn) {
        const oldIndex = board.columnOrder.indexOf(activeId);
        const newIndex = board.columnOrder.indexOf(overId);
        if (oldIndex === newIndex) return;

        const newOrder = arrayMove(board.columnOrder, oldIndex, newIndex);

        // Optimistic update
        setBoardsRaw((prev) =>
          prev.map((b) => {
            if (b._id !== currentBoardId) return b;
            const reordered = newOrder
              .map((colId) => b.columns.find((c) => c._id === colId))
              .filter(Boolean);
            return { ...b, columns: reordered };
          }),
        );

        try {
          await apiCall(`/boards/${currentBoardId}`, "PUT", {
            columnOrder: newOrder,
          });
        } catch (err) {
          console.error("[BoardContext] column reorder error:", err.message);
          await silentRefresh();
        }
        return;
      }

      // ------------------------------------------
      // CASE 2: Card drag (same column ya cross column)
      // ------------------------------------------
      const cardInfo = allCards[activeId];
      if (!cardInfo) return;

      const sourceColId = cardInfo.columnId;
      const destColId = isOverColumn
        ? overId
        : allCards[overId]?.columnId || null;

      if (!destColId) {
        console.warn(
          "[BoardContext] destColId resolve nahi hua, overId:",
          overId,
        );
        return;
      }

      // ------------------------------------------
      // CASE 2a: Cross-column card move
      // ------------------------------------------
      if (sourceColId !== destColId) {
        setBoardsRaw((prev) =>
          prev.map((b) => {
            if (b._id !== currentBoardId) return b;
            return {
              ...b,
              columns: b.columns.map((col) => {
                if (col._id === sourceColId) {
                  return {
                    ...col,
                    cards: (col.cards || []).filter((c) => c._id !== activeId),
                  };
                }
                if (col._id === destColId) {
                  const movingCard = allCards[activeId];
                  return {
                    ...col,
                    cards: [
                      ...(col.cards || []),
                      { _id: activeId, text: movingCard?.text || "" },
                    ],
                  };
                }
                return col;
              }),
            };
          }),
        );

        try {
          await apiCall(`/cards/${activeId}`, "PUT", { columnId: destColId });
        } catch (err) {
          console.error(
            "[BoardContext] card cross-column move error:",
            err.message,
          );
          await silentRefresh();
        }
        return;
      }

      // ------------------------------------------
      // CASE 2b: Same column card reorder
      // ------------------------------------------
      if (sourceColId === destColId && !isOverColumn) {
        const sourceCol = board.columns[sourceColId];
        if (!sourceCol) return;

        const oldIndex = sourceCol.cardIds.indexOf(activeId);
        const newIndex = sourceCol.cardIds.indexOf(overId);
        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

        const newCardIds = arrayMove(sourceCol.cardIds, oldIndex, newIndex);
        setBoardsRaw((prev) =>
          prev.map((b) => {
            if (b._id !== currentBoardId) return b;
            return {
              ...b,
              columns: b.columns.map((col) => {
                if (col._id !== sourceColId) return col;
                const reorderedCards = newCardIds
                  .map((cId) => (col.cards || []).find((c) => c._id === cId))
                  .filter(Boolean);
                return { ...col, cards: reorderedCards };
              }),
            };
          }),
        );

        try {
          await apiCall(`/columns/${sourceColId}`, "PUT", {
            cardOrder: newCardIds,
          });
        } catch (err) {
          console.error("[BoardContext] card reorder error:", err.message);
          await silentRefresh();
        }
      }
    },
    [currentBoardId, boardsObj, allCards, silentRefresh],
  );

  // =============================================
  // VALUE
  // =============================================
  const value = {
    data,
    loading,
    error,
    addBoard,
    selectBoard,
    deleteBoard,
    addColumn,
    deleteColumn,
    renameColumn,
    addCard,
    deleteCard,
    editCardText,
    onDragEnd,
    resetAll,
    loadBoards,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
