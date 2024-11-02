const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');

const app = express();
app.use(cors());
app.use(express.json());

const connectToDatabase = () => {
    const db = mysql.createConnection({
        host: process.env.DB_HOST || 'mysql',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'yourpassword',
        database: process.env.DB_NAME || 'upfilex_db'
    });

    db.connect(err => {
        if (err) {
            console.error('Error connecting to MySQL, retrying in 5 seconds...', err);
            setTimeout(connectToDatabase, 5000); // Retry after 5 seconds
        } else {
            console.log('MySQL Connected...');
            startServer();
        }
    });

    return db;
};

const startServer = () => {
    app.listen(5000, () => {
        console.log('Server running on port 5000');
    });
};

const db = connectToDatabase();

const upload = multer({ dest: 'uploads/' });

// Endpoint to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).send('No file uploaded');

    const workbook = xlsx.readFile(file.path);
    const sheet_name = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);

    res.json({ data });
});

// Endpoint to confirm upload and save to MySQL
app.post('/confirm-upload', (req, res) => {
    const data = req.body.data;
    const sql = 'INSERT INTO your_table (column1, column2) VALUES ?';

    const values = data.map(item => [item.column1, item.column2]);

    db.query(sql, [values], (err, result) => {
        if (err) throw err;
        res.send('Data uploaded successfully');
    });
});

// Endpoint to fetch uploaded data
app.get('/data', (req, res) => {
    const sql = 'SELECT * FROM your_table';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
