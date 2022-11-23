import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userToken, setUserToken] = useContext(UserContext);
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(event) {
    setLoginInfo((prevLoginInfo) => {
      return {
        ...prevLoginInfo,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await axios
      .post("http://localhost:8000/api/users/1", loginInfo)
      .then((res) => {
        setUserToken(res.data);
        localStorage.setItem("userTokenWeShare", JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));
    setLoginInfo({ username: "", password: "" });
    navigate("/");
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={handleChange}
          name="username"
          value={loginInfo.username}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={loginInfo.password}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
