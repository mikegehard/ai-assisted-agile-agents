import readline from 'readline';
import chalk from 'chalk';
import { WeatherAgent } from './weatherAgent';

interface ChatInterface {
    start: () => void;
}

function showHelp() {
    console.log(chalk.cyan(`
Available commands:
/exit - Exit the chat
/help - Show this help message
`));
}

function showGreeting() {
    console.log(chalk.yellow(`
Welcome to the Agile AI Assistant!
Type '/exit' to quit.
Type '/help' to show the help menu.
`));
}

function askQuestion(rl: readline.Interface, agent: WeatherAgent) {
    rl.question(chalk.green('You: '), async (input) => {
        if (input.toLowerCase() === '/exit') {
            rl.close();
            return;
        }

        if (input.toLowerCase() === '/help') {
            showHelp();
            askQuestion(rl, agent);
            return;
        }

        try {
            const result = await agent.getWeatherFor(input);
            console.log(chalk.blue('Weather Agent:'), result);
        } catch (error) {
            console.error(chalk.red('Error:'), error);
        }

        askQuestion(rl, agent);
    });
}

export function createChatInterface(agent: WeatherAgent): ChatInterface {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return {
        start: () => {
            showGreeting();
            askQuestion(rl, agent);
        }
    };
}
