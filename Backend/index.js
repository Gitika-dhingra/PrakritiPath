import mysql from 'mysql2/promise';
import readline from 'readline';

// --- 1. Create MySQL connection ---
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'prakritipath_user',      // your MySQL username
  password: 'StrongPassword123!', // your MySQL password
  database: 'prakritipath'        // your PrakritiPath database
});

console.log("Database connected successfully!");

// --- 2. Function to get FAQ answer ---
async function getFAQAnswer(question) {
  try {
    // Search in FAQ table
    const [rows] = await connection.execute(
      'SELECT answer FROM faq WHERE question = ?',
      [question]
    );

    if (rows.length) {
      return rows[0].answer;
    } else {
      return "Sorry, I don't have an answer for that yet. You can check the articles on PrakritiPath for more info.";
    }
  } catch (err) {
    console.error("Database error:", err);
    return "Oops! Something went wrong while fetching the answer.";
  }
}

// --- 3. Function to log chat in chatbot_history ---
async function logChat(userId, userMessage, botReply) {
  try {
    await connection.execute(
      'INSERT INTO chatbot_history (user_id, user_message, bot_reply) VALUES (?, ?, ?)',
      [userId, userMessage, botReply]
    );
  } catch (err) {
    console.error("Error logging chat:", err);
  }
}

// --- 4. Simple console chatbot ---
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Example: using user_id = 2 (Prakriti)
const userId = 2;

console.log("PrakritiPath Chatbot started! Type your question or 'exit' to quit.");

rl.on('line', async (input) => {
  const question = input.trim();

  if (question.toLowerCase() === 'exit') {
    console.log("Chatbot session ended.");
    await connection.end();
    rl.close();
    return;
  }

  // Get answer from FAQ
  const answer = await getFAQAnswer(question);

  // Log chat in database
  await logChat(userId, question, answer);

  // Display answer
  console.log("Chatbot says:", answer);
  console.log("Ask another question or type 'exit':");
});
