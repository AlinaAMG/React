import { useState } from 'react';

function CommentForm({ onAddComment }) {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'body') {
      setBody(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && body) {
      const newComment = {
        name,
        body,
        date: new Date().toISOString(),
      };

      onAddComment(newComment);

      // Clear the form fields
      setName('');
      setBody('');
    } else {
      alert('Please fill both fields');
    }
    };
    
    

  return (
    <form className="form-comments" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={name}
        onChange={handleOnChange}
      />
      <textarea
        name="body"
        placeholder="Your comment"
        value={body}
        onChange={handleOnChange}
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}

export default CommentForm;


