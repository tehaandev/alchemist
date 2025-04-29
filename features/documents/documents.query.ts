import { getDocumentsFromDb } from "./documents.action";
import queryClient from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useDocumentKeysFromDb = () =>
  useQuery({
    queryKey: ["documentKeys"],
    queryFn: () => getDocumentsFromDb(),
  });

export const useUploadToS3 = () =>
  useMutation({
    mutationKey: ["uploadToS3"],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post("/api/document", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response;
      } catch (error) {
        console.error("Error uploading document:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Document added successfully!");
      queryClient.invalidateQueries({ queryKey: ["documentKeys"] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
