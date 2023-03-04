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
    user: '20CS30042',
    host: '10.5.18.72',
    database: '20CS30042',
    password: '20CS30042',
    port: 5432,
  });
client.connect();


// Import Routers
const doctorRouter = require('./doctor');
const loginRouter = require('./login');



// Provide Routes
app.use('/doctor', doctorRouter);
app.use('/login', loginRouter);
