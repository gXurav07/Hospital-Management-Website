const express = require('express');

// Route for login
const express = require('express');
const loginRouter = express.Router();

// Post request done while sign up
loginRouter
.route('/')
.post(createUser)
.get(getLogin);

// Get request done while login
loginRouter
.route('/?type=typ&employeeid=empid&password=pass')




function createUser(req, res){
    console.log(req.body);
    res.send('Login confirmed');
}

function getLogin(req, res){
    res.send('Get Login request received');
    console.log(req.query);
}


module.exports = loginRouter;
