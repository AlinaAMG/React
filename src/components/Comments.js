import React, { useState, useEffect } from 'react';

import axios from 'axios';

function Comments({ messageId, refresh }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [messageId, refresh]);

  const fetchComments = () => {
    axios
      .get(`http://localhost:4000/api/comments/${messageId}`)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment, index) => (
            <li className="comments" key={index}>
              <h4>
                {comment.name} - {new Date(comment.date).toLocaleString()}
              </h4>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet to be displayed!</p>
      )}
    </div>
  );
}

export default Comments;
