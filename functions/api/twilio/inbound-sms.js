import { contactHash } from "../../_lib/crypto.js";
import { updateSmsPreferenceByPhoneHash } from "../../_lib/db.js";
import { handleError, readFormRequest } from "../../_lib/http.js";
import { classifyInboundSms, twimlMessage, verifyTwilioRequest } from "../../_lib/twilio.js";
import { normalizePhone } from "../../_lib/contacts.js";

export async function onRequestPost({ request, env }) {
  try {
    const payload = await readFormRequest(request);
    await verifyTwilioRequest(request, env, payload);

    const phone = normalizePhone(payload.From);
    const phoneHash = await contactHash(env, "phone", phone);
    const action = classifyInboundSms(payload.Body);

    if (action === "stop") {
      await updateSmsPreferenceByPhoneHash(env, phoneHash, false);
      return twimlMessage("You have been unsubscribed from Apocalypse EWS SMS alerts. Reply START to resubscribe.");
    }

    if (action === "start") {
      await updateSmsPreferenceByPhoneHash(env, phoneHash, true);
      return twimlMessage("You are subscribed to Apocalypse EWS SMS alerts. Reply STOP to unsubscribe.");
    }

    return twimlMessage("Apocalypse EWS alerts are event-driven. Reply STOP to unsubscribe or HELP for help.");
  } catch (error) {
    return handleError(error);
  }
}
