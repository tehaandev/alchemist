import {
  deleteEmbeddingsForFile,
  generateEmbeddingsForFile,
} from "./embeddings.action";
import queryClient from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { toast } from "sonner";

export const useEmbeddingsForFile = (
  setProgress: React.Dispatch<SetStateAction<number>>,
  key: string,
) =>
  useMutation({
    mutationFn: generateEmbeddingsForFile,
    onMutate: () => {
      setProgress(0);
    },
    onSuccess: () => {
      toast.success("Embeddings generated successfully!");
      setProgress(100);
      queryClient.invalidateQueries({ queryKey: ["document", key] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

export const useDeleteEmbeddingsForFile = (
  setProgress: React.Dispatch<SetStateAction<number>>,
  key: string,
) =>
  useMutation({
    mutationFn: deleteEmbeddingsForFile,
    onMutate: () => {
      setProgress(0);
    },
    onSuccess: () => {
      toast.success("Embeddings deleted successfully!");
      setProgress(100);
      queryClient.invalidateQueries({ queryKey: ["document", key] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
