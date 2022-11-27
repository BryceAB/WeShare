import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export default function CreatePC(props) {
  const { index, postId } = props;
  const [userToken] = useContext(UserContext);
  const [textInput, setTextInput] = useState("");

  function handleChange(event) {
    setTextInput(event.target.value);
  }

  async function handleSubmit(event) {
    let submitObj = {};
    console.log(userToken);
    switch (index) {
      case "post":
        submitObj = {
          jwt: userToken.token,
          post: textInput,
        };
        await axios
          .post(`https://weshare.herokuapp.com/api/posts`, submitObj)
          .then((res) => res)
          .catch((err) => console.log(err.request));
        break;
      case "comment":
        submitObj = {
          jwt: userToken.token,
          postId: postId,
          comment: textInput,
        };
        await axios
          .post(`https://weshare.herokuapp.com/api/comments`, submitObj)
          .then((res) => res)
          .catch((err) => console.log(err.request));
        break;
      default:
        break;
    }
    window.location.reload(false);
    setTextInput("");
  }

  return (
    <>
      {userToken.token !== undefined && (
        <div>
          <textarea
            type="text"
            onChange={handleChange}
            name={index}
            value={textInput}
          />
          <button onClick={handleSubmit}>
            {index === "post" ? "Post" : "Comment"}
          </button>
        </div>
      )}
    </>
  );
}
