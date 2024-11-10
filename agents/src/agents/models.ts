import {BaseChatModel} from "@langchain/core/language_models/chat_models";
import {ChatOllama} from "@langchain/ollama";
import {ChatMistralAI} from "@langchain/mistralai";

export type ModelIdentifier =
    | "codellama"
    | "codestral-latest"
    | "nemotron"
    | "llama3.2";

export const defaultModelIdentifier: ModelIdentifier = "llama3.2"

export type ModelConfiguration = {
    name: ModelIdentifier;
    apiKey?: string;
}

export function getModel(modelConfig: ModelConfiguration): BaseChatModel {
    switch (modelConfig.name) {
        case "codellama":
            return new ChatOllama({
                model: modelConfig.name,
                temperature: 0.1,
            })
        case "codestral-latest":
            console.log(`API key: ${modelConfig.apiKey}`)
            return new ChatMistralAI({
                model: modelConfig.name,
                apiKey: modelConfig.apiKey,
                temperature: 0.1,
            })
        default:
            throw new Error("Invalid model identifier. Currently only 'codellama' and 'codestral-latest' are supported.");
    }
}
