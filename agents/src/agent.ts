import { config } from 'dotenv';
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";

// Load environment variables from .env file
config();

// Define the tools for the agent to use
const agentTools = [new TavilySearchResults({ maxResults: 3, apiKey: process.env.TAVILY_API_KEY })];

// Function to initialize the agent with a specified model
function initializeAgent(model: BaseChatModel) {
  const agentCheckpointer = new MemorySaver();
  return createReactAgent({
    llm: model,
    tools: agentTools,
    checkpointSaver: agentCheckpointer,
  });
}

// Wrap the top-level await calls in an async function
async function runAgent(model: BaseChatModel) {
  const agent = initializeAgent(model);

  const agentFinalState = await agent.invoke(
    { messages: [new HumanMessage("what is the current weather in sf")] },
    { configurable: { thread_id: "42" } },
  );

  console.log(
    agentFinalState.messages[agentFinalState.messages.length - 1].content,
  );

  const agentNextState = await agent.invoke(
    { messages: [new HumanMessage("what about ny")] },
    { configurable: { thread_id: "42" } },
  );

  console.log(
    agentNextState.messages[agentNextState.messages.length - 1].content,
  );
}

// Example usage
const openAIModel = new ChatOpenAI({ temperature: 0 });
runAgent(openAIModel);

// To use a different model, you can create a new instance and pass it to runAgent
// For example:
// const anthropicModel = new ChatAnthropic({ temperature: 0 });
// runAgent(anthropicModel);
