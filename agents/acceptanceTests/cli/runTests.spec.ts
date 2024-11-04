import { test, expect } from '@playwright/test';
import { setupCLITest } from './testUtils';

test('Run tests', async () => {
  const { sendCommand, waitForOutput } = setupCLITest();

  sendCommand('/runTests bun start test')

  const runTestsOutput = await waitForOutput(5000);

  sendCommand('/exit');

  expect(runTestsOutput).toContain('Running tests');
});
