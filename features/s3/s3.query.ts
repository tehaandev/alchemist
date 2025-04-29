import { generateEmbeddingsForFile } from "../embeddings/embeddings.action";
import { getDocumentKeys } from "./s3.action";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useDocumentKeys = () =>
  useQuery({
    queryKey: ["documentKeys"],
    queryFn: () => getDocumentKeys(),
  });

export const useEmbeddingsForFile = () =>
  useMutation({
    mutationFn: generateEmbeddingsForFile,
    mutationKey: ["generateEmbeddingsForFile"],
  });
