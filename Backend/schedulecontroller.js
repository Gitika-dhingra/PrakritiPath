// scheduleController.js
import db from './db.js';

// Add a new schedule
export const addSchedule = (patient_id, therapy_id, medicine_id, start_date, end_date, frequency) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO schedules (patient_id, therapy_id, medicine_id, start_date, end_date, frequency) VALUES (?, ?, ?, ?, ?, ?)',
      [patient_id, therapy_id, medicine_id, start_date, end_date, frequency],
      (err, result) => {
        if (err) {
          console.error('Error adding schedule:', err);
          reject(err);
        } else {
          console.log('Schedule added successfully!');
          resolve(result);
        }
      }
    );
  });
};

// Get schedules for a patient
export const getSchedulesByPatient = (patient_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM schedules WHERE patient_id = ?',
      [patient_id],
      (err, rows) => {
        if (err) {
          console.error('Error fetching schedules:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

// Mark a schedule as completed (after end_date)
export const markScheduleCompleted = (schedule_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE schedules SET status = ? WHERE id = ?',
      ['completed', schedule_id],
      (err, result) => {
        if (err) {
          console.error('Error marking schedule completed:', err);
          reject(err);
        } else {
          console.log('Schedule marked as completed!');
          resolve(result);
        }
      }
    );
  });
};
