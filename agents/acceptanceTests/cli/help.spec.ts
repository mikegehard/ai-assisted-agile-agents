import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

test('CLI /help command', async () => {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = path.dirname(currentFilePath);
  const cliPath = path.resolve(currentDirPath, '../../src/cli.ts');
  const cli = spawn('bun', ['run', cliPath], { cwd: process.cwd() });

  let output = '';

  cli.stdout.on('data', (data) => {
    output += data.toString();
  });

  let helpOutput = '';

  // Test /help command
  cli.stdin.write('/help\n');
  await new Promise(resolve => setTimeout(resolve, 5000));
  helpOutput = output;

  cli.stdin.write('/exit\n');

  expect(helpOutput).toContain('Available commands:');
  expect(helpOutput).toContain('/help');
  expect(helpOutput).toContain('/exit');
});
