import {Output} from "../chatInterface";
import {CodingAgent} from "../../agents/codingAgent";
import {Command, Result} from "./types";
import {CommandLineRunner} from "../../tools/runAtCommandLine";
import * as fs from "node:fs";
import {Dir} from "node:fs";
import {readDirectoryContents, writeDirectoryContents} from "../../tools/readDirectoryContents";
import {getModel} from "../../agents/models";

const makeGreenCommand = (output: Output, runAtCommandLine: CommandLineRunner, cwd: string = "."): Command => {
    return ({
        name: '/makeGreen',
        description: 'Make all tests pass',
        execute: async (commandLineCommand: string): Promise<Result> => {
            output.log(`Running command: ${commandLineCommand}...`);

            // TODO: What happens if you have multiple commands separated by &&?
            // TODO: What if the commands aren't of the form "command arg1 arg2"?
            const [command, ...args] = commandLineCommand.split(" ");
            let cliCommandResult = await runAtCommandLine(cwd, command, args);

            if (cliCommandResult.exitCode == 0) {
                return {success: true, result: cliCommandResult.output};
            }

            output.log("Command failed.");

            let tries = 0;
            const sourceDirectory: Dir = fs.opendirSync(cwd);
            const agent = new CodingAgent(output, getModel(
                {name: "codellama"}
            ));

            let implementResult;
            while (cliCommandResult.exitCode != 0 && tries < 3) {
                const currentCodebase = await readDirectoryContents(sourceDirectory);
                implementResult = await agent.implementCode(cliCommandResult.output, writeDirectoryContents(currentCodebase));
                if (implementResult.success) {
                    cliCommandResult = await runAtCommandLine(cwd, command, args);
                }
                tries++;
            }

            if (implementResult?.success && cliCommandResult.exitCode == 0) {
                return {success: true, result: cliCommandResult.output};
            } else {
                return {success: false, error: new Error(cliCommandResult.output)};
            }
        },
    });
};

export default makeGreenCommand;