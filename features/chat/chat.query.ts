import { OpenAIModel } from "../open-ai/open-ai.type";
import {
  createChatSessionAction,
  getAnswerFromQuery,
  getChatHistoryAction,
  getChatSessionsAction,
} from "./chat.action";
import queryClient from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useChatHistory = (sessionId?: string) =>
  useQuery({
    queryKey: ["chatHistory", sessionId],
    queryFn: () => getChatHistoryAction(sessionId),
    enabled: !!sessionId,
  });

export const useCreateChatSession = () =>
  useMutation({
    mutationFn: createChatSessionAction,
    onSuccess: (newSessionId) => {
      queryClient.invalidateQueries({ queryKey: ["chatSessions"] });
      toast.success("New chat session created");
      return newSessionId;
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(message);
    },
  });

export const useChatAnswer = ({ sessionId }: { sessionId?: string }) => {
  return useMutation({
    mutationFn: getAnswerFromQuery,
    onSuccess: () => {
      if (sessionId) {
        queryClient.invalidateQueries({ queryKey: ["chatHistory", sessionId] });
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export const useChat = ({
  modelId = OpenAIModel.GPT_41_nano,
  initialSessionId,
}: {
  modelId?: string;
  initialSessionId?: string;
}) => {
  const [sessionId, setSessionId] = useState<string | null>(
    initialSessionId || null,
  );

  // Load history
  const {
    data: history,
    isLoading: isLoadingHistory,
    error: historyError,
  } = useChatHistory(sessionId || undefined);

  // Create session if none exists
  const createSessionMutation = useCreateChatSession();

  // Mutation for sending queries and storing replies
  const answerMutation = useChatAnswer({
    sessionId: sessionId || undefined,
  });

  // Submit handler
  const handleSubmit = useCallback(
    async (query: string) => {
      if (!query) return;

      // Ensure session
      let sid = sessionId;
      if (!sid) {
        try {
          sid = await createSessionMutation.mutateAsync();
          setSessionId(sid);
        } catch {
          return;
        }
      }

      // Send the query
      await answerMutation.mutateAsync({
        sessionId: sid,
        query,
        modelId,
      });
    },
    [sessionId, createSessionMutation, answerMutation, modelId],
  );

  // Consolidated message list
  const messages =
    history?.map((m) => ({
      id: m.id,
      role: m.role.toLowerCase() as "user" | "llm",
      message: m.message,
    })) || [];

  return {
    sessionId,
    messages,
    isLoadingHistory,
    isPending: answerMutation.isPending || createSessionMutation.isPending,
    error: historyError?.message || answerMutation.error?.message || null,
    handleSubmit,
    createSession: createSessionMutation,
  };
};

export const useChatSessions = () =>
  useQuery({
    queryKey: ["chatSessions"],
    queryFn: () => getChatSessionsAction(),
  });
