import { Resend } from "resend";
import { NextResponse } from "next/server";

/*
 * Sending. Until vitreen.art is verified at resend.com/domains, Resend only
 * delivers from onboarding@resend.dev, and only to the e-mail of the Resend
 * account itself (raphael.vitreen@gmail.com).
 * Once the domain is verified, set CONTACT_FROM_EMAIL (in Vercel too), e.g.
 * "Vitreen <contact@vitreen.art>": messages are then sent from that address to
 * contact@vitreen.art, which forwards to the inbox. CONTACT_TO_EMAIL overrides it.
 */
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL || "Vitreen Contact <onboarding@resend.dev>";
const CONTACT_TO =
  process.env.CONTACT_TO_EMAIL ||
  (process.env.CONTACT_FROM_EMAIL ? "contact@vitreen.art" : "raphael.vitreen@gmail.com");

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { nom, galerie, email, projet } = body;

    if (!nom || !galerie || !email || !projet) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Nouveau message de ${nom} — ${galerie}`,
      html: `
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Galerie :</strong> ${galerie}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Projet :</strong></p>
        <p>${projet.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
