import React from 'react';
import { useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

export default function Register({ handleRegistration }) {
  const [registrData, setRegistrData] = useState({ email: '', password: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setRegistrData({ ...registrData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegistration(registrData);
  }

  return (
    <div className="login">
      <Header>
        <Link to="/sign-in" className="header__button">
          Войти
        </Link>
      </Header>
      <div className="login__container">
        <h3 className="login__title">Регистрация</h3>
        <form onSubmit={handleSubmit} name="login__form" className="login__form">
          <label className="login__email-field">
            <input
              value={registrData.email}
              onChange={handleChange}
              type="email"
              name="email"
              className="login__input"
              placeholder="Email"
              required
            />
          </label>
          <label className="login__password-field">
            <input
              value={registrData.password}
              onChange={handleChange}
              type="password"
              name="password"
              className="login__input"
              placeholder="Пароль"
              required
            />
          </label>

          <button type="submit" className="login__submit-button">
            Зарегистрироваться
          </button>
        </form>
        <p to="/sign-in" className="login__paragraph">
          Уже зарегистрированы?{' '}
          <Link to="/sign-in" className="login__link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
