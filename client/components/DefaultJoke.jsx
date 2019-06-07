import React, { useState } from 'react';
import PropTypes from 'prop-types';


const DefaultJoke = ({ setError }) => {
  const errorMessages = [`Well, this is embarrassing.`, `The brower has determined that you are not funny enough to appreciate this joke`, `Operation completed, but that doesn't mean it's error free. Better luck next time.`, `Something happened...`, `You did something. Press the button below to undo what you did`,`The browser was unable to get you a joke so here you go: 'Want to hear a joke?' /n 'Decaf'`, `Opps! Looks like there was an error. Here's a joke for you: 'My partner accused me of being immature. I told them to get out of my fort.'`, `WHAT DID YOU DO??? Just kidding. Press the button below to get a real joke.`];

  let n = Math.floor(Math.random() * 8);

  return ( <div className="default-joke">{errorMessages[n]}</div> );
};

export default DefaultJoke;