import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ fetchJoke }) => {
  //Button for new random joke
  const handleClick = () => { fetchJoke() };

  return (
    <div className="new-joke-button-container">
      <button className="new-joke-button" type="button" onClick={handleClick}>New Joke</button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  fetchJoke: PropTypes.func
};