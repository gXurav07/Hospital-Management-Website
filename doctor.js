
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
                sql_query = `SELECT * FROM Undergoes WHERE Patient=${patient_id}`;
            else if(type == 'medication')
                sql_query = `SELECT * FROM Prescribes WHERE Patient=${patient_id}`;
            else if(type == 'appointment')
                sql_query = `SELECT * FROM Appointment WHERE Patient=${patient_id}`;
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


function executeQuery(sql_query, res, connection){
    connection.query(sql_query, (err, rows, fields) => {
        if(err){
            res.status(500).send('Internal Server Error');
            console.log(err);
        }
        else{
            res.status(200).send({data: rows});
        }
    });
}

module.exports = doctorRouter;