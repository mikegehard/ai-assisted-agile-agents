import readline from 'readline';
import chalk from 'chalk';
import { WeatherAgent } from './weatherAgent';
import { InputHandler, createInputHandler } from './inputHandler';

interface ChatInterface {
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

export function createChatInterface(agent: WeatherAgent): ChatInterface {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const handleInput = createInputHandler(rl, agent);
    return {
        start: () => {
            displayWelcomeMessage();
            promptUser(rl, handleInput);
        }
    };
}
