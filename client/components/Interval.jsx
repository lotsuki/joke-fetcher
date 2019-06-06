import React, {useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Joke from './Joke.jsx';
import axios from 'axios';

const Interval = ({ setTimesUp, timesUp, request }) => {
  const [ count, setCount ] = useState(0)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount(count + 1)
  //   }, 1000)
  //     return function cleanup() {
  //     clearInterval(interval)
  //    }
  // });

  // if (count === 10 && !timesUp) {
  //   request()
  //   setCount(0)
  // }

  return (
    null
  );
};

export default Interval;



Interval.propTypes = {
  setTimesUp: PropTypes.func,
  timesUp: PropTypes.bool,
  request: PropTypes.func
};

