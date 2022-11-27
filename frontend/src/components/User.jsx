import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";

export default function User(props) {
  const [userToken] = useContext(UserContext);
  const [user, setUser] = useState(props.user || {});

  useEffect(() => {
    (async () => {
      if (!props.user) {
        await axios
          .get(`http://localhost:8000/api/users/${userToken.userId}`)
          .then((res) => setUser(res.data.user))
          .catch((err) => console.log(err));
      } else {
        setUser(props.user);
      }
      return null;
    })();
  }, []);

  return (
    <Link to={`/profile/${user.id}`}>
      <div className="user">
        <img src={user.imgUrl} alt="User" />
        <h3>{user.username}</h3>
      </div>
    </Link>
  );
}
