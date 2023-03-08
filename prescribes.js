const express = require('express');
const prescribesRouter = express.Router();

const {executeQuery} = require('./db');

prescribesRouter
.route('/')
.get(getMedTestTreatment);

async function getMedTestTreatment(req, res){


    let get_med = 'SELECT Medication_Name AS name, MedicationID AS id FROM Medication;';
    let get_test = 'SELECT Test_Name AS name, TestID AS id FROM Test;';
    let get_treatment = 'SELECT Desc_Name AS name, Treatment_DescriptionID AS id FROM Treatment_Description;';

    let data = {medication: [], test: [], treatment: [], status: 200, message: 'OK'};

    let meds = await executeQuery(get_med, req, res); data.medication = meds.rows;
    if(meds.status > data.status){
        data.status = meds.status; 
        data.message = meds.message;
    }
    
    let tests = await executeQuery(get_test, req, res); data.test = tests.rows;
    if(tests.status > data.status){
        data.status = tests.status;
        data.message = tests.message;
    }

    let treatments = await executeQuery(get_treatment, req, res);  data.treatment = treatments.rows;
    if(treatments.status > data.status){
        data.status = treatments.status;
        data.message = treatments.message;
    }

    res.status(data.status).send(data);

}


module.exports = prescribesRouter;