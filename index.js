const express = require('express');
const films = require('./top250.js');
const utils = require('./utils.js')
const app = express();

app.get('/api/films/readall', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})
