import {describe, expect, test} from "bun:test";
import {join} from "path";
import {readDirectoryContents} from "./readDirectoryContents";
import {Dir} from "node:fs";
import {opendir} from "node:fs/promises";

describe("readDirectoryContents", () => {
    test("recursively reads a directory", async () => {
        const dir: Dir = await opendir(join(process.cwd(), "acceptanceTests/applicationFixtures/simpleDirectory"));
        const result = await readDirectoryContents(dir);

        const expected = new Map([
            ["src/bar.ts", "const foo = \"bar\";\n"],
            ["foo.txt", "Contents of foo.txt"],
        ]);
        expect(result).toEqual(expected);
    });
});
