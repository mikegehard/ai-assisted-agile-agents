import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';

export interface CLITestSetup {
  cli: ChildProcess;
  output: string;
  sendCommand: (command: string) => void;
  waitForOutput: (timeout: number) => Promise<string>;
}

export function setupCLITest(): CLITestSetup {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = path.dirname(currentFilePath);
  const cliPath = path.resolve(currentDirPath, '../../src/cli/cli.ts');
  const cli = spawn('bun', ['run', cliPath], { cwd: process.cwd() });

  let output = '';

  cli.stdout.on('data', (data) => {
    output += data.toString();
  });

  cli.stderr.on('data', (data) => {
    output += data.toString();
  });

  const sendCommand = (command: string) => {
    cli.stdin.write(`${command}\n`);
  };

  const waitForOutput = async (timeout: number): Promise<string> => {
    const startOutput = output;
    await new Promise(resolve => setTimeout(resolve, timeout));
    return output.slice(startOutput.length);
  };

  return { cli, output, sendCommand, waitForOutput };
}
