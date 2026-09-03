import type { ContactFormInput } from "@/lib/validation";

export class EmailService {
  async send(input: ContactFormInput): Promise<{ ok: boolean; message: string }> {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      return { ok: false, message: "Message could not be sent right now." };
    }

    return { ok: true, message: "Message sent successfully." };
  }
}
