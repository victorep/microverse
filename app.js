const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

app.post('/', function (req, res) {
  res.send('Got a POST request')
});

//Event endpoints
app.get('/events', (req,res) =>{
	let output="";
	//for i =0 to size (events)
	//	show "Event " + i + ": " + events[i].title;
	output="<ul>";
	for (var i in events) {    // don't actually do this
  		output += '<li><a href="/events/'+i+'">Event ' + i+ ': ' + events[i].title +'</a></li>\n';
	}
	output+="</ul>";
	res.send(output);
});

app.get('/events/:id', (req, res) => {
  res.send("The event title for event "+req.params.id+" is the " + events[req.params.id].title)
});

app.post('/events', (req, res) => {
	console.log(req.body.title);
	//console.log('This would create a new object with title ' + req.body.title + ', definition ' + req.body.description + ' and date ' +req.body.date);
  res.send('')
})


//event definition
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

