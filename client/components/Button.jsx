import React from 'react';
import axios from 'axios';
import utils from '../lib/utils.js';

const Button = ({ displayNewJoke }) => {
  const handleClick = () => {
    let data = utils.fetchJoke();
    data
       .then(result => {
        let joke = result.replace(/&quot;/g,'"');
        displayNewJoke(joke);
      })
       .catch(err => { displayNewJoke('', true); });
  };

  return (
    <div className="new-joke-button-container">
      <button className="new-joke-button" type="button" onClick={handleClick}>New Joke</button>
    </div>
  )
}

export default Button;