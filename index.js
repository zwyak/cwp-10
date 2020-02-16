const express = require('express');
const films = require('./top250.json');
const utils = require('./utils.js')
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const shiftFilm = (position) =>{
  films.filter( (film) =>{
    if (film.position <= position) film.position--;
  });
}

const createFilm = (title, rating, year, budget, gross, poster, position) =>{
  let film ={
    id: Date.now(),
    title: "",
    rating: "",
    year: 0,
    budget: 0,
    gross: 0,
    poster: "",
    position: 0
  };

  if (title) film.title = title;
  if (rating) film.rating = rating;
  if (year) film.year = year;
  if (budget) film.budget = budget;
  if (gross) film.gross = gross;
  if (poster) film.poster = poster;
  if (position){
    film.position = position;
    const res = films.filter(film => film.position == position);
    if (res) shiftFilm(position);
  }

  films.push(film);
  utils.writeFile(films);

  return film;
}

app.get('/api/films/readall', (req, res) => {
  res.send(utils.sortArray(films, 'position', 'ASC'));
});

app.get('/api/films/read', (req, res) => {
  const result = films.filter(film => film.id == req.query.id);
  console.log(result);
  res.send(result);
});

app.post('/api/films/create', (req, res) => {
  console.log(req.body);
  //res.send(createFilm(req.body.title, req.body.rating, req.body.year, req.body.budget, req.body.gross, req.body.poster, req.body.position));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})
