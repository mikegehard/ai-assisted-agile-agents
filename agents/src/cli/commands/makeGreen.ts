import {Output} from "../chatInterface";
import {CodingAgent} from "../../agents/codingAgent";
import {Command, Result} from "./types";
import {CommandLineRunner} from "../../tools/runAtCommandLine";
import * as fs from "node:fs";
import {Dir} from "node:fs";
import {readDirectoryContents} from "../../tools/readDirectoryContents";

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

            // TODO: This is a bit of a mess with the two different types of results
            // need to clean this up so it is easier to understand.
            let commandResult: Result;
            if (cliCommandResult.exitCode == 0) {
                commandResult = {success: true, message: cliCommandResult.output};
            } else {
                commandResult = {success: false, message: cliCommandResult.output};
            }

            if (commandResult.success) {
                return commandResult;
            }

            output.log("Command failed.");

            let tries = 0;
            const sourceDirectory: Dir = fs.opendirSync(cwd);
            const agent = new CodingAgent(output);

            while (cliCommandResult.exitCode != 0 && tries < 3) {
                const currentCodebase = await readDirectoryContents(sourceDirectory);
                commandResult = await agent.implementCode(commandResult.message, currentCodebase);
                if (commandResult.success) {
                    cliCommandResult = await runAtCommandLine(cwd, command, args);
                }
                tries++;
            }

            return commandResult;
        },
    });
};

export default makeGreenCommand;