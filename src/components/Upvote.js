import React, { useState, useEffect } from 'react';

export default function Upvote({ votes, onUpvote }) {
  return (
    <div className="upvote">
      <p className="count-votes">Uploader: {votes} upvotes</p>
      <button className="upvote-btn" onClick={onUpvote}>
        Upvote
      </button>
    </div>
  );
}
