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
  function transformloginKeys(obj) {
    const transformedObj = {};
    for (const key in obj) {
      if (key === 'email') {
        transformedObj['Email'] = obj[key];
      } if (key === 'pass') {
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

    
}

function getLogin(req, res){
    //res.send('Get Login request received');
    console.log(req.query);

    const transformedObj = transformloginKeys(req.query);
    pool.query(`SELECT * FROM user WHERE Email = '${transformedObj.Email}' and type='${transformedObj.type}'`, (err, result)=>{
      if(err){
        throw err;
      }
      console.log(result);

      // if result is an empty object send login failed
      if(result.length === 0){
        res.send(JSON.stringify({ message: 'Login failed' }));
      }
      else{

        const data = JSON.parse(JSON.stringify(result[0])); // Parse the string and extract the first object
        console.log(data);
        const password = data.Password;
        const iv = data.iv;
        const decrypted = decrypt({encrypted_password: password, iv: iv});
        if(decrypted === transformedObj.Password){
          console.log('Login successful');
          //res.send(JSON.stringify({ message: 'Signup successful' }));
          res.json({ message: 'Login successful' });
        } 
        else
        {
          console.log('Login failed');
          res.json({ message: 'Login failed' });
        }
      }
    });

}


module.exports = loginRouter;
