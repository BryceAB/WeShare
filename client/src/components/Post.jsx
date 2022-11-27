import React from "react";
import User from "./User";
import Comment from "./Comment";
import EditInputPC from "./EditInputPC";
import CreatePC from "./CreatePC";

export default function Post(props) {
  const comments = props.postData.comments.map((comment) => {
    return <Comment commentData={comment} key={comment.id} />;
  });

  return (
    <div className="post">
      <User user={props.postData.user} />
      <EditInputPC
        userId={props.postData.userId}
        id={props.postData.id}
        text={props.postData.postText}
        index="post"
      />
      {comments}
      <CreatePC index="comment" postId={props.postData.id} />
    </div>
  );
}
