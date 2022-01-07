import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm ';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');

  useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  function handleNameChange(e) {
    setCardName(e.target.value);
  }
  function handleLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="add-card"
      title="Новое место"
      buttonText="Добавить"
      onSubmit={handleSubmit}>
      <label className="popup__form-field">
        <input
          onChange={handleNameChange}
          value={cardName}
          type="text"
          id="popup__input-card-name"
          name="name"
          className="popup__input popup__input_type_card-name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__input-error popup__input-card-name-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          onChange={handleLinkChange}
          value={cardLink}
          type="url"
          id="popup__input-card-source"
          name="link"
          className="popup__input popup__input_type_card-source"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error popup__input-card-source-error"></span>
      </label>
    </PopupWithForm>
  );
}
