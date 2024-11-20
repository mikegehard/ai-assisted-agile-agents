import { test, expect } from '@playwright/test';
import { setupCLITest } from './testUtils';
import {runAtCommandLine} from "../../src/tools/runAtCommandLine";

test('Make typechecker happy', async () => {
    const codebaseDirectory = `${process.cwd()}/acceptanceTests/applicationFixtures/typecheckError`

    const { sendCommand, waitForOutput, testWorkingDirectory } = setupCLITest(codebaseDirectory);

    sendCommand('/makeGreen tsc --noEmit');

    const makeGreenOutput = await waitForOutput(5000);

    sendCommand('/exit');

    expect(makeGreenOutput).toContain('Running command: tsc --noEmit...');
    expect(makeGreenOutput).toContain('Command failed');
    expect(makeGreenOutput).toContain('Implementing code');

    const result = await runAtCommandLine(testWorkingDirectory, 'tsc', ['--noEmit']);

    expect(result.exitCode).toBe(0);
});
