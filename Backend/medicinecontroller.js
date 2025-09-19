// medicineController.js
import db from './db.js';

// Function to add medicine record
export const addMedicineRecord = (patient_id, doctor_name, medicine_name, dosage, instructions) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO medicines (patient_id, doctor_name, medicine_name, dosage, instructions) VALUES (?, ?, ?, ?, ?)',
      [patient_id, doctor_name, medicine_name, dosage, instructions],
      (err, result) => {
        if (err) {
          console.error('Error inserting medicine record:', err);
          reject(err);
        } else {
          console.log('Medicine record added successfully!');
          resolve(result);
        }
      }
    );
  });
};

// Function to fetch all medicines for a patient
export const getMedicinesByPatient = (patient_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM medicines WHERE patient_id = ?',
      [patient_id],
      (err, rows) => {
        if (err) {
          console.error('Error fetching medicines:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};
