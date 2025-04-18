import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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

function Messages() {
    const [messages, setMessages] = useState([]);
   

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios
      .get('http://localhost:4000/api/message')
      .then((response) => {
        console.log(response.data);
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
    setMessages([
      ...messages,
       newMessage
    ])
  }

  return (
    <div>
   
      <FormMessage onAdd={handleAddMessages } />
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
