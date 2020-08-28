import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }
  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser(name, description);
  }


  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input name="profilename" id="name-input" className="form__input form__input_type_name" type="text"
          placeholder="Имя" minLength="2" maxLength="40" value={name} onChange={handleNameChange} required />
        <span id="name-input-error" className="form__input-error"></span>
      </label>
      <label className="form__label">
        <input name="info" id="occupation-input" className="form__input form__input_type_occupation" type="text"
          placeholder="Профессия" minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} required />
        <span id="occupation-input-error" className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
