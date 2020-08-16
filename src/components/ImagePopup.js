import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_photo ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть окно" onClick={props.onClose}></button>
        <img src={props.card.link} alt={props.card.name} className="popup__image" />
        <h3 className="popup__image-title">{props.card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
