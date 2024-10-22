import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

test('CLI /runTests command', async () => {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = path.dirname(currentFilePath);
  const cliPath = path.resolve(currentDirPath, '../../src/cli.ts');
  const cli = spawn('bun', ['run', cliPath], { cwd: process.cwd() });

  let output = '';

  cli.stdout.on('data', (data) => {
    output += data.toString();
  });

  let runTestsOutput = '';

  // Test /runTests command
  cli.stdin.write('/runTests\n');
  await new Promise(resolve => setTimeout(resolve, 10000)); // Increased timeout for tests to run
  runTestsOutput = output;

  cli.stdin.write('/exit\n');

  expect(runTestsOutput).toContain('Running tests...');
  expect(runTestsOutput).toContain('Test results:');
});
