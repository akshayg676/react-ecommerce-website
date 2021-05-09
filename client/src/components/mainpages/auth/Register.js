import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={registerSubmit}>
        <input
          type="name"
          name="name"
          required
          value={user.name}
          placeholder="Name"
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
          }}
        />
        <input
          type="email"
          name="email"
          required
          value={user.email}
          placeholder="Email"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <input
          type="password"
          name="password"
          required
          value={user.password}
          placeholder="Password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />

        <div className="row">
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
