var chai = require('chai') , chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var assert = require('assert');

const app = require('../app.js');

it('Get all events', function(done) { // <= Pass in done callback
  chai.request(app)
  .get('/events')
  .end(function(err, res) {
    expect(res).to.have.status(200);
    done();                               // <= Call done to signal callback end
  });
});

var now = new Date();
var jsonDate = now.toJSON();

var newEventId
var event = {
  	title: 'chai-title',
  	description: 'chai-description',
  	date: jsonDate
  }
it('Create new event', function(done) { // <= Pass in done callback

  chai.request(app)
  
  .post('/events')
  .set('content-type', 'application/x-www-form-urlencoded')
  .send(
  	event)
  .end(function(err, res) {
    expect(res).to.have.status(200);
    //console.log(res.body)
    newEventId = res.body._id
    expect(res.body).to.have.property('_id')
    expect(res.body).to.include(event)
    done();                               // <= Call done to signal callback end
  });
});

var newEvent

it('Get the created event', function(done) { // <= Pass in done callback
  chai.request(app)
  .get('/events/' + newEventId)
  .end(function(err, res) {
    expect(res).to.have.status(200);
    expect(res.body._id).to.equal(newEventId); // Recommended
    expect(res.body).to.include(event)
                                  
    console.log(res.body);
    newEvent = res.body;
    console.log(newEvent); 
    done();     // <= Call done to signal callback end
  });
});

it('Search for new event using title', function(done) { // <= Pass in done callback
  chai.request(app)
  .get('/events/search?title=' + event.title)
  .end(function(err, res) {
    expect(res).to.have.status(200);
    expect(res.body).to.deep.include(newEvent)
    //expect(res.body).to.be.an('array').that.includes(newEvent);
    done();                               // <= Call done to signal callback end
  });
});


jsonDate = now.toJSON();

var event = {
  	title: 'chai-title-updated',
  	description: 'chai-description-updated',
  	date: jsonDate
  }
it('Update the new event', function(done) { // <= Pass in done callback

  chai.request(app)
  
  .patch('/events/' + newEventId)
  .set('content-type', 'application/x-www-form-urlencoded')
  .send(event)
  .end(function(err, res) {
    expect(res).to.have.status(200);
    newEventId = res.body._id
    expect(res.body).to.have.property('_id')
    expect(res.body).to.include(event)
    done();                               // <= Call done to signal callback end
  });
});


it('Update the new event', function(done) { // <= Pass in done callback

  chai.request(app)
  
  .delete('/events/' + newEventId)
  //.set('content-type', 'application/x-www-form-urlencoded')
  .send(event)
  .end(function(err, res) {
    expect(res).to.have.status(200);
    done();                               // <= Call done to signal callback end
  });
});


it('Get the created event', function(done) { // <= Pass in done callback
  chai.request(app)
  .get('/events/' + newEventId)
  .end(function(err, res) {
    expect(res).to.have.status(404);
    expect(res.body).to.equal(''); // Recommended
    done();                               // <= Call done to signal callback end
  });
});