import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import Button from './Button.jsx';
import Joke from './Joke.jsx';
import utils from '../lib/utils.js';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      joke: '',
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
      this.setState({joke: utils.defaultJoke()})
    } else {
      this.fetchJoke();
    }
  }

  componentDidMount() {
    const path = window.location.pathname;

    //If no ID is given
    if (path === '/') {
      this.fetchJoke();
    } else {
      //Cached joke and ID param from previous request
      const cachedId = localStorage.getItem('id');
      const cachedJoke = localStorage.getItem('joke');

      //If user has requested url with same ID
      if (path === cachedId) {
        this.setState({joke: cachedJoke})
      } else {
        //User requested url with new ID
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
          .catch(err => { this.handleError(); });
      }
    }
    this.timer = setInterval(() => this.fetchJoke(), 15000);
  }

  componentWillUnMount() {
    this.abortController.abort();
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    const { joke, error } = this.state;
    const { fetchJoke } = this;


    return (
      <div className="conatiner">
        <Header />
        <Joke joke={joke}/>
        <Button fetchJoke={fetchJoke}/>
      </div>
    );
  }
};


export default App;
