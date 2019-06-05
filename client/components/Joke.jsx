import React from 'react';

const Joke = ({ joke }) => {
  return (
    <div className="joke-container">
      <div className="joke">{joke}</div>
    </div>
  )
}

export default Joke;