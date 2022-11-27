import React from "react";
import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import CreatePC from "./CreatePC";
import Pagination from "./Pagination";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = posts.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(posts.length / recordsPerPage);

  useEffect(() => {
    (() => {
      axios
        .put(`https://weshare.herokuapp.com/api/posts/1`)
        .then((res) => {
          setPosts(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    })();
  }, [currentPage]);

  const postsData = currentRecords.map((post) => (
    <Post postData={post} key={post.id} />
  ));

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="container posts">
      <div className="create-post">
        <CreatePC index="post" />
      </div>
      {postsData}
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
