"use server";

import { generateEmbeddingAction } from "../open-ai/open-ai.action";
import { DocumentEmbedding } from "./embeddings.type";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// Constants for chunking
const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 200;

/**
 * Prepares and embeds text content using OpenAI and returns chunk-embedding pairs.
 * @param rawText Full string content of a file (e.g. PDF or DOCX converted to text)
 * @param sourceFileName The original filename (for metadata tracking)
 */
export async function generateEmbeddingsFromText(
  rawText: string,
  sourceFileName: string,
): Promise<DocumentEmbedding[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });

  const chunks = await splitter.createDocuments([rawText]);
  const documents: DocumentEmbedding[] = [];

  for (const chunk of chunks) {
    const embedding = await generateEmbeddingAction(chunk.pageContent);
    documents.push({
      content: chunk.pageContent,
      embedding,
      source: sourceFileName,
    });
  }

  return documents;
}
