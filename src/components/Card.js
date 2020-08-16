import React from 'react';

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="element">
      <button className="element__delete-button" type="button" aria-label="Удалить фото места"></button>
      <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick} />
      <div className="element__text">
        <h2 className="element__image-title">{props.card.name}</h2>
        <div className="element__like-container">
          <button className="element__like-button" type="button" aria-label="Поставить фотографии лайк"></button>
          <span className="element__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
