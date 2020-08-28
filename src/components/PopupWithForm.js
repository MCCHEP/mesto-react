import React from 'react';

function popupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <form className={`form form_type_${props.name}`} name={props.name} onSubmit={props.onSubmit} action="#" method="GET" noValidate>
          <h3 className="form__title">{props.title}</h3>
          {props.children}
          <button className="form__submit-button" type="submit">{props.buttonName}</button>
        </form>
      </div>
    </div>
  );
}

export default popupWithForm;
