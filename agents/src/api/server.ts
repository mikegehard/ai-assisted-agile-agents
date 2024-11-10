import express from 'express';
import { config } from 'dotenv';
import { createWeatherAgent } from '../agents/weatherAgent';
import {defaultModelIdentifier, ModelConfiguration, ModelIdentifier} from "../agents/models";

config();

const app = express();

const modelConfig: ModelConfiguration = {
  name: process.env.OLLAMA_MODEL as ModelIdentifier || defaultModelIdentifier,
};

const weatherAgent = createWeatherAgent(
  process.env.TAVILY_API_KEY || "",
  modelConfig
);

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/weather-for', async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  const message = await weatherAgent.getWeatherFor(location as string);
  return res.json({ weather: message });
});

export default app;

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
