import { type Command, type Result } from './types';

import { Output } from '../chatInterface';

const helpCommand = (output: Output): Command => ({
    name: '/help',
    description: 'Show available commands',
    execute: async () => {
        const availableCommands = [
            { name: '/help', description: 'Show available commands' },
            { name: '/runTests', description: 'Run all tests' },
            { name: '/exit', description: 'Exit the CLI' },
        ];

        const helpOutput = 'Available commands:\n' + 
            availableCommands.map(cmd => `${cmd.name}: ${cmd.description}`).join('\n');

        output.log(helpOutput);
        return { success: true };
    },
});

export default helpCommand;
