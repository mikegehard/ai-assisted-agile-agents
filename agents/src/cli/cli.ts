#!/usr/bin/env node
import { Command } from 'commander';
import dotenv from 'dotenv';
import readline from 'readline';
import { createChatInterface } from './chatInterface';

dotenv.config();

function createReadlineInterface(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}


function runChatInterface() {
  createChatInterface(createReadlineInterface()).start();
}

const program = new Command();

program
  .version('1.0.0')
  .description('Agile Development AI Assistant')
  .action(runChatInterface);

program.parse();
