// testdoctor.js
import db from './db.js';
import { signupDoctor, loginDoctor } from './doctorController.js';

console.log('Connected to MySQL database');

// Example: signup a doctor
await signupDoctor('Dr. Smit', 'smit@example.com', 'SecurePass12', 'Cardiology');

// Example: login a doctor after a short delay
setTimeout(async () => {
  await loginDoctor('smit@example.com', 'SecurePass12');
}, 2000);
