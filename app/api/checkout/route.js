import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { date, time, adults, kids, name, email } = body;

    const total = adults * 5900 + kids * 3900;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Wild Algarve Safari",
              description: `${date} at ${time} — ${adults} adult(s)${kids > 0 ? ` + ${kids} kid(s)` : ""}`,
            },
            unit_amount: total,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        trip_date: date,
        trip_time: time,
        customer_name: name,
        adults: String(adults),
        kids: String(kids),
      },
      success_url: `${request.headers.get("origin")}/?booking=success`,
      cancel_url: `${request.headers.get("origin")}/?booking=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
