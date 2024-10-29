import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { encrypt } from "@/lib";

export const runtime = "edge";

const BAIDU_APP_ID = "22052695";
const BAIDU_SECRET_ID = "BoW3w3PsjPxMAjc8ep69nZ9M";
const BAIDU_SECRET_KEY = "uGj8B3GwaDnIQgg7VKbjbzNqMidApAjE";

export async function PUT(request: NextRequest) {
  const sign = Buffer.from(
    encrypt([BAIDU_APP_ID, BAIDU_SECRET_ID, BAIDU_SECRET_KEY].join(":"))
  ).toString("base64");

  return NextResponse.json({ ok: true, sign });
}
