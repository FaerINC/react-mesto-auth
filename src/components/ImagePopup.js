import React from "react";
function ImagePopup(props) {
  return (
    <div className={`popup popup-image ${props.card ? "popup_opened" : ""}`}>
      <div className="popup-image__container">
        <img
          id="img"
          className="popup-image__image"
          src={props.card?.link}
          alt={props.card?.name}
        />
        <h2 className="popup-image__title">{props.card?.name}</h2>
        <button
          className="popup__close-btn opacity"
          type="button"
          onClick={props.closeAll}
        ></button>
      </div>
    </div>
  );
}
export default ImagePopup;
