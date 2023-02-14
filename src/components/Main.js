import React from "react";
import Card from "./Card";
import pencil from "../images/pencil.svg";
import Avatar from "../images/kysto.jpg";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header>
        <p className="header__tools">{props.email}</p>
        <button href="#" className="header__logout opacity" onClick={props.onLogout}>
          Выйти
        </button>
      </Header>
      <main className="main">
        <section className="profile">
          <div className="profile__card">
            <div className="profile__picture">
              <div className="overlay-pencil"></div>
              <img
                src={currentUser.avatar ?? Avatar}
                alt="."
                className="profile__avatar"
              />
              <span onClick={props.changeAvatar} className="profile__pencil">
                <img src={pencil} alt="карандаш" />
              </span>
            </div>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                title="Редактировать профиль"
                className="profile__edit-button opacity"
                onClick={props.onEditProfile}
              ></button>
              <p className="profile__about">{currentUser.about}</p>
            </div>
          </div>
          <button
            onClick={props.addNewCard}
            type="button"
            className="profile__add-button opacity"
          ></button>
        </section>

        <section className="elements">
          <ul id="elements__list" className="elements__list">
            {props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
export default Main;
