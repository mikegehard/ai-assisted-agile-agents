import { Command, Result } from './types';

const exitCommand = (exitAction: () => void): Command => ({
    name: '/exit',
    description: 'Exit the chat',
    execute: async (): Promise<Result<undefined>> => {
        exitAction();
        return { success: true };
    },
});

export default exitCommand;
