import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOllama } from "@langchain/ollama";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { Tool } from '@langchain/core/tools';

export class WeatherAgent {
  private model: BaseChatModel;
  private tools: Tool[];

  constructor(model: BaseChatModel, tools: Tool[]) {
    this.model = model;
    this.tools = tools;
  }

  async getWeatherFor(location: string): Promise<string> {
    const agent = this.initializeAgent(this.model);
    const promptTemplate = `What is the current weather in {location}?`;
    const formattedPrompt = promptTemplate.replace('{location}', location);
    const agentFinalState = await agent.invoke(
      { messages: [formattedPrompt] },
      { configurable: { thread_id: "42" } },
    );

    return agentFinalState.messages[agentFinalState.messages.length - 1].content;
  }

  private initializeAgent(model: BaseChatModel) {
    const agentCheckpointer = new MemorySaver();
    return createReactAgent({
      llm: model,
      tools: this.tools,
      checkpointSaver: agentCheckpointer,
    });
  }
}

export function getModel(model: string): BaseChatModel {
  // To use a different model, you can create a new instance and pass it to runAgent
  // For example:
  // const anthropicModel = new ChatAnthropic({ temperature: 0 });
  return new ChatOllama({
    model: model,
  });
}