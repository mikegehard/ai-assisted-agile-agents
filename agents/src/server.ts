import express from 'express';
import { config } from 'dotenv';
import { createWeatherAgent } from './weatherAgent';

config();

const app = express();
const port = 3000;

const weatherAgent = createWeatherAgent(
  process.env.TAVILY_API_KEY || "",
  process.env.OLLAMA_MODEL || "llama3.2"
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

// Don't start the server here
// Instead, export the app
export default app;

// If this file is run directly (not imported), then start the server
if (import.meta.url === `file://${process.argv[1]}`) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
