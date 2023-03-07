const express = require('express');
const frontDeskRouter = express.Router();

const appointmentRouter = require('./appointment');


frontDeskRouter
.route('/register')
.post(addPatient);
function schedule_appointment(req,res)
{
    const req_date=req.body.date;
    const doc_id=req.body.physician_id;
    let sql_query = `SELECT  Start,End FROM Appointment NATURAL JOIN WHERE PhysicianID=${doc_id} AND Date='${req_date}' AND SlotID NOT IN (SELECT SlotID FROM Appointment WHERE Date='${req_date}' and PhysicianID='${doc_id}') INTERSECT SELECT Start,End FROM Slot WHERE PhysicianID=${doc_id} AND Date='${req_date}' AND SlotID NOT IN (SELECT SlotID FROM Treatment WHERE Date='${req_date}' and PhysicianID='${doc_id}')`;
}


function addPatient(req, res){
    const patient = req.body;
    let sql_query = `INSERT INTO Patient(Patient_SSN, Patient_Name, Address, Age, Gender, Phone, Email, Status, InsuranceID) `+
                    `VALUES (${patient.patient_ssn}, '${patient.patient_name}',  '${patient.address}', ${patient.age}, `+
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
            res.status(status).send({message});
            return;
        }
        
        connection.query(sql_query, (err, rows, fields) => {
            if(err){
                status= 500;
                message = 'Internal Server Error';
                console.log(err);
            }
           data = {...rows};
           res.status(status).send({message});
           console.log({status, message});
        });

        connection.release();
        //return {status: status, message: message, data: data};
    });
}


frontDeskRouter.use('/appointment', appointmentRouter);

module.exports = frontDeskRouter;