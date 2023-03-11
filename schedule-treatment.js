const express = require('express');
const treatmentRouter = express.Router();
const {executeQuery} = require('./db');

treatmentRouter
.route('/')
.get(getTreatmentSlots)
.post(addTreatmentSlot);





async function getTreatmentSlots(req, res){
    const req_date=req.query.date;
    const doc_id=req.query.docId;
    let sql_query = `SELECT SlotID,Start,End FROM Slot WHERE  SlotID NOT IN `+
                    `(SELECT SlotID FROM Appointment WHERE Date='${req_date}' and PhysicianID='${doc_id}') `+
                    `AND SlotID NOT IN (SELECT SlotID FROM Treatment WHERE Date='${req_date}' and PhysicianID='${doc_id}');`;

    const result = await executeQuery(sql_query, req);
    // result['slots'] = result['rows']; result['rows'] = undefined;
    res.status(result.status).send(result);
}

async function addTreatmentSlot(req, res){
    const {date, slot_id, treatment_id} = req.body;
    let sql_query = `UPDATE Treatment SET Date = ${date}, SlotID = ${slot_id} `+
                    `WHERE TreatmentID = ${treatment_id} `;
    const result = await executeQuery(sql_query, req);
    res.status(result.status).send(result);
}


module.exports = treatmentRouter;
