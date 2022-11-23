import React from "react";
import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .put("http://localhost:8000/api/posts/1")
        .then((res) => setPosts(res.data))
        .catch((err) => console.log(err));
    })();
  }, []);

  const postsData = posts.map((post) => <Post postData={post} key={post.id} />);

  return <div>{postsData}</div>;
}
