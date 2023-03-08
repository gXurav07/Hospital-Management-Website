
// Route for doctor
const express = require('express');
const doctorRouter = express.Router();
const {executeQuery} = require('./db');

doctorRouter
.route('/:id')
.get(getDoctorByID)
 

async function getDoctorByID(req, res){
    let id = req.params.id;
    let query = req.query;


    let sql_query = '';

    if(Object.keys(query).length == 0){
        sql_query = `SELECT * FROM Patient NATURAL JOIN Appointment WHERE PhysicianID=${id}`;
    }
    else{
        const type = query.type;
        const patient_id = query.patient;
        console.log(type);
        console.log(patient_id);

        if(patient_id == undefined){
            res.status(400).send({message: 'Invalid query'});
            return;
        }
        else if(type == 'treatment')
            sql_query = 'SELECT Patient_Name as "Patient Name",Desc_Name as "Treatment Name",Physician_Name as "Physician Name",Start as "Start Time",End as "End Time" FROM Treatment_Description NATURAL JOIN Treatment NATURAL JOIN Patient NATURAL JOIN Physician NATURAL JOIN Slot WHERE Patient_SSN='+patient_id+";";
        else if(type == 'medication')
            sql_query = `SELECT Physician_Name as 'Physician Name',Patient_Name as 'Patient Name',Medication_Name as 'Medication Name',Brand as Brand,Date,AppointmentID as 'Appointment ID' FROM Prescribes_Medication NATURAL JOIN Medication NATURAL JOIN Physician NATURAL JOIN Patient WHERE Patient_SSN=${patient_id}`;
        else if(type == 'appointment')
            sql_query = `SELECT AppointmentID as 'Appointment ID',Patient_Name as 'Patient Name',Physician_Name as 'Physician Name',Start as 'Start Time',End as 'End Time' FROM Appointment NATURAL JOIN Patient NATURAL JOIN Physician NATURAL JOIN Slot WHERE Patient_SSN=${patient_id} `;
        else{
            res.status(400).send({message: 'Invalid query type'});
            return;
        }
        
    }
    let result = await executeQuery(sql_query, req);
    let rows = result.rows;
    // format date
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        for (const key in row) {
            if (row.hasOwnProperty(key)) {
                const value = row[key];
                if (value instanceof Date) {
                    row[key] = formatDate(value);
                }   
            }
        }
    }
    res.status(result.status).send(result);

}

function formatDate(dateTimeStr) {
    const date = new Date(dateTimeStr);
    const formattedDate = date.toISOString().slice(0, 10);
    const formattedTime = date.toTimeString().slice(0, 8);
    return `${formattedDate} ${formattedTime}`;
  }



const prescribesRouter = require('./prescribes');
doctorRouter.use('/:id/prescribes', prescribesRouter);


module.exports = doctorRouter;
