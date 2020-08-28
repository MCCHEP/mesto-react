import React, { useState } from 'react';
import { mestoApi } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

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
  const handleUpdateUser = (name, description) => {
    mestoApi.updateProfile(name, description)
      .then(data => setCurrentUser(data))
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  const handleUpdateAvatar = (avatarLink) => {
    mestoApi.updateAvatar(avatarLink)
      .then(newUser => setCurrentUser(newUser))
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    mestoApi.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    });
  }
  const handleCardDelete = (card) => {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    mestoApi.deleteCard(card._id).then((data) => {
      if (data.message === 'Пост удалён') {
        const newCards = cards.filter(element => element !== card);
        setCards(newCards);
      }
    });
  }
  const handleAddPlace = (name, link) => {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    mestoApi.createCard(name, link)
      .then((newCard) => {
        setCards([...cards, newCard]);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });;
  }

  React.useEffect(() => {
    Promise.all([mestoApi.getProfileData(), mestoApi.getInitalCards()])
      .then(([info, data]) => {
        setCurrentUser(info);
        setCards(data);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

  return (
    < >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

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
      </CurrentUserContext.Provider>
    </ >
  );
}

export default App;
