import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { Api } from '../utils/Api';
import PopupWithForm from './PopupWithForm ';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    about: '',
    avatar: '',
    cohort: '',
    name: '',
    _id: ''
  });

  const [userEmail, setUserEmail] = React.useState('');

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);

  let navigate = useNavigate();
  
  const api = new Api({
    url: auth.BASE_URL,
    token: `Bearer ${localStorage.getItem('token')}`
  });

  useEffect(() => {
    console.log(1)
    tokenCheck();
  }, [loggedIn]);

  useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  useEffect(() => {
    const closeByEscape = (event) => {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  function handleRegistrationSuccess(isSuccess) {
    setIsRegistrationSuccess(isSuccess);
    setIsInfoPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsInfoPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userData) {
    api
      .sendUserData(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .sendNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    console.log(card, card.likes)

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    console.log(card)
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function tokenCheck() {
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      console.log(token);
      auth
        .checkToken(token)
        .then((res) => {
          console.log(res);
          if (res) {
            console.log(res.email);
            handleLogin(res.email);
            navigate('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleLogin(email) {
    setLoggedIn(true);
    setUserEmail(email);
  }

  function handleExit() {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }

  function handleLoginSubmit(loginData) {
    if (!loginData.email || !loginData.password) {
      return;
    }
    auth
      .authorize(loginData.password, loginData.email)
      .then((data) => {
        if (data.token) {
          handleLogin(loginData.email);
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  }

  function handleRegistrationSubmit(registrData) {
    if (!registrData.email || !registrData.password) {
      return;
    }
    auth
      .register(registrData.password, registrData.email)
      .then(() => {
        navigate('/sign-in');
        handleRegistrationSuccess(true);
      })
      .catch(() => handleRegistrationSuccess(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route
              path="/*"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={
                    <>
                      <Header>
                        <div className="header__container">
                          <p className="header__text">{userEmail}</p>
                          <Link onClick={handleExit} to="/sign-in" className="header__button">
                            Выйти
                          </Link>
                        </div>
                      </Header>
                      <Main
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                      />
                      <Footer />

                      <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                      />

                      <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                      />

                      <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                      />

                      <PopupWithForm name="confirm" title="Вы уверенны?" buttonText="Да" />

                      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                    </>
                  }
                />
              }
            />
            <Route path="/sign-up" element={<Register handleRegistration={handleRegistrationSubmit} />} />
            <Route path="/sign-in" element={<Login handleLogin={handleLoginSubmit} />} />
          </Routes>
          <InfoTooltip
            isOpen={isInfoPopupOpen}
            onClose={closeAllPopups}
            isRegistrationSuccess={isRegistrationSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
