import readline from 'readline';
import chalk from 'chalk';
import { Command, Output, Result } from './types';
import { CommandRegistry } from './registry';

export class ExitCommand implements Command {
  name = '/exit';
  description = 'Exit the chat';

  constructor(private rl: readline.Interface) {}

  async execute(): Promise<Result> {
    this.rl.close();
    return { success: true };
  }
}

export class HelpCommand implements Command {
  name = '/help';
  description = 'Show this help message';

  constructor(
    private output: Output,
    private registry: CommandRegistry
  ) {}

  async execute(): Promise<Result> {
    const commandList = this.registry.getCommands()
      .map(cmd => `${cmd.name} - ${cmd.description}`)
      .join('\n');

    this.output.log(chalk.cyan(`\nAvailable commands:\n${commandList}\n`));
    return { success: true };
  }
}

export class RunTestsCommand implements Command {
  name = '/runtests';
  description = 'Run tests';

  constructor(private output: Output) {}

  async execute(): Promise<Result> {
    try {
      this.output.log(chalk.yellow('Running tests...'));
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.output.log(chalk.green('Test results: All tests passed!'));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to run tests' };
    }
  }
}
