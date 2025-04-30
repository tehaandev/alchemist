import { AIModel, OpenAIModel } from "@/features/open-ai/open-ai.type";

export const AUTH_COOKIE_NAME = "auth_token";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 90, // 90 days
};

export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export const AI_MODELS: AIModel[] = [
  {
    id: OpenAIModel.GPT_41_nano,
    name: "GPT-4.1 nano",
    provider: "OpenAI",
    description: "Fastest, most cost-effective GPT-4.1 model",
    maxTokens: 4096,
    isAvailable: true,
  },
  {
    id: OpenAIModel.GPT_4O_MINI,
    name: "GPT-4o Mini",
    provider: "OpenAI",
    description: "Fast, affordable small model for focused tasks",
    maxTokens: 4096,
    isAvailable: true,
  },
  {
    id: OpenAIModel.GPT_O4_MINI,
    name: "GPT-o4 Mini",
    provider: "OpenAI",
    description: "Faster, more affordable reasoning model",
    maxTokens: 4096,
    isAvailable: true,
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    description: "Fast and cost-effective model",
    maxTokens: 4096,
    isAvailable: false,
  },
];
