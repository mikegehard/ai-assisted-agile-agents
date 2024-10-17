import express from 'express';
import { config } from 'dotenv';
import { WeatherAgent, getModel } from './agent';
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";

const app = express();
const port = 3000;

config();

const model = getModel(process.env.OLLAMA_MODEL || "llama3.2");
const agentTools = [new TavilySearchResults({ maxResults: 3, apiKey: process.env.TAVILY_API_KEY })];

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/weather-for', async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  const message = await new WeatherAgent(model, agentTools).getWeatherFor(location as string);
  res.send(message);
});

app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});

export default app;
