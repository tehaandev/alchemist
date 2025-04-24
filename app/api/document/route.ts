import { MAX_FILE_SIZE } from "@/constants";
import { getUserFromCookieAction } from "@/features/auth/auth.action";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ message: "No file found" }, { status: 400 });
  }
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });
  const tokenUser = await getUserFromCookieAction();
  const bucketName = process.env.S3_BUCKET_NAME;
  const fileName = file.name;
  const fileType = file.type;
  const fileSize = file.size;
  if (fileSize > MAX_FILE_SIZE) {
    return NextResponse.json(
      { message: "Max file size is 20mb" },
      { status: 400 },
    );
  }
  const params = {
    Bucket: bucketName,
    Key: `${tokenUser?.email}/${fileName}`,
    Body: file,
    ContentType: fileType,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return NextResponse.json(
      {
        message: "File uploaded successfully",
      },
      { status: 201 },
    );
  } catch (err) {
    console.log("Error", err);
    return NextResponse.json(
      { message: "Error uploading file" },
      { status: 500 },
    );
  }
}
