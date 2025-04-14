import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Quote() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  function getQuote() {
    axios
      .get('https://dummyjson.com/quotes')

      .then((response) => {
        console.log(response.data);
        const quotes = response.data.quotes;

        // Random quote
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
      })

      .catch((err) => console.log('Error fetching data:', err));
  }

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div>
      <h1 className="title">Quote Generator</h1>
      <div className="quote">
        <blockquote className="quote-content">"{quote}"</blockquote>
        <p className="author">-{author}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="quote-btn" onClick={getQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
}

export default Quote;
