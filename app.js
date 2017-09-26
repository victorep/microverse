const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});

app.post('/', function(req, res) {
    res.send('Got a POST request')
});

//Event endpoints
app.get('/events', (req, res) => {
    let output = "";
    //for i =0 to size (events)
    //	show "Event " + i + ": " + events[i].title;
    output = "<ul>";
    for (let i in events) { // don't actually do this
        output += '<li><a href="/events/' + i + '">Event ' + i + ': ' + events[i].title + '</a></li>\n';
    }
    output += "</ul>";
    res.send(events);
});

app.get('/events/:id', (req, res) => {
    res.send(events[req.params.id])
});

app.delete('/events/:id', (req, res) => {
    let { id } = req.params;
    let event = events[id];

    if (event) {events.splice(id - 1, 1)
    }

    res.send(events[req.params.id])

});

app.post('/events', (req, res) => {


    let lastId = 0;

    for (let i in events) { // don't actually do this

        if (lastId < events[i].id) {
            lastId = parseInt(events[i].id);
        }

    }

    let newEvent = {
        id: ++lastId,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    }

    //It should validate that an existing event ID is passed as parameter
    //It should return the modified event

    events.push(newEvent);

    console.log(
        'This would create a new object with title ' + newEvent.title +
        ', description ' + newEvent.description +
        ' and date ' + newEvent.date +
        ' and it got the id of ' + newEvent.id);

    res.send(newEvent);
})

app.patch('/events/:id', (req, res) => {
    // res.send("" + req.params.id + "" + events[req.params.id].title)
    let { id } = req.params;
    let event = events[id];

    if (event) {
        event.title = req.body.title;
        event.date = req.body.date;
        event.description = req.body.description;
    }

    res.json(event);
});

//event title
let event1 = {
    id: 1,
    title: "Tom",
    description: "Hanks",
    date: "9-22-2017"
};
let event2 = {
    id: 2,
    title: "Tod",
    description: "sHanks",
    date: "9-22-2017"
};

let events = [event1, event2];