

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import serverSettings from "serverSettings";

export const r2ClientV3 = new S3Client({
  region: "auto",
  endpoint: serverSettings.R2_URL,
  credentials: {
    accessKeyId: serverSettings.R2_ACCESS_KEY,
    secretAccessKey: serverSettings.R2_SECRET_KEY,
  },
});

export async function uploadFileR2({file, key}: {file: File, key: string}) {
  return await r2ClientV3.send(
    new PutObjectCommand({
      Bucket: serverSettings.R2_BUCKET,
      Key: key,
      Body: new Uint8Array(await file.arrayBuffer()),
      ContentType: file.type,
    }),
  );
}