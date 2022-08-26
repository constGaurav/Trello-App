import React, { useEffect, useState } from "react";
import "./App.css";
import AddCard from "./components/AddCard/AddCard";
import Board from "./components/Board/Board";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const [boards, setBoards] = useState([
    {
      id: Date.now() + Math.random() * 2,
      title: "To Do",
      cards: [
        {
          id: Date.now() + Math.random(),
          title: "Card Title 1",
          description: "description of Card 1",
        },
        {
          id: Date.now() + Math.random(),
          title: "Card Title 2",
          description: "description of Card 2",
        },
      ],
    },
    {
      id: Date.now() + Math.random() * 2,
      title: "Doing",
      cards: [
        {
          id: Date.now() + Math.random(),
          title: "Card Title 1",
          description: "description of Card 1",
        },
        {
          id: Date.now() + Math.random(),
          title: "Card Title 2",
          description: "description of Card 2",
        },
      ],
    },
  ]);

  const [target, setTarget] = useState({
    cardId: "",
    boardId: "",
  });

  useEffect(() => {
    document.title = `${boards.length} Boards`;
  }, [boards])

  // Board Manipulation
  const addBoard = (title) => {
    const board = {
      id: Date.now() + Math.random() * 2,
      title,
      cards: [],
    };
    setBoards([...boards, board]);
  };

  const removeBoard = (id) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;
    const tempBoards = [...boards];
    tempBoards.splice(index, 1);
    setBoards(tempBoards);
  };

  // Cards Manipulation
  const addCard = (title, bid) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      description:""
    };

    const index = boards.findIndex((board) => board.id === bid);
    if (index < 0) return;
    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  // Edit Card Details
  const updateCard = (bid, cid, value) => {
    const boardIndex = boards.findIndex((board) => board.id === bid);
    if (boardIndex < 0) return;

    const cardIndex = boards[boardIndex].cards.findIndex(
      (card) => card.id === cid
    );
    if (cardIndex < 0) return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[boardIndex].cards[cardIndex];
    tempCard.title = value.title;
    tempCard.description = value.description;
    tempBoards[boardIndex].cards.splice(cardIndex, 1);
    tempBoards[boardIndex].cards.splice(cardIndex, 0, tempCard);
    setBoards(tempBoards);
  };


  // Drag and Drop Cards
  const handleDragEnter = (cid, bid) => {
    if (target.cardId === cid) return;
    setTarget({
      cardId: cid,
      boardId: bid,
    });
  };

  const handleDragEnd = (cid, bid) => {
    const srcBoardIndex = boards.findIndex((board) => board.id === bid);
    if (srcBoardIndex < 0) return;

    const srcCardIndex = boards[srcBoardIndex].cards.findIndex(
      (card) => card.id === cid
    );
    if (srcCardIndex < 0) return;

    const targetBoardIndex = boards.findIndex(
      (board) => board.id === target.boardId
    );
    if (targetBoardIndex < 0) return;

    const targetCardIndex = boards[targetBoardIndex].cards.findIndex(
      (card) => card.id === target.cardId
    );
    if (targetCardIndex < 0) return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[srcBoardIndex].cards[srcCardIndex];
    tempBoards[srcBoardIndex].cards.splice(srcCardIndex, 1); // removing from src
    tempBoards[targetBoardIndex].cards.splice(targetCardIndex, 0, tempCard); // adding into target
    setBoards(tempBoards);
    setTarget({
      cardId: "",
      boardId: "",
    });
  };

  return (
    <div>
      <Navbar />

      <div className="app_outer">
        <div className="app_boards">
          {boards.map((board) => (
            <Board
              key={board.id}
              boardId={board.id}
              title={board.title}
              cards={board.cards}
              removeBoard={removeBoard}
              addCard={addCard}
              removeCard={removeCard}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
              updateCard={updateCard}
            />
          ))}

          
          {/* Add More Boards */}
          <div className="add_boards">
            <AddCard
              text="Add Board"
              placeholder="Enter Board Title"
              onSubmit={(value) => addBoard(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
