function executeQuery(sql_query, req, res){  
    return new Promise((resolve, reject) => {
        let status = 200, message = 'OK';
        req.db.getConnection((err, connection) => {
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
                resolve({status, message, rows});
                connection.release();
            });
            
        });
    });
}

module.exports = {executeQuery};