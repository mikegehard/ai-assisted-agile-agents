#!/usr/bin/env bun
import { Command } from 'commander';
import dotenv from 'dotenv';
import { createWeatherAgent, WeatherAgent } from './weatherAgent';
import { ChatInterface, initializeChatInterface } from './chatInterface';
import { createInputHandler, InputHandler } from './inputHandler';
import readline from 'readline';

// Load environment variables early
dotenv.config();

function createReadlineInterface(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function setupWeatherAgent(): WeatherAgent {
  return createWeatherAgent(
    process.env.TAVILY_API_KEY || "",
    process.env.OLLAMA_MODEL || "llama3.2"
  );
}

function setupChatInterface(readlineInterface: readline.Interface, weatherAgent: WeatherAgent): ChatInterface {
  const inputHandler: InputHandler = createInputHandler(readlineInterface);
  return initializeChatInterface(inputHandler, readlineInterface);
}

function runChatInterface() {
  const readlineInterface = createReadlineInterface();
  const weatherAgent = setupWeatherAgent();
  const chatInterface = setupChatInterface(readlineInterface, weatherAgent);
  chatInterface.start();
}

const program = new Command();

program
  .version('1.0.0')
  .description('Agile Development AI Assistant')
  .action(runChatInterface);

program.parse();
