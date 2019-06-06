import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page.jsx';
import ErrorPage from './ErrorPage.jsx';
import axios from 'axios';
import utils from '../lib/utils.js';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      joke: '',
      error: false
    }
    this.abortController = new AbortController();
  }

  componentDidMount() {
    const signal = this.abortController.signal;

    fetch('https://jokes-api.herokuapp.com/api/joke',{
        signal: signal
      })
      .then(result => result.json())
      .then(data => {
        let joke = data.value.joke.replace(/&quot;/g,'"');
        this.setState({ joke });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  componentWillUnMount() {
    this.abortController.abort()
  }

  render() {
    const { joke, error } = this.state;
    if (error) { return <ErrorPage /> }
    return <Page joke={joke} />
  }
};

export default App;