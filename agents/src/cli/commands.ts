import chalk from 'chalk';
import readline from 'readline';
import { Output } from './chatInterface';

interface Command {
    name: string;
    description: string;
    execute: (args?: string[]) => Promise<Command.Result>;
}

namespace Command {
    export type Result = {
        success: true;
    } | {
        success: false;
        error: string;
    }
}

export function createCommandRegistry(rl: readline.Interface, output: Output): CommandRegistry {
    const registry = new CommandRegistry(output);

    registry.register(new ExitCommand(rl));
    registry.register(new RunTestsCommand(output));
    registry.register(new HelpCommand(
        output,
        registry.getCommands()
    ));

    return registry;
}

class CommandRegistry {
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

class ExitCommand implements Command {
    name = '/exit';
    description = 'Exit the chat';

    constructor(private rl: readline.Interface) { }

    async execute(): Promise<Command.Result> {
        this.rl.close();
        return { success: true };
    }
}



class HelpCommand implements Command {
    name = '/help';
    description = 'Show this help message';

    constructor(
        private output: Output,
        private commands: Command[]
    ) { }

    async execute(): Promise<Command.Result> {
        const commandList = this.commands
            .map(cmd => `${cmd.name} - ${cmd.description}`)
            .join('\n');

        this.output.log(chalk.cyan(`\nAvailable commands:\n${commandList}\n`));
        return { success: true };
    }
}

class RunTestsCommand implements Command {
    name = '/runtests';
    description = 'Run tests';

    constructor(private output: Output) { }

    async execute(): Promise<Command.Result> {
        try {
            this.output.log(chalk.yellow('Running tests...'));
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.output.log(chalk.green('Test results: All tests passed!'));
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Failed to run tests' };
        }
    }
}
