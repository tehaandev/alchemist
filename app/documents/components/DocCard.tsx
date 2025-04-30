"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useDocumentFromDb } from "@/features/documents/documents.query";
import {
  useDeleteEmbeddingsForFile,
  useEmbeddingsForFile,
} from "@/features/embeddings/embeddings.query";
import { DocumentStatus } from "@prisma/client";
import {
  ChevronsLeftRightEllipsisIcon,
  Loader2,
  TrashIcon,
} from "lucide-react";
import React from "react";

export default function DocCard({
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

  if (isLoading) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="w-full">
          <CardTitle className="line-clamp-2 truncate text-sm break-all">
            {doc.key}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex w-full flex-col gap-4">
          <div className="flex justify-end gap-2 border-t pt-4">
            <Button variant="ghost" size="sm" disabled>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Loading...
            </Button>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardFooter>
      </Card>
    );
  }

  if (!document) {
    return null; // or some loading state
  }
  return (
    <Card key={document.key} className="flex flex-col">
      <CardHeader className="w-full">
        <CardTitle
          className="line-clamp-2 truncate text-sm break-all hover:overflow-visible hover:whitespace-normal"
          title={document.filename} // This adds a tooltip on hover
        >
          {document.filename}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col items-end gap-2 border-t pt-4">
          <div className="flex w-full items-center justify-between">
            <div>
              {document.status === DocumentStatus.EMBEDDED ? (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                  Embeddings Generated
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                  Not Embedded
                </span>
              )}
            </div>

            <Button
              variant={
                document.status === DocumentStatus.EMBEDDED
                  ? "outline"
                  : "default"
              }
              size="sm"
              className="flex items-center gap-1.5"
              onClick={() => {
                if (document.status === DocumentStatus.EMBEDDED) {
                  deleteEmbeddingMutation.mutate({ docId: doc.id.toString() });
                } else {
                  generateEmbeddingsMutation.mutate({
                    key: doc.key,
                    docId: doc.id.toString(),
                  });
                }
              }}
              disabled={
                generateEmbeddingsMutation.isPending ||
                deleteEmbeddingMutation.isPending
              }>
              {generateEmbeddingsMutation.isPending ||
              deleteEmbeddingMutation.isPending ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  {generateEmbeddingsMutation.isPending
                    ? "Processing..."
                    : "Removing..."}
                </>
              ) : document.status === DocumentStatus.EMBEDDED ? (
                <>
                  <TrashIcon className="h-3 w-3" />
                  Remove Embeddings
                </>
              ) : (
                <>
                  <ChevronsLeftRightEllipsisIcon className="h-3 w-3" />
                  Generate Embeddings
                </>
              )}
            </Button>
          </div>

          <Progress
            value={progress}
            className="mt-2 w-full"
            // Add color based  on operation type
            color={
              generateEmbeddingsMutation.isPending
                ? "default"
                : deleteEmbeddingMutation.isPending
                  ? "destructive"
                  : "default"
            }
          />
        </div>
      </CardFooter>
    </Card>
  );
}
