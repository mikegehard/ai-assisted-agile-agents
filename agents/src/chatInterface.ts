import readline from 'readline';
import chalk from 'chalk';
import { WeatherAgent } from './weatherAgent';

interface ChatInterface {
    start: () => void;
}

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

function handleUserInput(input: string, rl: readline.Interface, agent: WeatherAgent): Promise<void> {
    switch (input.toLowerCase()) {
        case '/exit':
            rl.close();
            return Promise.resolve();
        case '/help':
            displayAvailableCommands();
            return Promise.resolve();
        default:
            return agent.getWeatherFor(input)
                .then(result => console.log(chalk.blue('Weather Agent:'), result))
                .catch(error => console.error(chalk.red('Error:'), error));
    }
}

function promptUser(rl: readline.Interface, agent: WeatherAgent) {
    rl.question(chalk.green('You: '), async (input) => {
        await handleUserInput(input, rl, agent);
        if (input.toLowerCase() !== '/exit') {
            promptUser(rl, agent);
        }
    });
}

export function createChatInterface(agent: WeatherAgent): ChatInterface {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return {
        start: () => {
            displayWelcomeMessage();
            promptUser(rl, agent);
        }
    };
}
