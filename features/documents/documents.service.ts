"use server";

import { prisma } from "@/lib/prisma";
import pdfParse from "pdf-parse";

export async function getTextFromPdf(pdfBuffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

export async function getDocumentFromDb(key: string) {
  return await prisma.document.findFirstOrThrow({
    where: {
      key,
    },
    select: {
      id: true,
      key: true,
      filename: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
