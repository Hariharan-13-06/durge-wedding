// api/send-email.ts
// Vercel serverless function — runs server-side, keeps RESEND_API_KEY secret.
// Requires: npm install resend
// Set RESEND_API_KEY in Vercel → Project Settings → Environment Variables.

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Using `any` for req/res to avoid requiring the @vercel/node type package.
// If you want proper typing, run: npm i -D @vercel/node
// and swap these for VercelRequest / VercelResponse.
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body ?? {};

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  try {
    const { data, error } = await resend.emails.send({
      // Swap to your verified domain once set up in Resend, e.g. "Wedding RSVP <rsvp@yourdomain.com>"
      from: "Durga & Sureth Wedding <onboarding@resend.dev>",
      to: "hariharan.dev.k@gmail.com", // <-- replace with the email(s) that should receive RSVPs
      replyTo: email,
      subject: `New Blessing from ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Durga & Sureth</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${message ? `<p>${escapeHtml(message)}</p>` : ""}
        </div>
      `,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ data });
  } catch (err: any) {
    return res.status(500).json({ error: err.message ?? "Unknown error" });
  }
}

// Minimal HTML-escaping so user input can't break the email markup.
function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}