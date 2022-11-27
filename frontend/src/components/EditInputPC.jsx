import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export default function EditInputPC(props) {
  const [userToken] = useContext(UserContext);
  const [textEdit, setTextEdit] = useState(() => {
    const initialState = props.text;
    return initialState;
  });
  const [isEditing, setIsEditing] = useState(() => false);
  const [deleted, setDeleted] = useState(false);

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
          .post(
            `https://weshare.herokuapp.com/api/posts/${props.id}`,
            submitObj
          )
          .catch((err) => console.log(err));
        break;
      case "comment":
        submitObj = {
          jwt: userToken.token,
          commentId: props.id,
          comment: textEdit,
        };
        await axios
          .post(
            `https://weshare.herokuapp.com/api/comments/${props.id}`,
            submitObj
          )
          .catch((err) => console.log(err));
        break;
      default:
        submitObj = { jwt: userToken.token, [props.index]: textEdit };
        await axios
          .post(
            `https://weshare.herokuapp.com/api/profiles/${props.id}`,
            submitObj
          )
          .catch((err) => console.log(err));
    }
  }

  async function handleDelete() {
    switch (props.index) {
      case "post":
        await axios
          .delete(`https://weshare.herokuapp.com/api/posts/${props.id}`)
          .catch((err) => console.log(err));
        break;
      case "comment":
        await axios
          .delete(`https://weshare.herokuapp.com/api/comments/${props.id}`)
          .catch((err) => console.log(err));
        break;
      default:
        break;
    }
  }

  if (deleted) return <p>Deleted</p>;

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
            <button
              onClick={() => {
                handleDelete();
                setDeleted(true);
              }}
            >
              Delete
            </button>
          </>
        )
      ) : (
        <p>{textEdit}</p>
      )}
    </>
  );
}
