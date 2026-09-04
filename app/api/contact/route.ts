import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { config } from "@/lib/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json({ message: `Validation error: ${errorMsg}` }, { status: 400 });
    }

    const { name, email, subject, message } = parsed.data;
    const recipientEmail = process.env.CONTACT_TO_EMAIL || config.contact.email;
    const resendApiKey = process.env.RESEND_API_KEY;
    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;

    // Option 1: Send via Resend API
    if (resendApiKey) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>",
          to: [recipientEmail],
          subject: `[Portfolio Contact] ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          reply_to: email,
        }),
      });

      if (!resendRes.ok) {
        const errorText = await resendRes.text();
        console.error(`[Resend API Error ${resendRes.status}] ${errorText}`);
        return NextResponse.json(
          { message: `Email delivery failed via Resend API (${resendRes.status}). Please check API key and domain configuration.` },
          { status: 502 }
        );
      }

      return NextResponse.json({ message: "Thanks! Your message has been sent successfully to " + recipientEmail });
    }

    // Option 2: Send via Web3Forms API (if access key provided)
    if (web3FormsKey) {
      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name,
          email,
          subject: `[Portfolio Contact] ${subject}`,
          message,
        }),
      });

      if (!web3Res.ok) {
        const errorText = await web3Res.text();
        console.error(`[Web3Forms API Error ${web3Res.status}] ${errorText}`);
        return NextResponse.json(
          { message: "Email delivery failed via Web3Forms service." },
          { status: 502 }
        );
      }

      return NextResponse.json({ message: "Thanks! Your message has been sent successfully." });
    }

    // No API key configured: DO NOT simulate success!
    console.error("[Contact API] Neither RESEND_API_KEY nor WEB3FORMS_ACCESS_KEY is set in .env.local");
    return NextResponse.json(
      {
        message: "Email provider is not configured yet. Please add RESEND_API_KEY to your .env.local file.",
      },
      { status: 503 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Contact API Exception]", errorMsg);
    return NextResponse.json(
      { message: `An error occurred while dispatching email: ${errorMsg}` },
      { status: 500 }
    );
  }
}
