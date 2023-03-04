// Route for login
const express = require('express');
const loginRouter = express.Router();
const {createPool} = require('mysql');
const {encrypt, decrypt} = require('./encryptionhandler');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'G@urav2002',
    database: 'hms',
    connectionLimit: 10
})
//connection.connect();

// Post request done while sign up
loginRouter
.route('/')
.post(createUser)
.get(getLogin);

// Get request done while login
loginRouter
.route('/?type=typ&employeeid=empid&password=pass')


function transformKeys(obj) {
    const transformedObj = {};
    for (const key in obj) {
      if (key === 'name') {
        transformedObj['Name'] = obj[key];
      } else if (key === 'email') {
        transformedObj['Email'] = obj[key];
      } else if (key === 'empid') {
        transformedObj['employee_id'] = obj[key];
      } else if (key === 'password') {
        transformedObj['Password'] = obj[key];
      } else if (key === 'type') {
        transformedObj['type'] = obj[key];
      }
    }
    return transformedObj;
  }

function createUser(req, res){
    console.log(req.body);
    const transformedObj = transformKeys(req.body);
    //insert transformedObj into database hms 
    const encrypted = encrypt(transformedObj.Password);
   
    const sqll = `INSERT INTO user (Name, Email, employee_id, Password, iv, type) VALUES ('${transformedObj.Name}', '${transformedObj.Email}', '${transformedObj.employee_id}', '${encrypted.encrypted_password}', '${encrypted.iv}', '${transformedObj.type}')`;
    pool.query(sqll, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.send(JSON.stringify({ message: 'Signup successful' }));
    });
    // send a response to the client as json
    // res.send('Post request received');
    
}

function getLogin(req, res){
    res.send('Get Login request received');
    console.log(req.query);
}


module.exports = loginRouter;
