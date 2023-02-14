import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onUpdateUser, closeAll }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeAbout(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit_profile"
      title="Редактировать профиль"
      closeAll={closeAll}
      isOpen={isOpen}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        className="form__input form__input_add_name"
        minLength={2}
        maxLength={40}
        placeholder="Имя"
        type="text"
        required=""
        id="profileAddName"
        onChange={handleChangeName}
        value={name || ""}
      />
      <span id="profileAddName-error" className="error-span"></span>
      <input
        name="about"
        className="form__input form__input_add_about"
        placeholder="Информация"
        minLength={2}
        maxLength={200}
        type="text"
        required=""
        id="profileAddAbout"
        onChange={handleChangeAbout}
        value={description || ""}
      />
      <span id="profileAddAbout-error" className="error-span"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
