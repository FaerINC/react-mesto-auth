export default function InfoToolTip({ message, onClose }) {
  return (
    <div className={"popup popup__info" + (message ? " popup_opened" : "")}>
      <div className="popup__container">
        <p
          className={
            "popup__info " +
            (message
              ? message.isSuccess
                ? "popup__info_success"
                : "popup__info_fail"
              : "")
          }
        ></p>
        <p className="popup__info_text">{message ? message.text : " "}</p>
        <button
          className="popup__close-btn opacity"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

