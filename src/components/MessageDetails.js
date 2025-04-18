import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Comments from './Comments';
import CommentForm from './CommentForm';

function MessageDetails() {
  const { id } = useParams();
  const [msg, setMsg] = useState(null);
  
  const [comments, setComments] = useState(() => {
    const storedComments = localStorage.getItem(`comments-${id}`);
    return storedComments ? JSON.parse(storedComments) : [];
  });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchMessageById();
  }, [id]);

  // load comments from the local storage
  useEffect(() => {
    localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
  }, [comments, id]);

  const fetchMessageById = () => {
    axios
      .get(`http://localhost:4000/api/edit-message-page/${id}`)
      .then((response) => {
        console.log(response.data);
        setMsg(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAddComment = (newComment) => {
    axios
      .post(`http://localhost:4000/api/add-comments/${id}`, newComment)
      .then((response) => {
        console.log('New Comment:', response.data);
        const savedComment = response.data;
        setComments((prevComments) => [...prevComments, savedComment]);
        setRefresh((prev) => !prev);
        alert("Comment Successfully send!")
      })
      .catch((err) => {
        console.log(err)
        alert("Error sending the comment!Please Try Again!")
      })
  };

  if (!msg) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="title">{msg.name}</h2>
      <p>{msg.message}</p>  
      <CommentForm messageId={id} onAddComment={handleAddComment} />
      <h3 className="comments"> Comments:</h3>
      <Comments messageId={id} refresh={refresh} />
      <Link className="back-link" to="/">
         Back to all the messages
      </Link>
    </div>
  );
}

export default MessageDetails;
