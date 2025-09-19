// testassignment.js
import db from './db.js';
import { getAllDoctors, assignDoctorToPatient, getPatientsForDoctor } from './assignmentController.js';

console.log('Connected to MySQL database');

// Step 1: Show available doctors
getAllDoctors();

// Step 2: Assign doctor (for example: doctor_id=1 to patient_id=1)
setTimeout(() => {
  assignDoctorToPatient(1, 1);
}, 2000);

// Step 3: Get patients for that doctor
setTimeout(() => {
  getPatientsForDoctor(1);
}, 4000);
