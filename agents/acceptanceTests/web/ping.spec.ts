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

test('GET /ping endpoint returns "pong"', async ({ request }) => {
  const response = await request.get(`${baseURL}/ping`);

  expect(response.ok()).toBeTruthy();
  expect(await response.text()).toBe('pong');
});
