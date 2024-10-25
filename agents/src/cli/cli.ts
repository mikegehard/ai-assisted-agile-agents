#!/usr/bin/env bun
import { Command } from 'commander';
import dotenv from 'dotenv';
import { ConsoleOutput, ChatInterface, initializeChatInterface, InputHandler } from './chatInterface';
import { createCommandRegistry } from './commands';
import readline from 'readline';

// Load environment variables early
dotenv.config();

function createReadlineInterface(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function setupChatInterface(readlineInterface: readline.Interface): ChatInterface {
  const consoleOutput = new ConsoleOutput();
  const registry = createCommandRegistry(readlineInterface, consoleOutput);
  
  const inputHandler: InputHandler =  async (input: string): Promise<void> => {
    await registry.execute(input);
  };
  return initializeChatInterface(inputHandler, readlineInterface);
}

function runChatInterface() {
  const readlineInterface = createReadlineInterface();
  const chatInterface = setupChatInterface(readlineInterface);
  chatInterface.start();
}

const program = new Command();

program
  .version('1.0.0')
  .description('Agile Development AI Assistant')
  .action(runChatInterface);

program.parse();
