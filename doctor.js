
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

const queryTypes = {
    1: 'treatment',
    2: 'medication',
    3: 'appointment'
}

function getDoctorByID(req, res){
    let id = req.params.id;
    let query = req.query;

    if(query == null){  // If no query is passed
        client.query('SELECT * FROM Physician WHERE EmployeeID = $1', [id], (err, result)=>{
            if(err) throw err;
            res.json(result.rows);
        });
    }
    else{
        const type = queryTypes[query.type];
        
        if(type == 'treatment'){

        }
        else if(type == 'medication'){

        }
        else if(type == 'appointment'){

        }

    }


}


module.exports = doctorRouter;