import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `places__remove-button ${!isOwn && 'places__remove-button_hidden'}`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `places__like-button ${isLiked && 'places__like-button_active'}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="places__card">
      <button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName}></button>
      <img onClick={handleClick} src={card.link} alt={card.name} className="places__image" />
      <div className="places__text-wrap">
        <h2 className="places__text">{card.name}</h2>
        <div className="places__like-container">
          <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
          <p className="places__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
