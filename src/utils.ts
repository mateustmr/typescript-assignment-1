import "dotenv/config";
import { OpenAIClient } from "@anvia/openai";
import { tavily } from "@tavily/core";

export const openaiClient = new OpenAIClient({
  apiKey: process.env.OPENAI_API_KEY!,
});

const model = openaiClient.completionModel("gpt-5.5");

export function getModel() {
  return model;
}

export const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});