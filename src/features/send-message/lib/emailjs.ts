import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

export interface SendMessageParams {
  name: string;
  email: string;
  message: string;
}

export async function sendMessage(params: SendMessageParams): Promise<void> {
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: params.name,
      from_email: params.email,
      message: params.message,
      to_email: "maximviktorovic@mail.ru",
    },
    PUBLIC_KEY,
  );
}
