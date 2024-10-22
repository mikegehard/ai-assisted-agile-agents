import readline from 'readline';
import chalk from 'chalk';
import { WeatherAgent } from './weatherAgent';

export type InputHandler = (input: string) => Promise<void>;

function displayAvailableCommands() {
    console.log(chalk.cyan(`
Available commands:
/exit - Exit the chat
/help - Show this help message
`));
}

export function createInputHandler(rl: readline.Interface, agent: WeatherAgent): InputHandler {
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
