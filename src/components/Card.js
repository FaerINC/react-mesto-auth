import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card);
  }

  return (
    <div className="element_template">
      <li id="element" className="element">
        <img
          onClick={handleClick}
          id="cardImage"
          className="element__image"
          src={card.link}
          alt={card.name}
        />
        <div className="element__container">
          <h2 className="element__text">{card.name}</h2>
          <button
            onClick={handleLike}
            id="cardLike"
            type="button"
            className={`${cardLikeButtonClassName} opacity`}
          ></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
        {isOwn && (
          <button
            onClick={handleDelete}
            id="trashIcon"
            className="element__trash-icon opacity"
          />
        )}
      </li>
    </div>
  );
}

export default Card;
