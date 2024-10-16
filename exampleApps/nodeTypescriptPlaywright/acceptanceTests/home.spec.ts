import { test, expect } from '@playwright/test';
import app from '../webApp/app';

let server: any;

test.beforeAll(async () => {
  server = app.listen(3000);
});

test.afterAll(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test('homepage has title and message', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page).toHaveTitle('Hello World');

  const heading = page.locator('h1');
  await expect(heading).toHaveText('Hello World!');
});
