import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header.jsx';
import Button from './Button.jsx';
import DefaultJoke from './DefaultJoke.jsx';
import Joke from './Joke.jsx';

const Page = ({ joke, appErr }) => {
  const [ clicked, setClicked ] = useState(false);

  return (
    <div className="container">
      <Header />
      {
        //If App comp had GET request error
        appErr
        ? (<DefaultJoke />)
        : ( <Joke joke={joke} clicked={clicked} setClicked={setClicked} />)
      }

      <Button setClicked={setClicked} />
      <div className="img-container">
        <div className="img-wrapper slide">
          <div className="big-bubble"><span className="text">Hahaha...</span></div>
          <div className="med-bubble"></div>
          <div className="small-bubble"></div>
          <img className="laughing-img" src="https://img.icons8.com/ios/64/000000/lol.png" crossOrigin="anonymous" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Page;


Page.propTypes = {
  joke: PropTypes.string,
  appErr: PropTypes.bool
};


