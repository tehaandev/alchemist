"use server";

import { generateEmbeddingAction } from "../open-ai/open-ai.action";
import { getDocumentText } from "../s3/s3.action";
import pineconeIndex from "@/lib/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import React from "react";

// Constants for chunking
const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 200;

function chunkText(text: string) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });
  return splitter.createDocuments([text]);
}

export async function generateEmbeddingsForFile({
  key,
  docId,
  setProgress,
}: {
  key: string;
  docId: string;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}) {
  const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;
  setProgress(0);
  try {
    if (!PINECONE_INDEX_NAME) {
      throw new Error("Pinecone index name is not defined");
    }
    const text = await getDocumentText(key);
    if (!text) {
      throw new Error("No text found in document");
    }
    setProgress(25);
    const chunks = await chunkText(text);
    setProgress(50);
    // Generate embeddings for each chunk
    const embeddings = await Promise.all(
      chunks.map(async (chunk) => {
        const embedding = await generateEmbeddingAction(chunk.pageContent);
        return {
          id: `${docId}-${chunk.id}`,
          values: embedding,
          metadata: {
            text: chunk.pageContent,
            fileKey: key,
          },
        };
      }),
    );
    setProgress(75);
    // Store embeddings in Pinecone
    await pineconeIndex.upsert(embeddings);
    setProgress(100);
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw new Error("Failed to generate embeddings");
  }
}
