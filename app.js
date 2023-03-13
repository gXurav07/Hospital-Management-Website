const express = require('express');
const cors = require('cors');
 
const {pool} = require('./db');
const sendMail = require('./send-mail');
  
// create express app and start server
const app = express();
app.use(express.json());
app.use(cors());

const port_no = 3000;

app.listen(port_no, function(){
    console.log('Server is running on port ', port_no, '...');
});

// Use the connection pool in your Express app
app.use((req, res, next) => {
    console.log('\n\nmethod: ', req.method);
    console.log('url: ', req.url);
    console.log('body: ', req.body, '\n\n');

    req.db = pool;
    next();
});


// Import Routers
const doctorRouter = require('./doctor');
const loginRouter = require('./login');
const adminRouter = require('./admin');
const frontDeskRouter = require('./front-desk');
const dataEntryRouter = require('./data-entry');



// Provide Routes
app.use('/doctor', doctorRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/front-desk', frontDeskRouter);
app.use('/data-entry', dataEntryRouter);


// 404 Handler
app.use((req, res) => {
    res.status(404).send({message: 'NOT FOUND!'});
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



