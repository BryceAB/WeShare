import React from "react";
import User from "./User";
import Comment from "./Comment";

export default function Post(props) {
  const comments = props.postData.comments.map((comment) => {
    return <Comment commentData={comment} key={comment.id} />;
  });

  return (
    <div>
      <User user={props.postData.user} />
      <p>{props.postData.postText}</p>
      {comments}
    </div>
  );
}
