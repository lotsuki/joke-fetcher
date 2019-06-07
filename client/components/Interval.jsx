import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Interval = ({ handleReq }) => {
  const [ count, setCount ] = useState(0);

  //Count interval
  useEffect(() => {
    let interval = setInterval(() => {
      setCount(prevCount => prevCount + 1)
    }, 1000);
      return function cleanup() {
      clearInterval(interval)
     }
  }, []);

  //Fetch new joke
  if (count === 15) {
    handleReq()
    setCount(0)
  }

  return ( null );
};

export default Interval;


Interval.propTypes = {
  handleReq: PropTypes.func
};

