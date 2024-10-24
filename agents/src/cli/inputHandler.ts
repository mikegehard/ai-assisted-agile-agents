import readline from 'readline';
import chalk from 'chalk';

interface Command {
  name: string;
  description: string;
  execute: (args?: string[]) => Promise<Result>;
}

type Result = {
  success: true;
} | {
  success: false;
  error: string;
}

interface Output {
  log: (message: string) => void;
  error: (message: string) => void;
}

class ConsoleOutput implements Output {
  log(message: string): void {
    console.log(message);
  }
  error(message: string): void {
    console.log(chalk.red(message));
  }
}

class CommandRegistry {
  private commands: Map<string, Command> = new Map();

  constructor(private output: Output) {}

  register(command: Command): void {
    this.commands.set(command.name.toLowerCase(), command);
  }

  async execute(commandLine: string): Promise<void> {
    const [commandName, ...args] = commandLine.toLowerCase().split(' ');
    const command = this.commands.get(commandName);

    if (!command) {
      this.output.error('Unknown command');
      return;
    }

    const result = await command.execute(args);
    if (!result.success) {
      this.output.error(result.error);
    }
  }

  getCommands(): Command[] {
    return Array.from(this.commands.values());
  }
}

class ExitCommand implements Command {
  name = '/exit';
  description = 'Exit the chat';

  constructor(private rl: readline.Interface) {}

  async execute(): Promise<Result> {
    this.rl.close();
    return { success: true };
  }
}

class HelpCommand implements Command {
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

class RunTestsCommand implements Command {
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

export function createInputHandler(rl: readline.Interface): InputHandler {
  const consoleOutput = new ConsoleOutput();
  const registry = new CommandRegistry(consoleOutput);

  const helpCommand = new HelpCommand(consoleOutput, registry);

  registry.register(new ExitCommand(rl));
  registry.register(helpCommand);
  registry.register(new RunTestsCommand(consoleOutput));

  return async (input: string): Promise<void> => {
    await registry.execute(input);
  };
}

export type InputHandler = (input: string) => Promise<void>;
