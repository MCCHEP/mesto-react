import {
  defaultUrl,
  myGroup,
  myToken,
  defaultType
} from "./utils";

class Api {
  constructor(data) {
    this._url = data.link;
    this._groupId = data.groupId;
    this._headers = data.headers;
  }

  _prepareData(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitalCards() {
    return fetch(`${this._url}/v1/${this._groupId}/cards`,
      {
        method: 'GET',
        headers: this._headers
      })
      .then(this._prepareData)
      .catch(err => console.log(`Загрузка карточек с сервера: ${err}`));;
  }

  getProfileData() {
    return fetch(`${this._url}/v1/${this._groupId}/users/me`,
      {
        method: 'GET',
        headers: this._headers
      })
      .then(this._prepareData)
      .catch(err => console.log(`Загрузка информации о пользователе: ${err}`));
  }

  updateCardlikes(itemId, method) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/likes/${itemId}`,
      {
        method: method === 'like' ? 'PUT' : 'DELETE',
        headers: this._headers
      }).then(this._prepareData)
      .catch(err => console.log(`Передача информации о лайке/дизлайке: ${err}`));;
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._headers
      }).then(this._prepareData)
      .catch(err => console.log(`Удаление карточки с сервера: ${err}`));;
  }

  createCard(name, link) {
    return fetch(`${this._url}/v1/${this._groupId}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      }).then(this._prepareData)
      .catch(err => console.log(`Добавление карточки на сервер: ${err}`));;
  }

  updateProfile(name, about) {
    return fetch(`${this._url}/v1/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._prepareData)
      .catch(err => console.log(`Обновление профиля пользователя: ${err}`));;
  }

  updateAvatar(avatarLink) {
    return fetch(`${this._url}/v1/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    }).then(this._prepareData)
      .catch(err => console.log(`Обновление аватара: ${err}`));;
  }
}

export const mestoApi = new Api({
  link: defaultUrl,
  groupId: myGroup,
  headers: {
    authorization: myToken,
    'Content-Type': defaultType
  }
});
