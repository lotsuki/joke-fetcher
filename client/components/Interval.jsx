import React, {useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Joke from './Joke.jsx';
import axios from 'axios';

const Interval = ({ handleReq }) => {
  const [ count, setCount ] = useState(0)

  //Count interval
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount(count + 1)
  //   }, 1000)
  //     return function cleanup() {
  //     clearInterval(interval)
  //    }
  // });

  //Fetch new joke
  if (count === 10) {
    handleReq()
    setCount(0)
  }

  return ( null );
};

export default Interval;


Interval.propTypes = {
  handleReq: PropTypes.func
};

