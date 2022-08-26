import React, { useState } from "react";
import "./Card.css";
import "./EditCard.css";
import remove from "../AddCard/x-circle.svg";
import editIcon from "./edit.svg";

const Card = (props) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [inputValues, setInputValue] = useState({
    title: props.title,
    description: props.description,
  });

  return (
    <div
      className="card"
      draggable
      onDragEnd={() => props.handleDragEnd(props.cardId, props.boardId)}
      onDragEnter={() => props.handleDragEnter(props.cardId, props.boardId)}
    >
      {showEditForm ? (
        <form
          className={`edit_card_form`}
          onSubmit={(event) => {
            event.preventDefault();
            props.updateCard(props.boardId, props.cardId, inputValues);
            setShowEditForm(false);
          }}
        >
          Title:
          <input
            autoFocus
            type="text"
            id="titleField"
            value={inputValues.title}
            onChange={(event) => {
              setInputValue({
                title: event.target.value,
                description: inputValues.description,
              });
            }}
          />
          Description:
          <input
            type="text"
            id="descriptionField"
            value={inputValues.description}
            onChange={(event) => {
              setInputValue({
                title: inputValues.title,
                description: event.target.value,
              });
            }}
          />
          <div className="edit_card_footer">
            <button type="submit">Save</button>
            <span
              onClick={() => {
                setShowEditForm(false);
              }}
            >
              <img src={remove} alt="X" />
            </span>
          </div>
        </form>
      ) : (
        <div>
          <div className="card_top">
            <div className="card_top_title"> {props.title} </div>
            <img
              src={editIcon}
              alt="Edit"
              className="editCard"
              onClick={() => {
                setShowEditForm(true);
              }}
            />
            <p
              className="card_delete"
              onClick={() => props.removeCard(props.boardId, props.cardId)}
            >
              X
            </p>
            </div>
            {
              props.description === "" ? "":<div className="card_footer">{props.description}</div>
            }
        </div>
      )}
    </div>
  );
};

export default Card;
