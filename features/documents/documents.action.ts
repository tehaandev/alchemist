"use server";

import { prisma } from "@/lib/prisma";

export async function getDocumentsFromDb() {
  const documents = await prisma.document.findMany();
  return documents;
}
