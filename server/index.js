const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;


app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (res.method === 'OPTIONS') {
    res.set("Access-Control-Max-Age", "30008");
  }
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../public`));


app.get('/joke', (req, res) => {
  let joke = req.body;
  res.send(joke);
});

app.get("/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});