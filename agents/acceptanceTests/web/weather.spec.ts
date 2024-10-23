import { test, expect } from '@playwright/test';
import app from '../../src/api/server';
import { AddressInfo } from 'net';

let server: ReturnType<typeof app.listen>;
let baseURL: string;

test.beforeAll(async () => {
  server = app.listen(0); // Use port 0 to let the OS assign an available port
  const address = server.address() as AddressInfo;
  baseURL = `http://localhost:${address.port}`;
});

test.afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

test('should return weather information for a given city', async ({ request }) => {
  const city = 'London';
  const response = await request.get(`${baseURL}/weather-for`, {
    params: { location: city }
  });

  expect(response.ok()).toBeTruthy();
  const responseJson = await response.json();
  expect(responseJson).toHaveProperty('weather');
  const weather = responseJson.weather;
  expect(weather).toContain(city);
  expect(weather).toMatch(/temperature|weather|forecast/i);
});

test('should handle missing location parameter', async ({ request }) => {
  const response = await request.get(`${baseURL}/weather-for`);

  expect(response.status()).toBe(400);
  const responseJson = await response.json();
  expect(responseJson).toEqual({ error: 'Location is required' });
});
