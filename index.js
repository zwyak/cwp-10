const express = require('express');
let films = require('./top250.json');
const utils = require('./utils.js');
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
    if (res){
      console.log('Film positions were shifted');
      shiftFilm(position);
    }
  }

  films.push(film);
  utils.writeJson('./top250.json', JSON.stringify(films));
  films = require('./top250.json');

  return film;
}

const updateFilm = (id, title, rating, year, budget, gross, poster, position) =>{
  const film = films.filter(film => film.id == id);

  if (!film){
    return '404 - Not Found'
  }

  if (title) film.title = title;
  if (rating) film.rating = rating;
  if (year) film.year = year;
  if (budget) film.budget = budget;
  if (gross) film.gross = gross;
  if (poster) film.poster = poster;
  if (position){
    film.position = position;
    const res = films.filter(film => film.position == position);
    if (res){
      console.log('Film positions were shifted');
      shiftFilm(position);
    }
  }

  films.filter( (f) =>{
    if (f.id == id) f = film;
  });
  utils.writeJson('./top250.json', JSON.stringify(films));
  films = require('./top250.json');

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
  res.send(createFilm(req.body.title, req.body.rating, req.body.year, req.body.budget, req.body.gross, req.body.poster, req.body.position));
});

app.post('/api/films/update', (req, res) => {
  res.send(updateFilm(req.body.id, req.body.title, req.body.rating, req.body.year, req.body.budget, req.body.gross, req.body.poster, req.body.position));
});


app.listen(3000, () => {
  console.log('Server app listening on port 3000!');
})
