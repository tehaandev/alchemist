import {
  deleteEmbeddingsForFile,
  generateEmbeddingsForFile,
} from "./embeddings.action";
import queryClient from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEmbeddingsForFile = (key: string) =>
  useMutation({
    mutationFn: generateEmbeddingsForFile,
    onSuccess: () => {
      toast.success("Embeddings generated successfully!");
      queryClient.invalidateQueries({ queryKey: ["document", key] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

export const useDeleteEmbeddingsForFile = (key: string) =>
  useMutation({
    mutationFn: deleteEmbeddingsForFile,
    onSuccess: () => {
      toast.success("Embeddings deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["document", key] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
