import { test, expect } from '@playwright/test';
import { setupCLITest } from './testUtils';

test('Make all tests pass', async () => {
    const { sendCommand, waitForOutput } = setupCLITest();

    sendCommand('/makeGreen bun start test')

    const makeGreenOutput = await waitForOutput(5000);

    sendCommand('/exit');

    expect(makeGreenOutput).toContain('Running tests');
    expect(makeGreenOutput).toContain('Tests failed');
    expect(makeGreenOutput).toContain('Implementing code based on test results');
});
