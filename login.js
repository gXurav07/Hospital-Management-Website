const express = require('express');

// Route for login

const loginRouter = express.Router();

loginRouter
.route('/login')
.get(getLogin)


function getLogin(req, res){
    // let id = req.params.id;
    // let pass = req.params.pass;
    console.log(req.body);
    res.send('Login confirmed');
}

module.exports = loginRouter;
