#!/usr/bin/env bun
import { Command } from 'commander';
import dotenv from 'dotenv';
import { createWeatherAgent } from './weatherAgent';
import { createChatInterface } from './chatInterface';

// Load environment variables early
dotenv.config();

const weatherAgent = createWeatherAgent(process.env.TAVILY_API_KEY || "", process.env.OLLAMA_MODEL || "llama3.2");

function startChatInterface() {
  const chatInterface = createChatInterface(weatherAgent);
  chatInterface.start();
}

const program = new Command();

program
  .version('1.0.0')
  .description('Agile Development AI Assistant')
  .action(startChatInterface);

program.parse();
