import dayjs from "dayjs";

const WECOM_BOT_WEBHOOK_URL =
  "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=abd38ba7-bd19-4c58-9475-64bae5835116";

export class NotifyError extends Error {
  data?: string;

  toString(length = 200) {
    return `${this.name}: ${this.message}`.slice(0, length);
  }
}

export async function notifyError(
  error: NotifyError,
  type?: string,
  text?: string
) {
  if (["WXVerifyError", "PageNotLoadedError"].includes(error.name)) {
    return;
  }
  try {
    const content = `<font color="warning">WeWorkFinance 异常通知</font>
      <font color="info">Name:</font> ${error.name}
      <font color="info">Message:</font> ${error.message?.slice(0, 300)}
      <font color="info">Date:</font> ${dayjs().format("YYYY/MM/DD HH:mm:ss")}
      <font color="info">Type:</font> ${type?.slice(0, 300) || "未知"}
      <font color="info">Text:</font> ${text?.slice(0, 300) || "未知"}
      <font color="info">Data:</font> ${error.data?.slice(0, 300)}
      
      \`\`\`
      ${error.stack?.slice(0, 300)}
      \`\`\`
      `;
    const params = {
      msgtype: "markdown",
      markdown: { content },
    };
    const resp = await fetch(WECOM_BOT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await resp.json();
    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}

export async function notifyInfo(msg: string) {
  try {
    const content = `<font color="info">NotionBookmarkHelper 通知</font>
<font color="info">Message:</font> ${msg}`;
    const params = {
      msgtype: "markdown",
      markdown: { content },
    };
    const resp = await fetch(WECOM_BOT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await resp.json();
    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}
