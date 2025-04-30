"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEmbeddingsForFile } from "@/features/embeddings/embeddings.query";
import { DocumentStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";
import React from "react";

export default function DocCard({
  doc,
}: {
  doc: {
    key: string;
    filename: string;
    status: DocumentStatus;
    id: number;
  };
}) {
  const [progress, setProgress] = React.useState(0);
  const generateEmbeddingsMutation = useEmbeddingsForFile(setProgress);
  return (
    <Card key={doc.key} className="flex flex-col">
      <CardHeader className="w-full">
        <CardTitle
          className="line-clamp-2 truncate text-sm break-all hover:overflow-visible hover:whitespace-normal"
          title={doc.filename} // This adds a tooltip on hover
        >
          {doc.filename}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex w-full flex-col gap-4">
        <div className="flex justify-end gap-2 border-t pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              generateEmbeddingsMutation.mutate({
                key: doc.key,
                docId: doc.id.toString(),
              })
            }
            disabled={
              generateEmbeddingsMutation.isPending ||
              doc.status === DocumentStatus.EMBEDDED
            }>
            {generateEmbeddingsMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Generating...
              </>
            ) : doc.status === DocumentStatus.EMBEDDED ? (
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                Embeddings Generated
              </span>
            ) : (
              "Generate Embeddings"
            )}
          </Button>
        </div>
        <Progress value={progress} className="mt-4" />
      </CardFooter>
    </Card>
  );
}
