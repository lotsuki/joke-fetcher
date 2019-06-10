import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ fetchJoke, status }) => {
  const handleClick = (e) => {
    if (status !== 429) { fetchJoke(e); }
  };

  return (
    <div className="new-joke-button-container">
      <button className="new-joke-button" type="button" onClick={handleClick}>New Joke</button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  fetchJoke: PropTypes.func,
  status: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
  ])
};