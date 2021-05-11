import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import Menu from "./icons/menu.svg";
import Close from "./icons/close.svg";
import Cart from "./icons/cart.svg";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [isLogged, setIsLogged] = state.userAPI.isLogged;

  const logout = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="menu icon" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "Click N Buy"}</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">{isAdmin ? "Product" : "shop"}</Link>
        </li>

        {isAdmin && adminRouter()}
        {isLogged ? ( // islogged = true => call loggedrouter , islogged = false => show login/register
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login / Register</Link>{" "}
          </li>
        )}

        <li>
          <img className="menu" src={Close} alt="close icon" width="30" />
        </li>
      </ul>

      {isAdmin ? ( // only show cart icon for user and not admin
        ""
      ) : (
        <div className="cart-icon">
          <span>0</span>
          <Link to="/cart">
            <img src={Cart} alt="cart icon" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
