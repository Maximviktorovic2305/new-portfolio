import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { colors } from "@/shared/config";
import { sendMessage } from "../lib/emailjs";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setError("Пожалуйста, заполните все поля!");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setSending(true);
    setError("");

    try {
      await sendMessage(formState);
      setSent(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch {
      setError("Не удалось отправить. Напишите в Telegram!");
      setTimeout(() => setError(""), 4000);
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="p-8 rounded-3xl border-2 border-brand-lavender/15 bg-brand-lavender/[0.03] space-y-5"
      style={{ boxShadow: `0 0.5rem 2.5rem ${colors.lavender}0f` }}
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            className="flex items-center gap-2 text-[0.8rem] text-brand-lavender uppercase tracking-[0.15em] mb-2"
            style={{ fontWeight: 700 }}
          >
            <span>{"👤"}</span> Имя
          </label>
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: colors.lavender }}
            type="text"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            placeholder="Ваше имя"
            className="w-full px-4 py-3.5 rounded-2xl bg-card border-2 border-brand-lavender/10 text-white text-[0.9rem] placeholder:text-text-dim focus:outline-none transition-all"
            style={{ fontWeight: 500 }}
          />
        </div>
        <div>
          <label
            className="flex items-center gap-2 text-[0.8rem] text-brand-teal uppercase tracking-[0.15em] mb-2"
            style={{ fontWeight: 700 }}
          >
            <span>{"📧"}</span> Email
          </label>
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: colors.teal }}
            type="email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full px-4 py-3.5 rounded-2xl bg-card border-2 border-brand-teal/10 text-white text-[0.9rem] placeholder:text-text-dim focus:outline-none transition-all"
            style={{ fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}
          />
        </div>
      </div>

      <div>
        <label
          className="flex items-center gap-2 text-[0.8rem] text-brand-orange uppercase tracking-[0.15em] mb-2"
          style={{ fontWeight: 700 }}
        >
          <span>{"💭"}</span> Сообщение
        </label>
        <motion.textarea
          whileFocus={{ scale: 1.01, borderColor: colors.orange }}
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          placeholder="Расскажите о вашем проекте..."
          rows={5}
          className="w-full px-4 py-3.5 rounded-2xl bg-card border-2 border-brand-orange/10 text-white text-[0.9rem] placeholder:text-text-dim focus:outline-none transition-all resize-none"
          style={{ fontWeight: 500 }}
        />
      </div>

      <motion.button
        type="submit"
        disabled={sending}
        whileHover={{ scale: 1.03, rotate: -1, transition: { duration: 0.15 } }}
        whileTap={{ scale: 0.97 }}
        className="w-full py-4 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-2xl flex items-center justify-center gap-2 cursor-pointer text-[0.95rem] uppercase tracking-wide shadow-[0_0.375rem_1.5625rem_rgba(20,184,166,0.3)] transition-colors"
        style={{ fontWeight: 800 }}
      >
        {sent ? (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
            {"✅"} Отправлено!
          </motion.span>
        ) : sending ? (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
            {"🔄"} Отправляется...
          </motion.span>
        ) : (
          <>
            <Send size={18} />
            <span>{"Отправить 🚀"}</span>
          </>
        )}
      </motion.button>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[0.85rem] text-center text-red-400 mt-2"
          style={{ fontWeight: 600 }}
        >
          {error}
        </motion.p>
      )}
    </form>
  );
}