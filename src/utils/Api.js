class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }
  }

  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  } //get

  getAllCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  } //get

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      }),
    }).then(this._checkResponse);
  } //post

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  } //delete

  setUserInformtion({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      }),
    }).then(this._checkResponse);
  } //patch

  setNewAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  } //patch

  _setLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  } //put

  _deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  } //delete

  toggleLike(cardId, isLiked) {
    if (isLiked) {
      return this._deleteLikeCard(cardId);
    }

    if (!isLiked) {
      return this._setLikeCard(cardId);
    }
  }
}

export const apiNew = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "eff7d243-9399-4d7f-b196-61b79a4d8723",
    "Content-Type": "application/json",
  },
});
