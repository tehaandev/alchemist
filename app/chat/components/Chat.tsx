"use client";

import { ModelSelector } from "@/components/ModelSelector";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AI_MODELS } from "@/constants";
import { useChat } from "@/features/chat/chat.query";
import { AIModel } from "@/features/open-ai/open-ai.type";
import { cn } from "@/lib/utils";
import { Bot, Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Chat({ sessionId }: { sessionId?: string }) {
  const [input, setInput] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<AIModel>(AI_MODELS[0]);

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

  useEffect(() => {
    const storedModelId = localStorage.getItem("selectedModel");
    if (storedModelId) {
      const stored = AI_MODELS.find((m) => m.id === storedModelId);
      if (stored) setSelectedModel(stored);
    }
  }, []);

  return (
    <div className="m-4 lg:m-8 xl:m-12">
      <div className="mb-6 flex w-full justify-end">
        <ModelSelector
          onModelChange={onModelChange}
          selectedModel={selectedModel}
        />
      </div>

      <Card className="mb-4 flex max-h-[60vh] w-full flex-col overflow-hidden border-2">
        <div className="flex-1 overflow-auto p-4">
          <div className="flex w-full flex-col space-y-4">
            {isLoadingHistory ? (
              <div className="flex h-full items-center justify-center p-8">
                <Loader2 className="animate-spin" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex h-full items-center justify-center p-8">
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

      <div className="flex w-full items-start gap-3">
        <Textarea
          placeholder="Ask a question..."
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!input.trim()) return;
              handleSubmit(input);
              setInput("");
            }
            if (e.key === "Enter" && e.shiftKey) {
              setInput((prev) => prev + "\n");
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 resize-y"
        />
        <Button
          type="button"
          size="icon"
          onClick={() => {
            if (!input.trim()) return;
            handleSubmit(input);
            setInput("");
          }}
          disabled={isPending || !input.trim()}>
          {!isPending ? (
            <Send size={16} />
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </Button>
      </div>
    </div>
  );
}
