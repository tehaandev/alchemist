"use client";

import { ModelSelector } from "@/components/ModelSelector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AI_MODELS } from "@/constants";
import { useChat, useCreateChatSession } from "@/features/chat/chat.query";
import { AIModel } from "@/features/open-ai/open-ai.type";
import { cn } from "@/lib/utils";
import { Bot, Loader2, PlusCircle, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Chat({ sessionId }: { sessionId?: string }) {
  const [input, setInput] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<AIModel>(AI_MODELS[0]);
  const [useEmbeddings, setUseEmbeddings] = useState(true);

  const {
    sessionId: activeSession,
    messages,
    isLoadingHistory,
    isPending,
    handleSubmit,
  } = useChat({
    modelId: selectedModel.id,
    initialSessionId: sessionId,
  });

  const router = useRouter();
  useEffect(() => {
    // If there is a sessionId in the URL, it means the user is in the correct URL
    if (activeSession && !sessionId && activeSession !== sessionId) {
      // If the sessionId in the URL is different from the activeSession, replace the URL
      router.replace(`/chat/${activeSession}`);
    }
  }, [activeSession, router, sessionId]);

  const onModelChange = (model: AIModel) => {
    setSelectedModel(model);
    localStorage.setItem("selectedModel", model.id);
  };

  const createChatSessionMutation = useCreateChatSession();
  // Handle creating a new chat
  const handleCreateNewChat = async () => {
    try {
      const newSessionId = await createChatSessionMutation.mutateAsync();
      router.push(`/chat/${newSessionId}`);
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  useEffect(() => {
    const storedModelId = localStorage.getItem("selectedModel");
    if (storedModelId) {
      const stored = AI_MODELS.find((m) => m.id === storedModelId);
      if (stored) setSelectedModel(stored);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setUseEmbeddings(false);
    }
  }, [messages]);

  return (
    <div className="m-4 lg:m-8 xl:m-12">
      <div className="mb-6 flex w-full justify-end">
        <ModelSelector
          onModelChange={onModelChange}
          selectedModel={selectedModel}
        />
      </div>

      <Card className="mb-4 flex h-[55vh] w-[75vw] flex-col overflow-hidden border-2">
        <div className="flex-1 overflow-auto p-4">
          <div className="flex h-full w-full flex-col space-y-4">
            {!sessionId && (
              <div className="flex flex-1 flex-col items-center justify-center space-y-2 p-8">
                <p className="text-gray-500">
                  {`Select a model and start chatting!`}
                </p>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={handleCreateNewChat}
                    disabled={createChatSessionMutation.isPending}>
                    {createChatSessionMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <PlusCircle className="h-4 w-4" />
                    )}
                    Start New Chat
                  </Button>
                </div>
              </div>
            )}
            {sessionId && isLoadingHistory ? (
              <div className="flex h-full items-center justify-center p-8">
                <Loader2 className="animate-spin" />
              </div>
            ) : sessionId && messages.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Bot size={32} />
                  <p className="text-gray-500">
                    {`Ask me anything! I'll use relevant documents to provide accurate answers.`}
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-start gap-2",
                    message.role === "user" ? "justify-end" : "justify-start",
                  )}>
                  <div
                    className={cn(
                      "prose prose-sm dark:prose-invert max-w-[75%] rounded-lg p-2 text-justify text-sm",
                      message.role === "user" ? "bg-primary/20" : "bg-muted/90",
                    )}>
                    {message.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>

      {sessionId && (
        <div className="flex w-full items-start gap-3">
          <Textarea
            placeholder="Ask a question..."
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!input.trim()) return;
                handleSubmit(input, setUseEmbeddings);
                setInput("");
              }
              if (e.key === "Enter" && e.shiftKey) {
                setInput((prev) => prev + "\n");
              }
            }}
            onChange={(e) => setInput(e.target.value)}
            className="h-ful flex-1 resize-y"
          />
          <div className="flex flex-col items-center justify-between gap-2">
            <Button
              type="button"
              size="icon"
              onClick={() => {
                if (!input.trim()) return;
                handleSubmit(input, setUseEmbeddings);
                setInput("");
              }}
              disabled={isPending || !input.trim()}>
              {!isPending ? (
                <Send size={16} />
              ) : (
                <Loader2 className="animate-spin" />
              )}
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Switch
                    checked={useEmbeddings}
                    onCheckedChange={setUseEmbeddings}
                    disabled={isPending}
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                  {useEmbeddings ? "Using embeddings" : "Not using embeddings"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}
    </div>
  );
}
