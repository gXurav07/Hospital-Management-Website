const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
	host: '10.5.18.71',
	user: '20CS30021',
	password: '20CS30021',
	database: '20CS30021'
});

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        return;
    }
    console.log('Connected to MySQL database!');
    connection.release();
});

function executeQuery(sql_query, pool){  
    return new Promise((resolve, reject) => {
        let status = 200, message = 'OK';
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to MySQL database: ', err);
                status = 500; message = 'Internal Server Error'; 
                connection.release();
                resolve({status, message, rows: []});
                return;
            }
            
            connection.query(sql_query, (err, rows, fields) => {
                if(err){
                    status= 400; message = 'SQL query error';
                    console.log(err);
                }
                connection.release();
                resolve({status, message, rows});
            });
        }); 
    });
}

async function test(){
    let sql_query, physicians, mailText;

    // get all physicians
    sql_query = `SELECT PhysicianID FROM Physician;`;
    physicians = await executeQuery(sql_query, pool);

    physicians.rows.forEach(async physician => {
        const {PhysicianID} = physician;
        // get physician's email
        sql_query = `SELECT Email FROM User WHERE EmployeeID=${physician};`;
        let doc_email = await executeQuery(sql_query, pool);

        // get all patients of the physician
        sql_query = `SELECT Patient_Name, Patient.Patient_SSN, Email, Test_instance.Result as Test_Result, Test_instance.Test_image as Test_Image, Test_instance.Date as "Test_Date",Desc_Name as "Treatment_Name",Treatment.Date as "Treatment_Date" `+
                    `FROM Patient NATURAL JOIN Physician NATURAL JOIN Appointment, Test NATURAL JOIN Test_instance,Treatment NATURAL JOIN Treatment_Description WHERE `+
                    `Physician.PhysicianID='${PhysicianID}' and Test_instance.Patient_SSN=Patient.Patient_SSN and Treatment.Patient_SSN=Patient.Patient_SSN;`;
        
        let result = await executeQuery(sql_query, pool);
        console.log(PhysicianID, "\n\n", result);
        // Assuming that the result of the SQL query is stored in a variable called 'result'
        
        mailText = `Dear Physician,\n\nHere are the details of your patients:\n\n`;
        
        // Loop through each row in the result and add it to the mailText
        result.rows.forEach(row => {
        mailText += `Patient Name: ${row.Patient_Name}\n`;
        mailText += `Patient SSN: ${row.Patient_SSN}\n`;
        mailText += `Email: ${row.Email}\n`;
        mailText += `Test Result: ${row.Test_Result}\n`;
        mailText += `Test Image: ${row.Test_Image}\n`;
        mailText += `Test Date: ${row.Test_Date}\n`;
        mailText += `Treatment Name: ${row.Treatment_Name}\n`;
        mailText += `Treatment Date: ${row.Treatment_Date}\n\n`;
        });
        
        // Add closing message to the mailText
        mailText += `Thank you,\nYour Hospital`;
        
        console.log(mailText, '\n\n');
    });
  
} 
  
test(); 