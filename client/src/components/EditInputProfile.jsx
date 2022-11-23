import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { useEffect } from "react";

export default function EditInput(props) {
  const [userToken] = useContext(UserContext);
  const [{ userId, id, text, index }, setProps] = useState(() => props);
  const [textEdit, setTextEdit] = useState(() => {
    const initialState = text;
    return initialState;
  });
  const [isEditing, setIsEditing] = useState(() => false);

  console.log(props);

  useEffect(() => {
    if (props.text !== "" || undefined || null) {
      setProps({ ...props });
    }
  }, [props]);

  function handleChange(event) {
    setTextEdit(event.target.value);
  }

  async function handleSubmit() {
    const submitObj = { jwt: userToken.token, [index]: textEdit };
    await axios
      .post(`http://localhost:8000/api/profiles/${id}`, submitObj)
      .catch((err) => console.log(err));
  }

  return (
    <>
      {userId === userToken.userId ? (
        isEditing ? (
          <>
            <textarea
              type="text"
              onChange={handleChange}
              name={index}
              value={textEdit}
            />
            <button
              onClick={() => {
                handleSubmit();
                setIsEditing(!isEditing);
              }}
            >
              Submit
            </button>
          </>
        ) : (
          <>
            <p>{textEdit}</p>
            <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
          </>
        )
      ) : (
        <p>{textEdit}</p>
      )}
    </>
  );
}
