import {spawn, ChildProcess} from 'child_process';
import {execSync} from "node:child_process";
import * as fs from "node:fs";
import {join} from "path";
import * as os from "node:os";

export interface CLITestSetup {
    sendCommand: (command: string) => void;
    waitForOutput: (timeout: number) => Promise<string>;
}

export function setupCLITest(gitRepoDirectory: string = process.cwd()): CLITestSetup {
    const randomFilename = () => Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('hex');
    const distDirectory = fs.mkdtempSync(join(os.tmpdir(), 'cli-test'));
    const builtFile = join(distDirectory, `/${randomFilename()}.js`);

    execSync(`bun build ./src/cli/cli.ts --target node --outfile ${builtFile}`, {
        cwd: process.cwd(),
        encoding: 'utf8',
        stdio: 'ignore',
        env: process.env       // Pass through environment variables
    });

    const cli = spawn("node", [builtFile], {
            cwd: gitRepoDirectory
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

    return {sendCommand, waitForOutput};
}
