import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentForm from "../components/CommentForm";

function LocalMessagesDetails() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [comments, setComments] = useState([]);

  // Load the selected message and its comments
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    const selectedMessage = storedMessages.find((msg) => msg.id.toString() === id);
    setMessage(selectedMessage);

    const storedComments = JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
    setComments(storedComments);
  }, [id]);

  const handleAddComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
  };

  if (!message) {
    return <p>Message not found</p>;
  }

  return (
    <div>
      <h2 className="title">{message.name}</h2>
      <p>{message.message}</p>

      <CommentForm onAddComment={handleAddComment} />

      <h3 style={{ margin: "50px 0 0 20px" }}>Comments:</h3>
      <ul>
        {comments.map((comment, index) => (
          <li className="comments" key={index}>
            <h4>{comment.name} - {new Date(comment.date).toLocaleString()}</h4>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
      

      <Link className="back-link" to="/">Back to Home Page</Link>
    </div>
  );
}

export default LocalMessagesDetails;
