import dotenv from 'dotenv';
import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import cors from "cors"
import db from './db.js';

dotenv.config();
const app = express();
const port = process.env.PORT
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static("public"))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../client/dist')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});



app.listen(port, () => {
    console.log('Server is started running on', process.env.DOMAIN)
})


app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ users: rows });
        }
    });
});


app.post('/users', (req, res) => {
    const { name, password } = req.body;
    db.run(
        'INSERT INTO users (name, password) VALUES (?, ?)',
        [name, password],
        function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(201).json({ message: 'User added', userId: this.lastID });
            }
        }
    );
});


app.post('/api/user/find', (req, res) => {
    const { name, password } = req.body;
  
    if (!name || !password) {
      return res.status(400).json({ error: 'Name and password are required.' });
    }
  
    const query = 'SELECT * FROM users WHERE name = ? AND password = ?';
    
    db.get(query, [name, password], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error.' });
      }
      
      if (row) {
        res.status(200).json({ message: 'User found', user: row });
      } else {
        res.status(404).json({ error: 'User not found or incorrect credentials.' });
      }
    });
  });
  