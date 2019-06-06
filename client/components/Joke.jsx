import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from './ErrorPage.jsx';
import Interval from './Interval.jsx';
import utils from '../lib/utils.js';
import axios from 'axios';

const Joke = ({ joke, clicked, setClicked }) => {
  const [ timesUp, setTimesUp ] = useState(false);
  const [ newJoke, setNewJoke ] = useState('');
  const [ error, setError ] = useState(false);
  const controller = new AbortController();
  const signal = controller.signal;

  const request = async () => {
    const res = await fetch('https://jokes-api.herokuapp.com/api/joke', {
      signal: signal
    })
    const json = await res.json();
    const j = json.value.joke.replace(/&quot;/g,'"');
    await setNewJoke(j);
    if (timesUp) {
      await setTimesUp(false);
    }
    if (clicked) {
      await setClicked(false);
    }
  };

  const handleReq = () => { request().catch(err => { setError(true) }); }

  if (timesUp || clicked) {
    handleReq();
    controller.abort();
  }

  const displayJoke = () => {
    if (error) {
      setError(false)
      return <ErrorPage />
    }
    else if (newJoke) { return <div className="joke">{newJoke}</div> }
    else { return <div className="joke">{joke}</div> }
  }

  return (
    <div>
      <Interval timesUp={timesUp} setTimesUp={setTimesUp} request={handleReq}/>
      <div className="joke-container">
        { displayJoke() }
      </div>
    </div>
  )
}

export default Joke;

Joke.propTypes = {
  joke: PropTypes.string,
  clicked: PropTypes.boolean,
  setClicked: PropTypes.func
};
