import React, { useState } from 'react';

function AddPosts({onAdd}) {
    const [text, setText] = useState("");


    const handleOnChange = (e) => {
        setText(e.target.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(text);

        const newPost = {
            id: Date.now(),
            text: text,
            votes: 0
        };
        onAdd(newPost);

        // Clear the input field
        setText("");
       
    }
   
  return (
    <div>
      <form className="post-form" onSubmit={handleOnSubmit}>
        <textarea
          name="posts"
          placeholder="Post on Reddit..."
          value={text}
          required
          onChange={handleOnChange}
        ></textarea>
        <div className="btn-post">
        <button  type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}

export default AddPosts;
