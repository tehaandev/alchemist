"use server";

import {
  expandQueryAction,
  generateAnswerAction,
  generateEmbeddingAction,
} from "../open-ai/open-ai.action";
import pineconeIndex from "@/lib/pinecone";

export async function getAnswerFromQuery({ query }: { query: string }) {
  try {
    // expand query
    const expandedQuery = await expandQueryAction(query);
    if (!expandedQuery) {
      throw new Error("Failed to expand query");
    }
    const expandedQueryVector = await generateEmbeddingAction(expandedQuery);
    // pinecone search
    const searchResults = await pineconeIndex.query({
      vector: expandedQueryVector,
      topK: 5,
      includeMetadata: true,
    });

    if (!searchResults || searchResults.matches.length === 0) {
      throw new Error("No relevant documents found");
    }

    // Extract the text from the search results
    const texts = searchResults.matches
      .map((match) => match.metadata?.text)
      .join("\n");

    const answer = await generateAnswerAction(query, texts);
    if (!answer) {
      throw new Error("Failed to generate answer");
    }
    return answer;
  } catch (error) {
    console.error("Error getting answer from query:", error);
    throw new Error("Failed to get answer from query");
  }
}
