import {Output} from "../cli/chatInterface";
import {BaseChatModel} from "@langchain/core/language_models/chat_models";
import {MemorySaver} from "@langchain/langgraph";
import {createReactAgent} from "@langchain/langgraph/prebuilt";
import {Result} from "../cli/commands/types";
import {z} from "zod";

type CodebaseContext = string


export interface CodeChange {
    filename: string;
    contents: string;
}

export class CodingAgent {
    private readonly threadId: string;

    constructor(
        private readonly output: Output,
        private readonly model: BaseChatModel
    ) {
        // TODO: Does this need to be different for each instance?
        this.threadId = "42";
    }

    async implementCode(commandOutput: string, codebaseContext: CodebaseContext): Promise<Result<CodeChange[]>> {
        this.output.log(`Implementing code based on command output: ${commandOutput}...`);

        try {
            const agent = this.initializeAgent(this.model);

            const systemMessage = this.systemMessage(commandOutput, codebaseContext);

            const agentFinalState = await agent.invoke(
                {messages: [systemMessage]},
                {configurable: {thread_id: this.threadId}},
            );

            const llmResponse = agentFinalState.messages[agentFinalState.messages.length - 1].content;

            // Parse the JSON from the generated code
            const jsonMatch = llmResponse.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                const jsonContent = JSON.parse(jsonMatch[0]);
                return {
                    success: true,
                    result: jsonContent.map((item: any) => ({
                        filename: item.file,
                        contents: item.diff
                    }))
                };
            } else {
                return {
                    success: false,
                    error: new Error("No valid JSON found model response.")
                };

            }
        } catch (error) {
            return {
                success: false,
                error: new Error(`Sorry, I'm unable generate code right now. Error: ${error}`)
            };
        }
    }

    private initializeAgent(model: BaseChatModel) {
        const agentCheckpointer = new MemorySaver();

        const schema = z.array(z.object({
            file: z.string(),
            diff: z.string(),
        }));

        model.withStructuredOutput(schema)

        return createReactAgent({
            llm: model,
            tools: [],
            checkpointSaver: agentCheckpointer,
        });
    }


    private systemMessage(testOutput: string, codebaseContext: CodebaseContext): string {
        return `
You are a TypeScript code fix generator.
You must ONLY respond with a JSON array containing file contents.

Required Response Format:
[{
  "file": "string", // path to the file
  "contents": "string"  // complete new file contents
}]

Rules:
1. ONLY output valid JSON
2. Do not include explanations or commentary
3. Do not change function signatures
4. Provide exactly one solution
5. The diff must be the complete new file contents
6. Preserve all whitespace and formatting

Example Input:
<codebaseContext>
${codebaseContext}
</codebase>


<currentOutput>
${testOutput}
</currentOutput>

Example Output:
[{
  "file": "src/example.ts",
  "diff": "function sum(a: number, b: number): number {\\n    return a + b;\\n}\\nsum(1, 2);"
}]

Remember: Respond ONLY with the JSON array containing the fixes. Any other text will break the parser.

`;
    }
}
