import {Output} from "../chatInterface";

import {Command, Result} from "./types";
import {CommandLineRunner} from "../../tools/runAtCommandLine";
import runTestsCommand from "./runTests";


class CodingAgent {
    constructor(private readonly output: Output) {}

    async implementCode(testOutput: string): Promise<Result> {
        this.output.log("Implementing code based on test results...");
        this.output.log(testOutput);
        return {success: true, message: "Success!"};
    }
}

const makeGreenCommand = (output: Output, runAtCommandLine: CommandLineRunner): Command => ({
    name: '/makeGreen',
    description: 'Make all tests pass',
    execute: async (testCommandParts: readonly string[]): Promise<Result> => {
        const runTests = runTestsCommand(output, runAtCommandLine);
        const testResult = await runTests.execute(testCommandParts);
        if (testResult.success) {
            return testResult;
        }

        output.log("Tests failed.");
        const agent = new CodingAgent(output);
        return await agent.implementCode(testResult.message);
    },
});

export default makeGreenCommand;