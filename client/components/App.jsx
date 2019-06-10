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
      status: null,
      calls: 0
    }

    this.abortController = new AbortController();
    this.signal = this.abortController.signal;
    this.handleError = this.handleError.bind(this);
    this.fetchJoke = this.fetchJoke.bind(this);
    this.handleInterval = this.handleInterval.bind(this);
  }

  async fetchJoke (path) {
    //reset interval, even after click event
    clearInterval(this.timer);

    //gives catch block access to res object
    let res;

    try {
      //make API request syncronous with interval in handleInterval func
      res = await fetch('https://jokes-api.herokuapp.com/api/joke',
      {
        signal: this.signal
      });
      const json = await res.json()
      const data = json.value.joke.replace(/&quot;/g,'"');

      //cache joke for API calls with ID param that return error
      if (path) {
        localStorage.setItem('id', path);
        localStorage.setItem('joke', data);
      }
      this.setState({joke: data, status: null});
      this.handleInterval();
    } catch(err) {
      if (res.status !== 429) {
        this.handleError();
      } else {
        //when status is 429, wait 10 seconds before sending another API request
        this.setState({joke: `Woah, easy on the jokes buster. Please wait 10.4 seconds while we scrounge up another one.`, status: 429});
        setTimeout(this.handleError, 10000);
      }
    }
  }

  handleInterval() {
    this.timer = setInterval(() => {
      this.fetchJoke();
    }, 15000);
  }

  handleError(path) {
    this.setState((prevState) => ({calls: prevState.calls + 1}));

    //after 3 GET request attempts, display default joke
    if (this.state.calls >= 3) {
      this.setState({joke: utils.defaultJoke(), calls: 0, status: null});
      this.handleInterval();
    } else {
      //send GET request
      this.fetchJoke(path);
    }
  }

  async componentDidMount() {
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
        this.setState({joke: cachedJoke});
        this.handleInterval();
      } else {
        //User requested url with new ID
        let url = `https://jokes-api.herokuapp.com/api/joke${path}`;
        let res;
        try {
          res = await fetch(url, { signal: this.signal });
          const json = await res.json()
          const data = json.value.joke.replace(/&quot;/g,'"');
          localStorage.setItem('id', path);
          localStorage.setItem('joke', data);
          this.setState({joke: data, status: null})
          this.handleInterval();
        } catch(err) {
          if (res.status !== 429) {
            this.handleError(path);
          } else {
            this.setState({joke: `Woah, easy on the jokes buster. Please wait 10.4 seconds while we scrounge up another one.`, status: 429});
            setTimeout(this.handleError, 15000);
          }
        }
      }
    }
  }

  //clear interval and abort API request on unmount
  componentWillUnMount() {
    this.abortController.abort();
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    const { joke, error, status } = this.state;
    const { fetchJoke } = this;
    return (
      <div className="conatiner">
        <Header />
        <Joke joke={joke}/>
        <Button fetchJoke={fetchJoke} status={status}/>
      </div>
    );
  }
};


export default App;
