const express = require('express');
const frontDeskRouter = express.Router();

const appointmentRouter = require('./appointment');
const admitRouter = require('./admit');
const { executeQuery } = require('./db');


frontDeskRouter
.route('/register')
.post(addPatient);



function discharge_patient(req,res)
{
    const patient=req.body.patient_id;
    const date=req.body.date;
    let sql_query=`UPDATE Stay SET End=${date} WHERE PatientID=${patient}`;
    executeQuery(sql_query, req, res);
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

module.exports = frontDeskRouter;