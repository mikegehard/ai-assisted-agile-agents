import readline from 'readline';
import { ConsoleOutput } from './output';
import { CommandRegistry } from './registry';
import { ExitCommand, HelpCommand, RunTestsCommand } from './commands';

export type InputHandler = (input: string) => Promise<void>;

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
