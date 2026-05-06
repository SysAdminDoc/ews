import { normalizeSignupContacts } from "../../_lib/contacts.js";
import { anonymizeExpiredPendingSignups, createPendingSignup, recordCheckoutSession } from "../../_lib/db.js";
import { handleError, jsonResponse, getOriginBaseUrl, getRequestIp, getRequestUserAgent, readJsonRequest } from "../../_lib/http.js";
import { createCheckoutSession, getStripeProductId, resolveStripePriceId } from "../../_lib/stripe.js";

export async function onRequestPost({ request, env }) {
  try {
    await anonymizeExpiredPendingSignups(env);
    const payload = await readJsonRequest(request);
    const contacts = normalizeSignupContacts(payload);
    const pendingSignup = await createPendingSignup(env, contacts, {
      ip: getRequestIp(request),
      userAgent: getRequestUserAgent(request),
    });
    const priceId = await resolveStripePriceId(env);
    const checkoutSession = await createCheckoutSession(env, {
      signupId: pendingSignup.id,
      email: pendingSignup.email,
      priceId,
      baseUrl: getOriginBaseUrl(request, env),
    });

    await recordCheckoutSession(env, pendingSignup.id, checkoutSession, priceId, getStripeProductId(env));

    return jsonResponse({
      ok: true,
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id,
    });
  } catch (error) {
    return handleError(error);
  }
}
