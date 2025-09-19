// therapyController.js
import db from './db.js';

// Add a new therapy schedule
export function addTherapySchedule(patientId, therapyName, therapyDate, notes) {
  const sql = 'INSERT INTO therapy_schedule (patient_id, therapy_name, therapy_date, notes) VALUES (?, ?, ?, ?)';
  db.query(sql, [patientId, therapyName, therapyDate, notes], (err, result) => {
    if (err) {
      console.error('Error adding therapy schedule:', err);
    } else {
      console.log('✅ Therapy schedule added with ID:', result.insertId);
    }
  });
}

// Get all therapy schedules for a patient
export function getTherapySchedules(patientId) {
  const sql = 'SELECT * FROM therapy_schedule WHERE patient_id = ?';
  db.query(sql, [patientId], (err, rows) => {
    if (err) {
      console.error('Error fetching therapy schedules:', err);
    } else {
      console.log('📋 Therapy schedules:', rows);
    }
  });
}
