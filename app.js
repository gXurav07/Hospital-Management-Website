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


// 404 Handler
app.use((req, res) => {
    res.status(404).send({message: 'NOT FOUND!'});
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const subject = `Urgent Request: Help Me Find My Missing Socks`;
const mailBody = `
Dear Atishay,

I hope this email finds you in a good mood and ready to assist me with an urgent matter. You see, I seem to have misplaced my favorite pair of socks and I can't seem to locate them anywhere. I've checked under the bed, in the laundry hamper, and even in the fridge (hey, you never know), but they're nowhere to be found.

I'm writing to you because I know you're a trustworthy and reliable individual who can help me in my time of need. If you have any leads or tips on where my socks might be hiding, please let me know. I'm willing to offer a reward in the form of a high-five or a compliment of your choice.

Thank you for your time and consideration. I look forward to solving this mystery together.

Best regards,

`;

let sender = 'tera baap';





let c = 1;
// Weekly Report
setInterval(() => { 
    sendMail("atishayjain002@gmail.com", ` ${subject} ${c}`,  mailBody+sender);
    c++; sender+= ' ka baap';}
    , 5000);

