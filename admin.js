// Route for admin
const express = require('express');
const adminRouter = express.Router();

adminRouter
.route('/')
.post(createEntity)
//.delete(deleteEntity);

function createEntity(req, res){
    console.log('Hi\n', req.body);
    const entity = req.body;
    const type = req.body.type;
    let sql_query = '';

    req.db.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL database: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }


        if(type == 'doctor'){
            sql_query =  `INSERT INTO Physician(EmployeeID, Name, Position, SSN) `+
                         `VALUES('${entity.employeeid}', '${entity.name}', '${entity.position}', 23213); `;
            executeQuery(sql_query, res, connection);

            sql_query  = `INSERT INTO Affiliated_with(Physician, Department, PrimaryAffiliation) `+
                         `VALUES('${entity.employeeid}', ${entity.department}, False);`;
            executeQuery(sql_query, res, connection);
                            
        }

        else{
            res.status(400).send('Invalid query type');
            connection.release();
            return;
        }
        
    res.status(200).send({message: 'Successfuly created entity!'});
    connection.release();

    //res.status(200).send({message: `Successfuly created ${type}!`});

        
    
    });
}

function createUser(entity, res, connection){
    const sql_query = `INSERT INTO user(employee_id, Name, Email, Password, iv, type)\
                       VALUES(${entity.id}, '${entity.name}', '${entity.email}', '${entity.password}', '${entity.pass_iv}', ${entity.type});`
    executeQuery(sql_query, res, connection);
}

function executeQuery(sql_query, res, connection){

    connection.query(sql_query, (err, rows, fields) => {
        if(err){
            res.status(500).send('Internal Server Error');
            console.log(err);
        }
    });
}

module.exports = adminRouter;