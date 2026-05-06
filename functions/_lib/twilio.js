import { bytesToBase64, timingSafeEqualHex, utf8Bytes } from "./encoding.js";
import { hmacHex } from "./crypto.js";
import { HttpError } from "./http.js";

const STOP_KEYWORDS = new Set(["STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT"]);
const START_KEYWORDS = new Set(["START", "YES", "UNSTOP"]);
const HELP_KEYWORDS = new Set(["HELP", "INFO"]);

async function hmacSha1Base64(secret, value) {
  const key = await crypto.subtle.importKey("raw", utf8Bytes(secret), { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, utf8Bytes(value));
  return bytesToBase64(signature);
}

function signatureBaseString(requestUrl, params) {
  return Object.keys(params)
    .sort()
    .reduce((value, key) => `${value}${key}${params[key]}`, requestUrl);
}

export async function verifyTwilioRequest(request, env, params) {
  const authToken = String(env.TWILIO_AUTH_TOKEN || "").trim();
  if (!authToken) {
    throw new HttpError(500, "Missing required secret: TWILIO_AUTH_TOKEN.");
  }

  const signature = request.headers.get("x-twilio-signature") || "";
  const expected = await hmacSha1Base64(authToken, signatureBaseString(request.url, params));
  const signatureHex = await hmacHex(authToken, signature);
  const expectedHex = await hmacHex(authToken, expected);
  if (!timingSafeEqualHex(signatureHex, expectedHex)) {
    throw new HttpError(403, "Invalid Twilio signature.");
  }
}

export function normalizeTwilioMessageStatus(value) {
  const status = String(value || "").trim().toLowerCase();
  if (status === "delivered") {
    return "delivered";
  }
  if (status === "undelivered") {
    return "undelivered";
  }
  if (status === "failed") {
    return "failed";
  }
  if (["accepted", "queued", "sending", "sent", "scheduled", "receiving", "received"].includes(status)) {
    return "sent";
  }
  return status || "sent";
}

export function classifyInboundSms(body) {
  const keyword = String(body || "").trim().split(/\s+/)[0]?.toUpperCase() || "";
  if (STOP_KEYWORDS.has(keyword)) {
    return "stop";
  }
  if (START_KEYWORDS.has(keyword)) {
    return "start";
  }
  if (HELP_KEYWORDS.has(keyword)) {
    return "help";
  }
  return "unknown";
}

export function twimlMessage(message) {
  const escaped = String(message || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escaped}</Message></Response>`, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
    },
  });
}
