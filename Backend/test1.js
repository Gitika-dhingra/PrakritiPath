import { signup, login } from './userController.js';

async function testUser() {
  // --- 1. Signup a new user ---
  // Use a new email to avoid "Email already exists" error
  await signup('USER ', 'testuser@example.com', 'TestPass123!');

  // --- 2. Login with the same user ---
  const user = await login('testuser@example.com', 'TestPass123!');

  // --- 3. Display the user object returned ---
  console.log(user);
}

// Run the test
testUser();
