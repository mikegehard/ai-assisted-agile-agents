import { Output } from '../chatInterface';
import { CommandLineRunner } from "../../tools/runAtCommandLine";
import {Command, Result} from "./types";

const runTestsCommand = (output: Output, commandRunner: CommandLineRunner): Command => ({
    name: '/runTests',
    description: 'Run all tests',
    execute: async (testCommandParts): Promise<Result> => {
        const testCommand = testCommandParts?.at(0) || "";
        const commandArgs = testCommandParts?.slice(1) || [];
        // TODO: What happens if the command is empty?

        output.log(`Running tests...`);
        const result = await commandRunner(".", testCommand, commandArgs)
        if (result.exitCode == 0) {
            output.log('Test results: All tests passed!');
            return { success: true, message: result.output };

        } else {
            output.error(`Tests failed with exit code ${result.exitCode}`);
            return { success: false, message: result.output };
        }
    },
});

export default runTestsCommand;