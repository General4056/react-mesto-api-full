export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_is-opened'}`}>
      <div className="popup__container">
        <h3 className="popup__title">{props.title}</h3>
        <form name={props.name} className={`popup__form popup__form_type_${props.name}`} onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__submit-button">
            {props.buttonText}
          </button>
        </form>
        <button
          onClick={props.onClose}
          aria-label="Закрыть"
          type="button"
          className={`popup__close-button popup__close-button_${props.name}`}></button>
      </div>
    </div>
  );
}
