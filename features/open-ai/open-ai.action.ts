"use server";

import { OpenAIModel } from "./open-ai.type";
import openai from "@/lib/openai";

export async function generateEmbeddingAction(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: OpenAIModel.EMBEDDING,
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error("Failed to generate embedding");
  }
}

export async function expandQueryAction(
  query: string,
  model: OpenAIModel = OpenAIModel.GPT_41_nano,
) {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `
            You are a research assistant specializing in machine learning. Given the following user query, generate 3 to 5 expanded and more specific search queries that could help retrieve relevant academic papers or datasets. 
            Each expansion should:
            - include alternative terminology
            - cover broader and narrower scopes
            - mention closely related concepts
            Keep them concise and academic in tone.
          `,
        },
        {
          role: "user",
          content: `${query}`,
        },
      ],
      temperature: 0.7,
      top_p: 1,
      max_tokens: 512,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error expanding query:", error);
    throw new Error("Failed to expand query");
  }
}

export async function generateAnswerAction(
  query: string,
  chatHistory: {
    role: "user" | "assistant";
    content: string;
  }[],
  retrieved_chunks?: string,
  model: OpenAIModel = OpenAIModel.GPT_41_nano,
) {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `
          You are an expert research assistant in machine learning. Using the following retrieved context and user question, generate a clear, concise, and well-structured answer that directly addresses the question. Include relevant technical details, cite key concepts or studies if possible. If the answer includes limitations, challenges, or future directions, summarize them briefly at the end. If the information is inconclusive, state that confidently.

          Instructions:
          - Focus on clarity and relevance to users query.
          - Avoid speculation not supported by the context.
          - Do not include the original user query or raw context in the final answer.
          - Structure in 1-3 short paragraphs unless otherwise necessary.

          ${retrieved_chunks ? "Context: " : ""}
          ${retrieved_chunks ? retrieved_chunks : ""}
          `,
        },
        ...chatHistory.map((msg) => ({ role: msg.role, content: msg.content })),
        {
          role: "user",
          content: `${query}`,
        },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating answer:", error);
    throw new Error("Failed to generate answer");
  }
}
