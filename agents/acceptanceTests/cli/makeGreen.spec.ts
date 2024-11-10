import { test, expect } from '@playwright/test';
import { setupCLITest } from './testUtils';

test('Make typechecker happy', async () => {
    const codebaseDirectory = `${process.cwd()}/acceptanceTests/applicationFixtures/typecheckError`

    const { sendCommand, waitForOutput } = setupCLITest(codebaseDirectory);

    sendCommand('/makeGreen tsc --noEmit');

    const makeGreenOutput = await waitForOutput(5000);

    sendCommand('/exit');

    expect(makeGreenOutput).toContain('Running command: tsc --noEmit...');
    expect(makeGreenOutput).toContain('Command failed');
    expect(makeGreenOutput).toContain('Implementing code');
    // TODO: add a test that shows the code was fixed? Need to figure out where to put the code
    // as the tests run so that the fixture doesn't get overwritten?
});
