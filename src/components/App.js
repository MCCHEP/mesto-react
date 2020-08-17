import React, { useState } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    < >
      <div className="page__container">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <PopupWithForm
        name="profile-edit"
        title="Редактировать профиль"
        buttonName="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__label">
          <input name="profilename" id="name-input" className="form__input form__input_type_name" type="text"
            placeholder="Имя" minLength="2" maxLength="40" required />
          <span id="name-input-error" className="form__input-error"></span>
        </label>
        <label className="form__label">
          <input name="info" id="occupation-input" className="form__input form__input_type_occupation" type="text"
            placeholder="Профессия" minLength="2" maxLength="200" required />
          <span id="occupation-input-error" className="form__input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="add-place"
        title="Новое место"
        buttonName="Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__label">
          <input id="placename-input" name="name" className="form__input form__input_type_place-name" type="text"
            placeholder="Название" minLength="1" maxLength="30" required />
          <span id="placename-input-error" className="form__input-error"></span>
        </label>
        <label className="form__label">
          <input id="url-input" name="link" className="form__input form__input_type_link" type="url"
            placeholder="Ссылка на картинку" required />
          <span id="url-input-error" className="form__input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        buttonName="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__label">
          <input id="avatar-url-input" name="avatarLink" className="form__input form__input_type_link" type="url"
            placeholder="Ссылка на аватар" required />
          <span id="avatar-url-input-error" className="form__input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonName="Да"
        isOpen={false}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </ >
  );
}

export default App;
