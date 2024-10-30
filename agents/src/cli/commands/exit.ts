import readline from 'readline';
import { Command, Result } from './types';

export class ExitCommand implements Command {
    name = '/exit';
    description = 'Exit the chat';

    constructor(private rl: readline.Interface) { }

    async execute(): Promise<Result> {
        this.rl.close();
        return { success: true };
    }
}
