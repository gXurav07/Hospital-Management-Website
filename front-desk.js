const express = require('express');
const frontDeskRouter = express.Router();

const appointmentRouter = require('./appointment');
const { executeQuery } = require('./db');


frontDeskRouter
.route('/register')
.post(addPatient);
function schedule_appointment(req,res)
{
    const req_date=req.body.date;
    const doc_id=req.body.physician_id;
    let sql_query = `SELECT  Start,End FROM Appointment NATURAL JOIN WHERE PhysicianID=${doc_id} AND Date='${req_date}' AND SlotID NOT IN (SELECT SlotID FROM Appointment WHERE Date='${req_date}' and PhysicianID='${doc_id}') INTERSECT SELECT Start,End FROM Slot WHERE PhysicianID=${doc_id} AND Date='${req_date}' AND SlotID NOT IN (SELECT SlotID FROM Treatment WHERE Date='${req_date}' and PhysicianID='${doc_id}')`;
    executeQuery(sql_query, req, res);
    
}
function get_roomno(req,res)
{
    let sql_query= `SELECT RoomID as FROM Room WHERE Unavailable=false`;
    executeQuery(sql_query, req, res);

}
function admit_patient(req,res)
{
    const patient=req.body.patient_id;
    const room=req.body.room_id;
    const date=req.body.date;
    let sql_query=`INSERT INTO Stay VALUES(${patient},${room},${date},NULL)`;
    executeQuery(sql_query, req, res);
}
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

module.exports = frontDeskRouter;