import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await axios
      .post(`http://localhost:8000/api/users`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setFormData({ name: "", username: "", password: "", email: "" });
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={handleChange}
          name="username"
          value={formData.username}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={formData.password}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={formData.email}
        />
        <button>Register</button>
      </form>
    </div>
  );
}
