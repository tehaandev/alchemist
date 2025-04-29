import { getAnswerFromQuery } from "./chat.action";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export const useChat = () => {
  const [messages, setMessages] = useState<
    {
      id: string;
      message: string;
      role: "user" | "llm";
    }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const getAnswerFromQueryMutation = useGetAnswerFromQuery();
  const handleSubmit = async (query: string) => {
    if (!query) {
      return;
    }
    try {
      setMessages((prev) => [
        ...(prev || []),
        {
          id: crypto.randomUUID(),
          message: query,
          role: "user",
        },
      ]);
      const answer = await getAnswerFromQueryMutation.mutateAsync({
        query,
      });
      setMessages((prev) => [
        ...(prev || []),
        {
          id: crypto.randomUUID(),
          message: query,
          role: "user",
        },
        {
          id: crypto.randomUUID(),
          message: answer,
          role: "llm",
        },
      ]);
    } catch (error) {
      console.error("Error submitting query:", error);
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      }
    }
  };
  return {
    handleSubmit,
    messages,
    isPending: getAnswerFromQueryMutation.isPending,
    error,
  };
};

export const useGetAnswerFromQuery = () =>
  useMutation({
    mutationKey: ["chat"],
    mutationFn: getAnswerFromQuery,
  });
