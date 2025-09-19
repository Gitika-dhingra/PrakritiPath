// userController.js
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

// 1️⃣ Create a MySQL connection
export async function getConnection() {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'prakritipath_user',        // your MySQL username
    password: 'StrongPassword123!',   // your MySQL password
    database: 'prakritipath'          // your database name
  });
}

// 2️⃣ Signup function
export async function signup(name, email, password) {
  const connection = await getConnection();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    console.log('User registered successfully!');
  } finally {
    await connection.end();
  }
}
