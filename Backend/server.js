// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { signup } from './userController.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Signup route
app.post('/user/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    await signup(name, email, password);
    res.json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ success: false, message: 'Email already exists' });
    } else {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
