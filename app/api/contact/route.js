import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

const LIMITS = {
  name: 100,
  email: 150,
  phone: 30,
  subject: 150,
  message: 3000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Very small in-memory rate limiter (per server instance).
// Good enough as a basic throttle; for serious abuse protection,
// pair this with a platform-level rate limit / captcha.
const submissionLog = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(key) {
  const now = Date.now();
  const timestamps = (submissionLog.get(key) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function sanitize(value) {
  return typeof value === "string" ? value.trim().slice(0, 5000) : "";
}

function validate(body) {
  const errors = [];
  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const phone = sanitize(body.phone);
  const subject = sanitize(body.subject);
  const message = sanitize(body.message);

  if (!name) errors.push("Name is required.");
  if (name.length > LIMITS.name) errors.push("Name is too long.");

  if (!email) errors.push("Email is required.");
  else if (!EMAIL_RE.test(email)) errors.push("Email is invalid.");
  if (email.length > LIMITS.email) errors.push("Email is too long.");

  if (phone.length > LIMITS.phone) errors.push("Phone number is too long.");

  if (!subject) errors.push("Subject is required.");
  if (subject.length > LIMITS.subject) errors.push("Subject is too long.");

  if (!message) errors.push("Message is required.");
  if (message.length > LIMITS.message) errors.push("Message is too long.");

  return { errors, values: { name, email, phone, subject, message } };
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Honeypot — if this hidden field is filled in, silently pretend
    // success so bots don't learn to avoid it, without touching the DB.
    if (typeof body.company === "string" && body.company.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const { errors, values } = validate(body);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors[0] },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: values.name,
      email: values.email,
      phone: values.phone || null,
      subject: values.subject,
      message: values.message,
      status: "new",
    });

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json(
        { success: false, message: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
