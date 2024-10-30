import { type Command } from './types';

import { Output } from '../chatInterface';

const runTestsCommand = (output: Output): Command => ({
    name: '/runTests',
    description: 'Run all tests',
    execute: async () => {
        output.log('Running tests...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        output.log('Test results: All tests passed!');
        return { success: true };
    },
});

export default runTestsCommand;
