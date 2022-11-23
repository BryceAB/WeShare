import React from "react";
import User from "./User";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export default function Nav() {
  const [userToken, setUserToken] = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    axios.put(`http://localhost:8000/api/users/${userToken.userId}`, {
      jwt: userToken.jwt,
    });
    navigate("/");
    setUserToken({});
    localStorage.removeItem("userTokenWeShare");
  }

  return (
    <nav>
      <ul>
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
          <li>
            <User />
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
}
