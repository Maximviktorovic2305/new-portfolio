import { Send } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState, type CSSProperties, type SyntheticEvent } from "react";
import { useTheme } from "@/shared/config";
import { sendMessage } from "../lib/emailjs";
import { CONTACT_LIMITS, validateContactForm, type ContactFormValues } from "../model/validation";

const initialValues: ContactFormValues = { name: "", email: "", message: "" };
type SubmissionStatus = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const { isClassic } = useTheme();
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

    // A filled hidden field is treated as automated spam without disclosing the filter.
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

  const borderStyle: CSSProperties["borderStyle"] = "solid";
  const formClass = isClassic
    ? "space-y-5 rounded-md border border-border p-6 sm:p-8"
    : "space-y-5 rounded-3xl border-2 border-brand-lavender/20 bg-brand-lavender/[0.03] p-6 sm:p-8";
  const inputClass = isClassic
    ? "w-full rounded-md border border-border bg-background px-4 py-3 text-text-primary placeholder:text-text-dim focus:border-text-dim focus:outline-none"
    : "w-full rounded-2xl border-2 border-border bg-background px-4 py-3.5 text-text-primary placeholder:text-text-dim focus:border-brand-lavender/50 focus:outline-none";

  return (
    <form
      aria-busy={isSending}
      className={formClass}
      noValidate
      onSubmit={(event) => void handleSubmit(event)}
      style={{ borderStyle, filter: "var(--t-filter)" }}
    >
      <div className="hidden">
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            className="mb-2 block text-[0.85rem] font-bold uppercase tracking-[0.15em]"
            htmlFor="contact-name"
          >
            {!isClassic && <span aria-hidden="true">👤 </span>}Имя
          </label>
          <motion.input
            autoComplete="name"
            className={inputClass}
            disabled={isSending}
            id="contact-name"
            maxLength={CONTACT_LIMITS.name}
            onChange={(event) => updateValue("name", event.target.value)}
            required
            type="text"
            value={values.name}
            whileFocus={isClassic ? undefined : { scale: 1.01 }}
          />
        </div>
        <div>
          <label
            className="mb-2 block text-[0.85rem] font-bold uppercase tracking-[0.15em]"
            htmlFor="contact-email"
          >
            {!isClassic && <span aria-hidden="true">📧 </span>}Email
          </label>
          <motion.input
            autoComplete="email"
            className={inputClass}
            disabled={isSending}
            id="contact-email"
            inputMode="email"
            maxLength={CONTACT_LIMITS.email}
            onChange={(event) => updateValue("email", event.target.value)}
            required
            type="email"
            value={values.email}
            whileFocus={isClassic ? undefined : { scale: 1.01 }}
          />
        </div>
      </div>

      <div>
        <label
          className="mb-2 block text-[0.85rem] font-bold uppercase tracking-[0.15em]"
          htmlFor="contact-message"
        >
          {!isClassic && <span aria-hidden="true">💭 </span>}Сообщение
        </label>
        <motion.textarea
          className={`${inputClass} resize-y`}
          disabled={isSending}
          id="contact-message"
          maxLength={CONTACT_LIMITS.message}
          onChange={(event) => updateValue("message", event.target.value)}
          required
          rows={6}
          value={values.message}
          whileFocus={isClassic ? undefined : { scale: 1.005 }}
        />
        <p className="mt-1 text-right text-[0.75rem] text-muted-foreground">
          {values.message.length}/{CONTACT_LIMITS.message}
        </p>
      </div>

      <motion.button
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-teal bg-brand-teal px-5 py-3.5 font-bold text-white transition-colors hover:bg-brand-teal-hover disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSending}
        type="submit"
        whileHover={isClassic || isSending ? undefined : { scale: 1.02 }}
        whileTap={isSending ? undefined : { scale: 0.98 }}
      >
        <Send aria-hidden="true" size={18} />
        {isSending ? "Отправляется…" : status === "sent" ? "Отправлено" : "Отправить"}
      </motion.button>

      {feedback && (
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          aria-live="polite"
          className={status === "error" ? "text-center text-brand-red" : "text-center text-brand-teal"}
          initial={{ opacity: 0, y: -5 }}
          role={status === "error" ? "alert" : "status"}
        >
          {feedback}
        </motion.p>
      )}
    </form>
  );
}
