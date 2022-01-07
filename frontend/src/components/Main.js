import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <div style={{ backgroundImage: `url(${currentUser.avatar})` }} className="profile__avatar"></div>
            <button
              onClick={onEditAvatar}
              aria-label="Изменить аватар"
              type="button"
              className="profile__avatar-button"></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              aria-label="Изменить"
              type="button"
              className="profile__eddit-button"></button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={onAddPlace} aria-label="Добавить" type="button" className="profile__add-button"></button>
      </section>
      <section className="places">
        <ul className="places__cards">
          {cards.map((card, i) => (
            <Card
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id}
              card={card}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
