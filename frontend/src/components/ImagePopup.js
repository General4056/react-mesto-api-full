export default function ImagePopup(props) {
  return (
    <div className={`popup popup-image ${props.card.link && 'popup_is-opened'}`}>
      <div className="popup-image__container">
        <img src={props.card.link} alt={props.card.name} className="popup-image__img" />
        <h2 className="popup-image__text">{props.card.name}</h2>
        <button
          onClick={props.onClose}
          aria-label="Закрыть"
          type="button"
          className="popup__close-button popup__close-button_type_show-image"></button>
      </div>
    </div>
  );
}
