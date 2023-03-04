const express = require('express');
const cors = require('cors');

// create express app and start server
const app = express();
app.use(express.json());
app.use(cors());

app.listen(5001);

// connect to databsae
const {Client} = require('pg');
const client = new Client({
    user: 'gaurav',
    host: 'localhost',
    database: 'covid_hm',
    password: 'gaurav'
  });
client.connect();


// Import Routers
const doctorRouter = require('./doctor');



// Provide Routes
app.use('/doctor', doctorRouter);


