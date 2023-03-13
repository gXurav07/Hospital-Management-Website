// Route for admin
const express = require('express');
const { executeQuery } = require('./db');
const {encrypt} = require('./encryption-handler');

const adminRouter = express.Router();

adminRouter
.route('/')
.get(getAllEntities)
.post(createEntity)
.delete(deleteEntity);

async function getAllEntities(req, res){
    const type = req.query.type;
    let sql_query = '';
    let result = null;

    try{
        if(type == 'user'){
            sql_query =  `SELECT * FROM User; `;
        }
        else if(type == 'doctor'){
            sql_query =  `SELECT * FROM Physician; `;
        }
        else if(type == 'data-entry'){
            sql_query =  `SELECT * FROM DataEntry; `;
        }
        else if(type == 'front-desk'){
            sql_query =  `SELECT * FROM FrontDesk; `;
        }
        else if(type=='medication'){
            sql_query = `SELECT * FROM Medication; `;
        }
        else if(type=='department'){
            sql_query = `SELECT * FROM Department; `;
        }
        else if(type=='test'){
            sql_query = `SELECT * FROM Test; `;
        }
        else if(type=='treatment'){
            sql_query = `SELECT * FROM Treatment_Description; `;
        }
        else{
            res.status(400).send({message: 'Invalid type'});

            return;
        }
    }
    catch(err){
        res.status(400).send({message: 'Invalid request'});
        return;
    }

    result = await executeQuery(sql_query, res);
    res.status(result.status).send(result);
}

  
async function createEntity(req, res){
    
    const entity = req.body;
    const type = req.body.type;
    let sql_query = '';
    let result = null;

    try{
        if(type == 'user'){
            const encription = encrypt(entity.password);
            const pass = encription.encrypted_password, iv = encription.iv;
            sql_query =  `INSERT INTO User(EmployeeID, Name, Email, Type, Password, Pass_iv) `+
                            `VALUES('${entity.employeeid}', '${entity.name}', '${entity.email}', ${entity.user_type}, '${pass}', '${iv}'); `;
        }
        else if(type == 'doctor'){
            sql_query =  `INSERT INTO Physician(PhysicianID, Position) `+
                            `VALUES('${entity.physicianid}', '${entity.position}'); `;
            result = await executeQuery(sql_query, res, connection);

            if(result.status != 200){
                res.status(result.status).send(result);
                return;
            }

            sql_query  = `INSERT INTO Affiliated_with(Physician, Department) `+
                        `VALUES('${entity.physicianid}', ${entity.department});`;

                            
        }
        else if(type == 'data-entry'){
            sql_query =  `INSERT INTO DataEntry(EmployeeID, Name, Address) `+
                        `VALUES('${entity.employeeid}', '${entity.name}', '${entity.address}'); `;
        }
        else if(type == 'front-desk'){
            sql_query =  `INSERT INTO FrontDesk(EmployeeID, Name, Address) `+
                        `VALUES('${entity.employeeid}', '${entity.name}', '${entity.address}'); `;
        }
        else if(type=='medication'){
            sql_query = `INSERT INTO Medication(MedicationID, Medication_Name, Brand, Description) `+
                        `VALUES(${entity.medicationid}, '${entity.name}', '${entity.brand}', '${entity.description}'); `;

        }
        else if(type=='department'){
            sql_query = `INSERT INTO Department(DepartmentID, Dep_Name, Head) `+
                        `VALUES(${entity.departmentid}, '${entity.name}', '${entity.head}'); `;
        }
        else if(type=='test'){
            sql_query = `INSERT INTO Test(TestID, Test_Name, Cost) `+
                        `VALUES('${entity.testid}', '${entity.name}', '${entity.cost}'); `;
        }
        else if(type=='treatment'){
            sql_query = `INSERT INTO Treatment_Description(Treatment_DescriptionID, Desc_Name, Cost) `+
                        `VALUES(${entity.treatmentid}, '${entity.name}', '${entity.cost}'); `;
        }
        else{
            res.status(400).send({message: 'Invalid type'});
            return;
        }
    }
    catch(err){
        res.status(400).send({message: 'Invalid request'});
        return;
    }

    result = await executeQuery(sql_query, req);
    res.status(result.status).send(result);

  
}

async function deleteEntity(req, res){
    const entity = req.body;
    const type = req.body.type;
    let sql_query = '';
    let result = null;

    try{
        if(type == 'user'){
            sql_query =  `DELETE FROM User WHERE EmployeeID = '${entity.employeeid}'; `;
        }
        else if(type == 'doctor'){
            sql_query =  `DELETE FROM Physician WHERE PhysicianID = '${entity.physicianid}'; `;
        }
        else if(type == 'data-entry'){
            sql_query =  `DELETE FROM DataEntry WHERE EmployeeID = '${entity.employeeid}'; `;
        }
        else if(type == 'front-desk'){
            sql_query =  `DELETE FROM FrontDesk WHERE EmployeeID = '${entity.employeeid}'; `;
        }
        else if(type=='medication'){
            sql_query = `DELETE FROM Medication WHERE MedicationID = ${entity.medicationid}; `;
        }
        else if(type=='department'){
            sql_query = `DELETE FROM Department WHERE DepartmentID = ${entity.departmentid}; `;
        }
        else if(type=='test'){
            sql_query = `DELETE FROM Test WHERE TestID = '${entity.testid}'; `;
        }
        else if(type=='treatment'){
            sql_query = `DELETE FROM Treatment_Description WHERE Treatment_DescriptionID = ${entity.treatmentid}; `;
        }
        else{
            res.status(400).send({message: 'Invalid type'});
            return;
        }
    }
    catch(err){
        res.status(400).send({message: 'Invalid request'});
        return;
    }

    result = await executeQuery(sql_query, req);
    res.status(result.status).send(result);
}



module.exports = adminRouter;