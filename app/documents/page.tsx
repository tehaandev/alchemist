"use client";

import DocumentListItem from "./components/DocumentListItem";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useDocumentKeysFromDb,
  useUploadToS3,
} from "@/features/documents/documents.query";
import { FileText, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DocumentsPage() {
  const { data: documents, isLoading, error } = useDocumentKeysFromDb();
  const [newDocuments, setNewDocuments] = useState<File[]>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addDocumentMutation = useUploadToS3();

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocuments) {
      toast.error("Please select a document to upload");
      return;
    }
    addDocumentMutation.mutate(newDocuments);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <span className="ml-2">Loading documents...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-destructive">
          Error loading documents: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 xl:p-12">
      <div className="mb-6 flex items-center justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center justify-end gap-2">
              <Plus className="h-4 w-4" />
              Add New Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Document</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddDocument} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="file"
                  multiple
                  id="title"
                  onChange={(e) => {
                    const files = e.target.files;
                    const fileArray = Array.from(files || []);
                    if (fileArray.length > 0) {
                      setNewDocuments(fileArray);
                    }
                  }}
                  placeholder="Enter document title"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={addDocumentMutation.isPending}>
                {addDocumentMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Document"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {documents?.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed py-12 text-center">
          <FileText className="text-muted-foreground mx-auto h-12 w-12" />
          <h2 className="mt-4 text-xl font-semibold">No documents found</h2>
          <p className="text-muted-foreground mt-2">
            Add your first document to get started
          </p>
        </div>
      ) : (
        <div className="w-[75vw]">
          {documents?.map((doc) => <DocumentListItem key={doc.id} doc={doc} />)}
        </div>
      )}
    </div>
  );
}
