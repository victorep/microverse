const express = require('express');
const router = express.Router();

const event = require('../models/event')

router.get('/search', (req, res) => {
	let searchTitle = req.query.title;
	var regex = new RegExp(searchTitle, "i"), query = { title: regex };
   event.find(
    query,  // query
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

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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
                
                res.status(404).json('')
            
            }
        }
    });

});

router.patch('/:id', (req, res) => {
    let id = req.params.id;
    
    event.findById(id, (err, event) => {  
    
        if (err) {
            res.status(500).send(err)
        }
        else 
        {

            if (event) {
                event.title = req.body.title;
                event.description = req.body.description;
                event.date = req.body.date;
                event.save()
                //console.log(req.body)
                res.json(event);

            } 
            else {
                res.status(404).send("No event found with that ID")
            }
        }
    });
});
//Updating an existing event (i.e. POST /{id}) should save the changes to the MongoDB database.


router.delete('/:id', (req, res) => {
    let id = req.params.id;
    
    event.findById(id, (err, event) => {  
    
        if (err) {
            res.status(500).send(err)
        }
        else 
        {

            if (event) {
                event.remove()
                //console.log(req.body)
                res.send('');

            } 
            else {
                res.status(404).send("No event found with that ID")
            }
        }
    });
});

router.post('', (req, res) => {


    var newEvent = new event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    });
    
    newEvent.save();
        
    res.json(newEvent);
      
})

router.patch('/:id', (req, res) => {
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

module.exports = router;