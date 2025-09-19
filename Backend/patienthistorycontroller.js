import db from './db.js';

function getPatientHistory(patientId) {
  db.query(
    'SELECT therapy_type, details AS therapy_details FROM therapy WHERE patient_id = ?',
    [patientId],
    (err, therapies) => {
      if (err) return console.error(err);

      db.query(
        'SELECT medicine_name, dosage, instructions FROM medicines WHERE patient_id = ?',
        [patientId],
        (err, medicines) => {
          if (err) return console.error(err);

          db.query(
            'SELECT start_date, end_date, frequency, status FROM schedules WHERE patient_id = ?',
            [patientId],
            (err, schedules) => {
              if (err) return console.error(err);

              console.log(`History for patient ${patientId}:`, {
                therapies,
                medicines,
                schedules
              });
            }
          );
        }
      );
    }
  );
}

// Example usage
getPatientHistory(1);
