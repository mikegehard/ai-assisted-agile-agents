import {Output} from "../cli/chatInterface";
import {BaseChatModel} from "@langchain/core/language_models/chat_models";
import {MemorySaver} from "@langchain/langgraph";
import {createReactAgent} from "@langchain/langgraph/prebuilt";
import {errorResponse, Result} from "../cli/commands/types";
import {FileMap} from "../tools/readDirectoryContents";


export class CodingAgent {
    private readonly threadId: string;
    // Since this is internal to the agent, let's just punt on type.
    // The actual type is pretty complex. :-(
    private agent: any;

    constructor(
        private readonly output: Output,
        private readonly model: BaseChatModel
    ) {
        // TODO: Does this need to be different for each instance?
        this.threadId = "42";
        this.agent = createReactAgent({
            llm: this.model,
            tools: [],
            checkpointSaver: new MemorySaver(),
        });
    }

    async implementCode(commandOutput: string, currentCodebase: FileMap): Promise<Result<FileMap>> {
        this.output.log(`Implementing code based on command output: ${commandOutput}...`);

        try {
            return this.parseResponse(
                await this.askModel(
                    this.systemMessage(commandOutput, currentCodebase)
                )
            );

        } catch (error) {
            return errorResponse(error as Error);
        }
    }

    private async askModel(question: string): Promise<string> {
        const agentFinalState = await this.agent.invoke(
            {messages: [question]},
            {configurable: {thread_id: this.threadId}},
        );

        return agentFinalState.messages[agentFinalState.messages.length - 1].content;
    }

    private parseResponse(response: string): Result<FileMap> {
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            const jsonContent = JSON.parse(jsonMatch[0]);
            const contents = new Map<string, string>();

            for (const file of jsonContent) {
                contents.set(file.filename, file.contents);
            }

            return {
                success: true,
                result: contents
            };
        } else {
            return errorResponse(new Error("No valid JSON found model response."));
        }
    }

    private systemMessage(testOutput: string, codebaseContext: FileMap): string {
        return `
You are an expert software developer.
You are given the existing codebase and the output of a command line tool.
Your job is to write code that will fix the error in the codebase based on the output of the command line tool.
You must ONLY respond with a JSON array containing file contents for each file that has been changed.

Required Response Format:
[{
  filename: "string", // path to the file
  contents: "string"  // complete new file contents
}]


Rules:
1. ONLY output valid JSON
2. Do not include explanations or commentary
3. Do not change function signatures
4. Provide exactly one solution
5. The diff must be the complete new file contents
6. Preserve all whitespace and formatting
7. Only write enough code to fix the error

${writeDirectoryContentsForPrompt(codebaseContext)}

<currentOutput>
${testOutput}
</currentOutput>

Remember: Respond ONLY with the JSON array containing the fixes. Any other text will break the parser.
`;
    }
}

function writeDirectoryContentsForPrompt(result: FileMap): string {
    let output = "";
    output += "<codebase>";
    for (const [key, value] of result) {
        output += `
<file> ${key} </file>
<contents> ${value} </contents>
`
    }
    output += "</codebase>";
    return output;
}
