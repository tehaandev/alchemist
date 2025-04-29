import { generateEmbeddingsForFile } from "./embeddings.action";
import { useMutation } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { toast } from "sonner";

export const useEmbeddingsForFile = (
  setProgress: React.Dispatch<SetStateAction<number>>,
) =>
  useMutation({
    mutationFn: generateEmbeddingsForFile,
    onMutate: () => {
      setProgress(0);
    },
    onSuccess: () => {
      toast.success("Embeddings generated successfully!");
      setProgress(100);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
