import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DefaultJoke from './DefaultJoke.jsx';
import Interval from './Interval.jsx';
import axios from 'axios';

const Joke = ({ joke, clicked, setClicked }) => {
  const [ newJoke, setNewJoke ] = useState('');
  const [ error, setError ] = useState(false);
  const [ numOfCalls, setNumOfCalls ] = useState(0);
  const controller = new AbortController();
  const signal = controller.signal;

  const request = async () => {
    const res = await fetch('https://jokes-api.herokuapp.com/api/joke', {
      signal: signal
    })
    if (res.status === 429) { setError(true); }
    const json = await res.json();
    const j = json.value.joke.replace(/&quot;/g,'"');
    setNewJoke(j);

    if (clicked) { setClicked(false); }
    if (numOfCalls) { setNumOfCalls(0) }
    controller.abort();
  };

  const handleReq = () => request().catch(err => handleError());
  const handleError = () => {
    if (numOfCalls >= 3) {
      setError(true);
    } else {
      setNumOfCalls(numOfCalls + 1);
      handleReq()
    }
  };

  if (clicked) {
    handleReq();
    controller.abort();
  }

  const displayJoke = () => {
    if (error) {
      setError(false);
      return <DefaultJoke />
    }
    else if (newJoke) {
      return <div className="joke">{newJoke}</div>
    }
    else { return <div className="joke">{joke}</div> }
  };

  return (
    <div>
      <Interval handleReq={handleReq}/>
      <div className="joke-container">
        {
          displayJoke()
        }
      </div>
    </div>
  );
};

export default Joke;

Joke.propTypes = {
  joke: PropTypes.string,
  clicked: PropTypes.bool,
  setClicked: PropTypes.func
};
