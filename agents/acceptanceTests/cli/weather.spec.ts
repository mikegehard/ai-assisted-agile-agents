import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

test('CLI and weather query', async () => {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = path.dirname(currentFilePath);
  const cliPath = path.resolve(currentDirPath, '../../src/cli.ts');
  const cli = spawn('bun', ['run', cliPath], { cwd: process.cwd() });

  let output = '';

  cli.stdout.on('data', (data) => {
    output += data.toString();
  });

  let weatherOutput = '';

  cli.stdin.write('New York\n');
  await new Promise(resolve => setTimeout(resolve, 10000)); // need a long timeout for the weather query
  weatherOutput = output;

  cli.stdin.write('/exit\n');

  let exitCode: number | null = null;

  await new Promise<void>((resolve) => {
    cli.on('close', (code) => {
      exitCode = code;
      resolve();
    });
  });

  expect(weatherOutput.toLowerCase()).toContain('weather');
  expect(weatherOutput).toContain('New York');

  expect(exitCode).toBe(0);
});
