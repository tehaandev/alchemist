import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  forcePathStyle: true,
  endpoint: process.env.SUPABASE_S3_ENDPOINT,
  region: process.env.SUPABASE_REGION!,
  credentials: {
    accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY!,
  },
});

export default s3Client;
