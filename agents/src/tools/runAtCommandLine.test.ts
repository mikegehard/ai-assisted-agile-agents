import { expect, test, describe } from "bun:test";
import { runAtCommandLine } from "./runAtCommandLine";

describe("runAtCommandLine", () => {
  test("should execute a command and return its output", async () => {
    const result = await runAtCommandLine(".", "echo", ["Hello, World!"]);
    expect(result.exitCode).toBe(0);
    expect(result.output).toBe("Hello, World!\n");
  });

  test("should throw an error for invalid command", async () => {
    const result = await runAtCommandLine(".", "invalid_command");
    expect(result.exitCode).toBe(127);
    expect(result.output).toContain("not found");
  });
});
