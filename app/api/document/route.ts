import { MAX_FILE_SIZE } from "@/constants";
import { getUserFromCookieAction } from "@/features/auth/auth.action";
import { prisma } from "@/lib/prisma";
import s3Client from "@/lib/s3";
import { ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import { DocumentStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export async function POST(request: NextRequest) {
  const tokenUser = await getUserFromCookieAction();
  if (!tokenUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];
  if (!files.length) {
    return NextResponse.json({ message: "No files found" }, { status: 400 });
  }
  const bucketName = process.env.SUPABASE_BUCKET_NAME;
  const uploadResults: Array<{
    key: string;
    filename: string;
    status: DocumentStatus;
  }> = [];
  for (const file of files) {
    const fileName = file.name;
    const fileType = file.type;
    const fileSize = file.size;
    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: `Max file size is 20mb. ${fileName} is too large.` },
        { status: 400 },
      );
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const params = {
      Bucket: bucketName,
      Key: `${tokenUser.email}/${fileName}`,
      Body: buffer,
      ContentType: fileType,
    };
    try {
      await s3Client.send(new PutObjectCommand(params));
      const doc = await prisma.document.create({
        data: {
          key: `${tokenUser.email}/${fileName}`,
          filename: fileName,
          uploadedBy: tokenUser.id,
          status: DocumentStatus.UPLOADED,
        },
      });
      uploadResults.push({
        key: doc.key,
        filename: doc.filename,
        status: doc.status,
      });
    } catch (err) {
      console.log("Error uploading file", fileName, err);
      return NextResponse.json(
        { message: `Error uploading file ${fileName}` },
        { status: 500 },
      );
    }
  }
  return NextResponse.json(
    { message: "Files uploaded successfully", uploads: uploadResults },
    { status: 201 },
  );
}

export async function GET() {
  const tokenUser = await getUserFromCookieAction();
  const bucketName = process.env.SUPABASE_BUCKET_NAME;
  const params = {
    Bucket: bucketName,
    Prefix: `${tokenUser?.email}/`,
  };

  try {
    const data = await s3Client.send(new ListObjectsV2Command(params));
    const fileKeys = data.Contents?.map((item) => item.Key);
    return NextResponse.json(
      {
        message: "Files fetched successfully",
        fileKeys,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log("Error", err);
    return NextResponse.json(
      { message: "Error fetching files" },
      { status: 500 },
    );
  }
}
