"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { Bot, Send, User } from "lucide-react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      initialMessages: [],
      onResponse: (message) => {
        // Handle the response message here if needed
        console.log("Received message:", message);
      },
    });

  return (
    <div className="flex h-screen max-h-screen flex-col p-4 md:p-8">
      <h1 className="mb-4 text-2xl font-bold">RAG Chat Assistant</h1>

      <Card className="mb-4 flex flex-1 flex-col overflow-hidden border-2">
        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col space-y-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center p-8">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Bot size={32} className="text-gray-400" />
                  <p className="text-gray-500">
                    {`Ask me anything! I'll use relevant documents to provide
                    accurate answers.`}
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-3 rounded-lg p-4",
                    message.role === "user" ? "bg-muted/50" : "bg-primary/5",
                  )}>
                  <div className="bg-background flex h-8 w-8 shrink-0 items-center justify-center rounded-md border shadow select-none">
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="prose prose-sm dark:prose-invert">
                      {message.content}
                    </div>

                    {/* Display sources if available */}
                    {/* {message.role === "assistant" && message.sources && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.sources.map((source, index) => (
                          <div
                            key={index}
                            className="bg-muted flex items-center gap-1 rounded-full px-2 py-1 text-xs">
                            <FileText className="h-3 w-3" />
                            <span>{source.title || `Source ${index + 1}`}</span>
                          </div>
                        ))}
                      </div>
                    )} */}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>

      <form onSubmit={handleSubmit} className="flex items-start gap-3">
        <Textarea
          placeholder="Ask a question..."
          value={input}
          onChange={handleInputChange}
          className="min-h-24 flex-1 resize-none"
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
