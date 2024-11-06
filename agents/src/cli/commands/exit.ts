import { Command, Result } from './types';

const exitCommand = (exitAction: () => void): Command => ({
    name: '/exit',
    description: 'Exit the chat',
    execute: async (): Promise<Result> => {
        exitAction();
        return { success: true, message: '' };
    },
});

export default exitCommand;
