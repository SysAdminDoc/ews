import { basicAuth } from "./encoding.js";
import { HttpError } from "./http.js";

const NANP_TOLL_FREE_AREA_CODES = new Set(["800", "833", "844", "855", "866", "877", "888"]);

function maskPhone(value) {
  const text = String(value || "").trim();
  if (!text) {
    return null;
  }

  return text.replace(/\d(?=\d{2})/g, "x");
}

function maskSid(value) {
  const text = String(value || "").trim();
  if (!text) {
    return null;
  }

  return text.length > 8 ? `${text.slice(0, 4)}...${text.slice(-4)}` : text;
}

function getTwilioAuth(env) {
  const accountSid = String(env.TWILIO_ACCOUNT_SID || "").trim();
  const authToken = String(env.TWILIO_AUTH_TOKEN || "").trim();
  const apiKeySid = String(env.TWILIO_API_KEY_SID || "").trim();
  const apiKeySecret = String(env.TWILIO_API_KEY_SECRET || "").trim();
  const hasApiKeyAuth = apiKeySid.startsWith("SK") && Boolean(apiKeySecret);
  if (!accountSid || (!authToken && !hasApiKeyAuth)) {
    throw new HttpError(500, "Twilio credentials are not configured.");
  }

  return {
    accountSid,
    authorization: basicAuth(hasApiKeyAuth ? apiKeySid : accountSid, hasApiKeyAuth ? apiKeySecret : authToken),
  };
}

async function twilioJson(url, auth) {
  const response = await fetch(url, {
    headers: {
      authorization: auth.authorization,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new HttpError(response.status, payload.message || `Twilio request failed with ${response.status}`);
  }

  return payload;
}

function getNanpAreaCode(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1, 4);
  }

  return digits.slice(0, 3);
}

function isTollFreePhone(phone) {
  return NANP_TOLL_FREE_AREA_CODES.has(getNanpAreaCode(phone));
}

function summarizeVerification(verification) {
  if (!verification) {
    return null;
  }

  return {
    sid: verification.sid || null,
    status: verification.status || null,
    createdAt: verification.date_created || verification.created_at || null,
    updatedAt: verification.date_updated || verification.updated_at || null,
    editAllowed: verification.edit_allowed ?? null,
    editExpiration: verification.edit_expiration || null,
    rejectionReasons: verification.rejection_reasons || null,
  };
}

function buildBlockingIssue({ sender, sendMethod }) {
  if (!sender.configured) {
    return "No TWILIO_FROM_PHONE sender is configured.";
  }

  if (sendMethod === "messaging_service") {
    return null;
  }

  if (!sender.foundInAccount) {
    return "Configured TWILIO_FROM_PHONE was not found in this Twilio account.";
  }

  if (!sender.smsCapable) {
    return "Configured TWILIO_FROM_PHONE is not SMS capable.";
  }

  if (sender.isTollFree && sender.tollFreeVerification?.status !== "TWILIO_APPROVED") {
    const status = sender.tollFreeVerification?.status || "not submitted";
    return `Toll-free sender verification is ${status}. US/Canada SMS is blocked until Twilio approves it.`;
  }

  return null;
}

export async function getMessagingStatus(env) {
  const auth = getTwilioAuth(env);
  const fromPhone = String(env.TWILIO_FROM_PHONE || "").trim();
  const messagingServiceSid = String(env.TWILIO_MESSAGING_SERVICE_SID || "").trim();
  const hasMessagingService = messagingServiceSid.startsWith("MG");
  const sendMethod = hasMessagingService ? "messaging_service" : fromPhone ? "from_phone" : "unconfigured";

  let messagingService = {
    configured: Boolean(messagingServiceSid),
    sid: maskSid(messagingServiceSid),
    validSid: hasMessagingService,
    status: hasMessagingService ? "configured" : messagingServiceSid ? "invalid_sid" : "not_configured",
  };
  if (hasMessagingService) {
    const servicePayload = await twilioJson(`https://messaging.twilio.com/v1/Services/${messagingServiceSid}`, auth);
    messagingService = {
      ...messagingService,
      friendlyName: servicePayload.friendly_name || null,
      inboundRequestUrl: servicePayload.inbound_request_url || null,
      statusCallback: servicePayload.status_callback || null,
      useInboundWebhookOnNumber: servicePayload.use_inbound_webhook_on_number ?? null,
    };
  }

  let sender = {
    configured: Boolean(fromPhone),
    number: maskPhone(fromPhone),
    foundInAccount: false,
    sid: null,
    smsCapable: false,
    mmsCapable: false,
    isTollFree: isTollFreePhone(fromPhone),
    tollFreeVerification: null,
  };

  if (fromPhone) {
    const numberUrl = new URL(`https://api.twilio.com/2010-04-01/Accounts/${auth.accountSid}/IncomingPhoneNumbers.json`);
    numberUrl.searchParams.set("PhoneNumber", fromPhone);
    const numberPayload = await twilioJson(numberUrl, auth);
    const incomingNumber = numberPayload.incoming_phone_numbers?.[0] || null;

    sender = {
      ...sender,
      foundInAccount: Boolean(incomingNumber),
      sid: incomingNumber?.sid || null,
      smsCapable: Boolean(incomingNumber?.capabilities?.sms),
      mmsCapable: Boolean(incomingNumber?.capabilities?.mms),
    };

    if (incomingNumber?.sid && sender.isTollFree) {
      const verificationUrl = new URL("https://messaging.twilio.com/v1/Tollfree/Verifications");
      verificationUrl.searchParams.set("TollfreePhoneNumberSid", incomingNumber.sid);
      const verificationPayload = await twilioJson(verificationUrl, auth);
      sender.tollFreeVerification = summarizeVerification(verificationPayload.verifications?.[0] || null);
    }
  }

  const blockingIssue = buildBlockingIssue({ sender, sendMethod });

  return {
    ok: true,
    checkedAt: new Date().toISOString(),
    sendMethod,
    readyForSms: !blockingIssue,
    blockingIssue,
    messagingService,
    sender,
  };
}
