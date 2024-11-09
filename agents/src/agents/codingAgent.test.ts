import {describe, expect, test} from "bun:test";
import {CodingAgent} from "./codingAgent";
import {readDirectoryContents} from "../tools/readDirectoryContents";
import {Dir} from "node:fs";
import {opendir} from "node:fs/promises";
import {join} from "path";
import {Output} from "../cli/chatInterface";
import {getModel} from "./models";

class ArrayOutput implements Output  {
    output: string[] = [];

    log(message: string): void {
        this.output.push(message);
    }

    error(message: string): void {
        this.output.push(message);
    }
}

/** TODO: I'm struggling to see how to test this because it
 *  uses AI to generate code.
 *  This test will be slow and expensive to write.
 *  Do some poking around first with LangGraph to see
 *  if you can figure out how to test this.
  */
describe("Coding Agent", () => {
    test("does something", async () => {
        const output = new ArrayOutput();
        const agent = new CodingAgent(output, getModel("codellama"));

        const testOutput = "src/add.ts(5,8): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.";
        const dir: Dir = await opendir(join(process.cwd(), "acceptanceTests/applicationFixtures/typecheckError"));
        const currentCodebase = await readDirectoryContents(dir)
        const result = await agent.implementCode(testOutput, currentCodebase);

        // const expected = {success: true, message: "\n{\n\"src/add.ts\": \"+ function add(a: number, b: number): number {\\n+     return a + b;\\n+ }\"\n}"};
        expect(result.success).toBe(true);
    }, { timeout: 10000 })
});