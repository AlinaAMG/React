import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function FormMessage({ onAdd }) {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [entries, setEntries] = useState(() => {
    const storedEntries = localStorage.getItem('message');
    return storedEntries ? JSON.parse(storedEntries) : [];
  });

  // Save the localStorage
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'message') {
      setMessage(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '' || message.trim() === '') {
      alert('all fields are required');
      return;
    }
    const newEntry = {
      id: Date.now(),
      name: name,
      message: message,
      date: new Date().toISOString(),
    };

    setEntries([...entries, newEntry]);
    onAdd(newEntry);

    // Sent the data to the backend
    axios
      .post('http://localhost:4000/api/add-messages', newEntry)
      .then((response) => {
        console.log(response.data);
        alert("Message successfully send!")
      })
      .catch((err) => {
        console.log('Error sending data to the backend:', err);
        alert("OOps!Something went Wrong.Please try again!")
      });

    // Clear the from fields
    setName('');
    setMessage('');
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name..."
          onChange={handleChange}
        />
        <textarea
          type="text"
          name="message"
          value={message}
          placeholder="Your message..."
          onChange={handleChange}
        />

        <button type="submit">Post a message</button>
      </form>
      {entries
        .slice()
        .reverse()
        .map((entry) => {
          return (
            <div key={entry.id}>
              <h3 className="title">
                {entry.name} - {new Date(entry.date).toLocaleString()}
              </h3>
              <Link className="link" to={`/local-message/${entry.id}`}>
                <h3>{entry.message}</h3>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default FormMessage;
