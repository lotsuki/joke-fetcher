import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DefaultJoke from './DefaultJoke.jsx';
import Interval from './Interval.jsx';

const Joke = ({ joke, clicked, setClicked }) => {
  const [ newJoke, setNewJoke ] = useState('');
  const [ error, setError ] = useState(false);
  const [ numOfCalls, setNumOfCalls ] = useState(0);
  const controller = new AbortController();
  const signal = controller.signal;

  //Fetch random joke on set interval or after request error
  const request = async () => {
    const res = await fetch('https://jokes-api.herokuapp.com/api/joke', {
      signal: signal
    })
    if (res.status === 429) {
      setTimeout(handleReq, 4000)
    }
    const json = await res.json();
    const j = json.value.joke.replace(/&quot;/g,'"');
    await setNewJoke(j);

    //if (clicked) { await setClicked(false); }
    if (numOfCalls) { await setNumOfCalls(0) }
    controller.abort();
  };

  const handleReq = () => request().catch(err => handleError());

  //Will send 3 GET requests before displaying default joke
  const handleError = () => {
    if (numOfCalls >= 3) {
      setError(true);
    } else {
      setNumOfCalls(numOfCalls + 1);
      handleReq()
    }
  };

  //Fetch joke if button is clicked
  if (clicked) {
    handleReq();
    setClicked(false);
  }

  //Handles which joke to display on page
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
      <Interval handleReq={handleReq} clicked={clicked} setClicked={setClicked}/>
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
