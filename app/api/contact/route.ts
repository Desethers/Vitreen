import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { nom, galerie, email, projet } = body;

    if (!nom || !galerie || !email || !projet) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Vitreen Contact <onboarding@resend.dev>",
      to: "vitreen@proton.me",
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
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
