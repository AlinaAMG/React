import React, { useState, useEffect } from 'react';
import AddPosts from './AddPosts';
import Upvote from './Upvote';
import { Link, useNavigate } from 'react-router-dom';

function HomePage({user,onLogout}) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load posts from localStorage
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  // Add a new post
  const handleAddPost = (newPost) => {
     const updatedPosts = [...posts, newPost];
     setPosts(updatedPosts);
     localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };
   

  // Handle upvoting a specific post by postId
    const handleUpVote = (postId) => {
    // Only update the votes for the clicked post
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        // If it's the clicked post, increase votes by 1
        return { ...post, votes: post.votes + 1 };
      }
      return post; // Otherwise, return the post unchanged
    });

    // Sort posts by highest votes
    updatedPosts.sort((a, b) => b.votes - a.votes);

    // Set the updated posts back into state and localStorage
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };
  
  
  // Log out function of the user
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    onLogout();
    navigate('/login');
  };

  return (
    <div>
      <h2 className="welcome">Welcome, {user.firstName} {user.lastName}!</h2>
      <Link className="logout" to="/login" onClick={handleLogout}>
            LogOut
       </Link>
      <h2 className="title">Reddit-like Posts</h2>
      <AddPosts onAdd={handleAddPost} />

      {/* Render the posts */}
      {posts.length > 0 ? (
        posts.map((post,index) => (
          <div className="add-posts" key={index}>
            <h2>{post.text}</h2>
            <Upvote votes={post.votes} onUpvote={() => handleUpVote(post.id)} />
          </div>
        ))
      ) : (
        <p>No posts available.</p>
          )}
           
    </div>
  );
}

export default HomePage;
