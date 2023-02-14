import "../index.css";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { apiNew } from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React, { useEffect, useState } from "react";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import authorization from "../utils/authorization";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isCardsPopupOpen, setIsCardsPopupOpen] = useState(false);
  const [selectedCard, setIsSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  //authorization
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState(null);
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  useEffect(() => {
    apiNew
      .getUserInformation()
      .then(setCurrentUser)
      .catch((err) => {
        console.log(err);
      });

    apiNew
      .getAllCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function openEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function openAddNewCard() {
    setIsCardsPopupOpen(true);
  }

  function openChangeAvatar() {
    setIsAvatarPopupOpen(true);
  }

  function openPopupConfirm() {
    setIsEditProfilePopupOpen(true);
  }

  function closeState() {
    setIsEditProfilePopupOpen(false);
    setIsCardsPopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsSelectedCard(null);
    setInfoMessage(null);
  }

  function closeAllPopups() {
    closeState();
  }

  function handleCardClick(card) {
    setIsSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //Отправляем запрос в API и получаем обновлённые данные карточки
    apiNew
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((stateCards) =>
          stateCards.map((current) =>
            current._id === card._id ? newCard : current
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    if (card.owner._id === currentUser._id) {
      apiNew
        .deleteCard(card._id)
        .then(() => {
          const newArr = cards.filter(function (elem) {
            return elem !== card;
          });
          setCards(newArr);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleUpdateUser(userInfo) {
    apiNew
      .setUserInformtion(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    apiNew
      .setNewAvatar(avatar)
      .then((newUserAvatar) => {
        setCurrentUser(newUserAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace(newPlace) {
    console.log(newPlace);
    apiNew
      .addNewCard(newPlace)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //работа с токеном
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authorization
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  function handleShowInfoMessage(message) {
    setInfoMessage(message);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={loggedIn}>
                  <Main
                    cards={cards}
                    onEditProfile={openEditProfile}
                    addNewCard={openAddNewCard}
                    changeAvatar={openChangeAvatar}
                    confirm={openPopupConfirm}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onLogout={handleLogout}
                    email={email}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  onLogin={handleLogin}
                  handleShowInfoMessage={handleShowInfoMessage}
                  setEmail={setEmail}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register handleShowInfoMessage={handleShowInfoMessage} />
              }
            />
            <Route
              path="*"
              element={
                loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>
          <Footer />
        </div>
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        closeAll={closeAllPopups}
      />

      <AddPlacePopup
        isOpen={isCardsPopupOpen}
        closeAll={closeAllPopups}
        onAddPlace={handleAddPlace}
      />

      <EditAvatarPopup
        isOpen={isAvatarPopupOpen}
        closeAll={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup card={selectedCard} closeAll={closeAllPopups} />

      <InfoToolTip message={infoMessage} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
