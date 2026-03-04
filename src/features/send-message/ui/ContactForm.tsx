import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { useTheme } from "@/shared/config";
import { sendMessage } from "../lib/emailjs";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const { isClassic } = useTheme();

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

  const BS = "var(--t-border-style)" as any;

  /* ── Classic form ── */
  if (isClassic) {
    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 rounded-md border border-border space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label
              className="block text-[0.78rem] text-text-secondary uppercase tracking-[0.15em] mb-2"
              style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}
            >
              Имя
            </label>
            <input
              type="text"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              placeholder="Ваше имя"
              className="w-full px-4 py-3 rounded-md bg-background border border-border text-text-primary text-[0.95rem] placeholder:text-text-dim focus:outline-none focus:border-text-dim transition-colors"
              style={{ fontFamily: "var(--t-font-body)" }}
            />
          </div>
          <div>
            <label
              className="block text-[0.78rem] text-text-secondary uppercase tracking-[0.15em] mb-2"
              style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}
            >
              Email
            </label>
            <input
              type="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-md bg-background border border-border text-text-primary text-[0.95rem] placeholder:text-text-dim focus:outline-none focus:border-text-dim transition-colors"
              style={{ fontFamily: "var(--t-font-mono)" }}
            />
          </div>
        </div>

        <div>
          <label
            className="block text-[0.78rem] text-text-secondary uppercase tracking-[0.15em] mb-2"
            style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}
          >
            Сообщение
          </label>
          <textarea
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            placeholder="Расскажите о вашем проекте..."
            rows={5}
            className="w-full px-4 py-3 rounded-md bg-background border border-border text-text-primary text-[0.95rem] placeholder:text-text-dim focus:outline-none focus:border-text-dim transition-colors resize-none"
            style={{ fontFamily: "var(--t-font-body)" }}
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full py-3.5 rounded-md flex items-center justify-center gap-2 text-[0.95rem] uppercase tracking-wider border transition-colors"
          style={{
            fontFamily: "var(--t-font-heading)",
            fontWeight: 700,
            backgroundColor: sent ? "transparent" : "var(--text-primary)",
            color: sent ? "var(--text-primary)" : "var(--background)",
            borderColor: "var(--text-primary)",
          }}
        >
          {sent ? (
            <span className="flex items-center gap-2">Отправлено</span>
          ) : sending ? (
            <span className="flex items-center gap-2">Отправляется...</span>
          ) : (
            <>
              <Send size={16} />
              <span>Отправить</span>
            </>
          )}
        </button>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[0.85rem] text-center mt-2"
            style={{ fontFamily: "var(--t-font-body)", color: "var(--brand-red, #ef4444)" }}
          >
            {error}
          </motion.p>
        )}
      </form>
    );
  }

  /* ── Default form (crayon & original) ── */
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="p-8 rounded-3xl border-2 border-brand-lavender/20 bg-brand-lavender/[0.03] space-y-5"
      style={{ borderStyle: BS, filter: "var(--t-filter)" }}
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="flex items-center gap-2 text-[0.9rem] text-brand-lavender uppercase tracking-[0.15em] mb-2"
            style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>
            <span>👤</span> Имя
          </label>
          <motion.input whileFocus={{ scale: 1.02 }} type="text" value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            placeholder="Ваше имя"
            className="w-full px-4 py-3.5 rounded-2xl bg-background border-2 border-brand-lavender/15 text-text-primary text-[1rem] placeholder:text-text-dim focus:outline-none focus:border-brand-lavender/40 transition-all"
            style={{ fontFamily: "var(--t-font-body)", borderStyle: BS }} />
        </div>
        <div>
          <label className="flex items-center gap-2 text-[0.9rem] text-brand-teal uppercase tracking-[0.15em] mb-2"
            style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>
            <span>📧</span> Email
          </label>
          <motion.input whileFocus={{ scale: 1.02 }} type="email" value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full px-4 py-3.5 rounded-2xl bg-background border-2 border-brand-teal/15 text-text-primary text-[1rem] placeholder:text-text-dim focus:outline-none focus:border-brand-teal/40 transition-all"
            style={{ fontFamily: "var(--t-font-mono)", borderStyle: BS }} />
        </div>
      </div>
      <div>
        <label className="flex items-center gap-2 text-[0.9rem] text-brand-orange uppercase tracking-[0.15em] mb-2"
          style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700 }}>
          <span>💭</span> Сообщение
        </label>
        <motion.textarea whileFocus={{ scale: 1.01 }} value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          placeholder="Расскажите о вашем проекте..." rows={5}
          className="w-full px-4 py-3.5 rounded-2xl bg-background border-2 border-brand-orange/15 text-text-primary text-[1rem] placeholder:text-text-dim focus:outline-none focus:border-brand-orange/40 transition-all resize-none"
          style={{ fontFamily: "var(--t-font-body)", borderStyle: BS }} />
      </div>
      <motion.button type="submit" disabled={sending}
        whileHover={{ scale: 1.03, rotate: -1 }} whileTap={{ scale: 0.97 }}
        className="w-full py-4 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-2xl flex items-center justify-center gap-2 cursor-pointer text-[1.05rem] uppercase tracking-wide border-2 border-brand-teal/50 transition-colors"
        style={{ fontFamily: "var(--t-font-heading)", fontWeight: 700, borderStyle: BS }}>
        {sent ? (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">✅ Отправлено!</motion.span>
        ) : sending ? (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">🔄 Отправляется...</motion.span>
        ) : (
          <><Send size={18} /><span>Отправить 🚀</span></>
        )}
      </motion.button>
      {error && (
        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
          className="text-[0.9rem] text-center text-brand-red mt-2" style={{ fontFamily: "var(--t-font-body)" }}>
          {error}
        </motion.p>
      )}
    </form>
  );
}