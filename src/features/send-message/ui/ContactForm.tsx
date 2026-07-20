import { useEffect, useState, type SyntheticEvent } from "react";
import { sendMessage } from "../lib/emailjs";
import { CONTACT_LIMITS, validateContactForm, type ContactFormValues } from "../model/validation";

const initialValues: ContactFormValues = { name: "", email: "", message: "" };
type SubmissionStatus = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const isSending = status === "sending";

  useEffect(() => {
    if (status !== "sent" && status !== "error") return;
    const timer = window.setTimeout(
      () => {
        setStatus("idle");
        setFeedback("");
      },
      status === "sent" ? 4_000 : 6_000,
    );
    return () => window.clearTimeout(timer);
  }, [status]);

  const updateValue = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    if (website) {
      setStatus("sent");
      setFeedback("Сообщение отправлено.");
      setValues(initialValues);
      return;
    }

    const validation = validateContactForm(values);
    if (!validation.success) {
      setStatus("error");
      setFeedback(validation.error);
      return;
    }

    setStatus("sending");
    setFeedback("");
    try {
      await sendMessage(validation.data);
      setStatus("sent");
      setFeedback("Сообщение отправлено. Спасибо!");
      setValues(initialValues);
    } catch {
      setStatus("error");
      setFeedback("Не удалось отправить сообщение. Напишите мне в Telegram.");
    }
  };

  return (
    <form
      aria-busy={isSending}
      className="immersive-contact-form"
      noValidate
      onSubmit={(event) => void handleSubmit(event)}
    >
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Ваш сайт</label>
        <input
          autoComplete="off"
          id="contact-website"
          name="website"
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          value={website}
        />
      </div>

      <label htmlFor="contact-name">
        <span>01</span>Ваше имя
      </label>
      <input
        autoComplete="name"
        disabled={isSending}
        id="contact-name"
        maxLength={CONTACT_LIMITS.name}
        onChange={(event) => updateValue("name", event.target.value)}
        placeholder="Как к вам обращаться?"
        required
        type="text"
        value={values.name}
      />

      <label htmlFor="contact-email">
        <span>02</span>Email
      </label>
      <input
        autoComplete="email"
        disabled={isSending}
        id="contact-email"
        inputMode="email"
        maxLength={CONTACT_LIMITS.email}
        onChange={(event) => updateValue("email", event.target.value)}
        placeholder="you@company.com"
        required
        type="email"
        value={values.email}
      />

      <label htmlFor="contact-message">
        <span>03</span>Расскажите о задаче
      </label>
      <textarea
        disabled={isSending}
        id="contact-message"
        maxLength={CONTACT_LIMITS.message}
        onChange={(event) => updateValue("message", event.target.value)}
        placeholder="Проект, сроки, команда и желаемый результат"
        required
        rows={4}
        value={values.message}
      />
      <p className="immersive-contact-form__counter">
        {values.message.length}/{CONTACT_LIMITS.message}
      </p>

      <button disabled={isSending} type="submit">
        <span>{isSending ? "Отправляется…" : status === "sent" ? "Отправлено" : "Отправить сообщение"}</span>
        <i aria-hidden="true">↗</i>
      </button>

      {feedback && (
        <p
          aria-live="polite"
          className={`immersive-contact-form__feedback immersive-contact-form__feedback--${status}`}
          role={status === "error" ? "alert" : "status"}
        >
          {feedback}
        </p>
      )}
    </form>
  );
}
