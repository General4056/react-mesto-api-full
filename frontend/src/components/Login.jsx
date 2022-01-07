import React from 'react';
import { useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

export default function Login({ handleLogin }) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleLogin(loginData);
  }

  return (
    <div className="login">
      <Header>
        <Link to="/sign-up" className="header__button">
          Регистрация
        </Link>
      </Header>
      <div className="login__container">
        <h3 className="login__title">Вход</h3>
        <form onSubmit={handleSubmit} name="login__form" className="login__form">
          <label className="login__email-field">
            <input
              onChange={handleChange}
              value={loginData.email}
              type="email"
              name="email"
              className="login__input"
              placeholder="Email"
              required
            />
          </label>
          <label className="login__password-field">
            <input
              onChange={handleChange}
              value={loginData.password}
              type="password"
              name="password"
              className="login__input"
              placeholder="Пароль"
              required
            />
          </label>

          <button type="submit" className="login__submit-button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
