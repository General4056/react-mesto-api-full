import React, { useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm ';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить">
      <label className="popup__form-field">
        <input
          onChange={handleNameChange}
          value={name}
          type="text"
          id="popup__input-name"
          name="name"
          className="popup__input popup__input_type_name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__input-error popup__input-name-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          onChange={handleDescriptionChange}
          value={description}
          type="text"
          id="popup__input-profession"
          name="about"
          className="popup__input popup__input_type_profession"
          placeholder="Профессия"
          minLength="2"
          maxLength="400"
          required
        />
        <span className="popup__input-error popup__input-profession-error"></span>
      </label>
    </PopupWithForm>
  );
}
