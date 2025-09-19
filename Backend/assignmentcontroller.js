// assignmentController.js
import db from './db.js';

// Fetch full patient info for a doctor (therapy, medicine, schedule included)
export function getFullPatientInfoForDoctor(doctorId) {
  const sql = `
    SELECT 
      p.id AS patient_id, 
      p.name AS patient_name, 
      p.age, 
      p.place, 
      p.medical_history,
      t.id AS therapy_id,
      t.therapy_type,
      t.details AS therapy_details,
      m.id AS medicine_id,
      m.name AS medicine_name,
      m.dosage,
      s.id AS schedule_id,
      s.start_date,
      s.end_date,
      s.frequency,
      s.status
    FROM patients p
    JOIN doctor_patient_assignments dpa ON p.id = dpa.patient_id
    LEFT JOIN therapy t ON t.patient_id = p.id
    LEFT JOIN medicine m ON m.patient_id = p.id
    LEFT JOIN schedule s ON s.patient_id = p.id
    WHERE dpa.doctor_id = ?`;
  
  db.query(sql, [doctorId], (err, results) => {
    if (err) {
      console.error('Error fetching full patient info:', err);
    } else {
      console.log(`Full patient info for Doctor ${doctorId}:`);
      console.table(results);
    }
  });
}
