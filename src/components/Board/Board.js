import React from 'react'
import AddCard from '../AddCard/AddCard';
import Card from '../Card/Card';
import './Board.css'
import trashImage from "./trash.svg";

const Board = (props) => {
  const cards = props.cards;
  return (
    <div className="board">
      <div className="board_top">
        <div className="board_top_title"> {props.title} </div>
        <div className="board_delete">
          <img
            src={trashImage}
            alt="delete"
            onClick={() => props.removeBoard(props.boardId)}
          />
        </div>
      </div>
      <div className="board_cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            removeCard={props.removeCard}
            cardId={card.id}
            boardId={props.boardId}
            handleDragEnd={props.handleDragEnd}
            handleDragEnter={props.handleDragEnter}
            updateCard={props.updateCard}
          />
        ))}

        {/* Add more Cards */}
        <AddCard
          displayClass="board_add_cards"
          text="Add new card"
          placeholder="Enter Card Title"
          onSubmit={(value) => props.addCard(value, props.boardId)}
        />
      </div>
    </div>
  );
}

export default Board;