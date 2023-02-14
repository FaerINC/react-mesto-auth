import React from "react";
import logoMesto from "../images/logo.svg";

function Header({ children }) {
  return (
    <header className="header">
      <a href="#">
        <img src={logoMesto} className="header__logo" alt="ЛоготипMESTO" />
      </a>
      <div className="header__container">{children}</div>
    </header>
  );
}
export default Header;
