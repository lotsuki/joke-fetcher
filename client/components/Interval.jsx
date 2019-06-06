import React, {useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Joke from './Joke.jsx';
import utils from '../lib/utils.js';
import axios from 'axios';

const Interval = ({ setTimesUp, timesUp, request }) => {
  const [ count, setCount ] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1)
    }, 1000)
      return function cleanup() {
      clearInterval(interval)
     }
  })

  if (count === 5 && !timesUp) {
    request()
    setCount(0)
  }

  return (
    null
  );
};

export default Interval;



Interval.propTypes = {
  setTimesUp: PropTypes.func,
  timesUp: PropTypes.boolean,
  request: PropTypes.func
};

