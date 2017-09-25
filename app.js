const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded());
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
	for (let i in events) {    // don't actually do this
  		output += '<li><a href="/events/'+i+'">Event ' + i+ ': ' + events[i].title +'</a></li>\n';
	}
	output+="</ul>";
	res.send(output);
});

app.get('/events/:id', (req, res) => {
  res.send("The event title for event " + req.params.id + " is the " + events[req.params.id].title)
});

app.post('/events', (req, res) => {
	
	
	
	let lastId = 0;

	for (let i in events) {    // don't actually do this
  		
		if (lastId<events[i].id){
			lastId = parseInt(events[i].id);
		}

	}

	let newEvent = {
		id : ++lastId,
		title : req.body.title,
		description : req.body.description,
		date : req.body.date
	}

	events.push(newEvent);

	console.log(
		'This would create a new object with title ' + 	newEvent.title + 
		', description ' +newEvent.description + 
		' and date ' + newEvent.date+
		' and it got the id of ' + newEvent.id);
  
  res.send('');
})


//event title
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

