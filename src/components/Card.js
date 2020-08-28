import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
  );
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
  );

  const handleClick = () => {
    props.onCardClick(props.card);
  }

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  }

  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить фото места" onClick={handleDeleteClick}></button>
      <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick} />
      <div className="element__text">
        <h2 className="element__image-title">{props.card.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Поставить фотографии лайк"></button>
          <span className="element__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
