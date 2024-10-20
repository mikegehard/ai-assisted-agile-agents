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

  await new Promise(resolve => setTimeout(resolve, 2000));

  cli.stdin.write('/help\n');

  await new Promise(resolve => setTimeout(resolve, 2000));

  cli.stdin.write('/exit\n');

  await new Promise<void>((resolve) => {
    cli.on('close', (code) => {
      console.log(`CLI process exited with code ${code}`);
      resolve();
    });
  });

  expect(output).toContain('Available commands:');
  expect(output).toContain('/help');
  expect(output).toContain('/exit');
});
