import { Command, Result } from './types';

export class ExitCommand implements Command {
    name = '/exit';
    description = 'Exit the chat';

    constructor(private exitChatInterface: () => void) { }

    async execute(): Promise<Result> {
        this.exitChatInterface();
        return { success: true };
    }
}
