import readline from 'readline';
import chalk from 'chalk';
import { WeatherAgent } from './weatherAgent';

interface ChatInterface {
    start: () => void;
}

type InputHandler = (input: string) => Promise<void>;

function displayAvailableCommands() {
    console.log(chalk.cyan(`
Available commands:
/exit - Exit the chat
/help - Show this help message
`));
}

function displayWelcomeMessage() {
    console.log(chalk.yellow(`
Welcome to the Agile AI Assistant!
Type '/exit' to quit.
Type '/help' to show the help menu.
`));
}

function createInputHandler(rl: readline.Interface, agent: WeatherAgent): InputHandler {
    return async (input: string): Promise<void> => {
        switch (input.toLowerCase()) {
            case '/exit':
                rl.close();
                return;
            case '/help':
                displayAvailableCommands();
                return;
            default:
                try {
                    const result = await agent.getWeatherFor(input);
                    console.log(chalk.blue('Weather Agent:'), result);
                } catch (error) {
                    console.error(chalk.red('Error:'), error);
                }
        }
    };
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
