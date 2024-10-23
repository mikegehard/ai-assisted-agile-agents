import { test, expect } from '@playwright/test';
import { setupCLITest } from './testUtils';

test('CLI /runTests command', async () => {
  const { sendCommand, waitForOutput } = setupCLITest();

  // Test /runTests command
  sendCommand('/runTests');
  const runTestsOutput = await waitForOutput(5000);

  sendCommand('/exit');

  expect(runTestsOutput).toContain('Running tests...');
  expect(runTestsOutput).toContain('Test results:');
});
