import {BaseChatModel} from "@langchain/core/language_models/chat_models";
import {ChatOllama} from "@langchain/ollama";
import {ChatAnthropic} from "@langchain/anthropic";

export type ModelIdentifier =
    | "codellama-local"
    | "anthropic-sonnet"
    | "anthropic-haiku"
    | "llama3.2"

export const defaultModelIdentifier: ModelIdentifier = "codellama-local"

export function getModel(modelId: ModelIdentifier): BaseChatModel {
    switch (modelId) {
        case "codellama-local":
            return new ChatOllama({
                model: "codellama",
                temperature: 0.1,
            })
        case "anthropic-sonnet":
            if (!process.env.ANTHROPIC_API_KEY) {
                throw new Error("Missing API key for Anthropic model.");
            }
            return new ChatAnthropic({
                apiKey: process.env.ANTHROPIC_API_KEY,
            });
        case "anthropic-haiku":
            if (!process.env.ANTHROPIC_API_KEY) {
                throw new Error("Missing API key for Anthropic model.");
            }
            return new ChatAnthropic({
                apiKey: process.env.ANTHROPIC_API_KEY,
            });
        default:
            throw new Error("Invalid model identifier.");
    }
}
