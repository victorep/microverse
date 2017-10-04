//Load express modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

module.exports = app


//Load mongoose modules
var mongoose =  require('mongoose');
var Schema = mongoose.Schema;
let collection="our_collection";


//Connect to the mongo DB
mongoose.connect('mongodb://localhost/microverse',{
  useMongoClient: true,
  /* other options */
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're succesfully connected!")
});


//define the schema and model

var eventSchema = new Schema(
    {
        title: String,
        description: String,
        date: { type: Date, default: Date.now}

    }
);

var event = mongoose.model('event', eventSchema);



// Start the Http server
app.listen(3000, function() {
    console.log('Example app listening on :3000')
});

app.post('/', function(req, res) {
    res.json('Got a POST request')
});

//Event endpoints
app.get('/events', (req, res) => {
   event.find(  
    {},  // query
    //{"name": true, "owner": true},  // Only return an object with the "name" and "owner" fields. "_id" is included by default, so you'll need to remove it if you don't want it.
    (err, events) => {
        if (err) {
            res.send(err)
        }
         if (events) {  // Search could come back empty, so we should protect against sending nothing back
            res.json(events);
        } else {  // In case no kitten was found with the given query
            res.send("No events found")
        }
    }
);
    
});

app.get('/events/:id', (req, res) => {
    let id = req.params.id;
    
    event.findById(id, (err, event) => {  
    
        if (err) {
            res.status(500).send(err)
        }
        else {
        
            if (event) {
                res.json(event);
            
            } 
            else {
                
                res.status(404).send("No event found with that ID")
            
            }
        }
    });

});

app.delete('/events/:id', (req, res) => {
    let { id } = req.params;
   
    let event = events.filter((item)=> { return item.id == id;})
    event=event[0];
    if (event) {
        events.splice(events.indexOf(event), 1);
        console.log('delted item ' + event.id);
    }
    res.send('');
   
});

app.post('/events', (req, res) => {


    let lastId = 0;

    for (let i in events) { // don't actually do this

        if (lastId < events[i].id) {
            lastId = parseInt(events[i].id);
        }

    }

    var newEvent = new event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    });
    
    newEvent.save();
        
    res.json(newEvent);
      
})

app.patch('/events/:id', (req, res) => {
    // res.send("" + req.params.id + "" + events[req.params.id].title)
    let { id } = req.params;
    let event = events.filter((item)=> { return item.id == id;})
    event=event[0];
    if (event) {
        event.title = req.body.title;
        event.date = req.body.date;
        event.description = req.body.description;
    }


    res.json(event);
});

