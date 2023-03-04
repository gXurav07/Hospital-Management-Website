// Route for doctor
const express = require('express');
const doctorRouter = express.Router();


doctorRouter
.route('/')
.get(getDoctor)



doctorRouter
.route('/:id')
.get(getDoctorByID)



function getDoctor(req, res){
    res.send('<h1> Welcome To covid Hospital Management </h1>');
}

function getDoctorByID(req, res){
    let id = req.params.id;
    client.query('SELECT * FROM Physician WHERE EmployeeID = $1', [id], (err, result)=>{
        if(err) throw err;
        res.json(result.rows);
    }); 
}


module.exports = doctorRouter;