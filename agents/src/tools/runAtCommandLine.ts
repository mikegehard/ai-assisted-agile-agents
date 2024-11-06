import {spawn} from "child_process";

class FinishedCommandResult {
    constructor(public exitCode: number, public output: string) {
    }
}

export type CommandLineRunner = (
    workingDirectory: string,
    command: string,
    args: string[]) => Promise<FinishedCommandResult>;

export const runAtCommandLine = async (
    workingDirectory: string,
    command: string,
    args: string[] = []
): Promise<FinishedCommandResult> => {
    try {
        const proc = spawn(command, args, {
            cwd: workingDirectory,
            stdio: ['ignore', 'pipe', 'pipe']
        });

        let output = '';
        proc.stdout?.on('data', (data) => {
            output += data.toString();
        });
        proc.stderr?.on('data', (data) => {
            output += data.toString();
        });

        return new Promise<FinishedCommandResult>((resolve) => {
            proc.on('close', (exitCode) => {
                resolve(new FinishedCommandResult(exitCode !== null ? exitCode : -1, output));
            });

            proc.on('error', (error) => {
                resolve(new FinishedCommandResult(127, `Error: ${error.message}`));
            });
        });

    } catch (error: unknown) {
        return new FinishedCommandResult(127, `Error: ${(error as Error).message}`);
    }
}

// async function streamToString(readableStream: ReadableStream): Promise<string> {
//     const reader = readableStream.getReader();
//     const decoder = new TextDecoder("utf-8");
//     let result = '';
//     let done = false;
//
//     while (!done) {
//         const {value, done: doneReading} = await reader.read();
//         done = doneReading;
//         if (value) {
//             result += decoder.decode(value, {stream: true});
//         }
//     }
//
//     result += decoder.decode(); // Final decode to flush any remaining data
//     return result;
// }
