import { Output } from '../chatInterface';
import { Command } from './types';
import { ExitCommand } from './exit';
import helpCommand from './help';
import runTestsCommand from './runTests';
import {runAtCommandLine} from "../../tools/runAtCommandLine";

export function createCommandRegistry(exit: () => void, output: Output): CommandRegistry {
    const registry = new CommandRegistry(output);

    registry.register(new ExitCommand(exit));
    registry.register(runTestsCommand(output, runAtCommandLine));
    registry.register(helpCommand(output));

    return registry;
}


export class CommandRegistry {
    private readonly commands: Map<string, Command> = new Map();

    constructor(private readonly output: Output) { }

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
            this.output.error(result.message || "An error occurred");
        }
    }

    getCommands(): Command[] {
        return Array.from(this.commands.values());
    }
}
