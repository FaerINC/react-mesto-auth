class Authorization {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  register({ email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return this._getServerError(res);
      }
    });
  }

  authorize({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return this._getServerError(res);
      }
    });
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return this._getServerError(res);
      }
    });
  }

  _getServerError(res) {
    return res.json().then((res) => {
      throw new Error(res.message);
    });
  }
}

const authorization = new Authorization("https://auth.nomoreparties.co");

export default authorization;
