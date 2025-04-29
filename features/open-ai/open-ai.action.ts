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
  model: OpenAIModel = OpenAIModel.GPT_4O_MINI,
) {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `
            You are a research assistant specializing in precision agriculture, edge computing, and machine learning. Given the following user query, generate 3 to 5 expanded and more specific search queries that could help retrieve relevant academic papers or datasets. The expansions should include alternative terminology, broader and narrower scopes, and closely related concepts. Prioritize relevance to edge-based ML systems for smallholder farming. Keep each expanded query concise and academic in tone.

            User Query: "${query}"
          `,
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
  retrieved_chunks: string,
  model: OpenAIModel = OpenAIModel.GPT_4O_MINI,
) {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `
          You are an expert research assistant in AI for agriculture. Using the following retrieved context and user question, generate a clear, concise, and well-structured answer that directly addresses the question. Include relevant technical details, cite key concepts or studies if possible, and connect findings to edge-based machine learning in smallholder farming where appropriate. If the answer includes limitations, challenges, or future directions, summarize them briefly at the end. If the information is inconclusive, state that confidently.

          User Question:
          ${query}

          Context:
          ${retrieved_chunks}

          Instructions:
          - Focus on clarity and relevance to agricultural ML and edge computing.
          - Avoid speculation not supported by the context.
          - Do not include the original user query or raw context in the final answer.
          - Structure in 1-3 short paragraphs unless otherwise necessary.
          `,
        },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating answer:", error);
    throw new Error("Failed to generate answer");
  }
}
