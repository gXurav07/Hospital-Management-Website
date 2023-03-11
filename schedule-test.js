const express = require('express');
const testRouter = express.Router();
const {executeQuery} = require('./db');

testRouter
.route('/')
.get(getTestsAndSlots)
.post(addTest);


async function getTestsAndSlots(req, res){
    let data = {tests: [], slots: [], status: 200, message: 'OK'};
    let sql_query = `SELECT * FROM Test NATURAL JOIN Test_instance NATURAL JOIN Patient WHERE SlotID IS NULL;`;

    let result = await executeQuery(sql_query, req);
    
    if(result.status > data.status){
        data.status = result.status;
        data.message = result.message;
    }
    data['tests'] = result.rows;

    sql_query = 'SELECT * FROM Slot;';
    result = await executeQuery(sql_query, req);

    if(result.status > data.status){
        data.status = result.status;
        data.message = result.message;
    }
    data['slots'] = result.rows;

    res.status(data.status).send(data);

}

async function addTest(req, res){
    const {test_inst_id, date, slot_id} = req.body;
    const sql_query = `UPDATE Test_instance SET Date = ${date}, SlotID = ${slot_id} `+
                      `WHERE Test_instanceID = ${test_inst_id} `;
    const result = await executeQuery(sql_query, req);
    res.status(request.status).send(result);
    
}


module.exports = testRouter;
