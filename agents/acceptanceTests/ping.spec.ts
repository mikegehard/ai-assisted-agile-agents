import { test, expect } from '@playwright/test';

test('GET /ping endpoint returns "pong"', async ({ request }) => {
  const response = await request.get('/ping');
  
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).toBe('pong');
});
