import readline from 'readline';
import chalk from 'chalk';

export interface ChatInterface {
    start: () => void;
}

export type InputHandler = (input: string) => Promise<void>;

export interface Output {
    log: (message: string) => void;
    error: (message: string) => void;
}

export class ConsoleOutput implements Output {
    log(message: string): void {
        console.log(message);
    }
    error(message: string): void {
        console.log(chalk.red(message));
    }
}

export function displayWelcomeMessage(output: Output) {
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

export function createChatInterface(handleInput: InputHandler, rl: readline.Interface, output: Output): ChatInterface {
    return {
        start: () => {
            displayWelcomeMessage(output);
            promptUser(rl, handleInput, output);
        }
    };
}

export function initializeChatInterface(inputHandler: InputHandler, readlineInterface: readline.Interface, output: Output): ChatInterface {
    return createChatInterface(inputHandler, readlineInterface, output);
}
