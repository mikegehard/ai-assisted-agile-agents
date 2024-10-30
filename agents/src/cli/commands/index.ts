import readline from 'readline';
import { Output } from '../chatInterface';
import { CommandRegistry } from './registry';
import { ExitCommand } from './exit';
import helpCommand from './help';
import runTestsCommand from './runTests';

export type { Command } from './types';
export type { CommandRegistry } from './registry';

export function createCommandRegistry(rl: readline.Interface, output: Output): CommandRegistry {
    const registry = new CommandRegistry(output);

    registry.register(new ExitCommand(rl));
    registry.register(runTestsCommand(output));
    registry.register(helpCommand(output));

    return registry;
}
