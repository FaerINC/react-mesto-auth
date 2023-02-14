import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import auth from "../utils/auth";

export default function Login({ handleShowInfoMessage, onLogin, setEmail }) {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setInputs((state) => ({ ...state, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setEmail(inputs.email);
    auth
      .authorize(inputs)
      .then((res) => {
        if (res.token) localStorage.setItem("token", res.token);
        resetForm();
        onLogin();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        const text = "Что-то пошло не так! Попробуйте еще раз.";
        handleShowInfoMessage({
          text: text,
          isSuccess: false,
        });
      });
  }

  function resetForm() {
    setInputs({
      email: "",
      password: "",
    });
  }

  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__tools opacity">
          Регистрация
        </Link>
      </Header>
      <form
        onSubmit={handleSubmit}
        name="authorization"
        title="Вход"
        className="register__form"
      >
        <h2 className="register__title">Вход</h2>
        <input
          name="email"
          className="register__form_input"
          minLength={2}
          maxLength={40}
          placeholder="Email"
          type="email"
          required=""
          id="addEmail"
          onChange={handleChange}
        />

        <input
          name="password"
          className="register__form_input"
          placeholder="Пароль"
          minLength={8}
          maxLength={200}
          type="password"
          required=""
          id="addPassword"
          onChange={handleChange}
        />
        <button className="register__form_save-btn" type="submit">
          Войти
        </button>
      </form>
    </>
  );
}
