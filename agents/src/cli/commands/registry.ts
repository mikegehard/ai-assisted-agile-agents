import { Output } from '../chatInterface';
import { Command } from './types';
import exitCommand from './exit';
import helpCommand from './help';
import runTestsCommand from './runTests';
import {runAtCommandLine} from "../../tools/runAtCommandLine";
import makeGreenCommand from "./makeGreen";

export function createCommandRegistry(exitAction: () => void, output: Output): CommandRegistry {
    const registry = new CommandRegistry(output);

    registry.register(exitCommand(exitAction));
    registry.register(runTestsCommand(output, runAtCommandLine));
    registry.register(makeGreenCommand(output, runAtCommandLine));
    registry.register(helpCommand(output, registry.getCommands()));

    return registry;
}


export class CommandRegistry {
    private readonly commands: Map<string, Command> = new Map();

    constructor(private readonly output: Output) {
    }

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
