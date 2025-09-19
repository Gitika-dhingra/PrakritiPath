// testSignupLogin.js
import { signupPatient, loginPatient } from './patientController.js';

async function run() {
  try {
    // 1) Signup (use a new email otherwise you'll get duplicate entry)
    const sign = await signupPatient('Test User', 'testuser@example.com', 'TestPass123!', 28, 'Delhi', 'No prior conditions');
    console.log('Signup result:', sign);

    // 2) Login
    const login = await loginPatient('testuser@example.com', 'TestPass123!');
    console.log('Login result:', login);
  } catch (err) {
    console.error('Error:', err.message || err);
  }
}

run();
