import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'prakritipath_user',
  password: 'StrongPassword123!',
  database: 'prakritipath'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

export default db;
