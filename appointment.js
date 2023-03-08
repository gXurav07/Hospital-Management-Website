const express = require('express');
const appointmentRouter = express.Router();

appointmentRouter
.route('/')
.get(getDoctorsToSchedule);

appointmentRouter
.route('/slots')
.get(getSlots);

function getDoctorsToSchedule(req, res){
    

    let data = {doctors: [], patients: []};
    let get_doctors = 'SELECT Name, PhysicianID AS id, Position FROM Physician INNER JOIN User ON Physician.PhysicianID = User.EmployeeID;';
    let get_patients = 'SELECT Patient_Name, Patient_SSN AS id, Age, Gender FROM Patient;';

    req.db.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL database: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        connection.query(get_doctors, (err, rows) => {
            if (err) {
                console.error('Error executing MySQL query: ', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            data.doctors = rows;
        });

        connection.query(get_patients, (err, rows) => {
            if (err) {
                console.error('Error executing MySQL query: ', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            data.patients = rows;
            res.status(200).send(data);
        });
    });

}


function getSlots(req, res){
    const req_date=req.query.date;
    const doc_id=req.query.docId;
    let sql_query = `SELECT  Start,End FROM Appointment, Slot WHERE PhysicianID=${doc_id} AND Date='${req_date}' AND SlotID NOT IN ((SELECT SlotID FROM Appointment WHERE Date='${req_date}' and PhysicianID='${doc_id}') INTERSECT (SELECT Start,End FROM Slot WHERE PhysicianID=${doc_id} AND Date='${req_date}' AND SlotID NOT IN (SELECT SlotID FROM Treatment WHERE Date='${req_date}' and PhysicianID='${doc_id}')));`;
    executeQuery(sql_query, req, res);
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
           res.status(status).send({message, data});
           console.log({status, message});
        });

        connection.release();
        //return {status: status, message: message, data: data};
    });
}


module.exports = appointmentRouter;