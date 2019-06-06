const axios = require('axios');

module.exports = {

  fetchJoke: async () => {
     const result = await axios('https://jokes-api.herokuapp.com/api/joke')
     return result.data.value.joke;
  }
};


