import { test, expect } from './testSetup';

test('should return weather information for a given city', async ({ request, baseURL }) => {
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

test('should handle missing location parameter', async ({ request, baseURL }) => {
  const response = await request.get(`${baseURL}/weather-for`);

  expect(response.status()).toBe(400);
  const responseJson = await response.json();
  expect(responseJson).toEqual({ error: 'Location is required' });
});
