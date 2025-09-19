import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'prakritipath_user',
      password: 'StrongPassword123!',
      database: 'prakritipath'
    });
    console.log("Connection successful!");
    await connection.end();
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

testConnection();
