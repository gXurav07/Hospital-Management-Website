const express = require('express');
const cors = require('cors');

// create express app and start server
const app = express();
app.use(express.json());
app.use(cors());

app.listen(5001);

// connect to databsae
// const {Client} = require('mysql');
// const client = new Client({
//     user: 'user',
//     host: 'localhost',
//     database: 'hms',
//     password: 'Random@07'
//   });
// client.connect();


// Import Routers
const doctorRouter = require('./doctor');
const loginRouter = require('./login');



// Provide Routes
app.use('/doctor', doctorRouter);
app.use('/login', loginRouter);


