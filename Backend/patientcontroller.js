// patientController.js
import db from './db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_in_production';

// Signup: returns { insertId } on success
export async function signupPatient(name, email, password, age, place, medicalHistory) {
  try {
    const hashed = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO patients (name, email, password, age, place, medical_history)
                   VALUES (?, ?, ?, ?, ?, ?)`;
      db.query(sql, [name, email, hashed, age, place, medicalHistory], (err, result) => {
        if (err) return reject(err);
        resolve({ insertId: result.insertId });
      });
    });
  } catch (err) {
    throw err;
  }
}

// Login: returns { token, patient } on success (patient.password removed)
export async function loginPatient(email, password) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM patients WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
      if (err) return reject(err);
      if (!results || results.length === 0) return reject(new Error('Patient not found'));

      const patient = results[0];

      try {
        const match = await bcrypt.compare(password, patient.password || '');
        if (!match) return reject(new Error('Invalid credentials'));

        const token = jwt.sign({ id: patient.id, email: patient.email }, JWT_SECRET, { expiresIn: '1h' });

        // remove sensitive fields before returning
        const safePatient = { ...patient };
        delete safePatient.password;

        resolve({ token, patient: safePatient });
      } catch (compareErr) {
        reject(compareErr);
      }
    });
  });
}
