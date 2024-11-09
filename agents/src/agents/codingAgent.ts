import {Output} from "../cli/chatInterface";
// TODO:Not sure I like having agents know about commands but let's see where this ends up.
import {Result} from "../cli/commands/types";
import {BaseChatModel} from "@langchain/core/language_models/chat_models";
import {MemorySaver} from "@langchain/langgraph";
import {createReactAgent} from "@langchain/langgraph/prebuilt";
import {FileMap, writeDirectoryContents} from "../tools/readDirectoryContents";


export class CodingAgent {
    private readonly threadId: string;

    // TODO:
    // 1. Allow agent to use non-local model
    constructor(
        private readonly output: Output,
        private readonly model: BaseChatModel
    ) {
        // TODO: Does this need to be different for each instance?
        this.threadId = "42";
    }

    // TODO: Should this be a map of filename to diff
    // so it's easy for a human to review?
    async implementCode(commandOutput: string, currentCodebase: FileMap): Promise<Result> {
        this.output.log(`Implementing code based on command output: ${commandOutput}...`);

        try {
            const agent = this.initializeAgent(this.model);

            const systemMessage = this.systemMessage(commandOutput, currentCodebase);

            console.log(`System message: ${systemMessage}`);

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


    private systemMessage(testOutput: string, currentCodebase: FileMap): string {
        return `
You are a experienced software developer in a codebase with a test suite.
You are given the output of a test run and you must write code to make the tests pass.

The current codebase is:
${writeDirectoryContents(currentCodebase)}

The current test output is:
${testOutput}

Return format is JSON format with the filename as the key and the diff as the value.

Example:
{"src/foo.ts": "function foo(a: number, b: number): number {\\n    return a + b;\\n}"}
`;
    }
}


