import { HttpError } from "./http.js";

export function normalizeEmail(value) {
  const email = String(value || "").trim().toLowerCase();
  if (!email) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new HttpError(400, "Enter a valid email address.");
  }

  return email;
}

export function normalizePhone(value) {
  const raw = String(value || "").trim();
  if (!raw) {
    return null;
  }

  const withPlus = raw.startsWith("+");
  let digits = raw.replace(/[^\d]/g, "");
  if (!digits) {
    throw new HttpError(400, "Enter a valid phone number.");
  }

  if (!withPlus && digits.length === 10) {
    digits = `1${digits}`;
  }

  if (!withPlus && digits.length === 11 && !digits.startsWith("1")) {
    throw new HttpError(400, "Use E.164 format for international phone numbers, for example +442071838750.");
  }

  if (digits.length < 8 || digits.length > 15) {
    throw new HttpError(400, "Enter a valid phone number in E.164 format.");
  }

  return `+${digits}`;
}

export function normalizeSignupContacts(payload) {
  const email = normalizeEmail(payload.email);
  const phone = normalizePhone(payload.phone);
  const smsConsent = Boolean(payload.smsConsent);

  if (!email && !phone) {
    throw new HttpError(400, "Enter an email address, a phone number, or both.");
  }

  if (phone && !smsConsent) {
    throw new HttpError(400, "SMS consent is required before subscribing a phone number.");
  }

  return {
    email,
    phone,
    smsConsent,
    wantsEmail: Boolean(email),
    wantsSms: Boolean(phone),
  };
}
