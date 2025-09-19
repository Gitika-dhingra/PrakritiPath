// doctorController.js
import db from './db.js';
import bcrypt from 'bcrypt';
import { getFullPatientInfoForDoctor } from './assignmentController.js';

// Doctor Signup
export async function signupDoctor(name, email, password, specialization) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = 'INSERT INTO doctors (name, email, password, specialization) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, hashedPassword, specialization], (err, result) => {
    if (err) throw err;
    console.log('Doctor registered successfully!');
  });
}

// Doctor Login
export async function loginDoctor(email, password) {
  const sql = 'SELECT * FROM doctors WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      console.log('Doctor not found!');
      return;
    }

    const doctor = results[0];
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      console.log(`Doctor login successful! Welcome Dr. ${doctor.name}`);
      console.log('Fetching full patient info...');
      getFullPatientInfoForDoctor(doctor.id); // Fetch therapy, medicine, schedule
    } else {
      console.log('Invalid password!');
    }
  });
}
