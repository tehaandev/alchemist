"use server";

import { getUserFromCookieAction } from "../auth/auth.action";
import { generateEmbeddingAction } from "../open-ai/open-ai.action";
import { getDocumentText } from "../s3/s3.action";
import pineconeIndex from "@/lib/pinecone";
import { prisma } from "@/lib/prisma";
import { DocumentStatus } from "@prisma/client";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { nanoid } from "nanoid";

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
}: {
  key: string;
  docId: string;
}) {
  const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;
  try {
    const tokenUser = await getUserFromCookieAction();
    if (!tokenUser) {
      throw new Error("Unauthorized");
    }
    if (!PINECONE_INDEX_NAME) {
      throw new Error("Pinecone index name is not defined");
    }
    const text = await getDocumentText(key);
    if (!text) {
      throw new Error("No text found in document");
    }

    const chunks = await chunkText(text);
    // Generate embeddings for each chunk
    const embeddings = await Promise.all(
      chunks.map(async (chunk) => {
        const embedding = await generateEmbeddingAction(chunk.pageContent);
        const chunkId = nanoid();
        return {
          id: `${docId}-${chunkId}`,
          values: embedding,
          metadata: {
            documentId: docId,
            text: chunk.pageContent,
            fileKey: key,
          },
        };
      }),
    );
    const pineconeNamespace = pineconeIndex.namespace(tokenUser.email);
    await pineconeNamespace.upsert(embeddings);
    await prisma.document.update({
      where: { id: parseInt(docId) },
      data: {
        status: DocumentStatus.EMBEDDED,
      },
    });
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw new Error("Failed to generate embeddings");
  }
}

export async function deleteEmbeddingsForFile({ docId }: { docId: string }) {
  const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;
  try {
    const tokenUser = await getUserFromCookieAction();
    if (!tokenUser) {
      throw new Error("Unauthorized");
    }
    if (!PINECONE_INDEX_NAME) {
      throw new Error("Pinecone index name is not defined");
    }
    const pineconeNamespace = pineconeIndex.namespace(tokenUser.email);
    const pageOneList = await pineconeNamespace.listPaginated({
      prefix: docId,
    });
    const pageOneVectorIds = pageOneList.vectors?.map((vector) => vector.id);
    if (pageOneVectorIds && pageOneVectorIds.length > 0) {
      await pineconeNamespace.deleteMany([...pageOneVectorIds]);
    }
    await prisma.document.update({
      where: { id: parseInt(docId) },
      data: {
        status: DocumentStatus.UPLOADED,
      },
    });
  } catch (error) {
    console.error("Error deleting embeddings:", error);
    throw new Error("Failed to delete embeddings");
  }
}
