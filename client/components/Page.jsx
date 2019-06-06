import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header.jsx';
import Button from './Button.jsx';
import Joke from './Joke.jsx';

const Page = ({ joke }) => {
  const [ clicked, setClicked ] = useState(false);

  return (
    <div className="container">
      <Header />
      <Joke joke={joke} clicked={clicked} setClicked={setClicked}/>
      <Button setClicked={setClicked} />
    </div>
  )
}

export default Page;


Page.propTypes = {
  joke: PropTypes.string
};


