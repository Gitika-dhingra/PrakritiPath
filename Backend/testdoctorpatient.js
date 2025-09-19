// testdoctorpatients.js
import db from './db.js';
import { signupDoctor, loginDoctor } from './doctorController.js';

console.log('Connected to MySQL database');

// Example signup (run once)
// await signupDoctor('Dr. Smith', 'smith@example.com', 'SecurePass123', 'Cardiology');

// Login as doctor and fetch assigned patients
await loginDoctor('smith@example.com', 'SecurePass123');
