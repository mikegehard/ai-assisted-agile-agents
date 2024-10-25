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

function displayWelcomeMessage() {
    console.log(chalk.yellow(`
Welcome to the Agile AI Assistant!
Type '/exit' to quit.
Type '/help' to show the help menu.
`));
}

function promptUser(rl: readline.Interface, handleInput: InputHandler) {
    rl.question(chalk.green('You: '), async (input) => {
        await handleInput(input);
        if (input.toLowerCase() !== '/exit') {
            promptUser(rl, handleInput);
        }
    });
}

export function createChatInterface(handleInput: InputHandler, rl: readline.Interface): ChatInterface {
    return {
        start: () => {
            displayWelcomeMessage();
            promptUser(rl, handleInput);
        }
    };
}

export function initializeChatInterface(inputHandler: InputHandler, readlineInterface: readline.Interface): ChatInterface {
    return createChatInterface(inputHandler, readlineInterface);
}
