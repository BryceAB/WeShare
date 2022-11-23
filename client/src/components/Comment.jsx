import React from "react";
import User from "./User";

export default function Comment(props) {
  return (
    <div>
      <User user={props.commentData.user} />
      <p>{props.commentData.commentText}</p>
    </div>
  );
}
