import readline from 'readline';
import chalk from 'chalk';
import { InputHandler } from './inputHandler';

export interface ChatInterface {
    start: () => void;
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
