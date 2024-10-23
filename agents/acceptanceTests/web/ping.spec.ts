import { test, expect } from './testSetup';

test('GET /ping endpoint returns "pong"', async ({ request, baseURL }) => {
  const response = await request.get(`${baseURL}/ping`);

  expect(response.ok()).toBeTruthy();
  expect(await response.text()).toBe('pong');
});
