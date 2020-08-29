import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input ref={avatarRef} id="avatar-url-input" name="avatarLink" className="form__input form__input_type_link" type="url"
          placeholder="Ссылка на аватар" required />
        <span id="avatar-url-input-error" className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
