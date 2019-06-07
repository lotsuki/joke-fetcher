import React from 'react';

const Image = () => {
  return (
    <div className="img-container">
      <div className="img-wrapper slide">
        <div className="big-bubble"><span className="text">Hahaha...</span></div>
        <div className="med-bubble"></div>
        <div className="small-bubble"></div>
        <img className="laughing-img" src="https://img.icons8.com/ios/64/000000/lol.png" crossOrigin="anonymous" alt="" />
      </div>
    </div>
  );
};

export default Image;