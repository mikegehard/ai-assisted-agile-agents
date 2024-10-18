import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOllama } from "@langchain/ollama";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { Tool } from '@langchain/core/tools';


export function createWeatherAgent(weatherApiKey: string, modelName: string): WeatherAgent {
  const model = getModel(modelName);
  const agentTools = [
    new TavilySearchResults({
      maxResults: 3,
      apiKey: weatherApiKey
    })
  ];
  return new WeatherAgent(model, agentTools);
}

export class WeatherAgent {
  private model: BaseChatModel;
  private tools: Tool[];

  constructor(model: BaseChatModel, tools: Tool[]) {
    this.model = model;
    this.tools = tools;
  }

  async getWeatherFor(location: string): Promise<string> {
    const agent = this.initializeAgent(this.model);

    const systemMessage = `
You are a helpful assistant that can only answer questions about the weather.
Provide accurate and concise information about current weather conditions
in the specified location.
Use the available tools to gather up-to-date information when needed.
`;
    const userMessageTemplate = `I am in ${location}. Can you help me?`;

    const formattedUserPrompt = userMessageTemplate.replace('{location}', location);

    const agentFinalState = await agent.invoke(
      { messages: [systemMessage, formattedUserPrompt] },
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

function getModel(model: string): BaseChatModel {
  // To use a different model, you can create a new instance and pass it to runAgent
  // For example:
  // const anthropicModel = new ChatAnthropic({ temperature: 0 });
  return new ChatOllama({
    model: model,
  });
}
