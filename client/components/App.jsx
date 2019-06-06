import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import Button from './Button.jsx';
import Joke from './Joke.jsx';
import ErrorPage from './ErrorPage.jsx';
import FetchJoke from './FetchJoke.jsx';
import utils from '../lib/utils.js';
import axios from 'axios';
import _ from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      joke: '',
      error: false
    }
    this.displayNewJoke = this.displayNewJoke.bind(this);
  }

  componentDidMount() {
     let data = utils.fetchJoke()
     data
       .then(result => {
        let joke = _.replace(result, '&quot;', '"')
        this.setState({ joke });
      })
       .catch(err => { this.setState({ error: true }); });

    // axios('https://jokes-api.herokuapp.com/api/joke')
    //   .then(result => {
    //     let joke = result.data.value.joke;
    //     let message = result.value;
    //     this.setState({ joke, message });
    //     })
    //   .catch(err => { this.setState({ error: true}) });
  }

  displayNewJoke(joke, error) {
    if (error) {
      this.setState({ error: true});
    }
    this.setState({ joke });
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