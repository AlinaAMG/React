import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FormMessage from './FormMessage';

const formattedDate = (date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    console.error('Invalid Date:', date);
    return 'Invalid Date';
  }
  return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${d.getFullYear()}`;
};

function Messages({ user, onLogout }) {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  //  Redirect to the login page if the user is not logged in
  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  const fetchMessages = () => {
    axios
      .get('http://localhost:4000/api/message')
      .then((response) => {
        console.log(response.data);

        // Save messages in the order from the newst to the oldest
        const sortedMessages = response.data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          if (isNaN(dateA) || isNaN(dateB)) {
            return 0;
          }
          return dateB.getTime() - dateA.getTime();
        });

        setMessages(sortedMessages);
      })
      .catch((err) => console.log(err));
  };

  const handleAddMessages = (newMessage) => {
    // Add messages to the state
    setMessages([...messages, newMessage]);
  };

  // Log out function of the user
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    onLogout();
    navigate('/login');
  };

  return (
    <div>
      {user && (
        <>
          <h2 className="welcome">Welcome, {user.firstName}!</h2>
          <Link className="logout" to="/login" onClick={handleLogout}>
            LogOut
          </Link>
        </>
      )}
      {!user && <p>You are not logged in.</p>}

      <FormMessage onAdd={handleAddMessages} />
      {messages &&
        messages.map((message, index) => {
          return (
            <div key={index}>
              <h3 className="title">
                {message.name} - {formattedDate(message.date)}
              </h3>
              <Link className="link" to={`/message/${message._id}`}>
                <h3>{message.message}</h3>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default Messages;
