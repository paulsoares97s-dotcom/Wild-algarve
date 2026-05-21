import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      date,
      time,
      adults,
      kids,
      total,
      firstName,
      lastName,
      email,
      phone,
    } = body;

    const fullName = `${firstName} ${lastName}`;
    const bookingRef = `WA-${Date.now().toString(36).toUpperCase()}`;
    const submittedAt = new Date().toLocaleString("fr-FR", {
      timeZone: "Europe/Lisbon",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Format date for display
    const dateFormatted = new Date(date).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // 1. SEND TO GOOGLE SHEETS
    const sheetsPayload = {
      bookingRef,
      submittedAt,
      date,
      dateFormatted,
      time,
      adults: Number(adults),
      kids: Number(kids),
      total: Number(total),
      fullName,
      email,
      phone,
      status: "Pending",
    };

    const sheetsRes = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sheetsPayload),
    });

    if (!sheetsRes.ok) {
      console.error("Google Sheets error:", await sheetsRes.text());
    }

    // 2. SEND CONFIRMATION EMAIL TO CLIENT
    const whatsappMsg = encodeURIComponent(
      `Hi Wild-Algarve! I'd like to confirm my booking:\n\n` +
      `ð Ref: ${bookingRef}\n` +
      `ð ${dateFormatted}\n` +
      `ð ${time === "13:30" ? "âï¸ Afternoon 13:30" : "ð Sunset 17:00"}\n` +
      `ð¥ ${adults} adult${adults > 1 ? "s" : ""}${kids > 0 ? ` + ${kids} under 15` : ""}\n` +
      `ð° Total: ${total}â¬\n` +
      `ð¤ ${fullName}\n` +
      `ð§ ${email}`
    );
    const whatsappLink = `https://wa.me/33651581703?text=${whatsappMsg}`;

    await resend.emails.send({
      from: "Wild-Algarve <noreply@wild-algarve.com>",
      to: email,
      subject: `Your Wild-Algarve ride request â ${dateFormatted} Â· ${time}`,
      html: buildClientEmail({
        firstName,
        bookingRef,
        dateFormatted,
        time,
        adults,
        kids,
        total,
        whatsappLink,
      }),
    });

    // 3. SEND WHATSAPP ALERT TO OWNER (via CallMeBot)
    const ownerMsg = encodeURIComponent(
      `ð NEW BOOKING REQUEST\n\n` +
      `ð Ref: ${bookingRef}\n` +
      `ð ${dateFormatted}\n` +
      `ð ${time}\n` +
      `ð¥ ${adults} adult${adults > 1 ? "s" : ""}${kids > 0 ? ` + ${kids} child` : ""}\n` +
      `ð° ${total}â¬\n` +
      `ð¤ ${fullName}\n` +
      `ð§ ${email}\n` +
      `ð± ${phone}`
    );

    const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${process.env.OWNER_PHONE}&text=${ownerMsg}&apikey=${process.env.CALLMEBOT_APIKEY}`;
    
    await fetch(callMeBotUrl).catch((e) =>
      console.error("CallMeBot error:", e)
    );

    return NextResponse.json({
      success: true,
      bookingRef,
      whatsappLink,
    });

  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

function buildClientEmail({ firstName, bookingRef, dateFormatted, time, adults, kids, total, whatsappLink }) {
  const timeLabel = time === "13:30" ? "âï¸ Afternoon Â· 13:30" : "ð Sunset Â· 17:00";
  const guestsLine = `${adults} adult${adults > 1 ? "s" : ""}${kids > 0 ? ` + ${kids} under 15` : ""}`;

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Wild-Algarve Booking Confirmation</title>
</head>
<body style="margin:0;padding:0;background:#FAF6EF;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF6EF;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFDF9;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(61,35,20,0.1);">
        
        <!-- HEADER -->
        <tr>
          <td style="background:#3D2314;padding:32px 40px;text-align:center;">
            <div style="font-family:Arial,sans-serif;font-size:28px;font-weight:900;color:#FFFDF9;letter-spacing:-0.02em;">
              Wild<span style="color:#C4622D;">-</span>Algarve
            </div>
            <div style="color:rgba(255,255,255,0.6);font-size:12px;letter-spacing:0.2em;text-transform:uppercase;margin-top:6px;">
              Albufeira Â· Off-road experience
            </div>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:40px;">
            
            <!-- Greeting -->
            <p style="font-size:22px;font-weight:700;color:#3D2314;margin:0 0 8px;">
              Hi ${firstName}! ð
            </p>
            <p style="font-size:16px;color:#6B3D22;line-height:1.6;margin:0 0 32px;">
              We've received your booking request. Your spot is being held â we'll confirm everything with you on WhatsApp within a few hours.
            </p>

            <!-- Booking Summary Box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF6EF;border-radius:12px;overflow:hidden;margin-bottom:32px;">
              <tr>
                <td style="padding:24px;">
                  <div style="font-size:11px;font-weight:600;color:#C4622D;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:16px;">
                    Booking Summary
                  </div>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid #E8D5B0;">
                        <span style="font-size:13px;color:#6B3D22;">Reference</span>
                      </td>
                      <td style="padding:8px 0;border-bottom:1px solid #E8D5B0;text-align:right;">
                        <span style="font-size:13px;font-weight:700;color:#3D2314;font-family:monospace;">${bookingRef}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid #E8D5B0;">
                        <span style="font-size:13px;color:#6B3D22;">ð Date</span>
                      </td>
                      <td style="padding:8px 0;border-bottom:1px solid #E8D5B0;text-align:right;">
                        <span style="font-size:13px;font-weight:700;color:#3D2314;">${dateFormatted}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid #E8D5B0;">
                        <span style="font-size:13px;color:#6B3D22;">ð Time</span>
                      </td>
                      <td style="padding:8px 0;border-bottom:1px solid #E8D5B0;text-align:right;">
                        <span style="font-size:13px;font-weight:700;color:#3D2314;">${timeLabel}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid #E8D5B0;">
                        <span style="font-size:13px;color:#6B3D22;">ð¥ Guests</span>
                      </td>
                      <td style="padding:8px 0;border-bottom:1px solid #E8D5B0;text-align:right;">
                        <span style="font-size:13px;font-weight:700;color:#3D2314;">${guestsLine}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0 0;">
                        <span style="font-size:15px;font-weight:700;color:#3D2314;">Total</span>
                      </td>
                      <td style="padding:12px 0 0;text-align:right;">
                        <span style="font-size:22px;font-weight:900;color:#C4622D;">${total}â¬</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- WhatsApp CTA -->
            <div style="text-align:center;margin-bottom:32px;">
              <p style="font-size:15px;color:#6B3D22;margin:0 0 16px;line-height:1.5;">
                Want to speed things up? Tap below to confirm directly on WhatsApp:
              </p>
              <a href="${whatsappLink}" style="display:inline-block;background:#25D366;color:white;text-decoration:none;padding:16px 32px;border-radius:999px;font-size:15px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;">
                â Confirm on WhatsApp
              </a>
            </div>

            <!-- What to bring -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF6EF;border-radius:12px;margin-bottom:32px;">
              <tr>
                <td style="padding:24px;">
                  <div style="font-size:11px;font-weight:600;color:#C4622D;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:14px;">
                    What to bring
                  </div>
                  <table cellpadding="0" cellspacing="0">
                    ${["Sunscreen & sunglasses", "Comfortable clothes & closed shoes", "Towel (if you fancy a swim at the waterfall)", "Your sense of adventure"].map(item => `
                    <tr>
                      <td style="padding:4px 0;vertical-align:top;">
                        <span style="color:#00B4D8;font-weight:700;margin-right:10px;">â</span>
                      </td>
                      <td style="padding:4px 0;">
                        <span style="font-size:14px;color:#6B3D22;">${item}</span>
                      </td>
                    </tr>`).join("")}
                  </table>
                </td>
              </tr>
            </table>

            <!-- Contact -->
            <p style="font-size:14px;color:#6B3D22;line-height:1.6;margin:0 0 8px;">
              Questions? Reach us anytime:
            </p>
            <p style="font-size:14px;color:#3D2314;font-weight:600;margin:0 0 4px;">
              ð± WhatsApp +33 6 51 58 17 03
            </p>
            <p style="font-size:14px;color:#3D2314;font-weight:600;margin:0;">
              âï¸ wild.algarve@gmail.com
            </p>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#3D2314;padding:24px 40px;text-align:center;">
            <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0;">
              Â© ${new Date().getFullYear()} Wild-Algarve Â· Albufeira, Portugal
            </p>
            <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:8px 0 0;">
              Free cancellation up to 24h before the trip
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `;
}
