const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

// create express app and start server
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000);


// Create a MySQL connection pool
const pool = mysql.createPool({
	host: '10.5.18.71',
	user: '20CS30021',
	password: '20CS30021',
	database: '20CS30021'
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        return;
    }
    console.log('Connected to MySQL database!');
    connection.release();
});

// Use the connection pool in your Express app
app.use((req, res, next) => {
    req.db = pool;
    next();
});


// Import Routers
const doctorRouter = require('./doctor');
const loginRouter = require('./login');
const adminRouter = require('./admin');
const frontDeskRouter = require('./front-desk');



// Provide Routes
app.use('/doctor', doctorRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/front-desk', frontDeskRouter);


