import React from 'react';
import successImage from '../images/Union.svg';
import unsuccessImage from '../images/unsuccess.svg';

export default function InfoTooltip({ isOpen, onClose, isRegistrationSuccess }) {
  return (
    <div className={`popup ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__container">
        <img className="popup__image" src={isRegistrationSuccess ? successImage : unsuccessImage} alt="Успешно" />
        <p className="popup__text">
          {isRegistrationSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
        <button onClick={onClose} aria-label="Закрыть" type="button" className={`popup__close-button`}></button>
      </div>
    </div>
  );
}
