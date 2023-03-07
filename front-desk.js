const express = require('express');
const frontDeskRouter = express.Router();

const appointmentRouter = require('./appointment');


frontDeskRouter
.route('/register')
.post(addPatient);


function addPatient(req, res){
    const patient = req.body;
    let sql_query = `INSERT INTO Patient(Patient_SSN, Name, Address, Age, Gender, Phone, Email, Status, InsuranceID) `+
                    `VALUES (${patient.patient_ssn}, '${patient.name}',  '${patient.address}', ${patient.age}, `+
                    `'${patient.gender}', '${patient.phone}', '${patient.email}', '${patient.status}', ${patient.insuranceid});`
                    
    executeQuery(sql_query, req, res); // do async
    // console.log("dd: ", result);
    // res.status(result.status).send(result.message);
}


function executeQuery(sql_query, req, res){  
    let status = 200, message = 'OK', data = null;
    req.db.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL database: ', err);
            status = 500;
            message = 'Internal Server Error';
            return;
        }
        
        connection.query(sql_query, (err, rows, fields) => {
            if(err){
                status= 500;
                message = 'Internal Server Error';
                console.log(err);
            }
           data = {...rows};
        });

        connection.release();
        res.status(status).send(message);
        //return {status: status, message: message, data: data};
    });
}


frontDeskRouter.use('/appointment', appointmentRouter);

module.exports = frontDeskRouter;