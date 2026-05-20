import { getAdminSubscriberMessageHistory } from "../../_lib/db.js";
import { handleError, HttpError, jsonResponse } from "../../_lib/http.js";

function getNotificationBaseUrl(env) {
  return String(env.EWS_NOTIFICATION_URL || env.APP_BASE_URL || "https://aews.cc/")
    .trim()
    .replace(/\/+$/, "");
}

export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const subscriberId = String(url.searchParams.get("subscriber") || "").trim();
    if (!subscriberId) {
      throw new HttpError(400, "Enter a subscriber ID.");
    }

    const history = await getAdminSubscriberMessageHistory(env, subscriberId, {
      limit: url.searchParams.get("limit"),
      managementBaseUrl: getNotificationBaseUrl(env),
    });
    return jsonResponse(
      {
        ok: true,
        ...history,
      },
      {
        headers: {
          "cache-control": "no-store",
        },
      },
    );
  } catch (error) {
    return handleError(error);
  }
}
