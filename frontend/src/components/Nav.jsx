import React from "react";
import User from "./User";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { useState } from "react";

export default function Nav() {
  const [userToken, setUserToken] = useContext(UserContext);
  const [showLinks, setShowLinks] = useState(true);
  const navigate = useNavigate();

  function handleLogout() {
    axios.put(`https://weshare.herokuapp.com/api/users/${userToken.userId}`, {
      jwt: userToken.jwt,
    });
    navigate("/");
    setUserToken([]);
    localStorage.removeItem("userTokenWeShare");
  }

  return (
    <nav>
      <button id="hamburger" onClick={() => setShowLinks(!showLinks)}>
        <svg viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
      </button>
      <ul id={showLinks ? "hidden" : "unhidden"}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          {typeof userToken.userId === "number" ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </li>
        {typeof userToken.userId === "number" ? (
          <li id={showLinks ? "hidden" : "unhidden"}>
            <User />
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
}
