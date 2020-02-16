const express = require('express');
const films = require('./top250.json');
const utils = require('./utils.js')
const app = express();

app.get('/api/films/readall', (req, res) => {
  res.send(utils.sortArray(films, 'position', 'ASC'));
});

app.get('/api/films/read', (req, res) => {
  const result = films.filter(film => film.id == req.query.id);
  console.log(result);
  res.send(result);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})
