const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const fs=require('fs');
app.use(cors());

// Configure database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Random@07',
  database: 'test',
});

// Connect to database
connection.connect(error => {
  if (error) {
    console.error('Error connecting to database', error);
    return;
  }
  console.log('Connected to database');
});
app.get('/api/image/:id', (req, res) => {
    const id = req.params.id;
  
    // Fetch image from MySQL database based on the provided id
    connection.query(`SELECT * FROM images WHERE id = ${id}`, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error fetching image from database');
      } else {
        // Send the image to the frontend
        res.contentType('image/jpeg');
        res.send(results[0].image_file);
      }
    });
  });
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  const paths=req.file.path;
  const imageData = fs.readFileSync(paths);
  const sql = 'INSERT INTO images(image_file) VALUES (?)';
  connection.query(sql, [imageData], (error, result) => {
    if (error) {
      console.error('Error inserting image into database', error);
      res.status(500).send('Error inserting image into database');
      return;
    }
    console.log('Image inserted into database');
    res.json({ success: true });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
