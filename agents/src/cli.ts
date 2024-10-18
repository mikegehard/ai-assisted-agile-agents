#!/usr/bin/env bun
import { Command } from 'commander';
import dotenv from 'dotenv';
import { createWeatherAgent } from './weatherAgent';
import readline from 'readline';

// Load environment variables early
dotenv.config();

const program = new Command();

const weatherAgent = createWeatherAgent(process.env.TAVILY_API_KEY || "", process.env.OLLAMA_MODEL || "llama3.2");

function startChatInterface() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const welcomeMessage = `
Welcome to the Agile AI Assistant!
Type '/exit' to quit.
Type '/help' to show the help menu.
`;
  console.log(welcomeMessage);

  function showHelp() {
    const helpMessage = `
Available commands:
/exit - Exit the chat
/help - Show this help message
`;
    console.log(helpMessage);
  }

  showHelp();

  function askQuestion() {
    rl.question('You: ', async (input) => {
      if (input.toLowerCase() === '/exit') {
        rl.close();
        return;
      }

      if (input.toLowerCase() === '/help') {
        showHelp();
        askQuestion();
        return;
      }

      try {
        const result = await weatherAgent.getWeatherFor(input);
        console.log('Weather Agent:', result);
      } catch (error) {
        console.error('Error:', error);
      }

      askQuestion();
    });
  }

  askQuestion();
}

program
  .version('1.0.0')
  .description('Agile Development AI Assistant')
  .action(startChatInterface);

program.parse();
