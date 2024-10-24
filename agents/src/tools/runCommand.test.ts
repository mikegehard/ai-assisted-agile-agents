import { expect, test, describe } from "bun:test";
import { runCommand } from "./runCommand";

describe("runCommand", () => {
  test("should execute a command and return its output", async () => {
    const result = await runCommand(".", "echo", ["Hello, World!"]);
    expect(result.exitCode).toBe(0);
    expect(result.output).toBe("Hello, World!\n");
  });

  test("should throw an error for invalid command", async () => {
    const result = await runCommand(".", "invalid_command");
    expect(result.exitCode).toBe(127);
    expect(result.output).toContain("not found");
  });
});
