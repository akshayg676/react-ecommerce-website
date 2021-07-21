import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import Menu from "./icons/menu.svg";
import Close from "./icons/close.svg";
import Cart from "./icons/cart.svg";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [isLogged] = state.userAPI.isLogged;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logout = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link className="list" to="/create_product">
            Create Product
          </Link>
        </li>
        <li>
          <Link className="list" to="/category">
            Categories
          </Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link className="list" to="/history">
            History
          </Link>
        </li>
        <li>
          <Link className="list" to="/" onClick={logout}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const toggleMenu = () => setMenu(!menu);

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="menu icon" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">
            {isAdmin ? (
              "ADMIN"
            ) : (
              <img
                className="logo1"
                src="https://res.cloudinary.com/dsrs8h01h/image/upload/v1626785035/ecommerce/photo_2021-07-20_18-03-30-removebg-preview-min_mlvisp.png"
                alt=""
              />
            )}
          </Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link className="list" to="/">
            {isAdmin ? "Product" : "Shop"}
          </Link>
        </li>

        {isAdmin && adminRouter()}
        {isLogged ? ( // islogged = true => call loggedrouter , islogged = false => show login/register
          loggedRouter()
        ) : (
          <li>
            <Link className="list" to="/login">
              Login / Register
            </Link>{" "}
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <img className="menu" src={Close} alt="close icon" width="30" />
        </li>
      </ul>

      {isAdmin ? ( // only show cart icon for user and not admin
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="cart icon" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
