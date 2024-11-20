import { test, expect } from '@playwright/test';
import { setupCLITest } from './testUtils';

test('Unknown command', async () => {
    const { sendCommand, waitForOutput } = setupCLITest();

    sendCommand('/unknown');

    const makeGreenOutput = await waitForOutput(1000);

    sendCommand('/exit');

    expect(makeGreenOutput).toContain('Unknown command: /unknown');
});
