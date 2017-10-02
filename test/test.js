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


var newEventId
var event = {
  	title: 'chai-title',
  	description: 'chai-description',
  	date: 'chai-date',
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
    newEventId = res.body.id
    expect(res.body).to.have.property('id')
    expect(res.body).to.include(event)
    done();                               // <= Call done to signal callback end
  });
});

it('Get the created event', function(done) { // <= Pass in done callback
  chai.request(app)
  .get('/events/' + newEventId)
  .end(function(err, res) {
    expect(res).to.have.status(200);
    expect(res.body.id).to.equal(newEventId); // Recommended
    expect(res.body).to.include(event)
    done();                               // <= Call done to signal callback end
  });
});

var event = {
  	title: 'chai-title-updated',
  	description: 'chai-description-updated',
  	date: 'chai-date-updated',
  }
it('Update the new event', function(done) { // <= Pass in done callback

  chai.request(app)
  
  .patch('/events/' + newEventId)
  .set('content-type', 'application/x-www-form-urlencoded')
  .send(event)
  .end(function(err, res) {
    expect(res).to.have.status(200);
    //console.log(res.body)
    newEventId = res.body.id
    expect(res.body).to.have.property('id')
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
    expect(res).to.have.status(200);
    expect(res.body).to.equal(''); // Recommended
    done();                               // <= Call done to signal callback end
  });
});