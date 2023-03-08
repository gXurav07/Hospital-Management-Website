const express = require('express');
const prescribesRouter = express.Router();

const {executeQuery} = require('./db');

prescribesRouter
.route('/')
.get(getMedTestTreatment)
.post(addPrescribes);

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


async function addPrescribes(req, res){
    console.log(req.body);
    const body = req.body;
    const type = body.type;

    if(type == undefined){
        res.status(400).send({message: 'Invalid request'}); return;
    }

    let sql_query = '';
    if(type == 'Medication'){
        sql_query = `INSERT INTO Prescribes_Medication (PhysicianID, Patient_SSN, MedicationID, Date, AppointmentID, Dose) `+
                    `VALUES ('${body.PhysicianID}', ${body.Patient_SSN}, ${body.MedicationID}, '${body.Date}', ${body.AppointmentID}, '${body.Dose}');`;
    }
    else if(type == 'Test'){
        sql_query = `INSERT INTO Test_Instance (Test_InstanceID, , Patient_SSN, MedicationID, Date, AppointmentID, Dose ) `+
                    `VALUES (${body.PhysicianID}, ${body.Patient_SSN}, ${body.MedicationID}, '${body.Date}', ${body.AppointmentID}, ${body.Dose});`;
    }
    // else if(type == 'Treatment'){
    //     sql_query = `INSERT INTO Prescribes_Medication (PhysicianID, Patient_SSN, MedicationID, Date, AppointmentID, Dose ) `+
    //                 `VALUES (${body.PhysicianID}, ${body.Patient_SSN}, ${body.MedicationID}, '${body.Date}', ${body.AppointmentID}, ${body.Dose});`;
    // }

    let result = await executeQuery(sql_query, req);
    console.log(sql_query);
    console.log(result);
    res.status(result.status).send(result);
}


module.exports = prescribesRouter;