import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { Tool } from '@langchain/core/tools';
import {getModel, ModelIdentifier} from "./models";


export function createWeatherAgent(weatherApiKey: string, id: ModelIdentifier): WeatherAgent {
  const model = getModel(id);
  const agentTools = [
    new TavilySearchResults({
      maxResults: 3,
      apiKey: weatherApiKey
    })
  ];
  return new WeatherAgent(model, agentTools);
}

export class WeatherAgent {
  private readonly model: BaseChatModel;
  private readonly tools: Tool[];

  constructor(model: BaseChatModel, tools: Tool[]) {
    this.model = model;
    this.tools = tools;
  }

  async getWeatherFor(location: string): Promise<string> {
    try {
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
    } catch (error) {
      console.error('Error getting weather:', error);
      return `Sorry, I'm unable to get weather information right now. Please make sure Ollama is running and try again.`;
    }
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
