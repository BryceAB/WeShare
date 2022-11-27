import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export default function EditInput(props) {
  const [userToken] = useContext(UserContext);
  const [textEdit, setTextEdit] = useState(() => {
    const initialState = props.text;
    return initialState;
  });
  const [isEditing, setIsEditing] = useState(() => false);

  function handleChange(event) {
    setTextEdit(event.target.value);
  }

  function handleEdit(event) {
    setIsEditing(!isEditing);
  }

  async function handleSubmit() {
    let submitObj = {};
    switch (props.index) {
      case "post":
        submitObj = { jwt: userToken.token, post: textEdit };
        await axios
          .post(`http://localhost:8000/api/posts/${props.id}`, submitObj)
          .catch((err) => console.log(err));
        break;
      case "comment":
        submitObj = { jwt: userToken.token, comment: textEdit };
        await axios
          .post(`localhost:8000/api/comments/${props.id}`, submitObj)
          .catch((err) => console.log(err));
        break;
      default:
        submitObj = { jwt: userToken.token, [props.index]: textEdit };
        await axios
          .post(`http://localhost:8000/api/profiles/${props.id}`, submitObj)
          .catch((err) => console.log(err));
    }
  }

  return (
    <>
      {props.userId === userToken.userId ? (
        isEditing ? (
          <>
            <textarea
              type="text"
              onChange={handleChange}
              name={props.index}
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
          </>
        )
      ) : (
        <p>{textEdit}</p>
      )}
    </>
  );
}
