import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import Button from './Button.jsx';
import Joke from './Joke.jsx';
import ErrorPage from './ErrorPage.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      joke: '',
      message: {},
      error: false
    }
    this.displayNewJoke = this.displayNewJoke.bind(this);
  }

  componentDidMount() {
    axios('https://jokes-api.herokuapp.com/api/joke')
      .then(result => {
        let joke = result.data.value.joke;
        let message = result.value;
        this.setState({ joke, message });
        })
      .catch(err => { this.setState({ error: true}) });
  }

  displayNewJoke(joke, message, error) {
    if (error) {
      this.setState({ error: true});
    }
    this.setState({ joke, message });
  }

  render() {
    const { joke, error } = this.state;
    if (error) {
      return <ErrorPage />
    }
    return (
      <div className="container">
        <Header />
        <Joke joke={joke}/>
        <Button displayNewJoke={this.displayNewJoke}/>
      </div>

    );
  }
};

export default App;