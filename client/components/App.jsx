import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page.jsx';
import DefaultJoke from './DefaultJoke.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      joke: '',
      error: false,
      calls: 0
    }
    this.abortController = new AbortController();
    this.signal = this.abortController.signal;
    this.handleError = this.handleError.bind(this);
    this.fetchJoke = this.fetchJoke.bind(this);
  }

  fetchJoke() {
    fetch('https://jokes-api.herokuapp.com/api/joke',
      {
        signal: this.signal
      })
      .then(res => res.json())
      .then(data => {
        let joke = data.value.joke.replace(/&quot;/g,'"');
        this.setState({ joke });
      })
      .catch(err => {
        this.handleError();
      });
  }

  handleError() {
    this.setState((prevState) => ({calls: prevState.calls + 1}))
    if (this.state.calls >= 3) {
      this.setState({error: true})
    } else {
      this.fetchJoke();
    }
  }

  componentDidMount() {
    const path = window.location.pathname;

    if (path === '/') {
      this.fetchJoke();
    } else {
      const cachedId = localStorage.getItem('id');
      const cachedJoke = localStorage.getItem('joke');

      if (path === cachedId) {
        this.setState({joke: cachedJoke})
      } else {
        let url = `https://jokes-api.herokuapp.com/api/joke${path}`;
        fetch(url, {
          signal: this.signal
          })
          .then(res => res.json())
          .then(data => {
            let joke = data.value.joke.replace(/&quot;/g,'"');
            localStorage.setItem('id', path);
            localStorage.setItem('joke', joke);
            this.setState({ joke });
          })
          .catch(err => { this.setState({ error: true }); });
      }
    }
  }

  componentWillUnMount() {
    this.abortController.abort()
  }

  render() {
    const { joke, error } = this.state;
    return  <Page joke={joke} appErr={error}/>
  }
};

export default App;