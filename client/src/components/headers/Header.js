import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import Menu from "./icons/menu.svg";
import Close from "./icons/close.svg";
import Cart from "./icons/cart.svg";

function Header() {
  const value = useContext(GlobalState);
  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="menu icon" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">Click N Buy</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/login">Login / Register</Link>
        </li>
        <li>
          <img className="menu" src={Close} alt="close icon" width="30" />
        </li>
      </ul>

      <div className="cart-icon">
        <span>0</span>
        <Link to="/cart">
          <img src={Cart} alt="cart icon" width="30" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
