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

  useEffect(() => {
    if (props.text !== "" || undefined || null) {
      setProps({ ...props });
    }
  }, [props]);

  function handleChange(event) {
    setTextEdit(event.target.value);
  }

  function handleEdit(event) {
    setIsEditing(!isEditing);
  }

  async function handleSubmit() {
    let submitObj = {};
    switch (index) {
      case "post":
        submitObj = { jwt: userToken.token, post: textEdit };
        await axios
          .post(`http://localhost:8000/api/posts/${id}`, submitObj)
          .catch((err) => console.log(err));
        break;
      case "comment":
        submitObj = { jwt: userToken.token, comment: textEdit };
        await axios
          .post(`localhost:8000/api/comments/${id}`, submitObj)
          .catch((err) => console.log(err));
        break;
      default:
        submitObj = { jwt: userToken.token, [index]: textEdit };
        await axios
          .post(`http://localhost:8000/api/profiles/${id}`, submitObj)
          .catch((err) => console.log(err));
    }
  }

  async function handleDelete() {
    let submitObj = { jwt: userToken.token };
    switch (index) {
      case "post":
        await axios
          .delete(`http://localhost:8000/api/posts/${id}`, submitObj)
          .catch((err) => console.log(err));
        break;
      case "comment":
        await axios
          .delete(`http://localhost:8000/api/comments/${id}`, submitObj)
          .catch((err) => console.log(err));
        break;
      default:
        break;
    }
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
            <button onClick={handleEdit}>Edit</button>
            {index !== "post" || "comment" ? (
              <button onClick={handleDelete}>Delete</button>
            ) : (
              ""
            )}
          </>
        )
      ) : (
        <p>{textEdit}</p>
      )}
    </>
  );
}
