import { Output } from '../chatInterface';
import { Command } from './types';
import exitCommand from './exit';
import helpCommand from './help';
import {runAtCommandLine} from "../../tools/runAtCommandLine";
import makeGreenCommand from "./makeGreen";

export function createCommandRegistry(exitAction: () => void, output: Output): CommandRegistry {
    const registry = new CommandRegistry(output);

    registry.register(exitCommand(exitAction));
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
        const [commandName, ...args] = commandLine.split(' ');
        const restOfCommand = args.join(' ');
        const command = this.commands.get(commandName.toLowerCase());

        if (!command) {
            this.output.error(`Unknown command: ${commandName}`);
            return;
        }

        const result = await command.execute(restOfCommand);
        if (!result.success) {
            this.output.error(result.error.message);
        }
    }

    getCommands(): Command[] {
        return Array.from(this.commands.values());
    }
}
