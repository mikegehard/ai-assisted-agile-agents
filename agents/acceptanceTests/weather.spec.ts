import { test, expect } from '@playwright/test';

test('should return weather information for a given city', async ({ request }) => {
  const city = 'London';
  const response = await request.get('/weather-for', {
    params: { location: city }
  });

  expect(response.ok()).toBeTruthy();
  const responseText = await response.text();
  expect(responseText).toContain(city);
  expect(responseText).toMatch(/temperature|weather|forecast/i);
});
