import { Output } from '../chatInterface';
import { Command } from './types';

export class CommandRegistry {
    private commands: Map<string, Command> = new Map();

    constructor(private output: Output) { }

    register(command: Command): void {
        this.commands.set(command.name.toLowerCase(), command);
    }

    async execute(commandLine: string): Promise<void> {
        const [commandName, ...args] = commandLine.toLowerCase().split(' ');
        const command = this.commands.get(commandName);

        if (!command) {
            this.output.error('Unknown command');
            return;
        }

        const result = await command.execute(args);
        if (!result.success) {
            this.output.error(result.error);
        }
    }

    getCommands(): Command[] {
        return Array.from(this.commands.values());
    }
}
