export interface GetAnswerParams {
  sessionId?: string;
  query: string;
  modelId: string;
  useEmbeddings: boolean;
}
