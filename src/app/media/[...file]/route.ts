import clientSettings from "clientSettings";
import { NextRequest, NextResponse } from "next/server";

type PropsContext = {
  params: { file: string[] };
};

export async function GET(request: NextRequest, { params }: PropsContext) {
  const url = `${clientSettings.R2_ACCESS_URL}/${params.file.join("/")}`;
  const res = await fetch(url);
  return new NextResponse(res.body, { headers: res.headers });
}
