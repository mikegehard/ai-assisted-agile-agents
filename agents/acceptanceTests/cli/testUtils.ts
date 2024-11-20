import {spawn, ChildProcess} from 'child_process';
import {execSync} from "node:child_process";
import * as fs from "node:fs";
import {join} from "path";
import * as os from "node:os";
// @ts-ignore
// I think this is here because the ESM version of fs-extra doesn't have a default export?
import * as fsExtra from "fs-extra/esm";
import {defaultModelIdentifier, ModelIdentifier} from "../../src/agents/models";

export interface CLITestSetup {
    sendCommand: (command: string) => void;
    waitForOutput: (timeout: number) => Promise<string>;
    // TODO: Should this be a Dir?
    testWorkingDirectory: string;
}

export function setupCLITest(
    modelId: ModelIdentifier = defaultModelIdentifier,
    gitRepoDirectory: string = process.cwd()
): CLITestSetup {
    process.env.MODEL_NAME = modelId;

    const randomFilename = () => Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('hex');

    const testWorkingDirectory = fs.mkdtempSync(join(os.tmpdir(), `cli-test-${randomFilename()}`));
    fsExtra.copySync(gitRepoDirectory, testWorkingDirectory);

    const builtFile = join(os.tmpdir(), `ai-assisted-agile-cli-${randomFilename()}.js`);

    execSync(`bun build ./src/cli/cli.ts --target node --outfile ${builtFile}`, {
        cwd: process.cwd(),
        encoding: 'utf8',
        stdio: 'ignore',
        env: process.env
    });

    const cli = spawn("node", [builtFile], {
            cwd: testWorkingDirectory,
            env: process.env
        }
    );

    let output = '';

    cli.stdout.on('data', (data) => {
        output += data.toString();
    });

    cli.stderr.on('data', (data) => {
        output += data.toString();
    });

    const sendCommand = (command: string) => {
        cli.stdin.write(`${command}\n`);
    };

    const waitForOutput = async (timeout: number): Promise<string> => {
        const startOutput = output;
        await new Promise(resolve => setTimeout(resolve, timeout));
        return output.slice(startOutput.length);
    };

    return {sendCommand, waitForOutput, testWorkingDirectory};
}
