import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DefaultJoke from './DefaultJoke.jsx';
import Interval from './Interval.jsx';
import axios from 'axios';

const Joke = ({ joke, clicked, setClicked }) => {
  const [ timesUp, setTimesUp ] = useState(false);
  const [ newJoke, setNewJoke ] = useState('');
  const [ error, setError ] = useState(false);
  const [ numOfCalls, setNumOfCalls ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
  const controller = new AbortController();
  const signal = controller.signal;

  const request = async () => {
    console.log(numOfCalls, 'calls')
    const res = await fetch('https://jokes-api.herokuapp.com/api/joke', {
      signal: signal
    })
    if (res.status === 429) {
      setError(true)
    }
    const json = await res.json();
    const j = json.value.joke.replace(/&quot;/g,'"');
    console.log(j, 'NEW JOKE')
    await setNewJoke(j);
    if (timesUp) {
      console.log('timesup')
      await setTimesUp(false);
    }
    if (clicked) {
      console.log('clicked')
      await setClicked(false);
    }
    if (isLoading) {
      console.log('isloading')
      await setIsLoading(false);
      await setNumOfCalls(0);
    }
  };

  const handleReq = (num) => {
    request().catch(err => {
      if (num >= 3) {
        setIsLoading(false);
        setError(true);
      }
      else {
        if (!isLoading) {
          setIsLoading(true);
        }
        setNumOfCalls(numOfCalls + 1);
        handleReq(numOfCalls);
      }
  });}

  // if (timesUp || clicked) {
  //   handleReq();
  //   controller.abort();
  // }

  const displayJoke = () => {
    if (error) { return <DefaultJoke setError={setError}/> }
    else if (newJoke) { return <div className="joke">{newJoke}</div> }
    else { return <div className="joke">{joke}</div> }
  };

  return (
    <div>
      <Interval timesUp={timesUp} setTimesUp={setTimesUp} request={handleReq}/>
      <div className="joke-container">
        {
          isLoading
          ? (<div className="isLoading">Loading joke...</div>)
          : (displayJoke())
        }
      </div>
    </div>
  )
}

export default Joke;

Joke.propTypes = {
  joke: PropTypes.string,
  clicked: PropTypes.bool,
  setClicked: PropTypes.func
};
