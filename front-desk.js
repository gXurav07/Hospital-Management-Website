const express = require('express');
const frontDeskRouter = express.Router();

const appointmentRouter = require('./appointment');
const admitRouter = require('./admit');
const testRouter = require('./schedule-test');
const treatmentRouter = require('./schedule-treatment');
const { executeQuery } = require('./db');


frontDeskRouter
.route('/register')
.post(addPatient);

frontDeskRouter
.route('/discharge')
.post(discharge_patient);
 


function discharge_patient(req,res)
{
    const {patient, room, date} = req.body;
   
    let sql_query=`UPDATE Stay SET End=${date} WHERE PatientID=${patient}`;
    let result = executeQuery(sql_query, req);
    if(result.status != 200){
        res.status(result.status).send(result);
        return;
    }

    sql_query=`UPDATE Room SET Unavailable=false WHERE RoomID=${room}`;
    result = executeQuery(sql_query, req);
    if(result.status != 200){
        res.status(result.status).send(result);
        return;
    }

    sql_query=`UPDATE Patient SET Status='discharged' WHERE Patient_SSN='${patient}'`;
    result = executeQuery(sql_query, req);

    res.status(result.status).send(result);
}

function addPatient(req, res){
    const patient = req.body;
    let sql_query = `INSERT INTO Patient(Patient_SSN, Patient_Name, Address, Age, Gender, Phone, Email, Status, InsuranceID) `+
                    `VALUES (${patient.patient_ssn}, '${patient.patient_name}',  '${patient.address}', ${patient.age}, `+
                    `'${patient.gender}', '${patient.phone}', '${patient.email}', '${patient.status}', ${patient.insuranceid});`
                    
    executeQuery(sql_query, req, res); 
}




frontDeskRouter.use('/appointment', appointmentRouter);
frontDeskRouter.use('/admit', admitRouter);
frontDeskRouter.use('/schedule-test', testRouter);
frontDeskRouter.use('/schedule-treatment', treatmentRouter);

module.exports = frontDeskRouter;