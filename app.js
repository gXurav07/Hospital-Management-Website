const express = require('express');
const cors = require('cors');
 
const {pool} = require('./db');
  
// create express app and start server
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000, function(){
    console.log('Server is running on port 3000...');
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


