import { GoogleGenAI } from '@google/genai';
import readline from 'readline';

// Replace with your Gemini API key
const client = new GoogleGenAI({
  apiKey: 'AIzaSyCSI6vweUBnIzfAbcvHd_QYv4skjCjl3Es',
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Chatbot started! Type your message or 'exit' to quit.");

async function chat() {
  rl.question("You: ", async (userInput) => {
    if (userInput.toLowerCase() === 'exit') {
      console.log("Chatbot session ended.");
      rl.close();
      return;
    }

    try {
      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',   // changed model name
        contents: userInput
      });

      console.log("Chatbot:", response.text);
    } catch (error) {
      console.error("Error:", error);
    }

    chat();
  });
}

chat();