import db from './db.js';

async function getFullPatientInfo(doctor_id) {
    try {
        const [rows] = await db.promise().query(`
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
                m.medicine_name AS medicine_name,
                m.dosage,
                m.instructions,
                m.date_given,
                s.id AS schedule_id,
                s.start_date,
                s.end_date,
                s.frequency,
                s.status
            FROM patients p
            JOIN doctor_patient_assignments dpa ON p.id = dpa.patient_id
            LEFT JOIN therapy t ON t.patient_id = p.id
            LEFT JOIN medicines m ON m.patient_id = p.id
            LEFT JOIN schedules s ON s.patient_id = p.id
            WHERE dpa.doctor_id = ?
        `, [doctor_id]);

        console.log("Fetching full patient info...");
        console.log(rows);
    } catch (err) {
        console.error("Error fetching full patient info:", err);
    }
}

// Example usage for doctor with ID 1
getFullPatientInfo(1);
