import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("🟢 [BOOKING] Request received");

  // Parse body
  let body;
  try {
    body = await request.json();
    console.log("✅ [BOOKING] Body parsed");
  } catch (e) {
    console.error("❌ [BOOKING] Body parse failed:", e.message);
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }

  const { date, time, adults, kids, total, firstName, lastName, email, phone } = body;
  const fullName = `${firstName || ""} ${lastName || ""}`.trim();
  const bookingRef = `WA-${Date.now().toString(36).toUpperCase()}`;

  const submittedAt = new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Lisbon",
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  let dateFormatted = date;
  try {
    dateFormatted = new Date(date).toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
  } catch {}

  console.log(`✅ [BOOKING] Ref: ${bookingRef}`);
  console.log("🔍 [ENV] RESEND:", process.env.RESEND_API_KEY ? "PRESENT" : "MISSING");
  console.log("🔍 [ENV] SHEETS:", process.env.GOOGLE_SCRIPT_URL ? "PRESENT" : "MISSING");
  console.log("🔍 [ENV] PHONE:", process.env.OWNER_PHONE ? "PRESENT" : "MISSING");
  console.log("🔍 [ENV] CALLMEBOT:", process.env.CALLMEBOT_APIKEY ? "PRESENT" : "MISSING");

  const whatsappMsg = encodeURIComponent(
    `Hi Wild-Algarve! I'd like to confirm my booking:\n\n` +
    `📋 Ref: ${bookingRef}\n` +
    `📅 ${dateFormatted}\n` +
    `🕐 ${time === "13:30" ? "☀️ Afternoon 13:30" : "🌅 Sunset 17:00"}\n` +
    `👥 ${adults} adult${adults > 1 ? "s" : ""}${kids > 0 ? ` + ${kids} under 15` : ""}\n` +
    `💰 Total: ${total}€\n` +
    `👤 ${fullName}\n` +
    `📧 ${email}`
  );
  const whatsappLink = `https://wa.me/33651581703?text=${whatsappMsg}`;

  // ─── STEP 1 : Google Sheets ─────────────────────────────
  let sheetsResult = "skipped";
  if (process.env.GOOGLE_SCRIPT_URL) {
    try {
      console.log("🟢 [SHEETS] Sending...");
      const res = await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingRef, submittedAt, date, dateFormatted, time,
          adults: Number(adults), kids: Number(kids), total: Number(total),
          fullName, email, phone, status: "Pending",
        }),
      });
      console.log("✅ [SHEETS] Status:", res.status);
      sheetsResult = "ok";
    } catch (e) {
      console.error("❌ [SHEETS] Failed:", e.message);
      sheetsResult = "failed";
    }
  }

  // ─── STEP 2 : Resend email (lazy import + lazy init) ────
  let emailResult = "skipped";
  if (process.env.RESEND_API_KEY) {
    try {
      console.log("🟢 [EMAIL] Initializing Resend...");
      // LAZY IMPORT — la clé est lue ici et pas au build time
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const timeLabel = time === "13:30" ? "☀️ Afternoon · 13:30" : "🌅 Sunset · 17:00";
      const guestsLine = `${adults} adult${adults > 1 ? "s" : ""}${kids > 0 ? ` + ${kids} under 15` : ""}`;

      const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#FAF6EF;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF6EF;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFDF9;border-radius:16px;overflow:hidden;">
<tr><td style="background:#3D2314;padding:32px 40px;text-align:center;">
<div style="font-size:28px;font-weight:900;color:#FFFDF9;">Wild<span style="color:#C4622D;">-</span>Algarve</div>
<div style="color:rgba(255,255,255,0.6);font-size:12px;letter-spacing:0.2em;text-transform:uppercase;margin-top:6px;">Albufeira · Off-road experience</div>
</td></tr>
<tr><td style="padding:40px;">
<p style="font-size:22px;font-weight:700;color:#3D2314;margin:0 0 8px;">Hi ${firstName}! 👋</p>
<p style="font-size:16px;color:#6B3D22;line-height:1.6;margin:0 0 32px;">We've received your booking request. Your spot is being held — we'll confirm everything with you on WhatsApp within a few hours.</p>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF6EF;border-radius:12px;margin-bottom:32px;">
<tr><td style="padding:24px;">
<div style="font-size:11px;font-weight:600;color:#C4622D;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:16px;">Booking Summary</div>
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td style="padding:8px 0;border-bottom:1px solid #E8D5B0;"><span style="font-size:13px;color:#6B3D22;">Reference</span></td><td style="padding:8px 0;border-bottom:1px solid #E8D5B0;text-align:right;"><span style="font-size:13px;font-weight:700;color:#3D2314;font-family:monospace;">${bookingRef}</span></td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #E8D5B0;"><span style="font-size:13px;color:#6B3D22;">📅 Date</span></td><td style="padding:8px 0;border-bottom:1px solid #E8D5B0;text-align:right;"><span style="font-size:13px;font-weight:700;color:#3D2314;">${dateFormatted}</span></td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #E8D5B0;"><span style="font-size:13px;color:#6B3D22;">🕐 Time</span></td><td style="padding:8px 0;border-bottom:1px solid #E8D5B0;text-align:right;"><span style="font-size:13px;font-weight:700;color:#3D2314;">${timeLabel}</span></td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #E8D5B0;"><span style="font-size:13px;color:#6B3D22;">👥 Guests</span></td><td style="padding:8px 0;border-bottom:1px solid #E8D5B0;text-align:right;"><span style="font-size:13px;font-weight:700;color:#3D2314;">${guestsLine}</span></td></tr>
<tr><td style="padding:12px 0 0;"><span style="font-size:15px;font-weight:700;color:#3D2314;">Total</span></td><td style="padding:12px 0 0;text-align:right;"><span style="font-size:22px;font-weight:900;color:#C4622D;">${total}€</span></td></tr>
</table></td></tr></table>
<div style="text-align:center;margin-bottom:32px;">
<p style="font-size:15px;color:#6B3D22;margin:0 0 16px;">Want to speed things up? Confirm directly on WhatsApp:</p>
<a href="${whatsappLink}" style="display:inline-block;background:#25D366;color:white;text-decoration:none;padding:16px 32px;border-radius:999px;font-size:15px;font-weight:700;text-transform:uppercase;">✓ Confirm on WhatsApp</a>
</div>
<p style="font-size:14px;color:#6B3D22;line-height:1.6;margin:0 0 8px;">Questions? Reach us anytime:</p>
<p style="font-size:14px;color:#3D2314;font-weight:600;margin:0 0 4px;">📱 WhatsApp +33 6 51 58 17 03</p>
<p style="font-size:14px;color:#3D2314;font-weight:600;margin:0;">✉️ wild.algarve@gmail.com</p>
</td></tr>
<tr><td style="background:#3D2314;padding:24px 40px;text-align:center;">
<p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0;">© ${new Date().getFullYear()} Wild-Algarve · Albufeira, Portugal</p>
</td></tr></table></td></tr></table></body></html>`;

      console.log("🟢 [EMAIL] Sending...");
      const sendRes = await resend.emails.send({
        from: "Wild-Algarve <noreply@wild-algarve.com>",
        to: email,
        subject: `Your Wild-Algarve ride request — ${dateFormatted} · ${time}`,
        html: html,
      });
      console.log("✅ [EMAIL] Sent:", JSON.stringify(sendRes).substring(0, 200));
      emailResult = "ok";
    } catch (e) {
      console.error("❌ [EMAIL] Failed:", e.message);
      emailResult = "failed";
    }
  }

  // ─── STEP 3 : WhatsApp alert ────────────────────────────
  let whatsappResult = "skipped";
  if (process.env.OWNER_PHONE && process.env.CALLMEBOT_APIKEY) {
    try {
      console.log("🟢 [WHATSAPP] Sending alert...");
      const ownerMsg = encodeURIComponent(
        `🔔 NEW BOOKING REQUEST\n\n` +
        `📋 Ref: ${bookingRef}\n` +
        `📅 ${dateFormatted}\n` +
        `🕐 ${time}\n` +
        `👥 ${adults} adult${adults > 1 ? "s" : ""}${kids > 0 ? ` + ${kids} child` : ""}\n` +
        `💰 ${total}€\n` +
        `👤 ${fullName}\n` +
        `📧 ${email}\n` +
        `📱 ${phone}`
      );
      const cbUrl = `https://api.callmebot.com/whatsapp.php?phone=${process.env.OWNER_PHONE}&text=${ownerMsg}&apikey=${process.env.CALLMEBOT_APIKEY}`;
      const cbRes = await fetch(cbUrl);
      console.log("✅ [WHATSAPP] Status:", cbRes.status);
      whatsappResult = "ok";
    } catch (e) {
      console.error("❌ [WHATSAPP] Failed:", e.message);
      whatsappResult = "failed";
    }
  }

  console.log("📊 [SUMMARY]", { sheets: sheetsResult, email: emailResult, whatsapp: whatsappResult });

  return NextResponse.json({
    success: true,
    bookingRef,
    whatsappLink,
    debug: { sheets: sheetsResult, email: emailResult, whatsapp: whatsappResult },
  });
}
