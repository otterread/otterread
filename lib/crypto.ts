import crypto from "node:crypto";

const k = "qFWY2XdXAATnZ8feI3dBjUcUlhkbqkhV";
const encryption = (data: string) => {
  const cipherChunks = [];
  const cipher = crypto.createCipheriv("aes-256-ecb", k, "");
  cipher.setAutoPadding(true);
  cipherChunks.push(cipher.update(data, "utf8", "base64"));
  cipherChunks.push(cipher.final("base64"));
  return cipherChunks.join("");
};
const decryption = (data: string) => {
  if (!data) return "";
  const cipherChunks = [];
  const decipher = crypto.createDecipheriv("aes-256-ecb", k, "");
  decipher.setAutoPadding(true);
  cipherChunks.push(decipher.update(data, "base64", "utf8"));
  cipherChunks.push(decipher.final("utf8"));
  return cipherChunks.join("");
};

export const encrypt = (data: string) => {
  return encryption(data);
};

export const serialize = (data: string) => {
  try {
    return JSON.parse(decryption(data));
  } catch (err) {
    return {};
  }
};
