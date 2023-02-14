import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import auth from "../utils/auth";

export default function Register({ handleShowInfoMessage }) {
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
    auth
      .register(inputs)
      .then((res) => {
        handleShowInfoMessage({
          text: "Вы успешно зарегистрировались!",
          isSuccess: true,
        });
        resetForm();
        navigate("/sign-in");
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
        <Link to="/sign-in" className="header__tools opacity">
          Войти
        </Link>
      </Header>
      <form
        name="registration"
        title="Регистрация"
        className="register__form"
        onSubmit={handleSubmit}
      >
        <h2 className="register__title">Регистрация</h2>
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
          value={inputs.email}
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
          value={inputs.password}
        />
        <button className="register__form_save-btn" type="submit">
          Зарегестрироваться
        </button>
      </form>
      <h2 className="register__subtitle">
        Уже Зарегестрированы?{" "}
        <Link className="register__subtitle-link opacity" to="/sign-in">
          Войти
        </Link>
      </h2>
    </>
  );
}
