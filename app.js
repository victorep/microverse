const express = require('express')
const app = express()

app.get('/event', (req, res) => {
  res.send('The event ID is the ' + events[0].title)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

app.post('/', function (req, res) {
  res.send('Got a POST request')
});

let event1 = {
	id: 1, 
  title:"Tom",
  description:"Hanks",
  date: "9-22-2017"
}; 
let event2 = {
	id: 2, 
  title:"Tod",
  description:"sHanks",
  date: "9-22-2017"
}; 

let events = [event1, event2];

