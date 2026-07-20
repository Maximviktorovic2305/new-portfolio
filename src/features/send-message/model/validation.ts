export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  message: 3_000,
} as const;

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export type ContactMessage = ContactFormValues;

export type ContactValidationResult =
  { success: true; data: ContactMessage } | { success: false; error: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

export function validateContactForm(values: ContactFormValues): ContactValidationResult {
  const data = {
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    message: values.message.trim(),
  };

  if (!data.name || !data.email || !data.message) {
    return { success: false, error: "Пожалуйста, заполните все поля." };
  }
  if (data.name.length > CONTACT_LIMITS.name) {
    return { success: false, error: `Имя должно быть короче ${CONTACT_LIMITS.name} символов.` };
  }
  if (data.email.length > CONTACT_LIMITS.email || !emailPattern.test(data.email)) {
    return { success: false, error: "Укажите корректный email." };
  }
  if (data.message.length > CONTACT_LIMITS.message) {
    return {
      success: false,
      error: `Сообщение должно быть короче ${CONTACT_LIMITS.message} символов.`,
    };
  }

  return { success: true, data };
}
