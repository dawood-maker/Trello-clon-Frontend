import { v4 as uuid } from "uuid";
//===================================
// Helper to create a card
//===================================
const makeCard = (text) => {
  const id = uuid();
  const card = { id, text };
  console.log("Created card:", card);
  return card;
};
//===================================
// Initial cards
//===================================
const card1 = makeCard("Project Description 1");
const card2 = makeCard("Project Description 2");
const card3 = makeCard("Project Description 3");

console.log("Initial cards IDs:", card1.id, card2.id, card3.id);
//===================================
// Default board
//===================================
export const defaultBoards = {
  boards: {
    "board-1": {
      id: "board-1",
      name: "My Trello Board",
      columns: {
        "col-1": { id: "col-1", name: "To Do", cardIds: [card1.id] },
        "col-2": { id: "col-2", name: "In Progress", cardIds: [card2.id] },
        "col-3": { id: "col-3", name: "Done", cardIds: [card3.id] },
      },
      columnOrder: ["col-1", "col-2", "col-3"],
    },
  },
  cards: {
    [card1.id]: card1,
    [card2.id]: card2,
    [card3.id]: card3,
  },
  boardOrder: ["board-1"],
};

console.log("Default boards structure:", defaultBoards);
