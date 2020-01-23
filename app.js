const morgan = require('morgan')
const express = require('express')
const Playstore = require('./playstore')

const app = express();
app.use(morgan('dev'));

app.get('/apps', (req, res)=>{
  const {sort, genres} = req.query;

  let results = [...Playstore]

  if(sort) {
    if(!['Rating', 'App'].includes(sort)) {
      return res.status(400).send('Sort must one of \"Rating\" or \"App\"')
    }

  }

  if(genres) {
    if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      return res.status(400).send('Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card')
    }
    else {
      results = Playstore.filter(item => item.Genres.includes(genres))
    }
  }

  if(sort){
    results.sort((a, b)=>{
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    })
  }

  res.send(results);
})

module.exports = app