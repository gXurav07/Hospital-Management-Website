// Route for login
const express = require('express');
const loginRouter = express.Router();

loginRouter
.route('/')
.get(getLogin)
.post(createUser);


function getLogin(req, res){
    res.send('Get Login');
}

function createUser(req, res){
    console.log(req.body);
    res.send('Login confirmed');
}

module.exports = loginRouter;
