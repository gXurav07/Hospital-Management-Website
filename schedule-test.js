const express = require('express');
const testRouter = express.Router();
const {executeQuery} = require('./db');

testRouter
.route('/')
.get(getTestsAndSlots)
.post(addTest);


async function getTestsAndSlots(req, res){
    let data = {tests: [], slots: [], status: 200, message: 'OK'};
    let sql_query = 'SELECT * FROM Test;';
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
    console.log(req.body);
}


module.exports = testRouter;
