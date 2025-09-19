// patientRoutes.js
import express from 'express';
import db from './db.js';

const router = express.Router();

// Sign up new patient
router.post('/signup', (req, res) => {
  const { name, age, place, medicalHistory } = req.body;
  const sql = 'INSERT INTO patients (name, age, place, medical_history) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, age, place, medicalHistory], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error adding patient' });
    }
    res.status(201).json({ message: 'Patient added successfully!' });
  });
});

// Login patient by id (you can change to email/password later)
router.post('/login', (req, res) => {
  const { id } = req.body;
  const sql = 'SELECT * FROM patients WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error fetching patient' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(result[0]); // return patient details
  });
});

export default router;
