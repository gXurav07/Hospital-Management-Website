const express = require('express');
const appointmentRouter = express.Router();

appointmentRouter
.route('/')
.get(getDoctorsToSchedule);

appointmentRouter
.route('/slots')
.get(getSlots);

function getDoctorsToSchedule(req, res){
    
    req.db.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL database: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        let sql_query = 'SELECT * FROM Physician;'
        let rows = executeQueryResp(sql_query, res, connection);




        connection.release();
    });

}


function getSlots(req, res){
    req.db.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL database: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        let doctor_id = req.query.doctor_id;
        let date = req.query.date;



        let sql_query = 'SELECT * FROM Physician;'  // write query here


        let rows = executeQueryResp(sql_query, res, connection);
        connection.release();
    });
}

function executeQueryResp(sql_query, res, connection){  
    connection.query(sql_query, (err, rows, fields) => {
        if(err){
            res.status(500).send('Internal Server Error');
            console.log(err);
        }
        else
            res.status(200).send({data: rows});
    });
}


module.exports = appointmentRouter;