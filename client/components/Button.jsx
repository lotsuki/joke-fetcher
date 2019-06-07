import React, { useContext } from 'react';
import PropTypes from 'prop-types';

const Button = ({ setClicked }) => {
  //Button for new random joke
  const handleClick = () => { setClicked(true); };

  return (
    <div className="new-joke-button-container">
      <button className="new-joke-button" type="button" onClick={handleClick}>New Joke</button>
    </div>
  );
};

export default Button;

Button.propTypes = {
  setClicked: PropTypes.func
};
