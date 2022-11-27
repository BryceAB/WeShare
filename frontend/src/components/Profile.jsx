import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditInput from "./EditInput";

export default function Profile() {
  let { id } = useParams();
  const [profile, setProfile] = useState(() => {
    const initialState = { user: "" };
    return initialState;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await axios
        .get(`http://localhost:8000/api/profiles/${id}`)
        .then((res) => {
          setProfile({ ...res.data });
          setLoading(false);
        })
        .catch((err) => console.log(err));
    })();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="container profile">
      <img src={profile.user.imgUrl} alt="User" />
      <h2>{profile.user.username}</h2>
      <h3>About</h3>
      <>
        <EditInput
          userId={profile.user.id}
          id={profile.id}
          text={profile.about}
          index="about"
        />
      </>
      <h3>Interests</h3>
      <>
        <EditInput
          userId={profile.user.id}
          id={profile.id}
          text={profile.interests}
          index="interests"
        />
      </>
      <h3>Goals</h3>
      <>
        <EditInput
          userId={profile.user.id}
          id={profile.id}
          text={profile.goals}
          index="goals"
        />
      </>
    </div>
  );
}
