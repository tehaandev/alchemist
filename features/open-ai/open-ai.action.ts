"use server";

import { OpenAIModel } from "./open-ai.type";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEmbeddingAction(text: string) {
  try {
    const response = await openai.chat.completions.create({
      model: OpenAIModel.EMBEDDING,
      messages: [{ role: "user", content: text }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error("Failed to generate embedding");
  }
}

export async function expandQueryAction(
  query: string,
  model: OpenAIModel = OpenAIModel.GPT_4O_MINI,
) {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `Expand the following query into a more detailed and specific one`,
        },
        { role: "user", content: query },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error expanding query:", error);
    throw new Error("Failed to expand query");
  }
}

export async function generateAnswerAction(
  query: string,
  model: OpenAIModel = OpenAIModel.GPT_4O_MINI,
) {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `Generate a detailed answer to the following query`,
        },
        { role: "user", content: query },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating answer:", error);
    throw new Error("Failed to generate answer");
  }
}
