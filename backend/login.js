// Route for login
const express = require('express');
const loginRouter = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'Random@07',
  database: 'hms'
});
connection.connect();

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
    const iv = transformedObj.Password; // Use the password as the IV

    const sql = `INSERT INTO user (Name, Email, employee_id, Password, iv, type) VALUES ('${transformedObj.Name}', '${transformedObj.Email}', '${transformedObj.employee_id}', '${transformedObj.Password}', '${iv}', '${transformedObj.type}')`;

    connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log('Inserted row:', results);
    });
    
    res.send('Login confirmed');
}

function getLogin(req, res){
    res.send('Get Login request received');
    console.log(req.query);
}


module.exports = loginRouter;
