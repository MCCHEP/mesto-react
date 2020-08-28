import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile page__profile">
        <div className="profile__avatar-container">
          <button className="profile__edit-avatar-button" type="button" aria-label="Сменить аватар" onClick={props.onEditAvatar}></button>
          <img src={currentUser.avatar} alt="Фотография профиля" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
          <p className="profile__occupation">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={props.onAddPlace}></button>
      </section>
      <section className="gallery page__gallery">
        <ul className="elements">
          {props.cards.map((card) => <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)}
        </ul>
      </section>
    </main>
  );
}

export default Main;
