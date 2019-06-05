const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../public`));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});