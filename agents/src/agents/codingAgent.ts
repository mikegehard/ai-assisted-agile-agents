import {Output} from "../cli/chatInterface";
// TODO:Not sure I like having agents know about commands but let's see where this ends up.
import {Result} from "../cli/commands/types";
import {Dir} from "node:fs";
import {BaseChatModel} from "@langchain/core/language_models/chat_models";
import {MemorySaver} from "@langchain/langgraph";
import {createReactAgent} from "@langchain/langgraph/prebuilt";
import {ChatOllama} from "@langchain/ollama";
import {readdir, stat} from 'fs/promises';
import {join} from 'path';
import {opendir} from "node:fs/promises";


export class CodingAgent {
    private readonly threadId: string;

    // TODO:
    // 1. Allow agent to use non-local model
    constructor(
        private readonly output: Output,
        private readonly sourceDirectory: Dir,
        private readonly modelName: string = "codellama"
    ) {
        // TODO: Does this need to be different for each instance?
        this.threadId = "42";
    }

    // TODO: Should this be a map of filename to diff
    // so it's easy for a human to review?
    async implementCode(commandOutput: string): Promise<Result> {
        this.output.log(`Implementing code based on command output: ${commandOutput}...`);

        try {
            const currentCodebase = await readDirectoryContents(this.sourceDirectory);

            const agent =
                this.initializeAgent(
                    this.getModel(this.modelName)
                );

            const systemMessage = this.systemMessage(commandOutput, currentCodebase);

            const agentFinalState = await agent.invoke(
                {messages: [systemMessage]},
                {configurable: {thread_id: this.threadId}},
            );


            const generatedCode = agentFinalState.messages[agentFinalState.messages.length - 1].content;

            return {success: true, message: generatedCode};
        } catch (error) {
            return {success: false, message: `Sorry, I'm unable generate code right now. Error: ${error}`};
        }
    }

    private initializeAgent(model: BaseChatModel) {
        const agentCheckpointer = new MemorySaver();
        return createReactAgent({
            llm: model,
            tools: [],
            checkpointSaver: agentCheckpointer,
        });
    }

    private getModel(model: string): BaseChatModel {
        // To use a different model, you can create a new instance and pass it to runAgent
        // For example:
        // const anthropicModel = new ChatAnthropic({ temperature: 0 });
        return new ChatOllama({
            model: model,
        });
    }

    private systemMessage(testOutput: string, currentCodebase: string): string {
        return  `
You are a experienced software developer in a codebase with a test suite.
You are given the output of a test run and you must write code to make the tests pass.

The current codebase is:
${currentCodebase}

The current test output is:
${testOutput}
`;
    }
}


// TODO: need to unit test this
async function readDirectoryContents(dir: Dir): Promise<string> {
    let contents = '';

    const files = await readdir(dir.path);

    for (const file of files) {
        const fullPath = join(dir.path, file);
        const stats = await stat(fullPath);

        if (stats.isDirectory()) {
            contents += `Directory: ${fullPath}\n`;
            const subDir = await opendir(fullPath);
            contents += await readDirectoryContents(subDir);
            await subDir.close();
        } else {
            contents += `File: ${fullPath}\n`;
        }
    }

    return contents;
}
