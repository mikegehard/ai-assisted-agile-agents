import {describe, expect, test} from "bun:test";
import {CodingAgent} from "./codingAgent";
import {FileMap, readDirectoryContents} from "../tools/readDirectoryContents";
import {Dir} from "node:fs";
import {opendir} from "node:fs/promises";
import {join} from "path";
import {Output} from "../cli/chatInterface";
import {getModel, ModelIdentifier} from "./models";
import dotenv from "dotenv";

class ArrayOutput implements Output {
    output: string[] = [];

    log(message: string): void {
        this.output.push(message);
    }

    error(message: string): void {
        this.output.push(message);
    }
}

describe("Coding Agent", () => {
    test("generate the proper response with a local model", async () => {
        dotenv.config();
        const output = new ArrayOutput();
        const modelName: ModelIdentifier = "codellama-local";

        const agent = new CodingAgent(output, getModel(modelName));

        const testOutput = "src/add.ts(5,8): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.";
        const dir: Dir = await opendir(join(process.cwd(), "acceptanceTests/applicationFixtures/typecheckError"));
        const currentCodebase = await readDirectoryContents(dir)
        const result = await agent.implementCode(testOutput, currentCodebase);

        const expected: FileMap = new Map([
            ["src/add.ts", "function add(a: number, b: number): number {\n    return a + b;\n}\n\nadd(1, 2);"]
        ]);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.result).toEqual(expected);
        }
    }, {timeout: 15000})
});