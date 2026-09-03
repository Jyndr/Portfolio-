import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { config } from "@/lib/config";

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid contact form data." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ message: "Email provider is not configured." }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? config.contact.email,
      subject: parsed.data.subject,
      text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\n${parsed.data.message}`,
      reply_to: parsed.data.email,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Unable to send message." }, { status: 502 });
  }

  return NextResponse.json({ message: "Message sent successfully." });
}
