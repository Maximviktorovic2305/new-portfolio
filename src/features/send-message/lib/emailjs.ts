import emailjs from "@emailjs/browser";
import type { ContactMessage } from "../model/validation";

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? "",
};

export class ContactServiceUnavailableError extends Error {
  constructor() {
    super("Contact service is not configured");
    this.name = "ContactServiceUnavailableError";
  }
}

export function isContactServiceConfigured(): boolean {
  return Object.values(emailJsConfig).every(Boolean);
}

export async function sendMessage(message: ContactMessage): Promise<void> {
  if (!isContactServiceConfigured()) throw new ContactServiceUnavailableError();

  await emailjs.send(
    emailJsConfig.serviceId,
    emailJsConfig.templateId,
    {
      from_name: message.name,
      from_email: message.email,
      reply_to: message.email,
      message: message.message,
      to_email: "Maximviktorovic@mail.ru",
    },
    {
      publicKey: emailJsConfig.publicKey,
      blockHeadless: true,
      limitRate: { id: "portfolio-contact", throttle: 10_000 },
    },
  );
}
