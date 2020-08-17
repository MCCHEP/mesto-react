import React, { useState } from 'react';
import { mestoApi } from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    Promise.all([mestoApi.getProfileData(), mestoApi.getInitalCards()])
      .then(([result, data]) => {
        setUserName(result.name);
        setUserDescription(result.about);
        setUserAvatar(result.avatar);
        setCards(data);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

  return (
    <main className="content">
      <section className="profile page__profile">
        <div className="profile__avatar-container">
          <button className="profile__edit-avatar-button" type="button" aria-label="Сменить аватар" onClick={props.onEditAvatar}></button>
          <img src={userAvatar} alt="Фотография профиля" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
          <p className="profile__occupation">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={props.onAddPlace}></button>
      </section>
      <section className="gallery page__gallery">
        <ul className="elements">
          {cards.map((card) => <Card card={card} key={card._id} onCardClick={props.onCardClick} />)}
        </ul>
      </section>
    </main>
  );
}

export default Main;
