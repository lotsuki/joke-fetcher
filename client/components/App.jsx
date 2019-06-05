import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      joke: '',
      message: {}
    }
  }


  componentDidMount() {
    fetch('https://jokes-api.herokuapp.com/api/joke')
    .then(res => res.json())
    .then(result => {
      let joke = result.value.joke;
      let message = result.value;
      this.setState({ joke, message })
     })
    .catch(err => { console.log('Error at GET request: ', err); });
  }

  render() {
    console.log(this.state.joke, this.state.message)
    return (
      <div>HI</div>
    );
  }
};

export default App;