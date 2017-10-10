const express = require('express');
const router = express.Router();

const userModel = require('../models/User')
var encTool = require ("../tools/cypher");


router.post('/', (req, res) => {

	

    var user = new userModel({
	    username: req.body.username,
	    password: encTool.encrypt(req.body.password),
	    email: req.body.email,
	    fullName: req.body.fullName
	});
    
    user.save(function (err) {
    	if (err){
    		//console.log(err)
    		res.status(409).send("Username or email aready exists");
 		}else{
 			res.json(user)
 		}
	});
      
})

module.exports = router;