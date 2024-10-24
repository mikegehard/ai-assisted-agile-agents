class CommandResults {
  constructor(public exitCode: number, public output: string) {
    this.exitCode = exitCode;
    this.output = output;
  }
}

export async function runCommand(workingDirectory: string, command: string, args: string[] = []): Promise<CommandResults> {
    try {
        const proc = Bun.spawn([command, ...args], {
            cwd: workingDirectory,
            stdout: "pipe",
            stderr: "pipe",
        });

        await proc.exited;

        const exitCode = proc.exitCode;

        const output = await streamToString(proc.stdout) || await streamToString(proc.stderr);

        return {
            exitCode: exitCode !== null ? exitCode : -1,
            output: output,
        };
    } catch (error: unknown) {
        return {
            exitCode: 127,
            output: `Error: ${(error as Error).message}`,
        };
    }
}

async function streamToString(readableStream: ReadableStream): Promise<string> {
    const reader = readableStream.getReader();
    const decoder = new TextDecoder("utf-8");
    let result = '';
    let done = false;

    while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
            result += decoder.decode(value, { stream: true });
        }
    }

    result += decoder.decode(); // Final decode to flush any remaining data
    return result;
}
