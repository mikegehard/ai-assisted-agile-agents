import {expect, test, describe} from "bun:test";
import runTests from "./runTests";
import {Output} from "../chatInterface";

class ArrayOutput implements Output {
    public logs: string[] = [];
    public errors: string[] = [];

    log(message: string): void {
        this.logs.push(message);
    }

    error(message: string): void {
        this.errors.push(message);
    }
}

describe("executing tests", () => {
    test("successfully", async () => {
        const output = new ArrayOutput();

        const commandRunner = async (cdw: string, command: string, args: string[]) => ({
            exitCode: 0,
            output: `cwd: ${cdw}, command: ${command}, args: ${args.join(":")}`
        });
        const objectUnderTests = runTests(output, commandRunner);

        const result = await objectUnderTests.execute(["bun", "run", "test"]);

        expect(result.success).toBe(true);
        expect(result.message).toBe("cwd: ., command: bun, args: run:test");

        expect(output.logs).toContain("Running tests...");
        expect(output.logs).toContain("Test results: All tests passed!");
    });
});
