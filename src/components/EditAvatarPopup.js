import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, closeAll, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      closeAll={closeAll}
      isOpen={isOpen}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        name="inputAddLinkAvatar"
        className="form__input form__input_add_link"
        placeholder="Ссылка на картинку"
        type="url"
        defaultValue=""
        id="inputLinkAvatarNew"
        required=""
        ref={avatarRef}
      />
      <span id="inputLinkAvatarNew-error" className="error-span"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
