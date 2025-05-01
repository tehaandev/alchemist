"use server";

import { getUserFromCookieAction } from "../auth/auth.action";
import { getTitleFromQueryAction } from "../gemini/gemini.action";
import {
  expandQueryAction,
  generateAnswerAction,
  generateEmbeddingAction,
} from "../open-ai/open-ai.action";
import { OpenAIModel } from "../open-ai/open-ai.type";
import { GetAnswerParams } from "./chat.type";
import pineconeIndex from "@/lib/pinecone";
import { prisma } from "@/lib/prisma";
import { MessageRole } from "@prisma/client";

export async function getAnswerFromQuery({
  sessionId,
  query,
  modelId = OpenAIModel.GPT_41_nano,
  useEmbeddings,
}: GetAnswerParams) {
  // Authenticate user
  const tokenUser = await getUserFromCookieAction();
  if (!tokenUser) throw new Error("Unauthorized");

  // Ensure session exists or create new
  let session = sessionId
    ? await prisma.chatSession.findUnique({ where: { id: sessionId } })
    : null;
  if (!session) {
    const title = await getTitleFromQueryAction(query);
    session = await prisma.chatSession.create({
      data: { title, createdBy: tokenUser.id },
    });
  }

  // Persist user message
  await prisma.message.create({
    data: {
      sessionId: session.id,
      role: MessageRole.USER,
      content: query,
    },
  });

  let contexts = undefined;
  if (useEmbeddings) {
    // Expand query for better retrieval
    const expandedQuery = await expandQueryAction(query);

    if (!expandedQuery) throw new Error("Failed to expand query");

    // Generate embedding
    const expandedQueryVector = await generateEmbeddingAction(expandedQuery);

    // Search in Pinecone
    const pineconeNamespace = pineconeIndex.namespace(tokenUser.email);
    const searchResults = await pineconeNamespace.query({
      vector: expandedQueryVector,
      topK: 5,
      includeMetadata: true,
    });
    if (!searchResults?.matches.length) {
      throw new Error("No relevant documents found");
    }

    // Combine retrieved texts
    contexts = searchResults.matches
      .map((m) => m.metadata?.text)
      .join("\n---\n");
  }

  const previousMessages = await prisma.message.findMany({
    where: { sessionId: session.id },
    orderBy: { createdAt: "asc" },
    // take: ,
  });

  const chatHistory = previousMessages.map((msg) => ({
    role: (msg.role === MessageRole.LLM ? "assistant" : "user") as
      | "user"
      | "assistant",
    content: msg.content,
  }));

  // Generate answer with RAG context
  const answer = await generateAnswerAction(
    query,
    chatHistory,
    contexts,
    modelId as OpenAIModel,
  );
  if (!answer) throw new Error("Failed to generate answer");

  // Persist assistant reply
  await prisma.message.create({
    data: {
      sessionId: session.id,
      role: MessageRole.LLM,
      content: answer,
    },
  });

  return { sessionId: session.id, answer };
}

export async function getChatHistoryAction(sessionId?: string) {
  // Authenticate user
  const tokenUser = await getUserFromCookieAction();
  if (!tokenUser) throw new Error("Unauthorized");

  // Fetch chat history from Prisma
  const messages = await prisma.message.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" },
  });

  return messages.map((m) => ({
    id: m.id,
    role: m.role,
    message: m.content,
  }));
}

export async function createChatSessionAction() {
  // Authenticate user
  const tokenUser = await getUserFromCookieAction();
  if (!tokenUser) throw new Error("Unauthorized");

  // Create a new chat session
  const session = await prisma.chatSession.create({
    data: { title: null, createdBy: tokenUser.id },
  });

  return session.id;
}

export async function getChatSessionsAction() {
  // Authenticate user
  const tokenUser = await getUserFromCookieAction();
  if (!tokenUser) throw new Error("Unauthorized");

  // Fetch chat sessions from Prisma
  const sessions = await prisma.chatSession.findMany({
    where: { createdBy: tokenUser.id },
    orderBy: { updatedAt: "desc" },
  });

  return sessions.map((s) => ({
    id: s.id,
    title: s.title,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  }));
}

export async function deleteChatSessionAction(sessionId: string) {
  // Authenticate user
  const tokenUser = await getUserFromCookieAction();
  if (!tokenUser) throw new Error("Unauthorized");

  // Delete chat session from Prisma
  await prisma.chatSession.delete({
    where: { id: sessionId },
  });
}
