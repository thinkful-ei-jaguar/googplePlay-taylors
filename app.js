const morgan = require('morgan')
const express = require('express')
const Playstore = require('./playstore')

const app = express();
app.use(morgan('dev'));

app.get('/apps', (req, res)=>{
  const {sort} = req.query;

  if(sort) {
    if(!['Rating', 'App'].includes(sort)) {
      return res.status(400).send('Sort must one of \"Rating\" or \"App\"')
    }
  }
  // let results = Playstore.filter(item=>
  //   item.App.toLowerCase()
  // )

  if(sort){
    Playstore.sort((a, b)=>{
    return a[sort]>b[sort] ? 1 : a[sort]<b[sort] ? -1 : 0;
  })
}

  res.send(Playstore);
})

app.listen(8000, ()=>{
  console.log('Server running on PORT 8000')
;})