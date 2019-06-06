import React from 'react';
import axios from 'axios';
import utils from '../lib/utils.js';

const Button = ({ displayNewJoke }) => {
  const handleClick = () => {
    let joke = utils.fetchJoke();
    if (joke) { displayNewJoke(joke); }
    else { displayNewJoke('', true); }

    // axios('https://jokes-api.herokuapp.com/api/joke')
    //   .then(result => {
    //     console.log(result)
    //     let joke = result.data.value.joke;
    //     let message = result.value;
    //     displayNewJoke(joke, message);
    //   })
    //   .catch(err => { displayNewJoke('', {}, true) });
  };

  return (
    <div className="new-joke-button-container">
      <button className="new-joke-button" type="button" onClick={handleClick}>New Joke</button>
    </div>
  )
}

export default Button;