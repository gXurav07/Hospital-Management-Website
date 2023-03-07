
// Route for doctor
const express = require('express');
const doctorRouter = express.Router();

doctorRouter
.route('/:id')
.get(getDoctorByID)
 


function getDoctorByID(req, res){
    let id = req.params.id;
    let query = req.query;

    req.db.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL database: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let sql_query = '';

        if(Object.keys(query).length == 0)
            sql_query = `SELECT * FROM Patient WHERE PCP=${id}`;
        else{
            
            const type = query.type;
            const patient_id = query.patient;

            if(patient_id == undefined){
                res.status(400).send('Invalid query');
                connection.release();
                return;
            }

            if(type == 'treatment')
                sql_query = 'SELECT Patient_Name as Patient Name",Desc_Name as "Treatment Name",Date,Physician_Name as "Physician Name" FROM Treatment_Description NATURAL JOIN Treatment NATURAL JOIN Patient NATURAL JOIN Physician WHERE Patient=${patient_id}';
            else if(type == 'medication')
                sql_query = `SELECT Physician_Name as 'Physician Name',Patient_Name as 'Patient Name',Medication_Name as 'Medication Name',Brand as Brand,Date,AppointmentID as 'Appointment ID' FROM Prescribes_Medication NATURAL JOIN Medication NATURAL JOIN Physician NATURAL JOIN Patient WHERE Patient=${patient_id}`;
            else if(type == 'appointment')
                sql_query = `SELECT AppointmentID as 'Appointment ID',Patient_Name as 'Patient Name',Physician_Name as 'Physician Name',Start as 'Start Time',End as 'End Time' FROM Appointment NATURAL JOIN Patient NATURAL JOIN Physician NATURAL JOIN Slot WHERE Patient=${patient_id} `;
            else{
                res.status(400).send('Invalid query type');
                connection.release();
                return;
            }
            
        }
        executeQuery(sql_query, res, connection);
        connection.release();
    
    });
}

function formatDate(dateTimeStr) {
    const date = new Date(dateTimeStr);
    const formattedDate = date.toISOString().slice(0, 10);
    const formattedTime = date.toTimeString().slice(0, 8);
    return `${formattedDate} ${formattedTime}`;
  }
function executeQuery(sql_query, res, connection){
    connection.query(sql_query, (err, rows, fields) => {
        if(err){
            res.status(500).send('Internal Server Error');
            console.log(err);
        }
        else{
            console.log(rows);
            // iterate through rows and format date
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
            
            //console.log(fields);
            res.status(200).send({data: rows});
            // console.log(result);
            // res.status(200).send({data: result});
        }
    });
}



const prescribesRouter = require('./prescribes');
doctorRouter.use('/:id/prescribes', prescribesRouter);


module.exports = doctorRouter;