// db.js
import sqlite3 from 'sqlite3';

// Access the Database class
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

export default db;
