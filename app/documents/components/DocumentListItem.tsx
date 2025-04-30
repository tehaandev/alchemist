"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDocumentFromDb } from "@/features/documents/documents.query";
import {
  useDeleteEmbeddingsForFile,
  useEmbeddingsForFile,
} from "@/features/embeddings/embeddings.query";
import { cn } from "@/lib/utils";
import { DocumentStatus } from "@prisma/client";
import { ChevronsLeftRight, Loader2, Trash } from "lucide-react";
import React from "react";

export default function DocumentListItem({
  doc,
}: {
  doc: {
    key: string;
    id: number;
  };
}) {
  const { data: document, isLoading } = useDocumentFromDb(doc.key);
  const [progress, setProgress] = React.useState(0);
  const generateEmbeddingsMutation = useEmbeddingsForFile(setProgress, doc.key);
  const deleteEmbeddingMutation = useDeleteEmbeddingsForFile(
    setProgress,
    doc.key,
  );

  const isProcessing =
    generateEmbeddingsMutation.isPending || deleteEmbeddingMutation.isPending;
  const isEmbedded = document?.status === DocumentStatus.EMBEDDED;

  if (isLoading) {
    return (
      <div className="hover:bg-muted/40 flex items-center justify-between border-b px-3 py-2 transition-colors">
        <div className="text-muted-foreground flex items-center gap-2 truncate text-sm">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span className="truncate">{doc.key}</span>
        </div>
      </div>
    );
  }

  if (!document) return null;

  return (
    <div className="group hover:bg-muted/40 flex items-center justify-between border-b px-3 py-2 transition-colors">
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex w-5/6 items-center gap-2">
              <div
                className={cn(
                  "h-2 w-2 flex-shrink-0 rounded-full",
                  isEmbedded ? "bg-green-500" : "bg-red-500",
                )}
              />
              <span className="truncate text-sm font-medium">
                {document.filename}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" align="start">
            {document.filename}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center gap-2">
        {isProcessing && (
          <Progress
            value={progress}
            className="h-1.5 w-20"
            color={
              generateEmbeddingsMutation.isPending ? "default" : "destructive"
            }
          />
        )}

        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-7 px-2 text-xs opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100",
            isEmbedded ? "text-destructive hover:text-destructive" : "",
          )}
          onClick={() => {
            if (isEmbedded) {
              deleteEmbeddingMutation.mutate({ docId: doc.id.toString() });
            } else {
              generateEmbeddingsMutation.mutate({
                key: doc.key,
                docId: doc.id.toString(),
              });
            }
          }}
          disabled={isProcessing}>
          {isProcessing ? (
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          ) : isEmbedded ? (
            <Trash className="mr-1 h-3 w-3" />
          ) : (
            <ChevronsLeftRight className="mr-1 h-3 w-3" />
          )}
          {isProcessing
            ? generateEmbeddingsMutation.isPending
              ? "Processing..."
              : "Removing..."
            : isEmbedded
              ? "Remove Embeddings"
              : "Embed Document"}
        </Button>
      </div>
    </div>
  );
}
