const express = require('express');
const dataEntryRouter = express.Router();

const { executeQuery } = require('./db');

dataEntryRouter
.route('/test-result')
.get(get_tests)
.post(add_test_result);


async function get_tests(req, res){
    let sql_query = '', result = {};
    // get non-admitted patients
    sql_query = `SELECT Test_instanceID, Test_Name, Patient_SSN, Patient_Name, Date, Start, End `+
                `FROM Test_instance NATURAL JOIN Test NATURAL JOIN Patient NATURAL JOIN Slot `+
                `WHERE Result IS NULL;`;
    result = await executeQuery(sql_query, req);

    result['tests'] = result.rows;
    delete result.rows;

    for(i in result.tests){
        result.tests[i]['Date'] = result.tests[i]['Date'].toISOString().slice(0, 10).replace('T', ' ');
    }
    
    res.status(result.status).send(result);

}

async function add_test_result(req, res){
    // convert to string
    req.body = JSON.stringify(req.body);
    console.log(req.body);
    // const {test_instanceid, test_result} = req.body;
    // let sql_query = `UPDATE Test_instance SET Result='${test_result}' WHERE Test_instanceID=${test_instanceid};`;
    // let result = await executeQuery(sql_query, req);
    
    // res.status(result.status).send(result);
    res.status(200).send({message: 'Hehe'});
}

module.exports = dataEntryRouter;