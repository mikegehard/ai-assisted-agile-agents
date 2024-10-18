#!/usr/bin/env bun
import { Command } from 'commander';
import dotenv from 'dotenv';
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { WeatherAgent, getModel } from './weatherAgent';

// Load environment variables early
dotenv.config();

const program = new Command();

const model = getModel(process.env.OLLAMA_MODEL || "llama3.2");
const agentTools = [
  new TavilySearchResults({
    maxResults: 3,
    apiKey: process.env.TAVILY_API_KEY
  })
];
const weatherAgent = new WeatherAgent(model, agentTools);

program
  .version('1.0.0')
  .description('Weather Agent CLI')
  .command('weather')
  .description('Get weather for a location')
  .argument('<location>', 'location to get weather for')
  .action(async (location: string) => {
    try {
      const result = await weatherAgent.getWeatherFor(location);
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  });

program.parse();
