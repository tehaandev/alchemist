import { MAX_FILE_SIZE } from "@/constants";
import { getUserFromCookieAction } from "@/features/auth/auth.action";
import s3Client from "@/lib/s3";
import { ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ message: "No file found" }, { status: 400 });
  }
  const tokenUser = await getUserFromCookieAction();
  const bucketName = process.env.SUPABASE_BUCKET_NAME;
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
