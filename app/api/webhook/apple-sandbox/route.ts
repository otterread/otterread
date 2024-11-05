import { type NextRequest, NextResponse } from "next/server";
import {
  decodeNotificationPayload,
  isDecodedNotificationDataPayload,
  isDecodedNotificationSummaryPayload,
} from "app-store-server-api";
import { APP_BUNDLE_ID } from "@/lib/constant";
import { notifyInfo } from "@/lib/notify";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const signedPayload = await request.text();

  // signedPayload 是 Apple 发送的主体
  const payload = await decodeNotificationPayload(signedPayload);

  let payloadStr = "";
  try {
    payloadStr = JSON.stringify(payload, null, 2);
  } catch (error) {
    payloadStr = "error";
  }

  // 通知可以包含 data 字段或 summary 字段，但不能同时包含两者。
  // 使用提供的类型保护来确定哪个字段存在。
  if (isDecodedNotificationDataPayload(payload)) {
    // payload 是 DecodedNotificationDataPayload 类型
    notifyInfo(`Received notification for our app: ${payloadStr})}`);
    if (payload.data.bundleId === APP_BUNDLE_ID) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: true });
  }

  if (isDecodedNotificationSummaryPayload(payload)) {
    notifyInfo(`Received Summary notification for our app: ${payloadStr}`);
    // payload 是 DecodedNotificationSummaryPayload 类型
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
