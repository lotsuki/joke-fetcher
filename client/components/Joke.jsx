import React from 'react';
import PropTypes from 'prop-types';

const Joke = ({ joke }) => {
  return (
    <div className="joke-container">
      <div className="joke">{joke}</div>
    </div>
  )
}

export default Joke;

Joke.propTypes = {
  joke: PropTypes.string
};
