import React, { useState } from 'react'
import remove from './x-circle.svg';
import './AddCard.css'

const AddCard = (props) => {

    const [showForm, setShowForm] = useState(false);
    const [inputValue, setInputValue] = useState("");

    return (
      <div className="add_card">
        {showForm ? (
          <form
            className={`add_card_form ${props.editClass || ""}`}
            onSubmit={(event) => {
              event.preventDefault();
                if (props.onSubmit) props.onSubmit(inputValue);
                setShowForm(false);
                setInputValue("");
            }}
          >
            <input
                autoFocus
                type="text"
                value={inputValue}
                onChange={(event) => {setInputValue(event.target.value)}}
                placeholder={props.placeholder}
            />
            <div className="add_card_footer">
              <button type="submit">{props.buttonText || "Add"}</button>
              <span
                onClick={() => {
                  setShowForm(false);
                }}
              >
                <img src={remove} alt="X" />
              </span>
            </div>
          </form>
        ) : (
          <p
            className={`editable_display ${props.displayClass || ""}`}
            onClick={() => {
              setShowForm(true);
            }}
          >
            {props.text || "Add Item"}
          </p>
        )}
      </div>
    );
}

export default AddCard;