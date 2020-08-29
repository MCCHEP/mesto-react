import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  const handlePlaceNameChange = (e) => {
    setPlaceName(e.target.value);
  }
  const handlePlaceLinkChange = (e) => {
    setPlaceLink(e.target.value);
  }
  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace(placeName, placeLink);
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input id="placename-input" name="name" className="form__input form__input_type_place-name" type="text"
          placeholder="Название" minLength="1" maxLength="30" value={placeName} onChange={handlePlaceNameChange} required />
        <span id="placename-input-error" className="form__input-error"></span>
      </label>
      <label className="form__label">
        <input id="url-input" name="link" className="form__input form__input_type_link" type="url"
          placeholder="Ссылка на картинку" value={placeLink} onChange={handlePlaceLinkChange} required />
        <span id="url-input-error" className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
