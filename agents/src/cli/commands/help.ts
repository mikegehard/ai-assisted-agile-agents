import { type Command } from './types';

import { Output } from '../chatInterface';

const helpCommand = (output: Output, availableCommands: Command[]): Command => ({
    name: '/help',
    description: 'Show available commands',
    execute: async () => {
        const helpOutput = 'Available commands:\n' +
            availableCommands.map(cmd => `${cmd.name}: ${cmd.description}`).join('\n');

        output.log(helpOutput);
        return { success: true };
    },
});

export default helpCommand;
