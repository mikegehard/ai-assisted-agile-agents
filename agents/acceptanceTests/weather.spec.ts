import { test, expect } from '@playwright/test';

test('should return weather information for a given city', async ({ request }) => {
  const city = 'London';
  const response = await request.get('/weather-for', {
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
  const response = await request.get('/weather-for');

  expect(response.status()).toBe(400);
  const responseJson = await response.json();
  expect(responseJson).toEqual({ error: 'Location is required' });
});
