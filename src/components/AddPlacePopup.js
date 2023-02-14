import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, closeAll, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add_card"
      title="Новое место"
      closeAll={closeAll}
      isOpen={isOpen}
      buttonText={"Создать"}
      onSubmit={handleSubmit}
    >
      <input
        name="inputAddNameCard"
        className="form__input form__input_add_name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        type="text"
        value={name || ""}
        id="inputNameCardNew"
        required=""
        onChange={handleChangeName}
      />
      <span id="inputNameCardNew-error" className="error-span"></span>
      <input
        name="inputAddLinkCard"
        className="form__input form__input_add_link"
        placeholder="Ссылка на картинку"
        type="url"
        value={link || ""}
        id="inputLinkCardNew"
        required=""
        onChange={handleChangeLink}
      />
      <span id="inputLinkCardNew-error" className="error-span"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
