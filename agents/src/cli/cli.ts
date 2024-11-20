#!/usr/bin/env node
import { Command } from 'commander';
import dotenv from 'dotenv';
import readline from 'readline';
import { createChatInterface } from './chatInterface';

function createReadlineInterface(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}


function runChatInterface() {
  createChatInterface(createReadlineInterface()).start();
}

function confirmEnvVarsSet() {
  const requiredEnvVars = ['MODEL_NAME'];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`Error: Missing required environment variable ${envVar}`);
      process.exit(1);
    }
  }
}

dotenv.config();

confirmEnvVarsSet();

const program = new Command();

program
  .version('1.0.0')
  .description('Agile Development AI Assistant')
  .action(runChatInterface);

program.parse();
