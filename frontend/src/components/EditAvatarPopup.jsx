import { useRef } from 'react';
import PopupWithForm from './PopupWithForm ';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputAvatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatarRef.current.value
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Обновить"
      onSubmit={handleSubmit}>
      <label className="popup__form-field">
        <input
          ref={inputAvatarRef}
          type="url"
          id="popup__input-avatar"
          name="avatar"
          className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__input-error popup__input-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}
