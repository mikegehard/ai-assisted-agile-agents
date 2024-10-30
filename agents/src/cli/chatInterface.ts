import readline from 'readline';
import chalk from 'chalk';
import { CommandRegistry, createCommandRegistry } from './commands/registry';

export interface ChatInterface {
    start(): void;
}

export type InputHandler = (input: string) => Promise<void>;

export interface Output {
    log(message: string): void;
    error(message: string): void;
}

export class ConsoleOutput implements Output {
    log(message: string): void {
        console.log(message);
    }
    error(message: string): void {
        console.log(chalk.red(message));
    }
}

const output = new ConsoleOutput();

export function createChatInterface(readlineInterface: readline.Interface): ChatInterface {
    const registry = createCommandRegistry(() => readlineInterface.close(), output);

    return {
        start: () => {
            displayWelcomeMessage(output);
            promptUser(readlineInterface, createInputHandler(registry), output);
        }
    };
}

function createInputHandler(registry: CommandRegistry): InputHandler {
    return async (input: string): Promise<void> => {
        await registry.execute(input);
    };
}

function displayWelcomeMessage(output: Output) {
    output.log(chalk.yellow(`
Welcome to the Agile AI Assistant!
Type '/exit' to quit.
Type '/help' to show the help menu.
`));
}

function promptUser(rl: readline.Interface, handleInput: InputHandler, output: Output) {
    rl.question(chalk.green('You: '), async (input) => {
        await handleInput(input);
        if (input.toLowerCase() !== '/exit') {
            promptUser(rl, handleInput, output);
        }
    });
}
