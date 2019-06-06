import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page.jsx';
import axios from 'axios';


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
    const path = window.location.pathname;

    if (path === '/') {
      fetch('https://jokes-api.herokuapp.com/api/joke', {
          signal: signal
        })
        .then(res => res.json())
        .then(data => {
          console.log(data, 'APP')
          let joke = data.value.joke.replace(/&quot;/g,'"');
          this.setState({ joke });
        })
        .catch(err => { this.setState({ error: true }); });
    } else {
      const cachedId = localStorage.getItem('id');
      const cachedJoke = localStorage.getItem('joke');

      if (path === cachedId) {
        console.log(cachedJoke, 'cache')
        this.setState({joke: cachedJoke})
      } else {
        let url = `https://jokes-api.herokuapp.com/api/joke${path}`;
        fetch(url, {
          signal: signal
          })
          .then(res => res.json())
          .then(data => {
            console.log('noooooo')
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
    return <Page joke={joke} appErr={error}/>
  }
};

export default App;