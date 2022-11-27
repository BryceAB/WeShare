import React from "react";
import User from "./User";
import EditInputPC from "./EditInputPC";

export default function Comment(props) {
  return (
    <div className="comment">
      <User user={props.commentData.user} />
      <EditInputPC
        userId={props.commentData.userId}
        id={props.commentData.id}
        text={props.commentData.commentText}
        index="comment"
      />
    </div>
  );
}
