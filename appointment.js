const express = require('express');
const appointmentRouter = express.Router();
const {executeQuery} = require('./db');

appointmentRouter
.route('/')
.get(getDoctorsToSchedule);

appointmentRouter
.route('/slots')
.get(getSlots);

async function getDoctorsToSchedule(req, res){
    
    let data = {doctors: [], patients: [], message: 'OK'};
    let get_doctors = 'SELECT Name, PhysicianID AS id, Position FROM Physician INNER JOIN User ON Physician.PhysicianID = User.EmployeeID;';
    let get_patients = 'SELECT Patient_Name, Patient_SSN AS id, Age, Gender FROM Patient;';

    let result = await executeQuery(get_doctors, req, res);
    data.doctors = result.rows;
    if(result.status != 200){
        res.status(result.status).send(result);
        return;
    }
    result = await executeQuery(get_patients, req, res);
    data.patients = result.rows;
    data.message = result.message;
    res.status(result.status).send(data);
}


async function getSlots(req, res){
    const req_date=req.query.date;
    const doc_id=req.query.docId;
    let sql_query = `SELECT SlotID,Start,End FROM Slot WHERE  SlotID NOT IN `+
                    `(SELECT SlotID FROM Appointment WHERE Date='${req_date}' and PhysicianID='${doc_id}') `+
                    `AND SlotID NOT IN (SELECT SlotID FROM Treatment WHERE Date='${req_date}' and PhysicianID='${doc_id}');`;

    const result = await executeQuery(sql_query, req, res);
    result['slots'] = result['rows']; result['rows'] = undefined;
    res.status(result.status).send(result);
}


module.exports = appointmentRouter;
