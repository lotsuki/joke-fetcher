import React from 'react';
import utils from '../lib/utils.js';

const Joke = ({ joke }) => {
  // const [ newJoke, setNewJoke ] = useState('');

  // setInterval(func, 3000)

  return (
    <div className="joke-container">
      <div className="joke">{joke}</div>
    </div>
  )
}

export default Joke;