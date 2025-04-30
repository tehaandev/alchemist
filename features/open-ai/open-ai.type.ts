export enum OpenAIModel {
  GPT_4O_MINI = "gpt-4o-mini-2024-07-18",
  GPT_O4_MINI = "o4-mini-2025-04-16",
  GPT_41_nano = "gpt-4.1-nano-2025-04-14",
  EMBEDDING = "text-embedding-3-small",
}

export type AIModel = {
  id: string;
  name: string;
  provider: string;
  description?: string;
  maxTokens?: number;
  isAvailable?: boolean;
};
