"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@/features/chat/chat.query";
import { cn } from "@/lib/utils";
import { Bot, Send } from "lucide-react";
import { useState } from "react";

export default function ChatPage() {
  const { handleSubmit, messages, isPending } = useChat();
  const [input, setInput] = useState<string>();

  return (
    <div className="flex h-screen max-h-screen flex-col p-4 md:p-8 lg:w-2/3">
      <h1 className="mb-4 text-2xl font-bold">RAG Chat Assistant</h1>

      <Card className="mb-4 flex w-full flex-1 flex-col overflow-hidden border-2">
        <div className="flex-1 overflow-scroll p-4">
          <div className="flex flex-col space-y-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center p-8">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Bot size={32} />
                  <p className="text-gray-500">
                    {`Ask me anything! I'll use relevant documents to provide
                    accurate answers.`}
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-2",
                    message.role === "user" ? "justify-end" : "justify-start",
                  )}>
                  <div
                    className={cn(
                      "prose prose-sm dark:prose-invert max-w-[80%] rounded-lg p-2 text-justify text-sm",
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
              if (!input?.trim()) return;
              handleSubmit(input);
              setInput("");
            }
            if (e.key === "Enter" && e.shiftKey) {
              setInput((prev) => (prev ? prev + "\n" : ""));
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-12 flex-1 resize-none"
        />
        <Button
          type="button"
          size="icon"
          onClick={() => {
            if (!input?.trim()) return;
            handleSubmit(input);
            setInput("");
          }}
          disabled={isPending || !input?.trim()}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
}
