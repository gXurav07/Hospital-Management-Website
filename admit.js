const express = require('express');
const admitRouter = express.Router();

const { executeQuery } = require('./db');

admitRouter
.route('/')
.get(get_roomno)
.post(admit_patient);

function get_roomno(req, res)
{
    let sql_query= `SELECT RoomID as FROM Room WHERE Unavailable=false`;
    executeQuery(sql_query, req, res);

}
function admit_patient(req,res)
{
    const patient=req.body.patient_id;
    const room=req.body.room_id;
    const date=req.body.date;
    let sql_query=`INSERT INTO Stay VALUES(${patient},${room},${date},NULL)`;
    executeQuery(sql_query, req, res);
}

module.exports = admitRouter;