import { updateDeliveryByProviderMessageId } from "../../_lib/db.js";
import { handleError, jsonResponse, readFormRequest } from "../../_lib/http.js";
import { normalizeTwilioMessageStatus, verifyTwilioRequest } from "../../_lib/twilio.js";

export async function onRequestPost({ request, env }) {
  try {
    const payload = await readFormRequest(request);
    await verifyTwilioRequest(request, env, payload);

    const messageSid = payload.MessageSid || payload.SmsSid || null;
    const nextStatus = normalizeTwilioMessageStatus(payload.MessageStatus || payload.SmsStatus);
    const error = payload.ErrorCode ? `Twilio error ${payload.ErrorCode}` : null;
    const alertId = await updateDeliveryByProviderMessageId(env, messageSid, {
      status: nextStatus,
      error,
    });

    return jsonResponse({ ok: true, updated: Boolean(alertId) });
  } catch (error) {
    return handleError(error);
  }
}
