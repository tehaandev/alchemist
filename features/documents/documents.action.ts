"use server";

import { getUserFromCookieAction } from "../auth/auth.action";
import { prisma } from "@/lib/prisma";

export async function getDocumentsFromDb() {
  const tokenUser = await getUserFromCookieAction();
  const documents = await prisma.document.findMany({
    where: {
      uploadedBy: tokenUser?.id,
    },
    select: {
      id: true,
      key: true,
    },
  });
  return documents;
}
