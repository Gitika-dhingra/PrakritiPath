// testmedicine.js
import { addMedicineRecord, getMedicinesByPatient } from './medicineController.js';

// Add a new medicine record
await addMedicineRecord(
  1, // patient_id
  'Dr. Sharma', // doctor_name
  'Ayurvedic Oil', // medicine_name
  '2 times a day', // dosage
  'Apply gently on back' // instructions
);

// Fetch all medicines for the same patient
const meds = await getMedicinesByPatient(1);
console.log('Medicines for patient 1:', meds);
