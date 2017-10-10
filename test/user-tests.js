var chai = require('chai') , chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var assert = require('assert');
var encTool = require ("../tools/cypher");

const app = require('../app.js');









var now = new Date();
var jsonDate = now.toJSON();

var newUserID;
var user = {
    username: "chai-username",
    password: "chai-password",
    email: "email@chai.com",
    fullName: "chai-full name"
};
it('Create new user', function(done) { // <= Pass in done callback

  chai.request(app)
  
  .post('/users')
  .set('content-type', 'application/x-www-form-urlencoded')
  .send(user)
  .end(function(err, res) {
    expect(res).to.have.status(200);
   
    newUserID = res.body._id
    expect(res.body).to.have.property('_id')
    
    var returnUser = res.body

    returnUser.password = encTool.decrypt(returnUser.password);
    expect(res.body).to.include(user)
    done();                               // <= Call done to signal callback end
  });
});
