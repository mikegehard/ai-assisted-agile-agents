import {BaseChatModel} from "@langchain/core/language_models/chat_models";
import {ChatOllama} from "@langchain/ollama";

export function getModel(model: string): BaseChatModel {
    // To use a different model, you can create a new instance and pass it to runAgent
    // For example:
    // const anthropicModel = new ChatAnthropic({ temperature: 0 });
    return new ChatOllama({
        model: model,
    });
}