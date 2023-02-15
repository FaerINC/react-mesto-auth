import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div
        className={`popup__container ${
          props.name === "confirm" ? "popup__container_submit" : ""
        } ${props.name === "change-avatar" ? "popup__container_avatar" : ""}`}
      >
        <h2
          className={`popup__title ${
            props.name === "confirm" ? "popup__title_submit" : ""
          }`}
        >
          {props.title}
        </h2>
        <button
          onClick={props.closeAll}
          className="popup__close-btn opacity"
          type="button"
        ></button>
        <form onSubmit={props.onSubmit} name={props.name} className="form">
          {props.children}
          <button className="popup__save-btn opacity" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
