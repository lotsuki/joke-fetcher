import React from 'react';

const ErrorPage = (props) => {
  return (
    <div className="error-container">
      <div className="error">Opps! Could not fetch joke. </div>
      <button type="button">Try Again!</button>
    </div>
  )
}

export default ErrorPage;