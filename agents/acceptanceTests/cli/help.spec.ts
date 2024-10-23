import { test, expect } from '@playwright/test';
import { setupCLITest } from './testUtils';

test('CLI /help command', async () => {
  const { sendCommand, waitForOutput } = setupCLITest();

  // Test /help command
  sendCommand('/help');
  const helpOutput = await waitForOutput(5000);

  sendCommand('/exit');

  expect(helpOutput).toContain('Available commands:');
  expect(helpOutput).toContain('/help');
  expect(helpOutput).toContain('/exit');
});
