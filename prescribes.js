const express = require('express');
const prescribesRouter = express.Router();

prescribesRouter
.route('/')
.get(getMedTestTreatment);

function getMedTestTreatment(req, res){

    req.db.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL database: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        let get_med = 'SELECT Medication_Name AS name, MedicationID AS id FROM Medication;';
        let get_test = 'SELECT Test_Name AS name, TestID AS id FROM Test;';
        let get_treatment = 'SELECT Desc_Name AS name, Treatment_DescriptionID AS id FROM Treatment_Description;';

        let data = {medication: [], test: [], treatment: []};

        connection.query(get_med, (err, rows) => {
            if (err) {
                console.error('Error executing MySQL query: ', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            data.medication = rows;
        });

        connection.query(get_test, (err, rows) => {
            if (err) {
                console.error('Error executing MySQL query: ', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            data.test = rows;
        });

        connection.query(get_treatment, (err, rows) => {
            if (err) {
                console.error('Error executing MySQL query: ', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            data.treatment = rows;
            res.status(200).send(data);
        });

        connection.release();


    });
}


module.exports = prescribesRouter;