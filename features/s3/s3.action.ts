"use server";

import { getUserFromCookieAction } from "../auth/auth.action";
import { getTextFromPdf } from "../documents/documents.service";
import s3Client from "@/lib/s3";
import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

export async function getDocumentKeys() {
  const tokenUser = await getUserFromCookieAction();
  const bucketName = process.env.SUPABASE_BUCKET_NAME;
  const params = {
    Bucket: bucketName,
    Prefix: `${tokenUser?.email}/`,
  };

  try {
    const data = await s3Client.send(new ListObjectsV2Command(params));
    const fileKeys = data.Contents?.map((item) => item.Key);
    return fileKeys;
  } catch (err) {
    console.log("Error", err);
    throw new Error("Error fetching files");
  }
}

export async function getDocumentText(fileKey: string) {
  const bucketName = process.env.SUPABASE_BUCKET_NAME;
  const params = {
    Bucket: bucketName,
    Key: fileKey,
  };
  try {
    const data = await s3Client.send(new GetObjectCommand(params));
    const type = data.ContentType;
    if (!type || !data.Body) {
      throw new Error("File type not found");
    }
    // if plain text
    if (type === "text/plain") {
      return data.Body?.toString();
    }
    // if pdf
    if (type === "application/pdf") {
      const pdfBuffer = Buffer.from(await data.Body.transformToByteArray());
      return await getTextFromPdf(pdfBuffer);
    }
  } catch (err) {
    console.log("Error", err);
    throw new Error("Error fetching file text");
  }
}
