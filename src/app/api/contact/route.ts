import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/site/site.config";
import {
  buildContactEmailContent,
  CONTACT_ERROR_MESSAGE,
  CONTACT_UNAVAILABLE_MESSAGE,
  getContactFromAddress,
  getContactRecipient,
  getResendApiKey,
  isContactDeliveryConfigured,
  isHoneypotFilled,
  isTrustedContactOrigin,
  type ContactPayload,
  validateContactPayload,
} from "@/site/contact/contact-mail";
import {
  CONTACT_RATE_LIMIT_MESSAGE,
  isContactRateLimitAllowed,
} from "@/site/contact/contact-rate-limit";

export async function POST(request: Request) {
  if (!isTrustedContactOrigin(request, siteConfig.url)) {
    return NextResponse.json({ error: CONTACT_ERROR_MESSAGE }, { status: 403 });
  }

  if (!(await isContactRateLimitAllowed(request))) {
    return NextResponse.json({ error: CONTACT_RATE_LIMIT_MESSAGE }, { status: 429 });
  }

  if (!isContactDeliveryConfigured()) {
    console.error("[contact] Configuration d'envoi incomplète (Resend ou adresses manquantes)");
    return NextResponse.json({ error: CONTACT_UNAVAILABLE_MESSAGE }, { status: 503 });
  }

  const apiKey = getResendApiKey();
  if (!apiKey) {
    console.error("[contact] Configuration d'envoi manquante");
    return NextResponse.json({ error: CONTACT_UNAVAILABLE_MESSAGE }, { status: 503 });
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot : réponse générique de succès, sans envoi
  if (isHoneypotFilled(body)) {
    return NextResponse.json({ success: true });
  }

  const validated = validateContactPayload(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const to = getContactRecipient();
  const from = getContactFromAddress();

  if (to.length === 0) {
    console.error("[contact] Destinataire invalide");
    return NextResponse.json({ error: CONTACT_ERROR_MESSAGE }, { status: 500 });
  }

  const emailContent = buildContactEmailContent(validated.data);

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: validated.data.email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    });

    if (error) {
      console.error("[contact] Échec d'envoi Resend", {
        name: error.name,
      });
      return NextResponse.json({ error: CONTACT_ERROR_MESSAGE }, { status: 500 });
    }

    console.info("[contact] E-mail envoyé", { id: data?.id ?? null });
    return NextResponse.json({ success: true });
  } catch {
    console.error("[contact] Exception d'envoi");
    return NextResponse.json({ error: CONTACT_ERROR_MESSAGE }, { status: 500 });
  }
}
