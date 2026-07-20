import { motion } from "motion/react";
import { ContactForm } from "@/features/send-message";
import { contactInfo, socials } from "../model/data";

export function ContactSection() {
  return (
    <section className="immersive-contact" id="contact">
      <div className="immersive-section-number">05</div>
      <div className="immersive-contact__heading">
        <p className="immersive-kicker">Есть задача?</p>
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Давайте создадим что-то сильное вместе.
        </motion.h2>
      </div>

      <div className="immersive-contact__grid">
        <div className="immersive-contact__info">
          <p>Открыт для удалённой работы и интересных продуктовых задач в любом часовом поясе.</p>
          {contactInfo.map((item) =>
            item.href ? (
              <a
                href={item.href}
                key={item.label}
                rel={item.href.startsWith("https:") ? "noopener noreferrer" : undefined}
                target={item.href.startsWith("https:") ? "_blank" : undefined}
              >
                <span>{item.label}</span>
                {item.value}
              </a>
            ) : (
              <p className="immersive-contact__location" key={item.label}>
                <span>{item.label}</span>
                {item.value}
              </p>
            ),
          )}
          <div className="immersive-contact__socials">
            {socials.map((social) => (
              <a
                href={social.href}
                key={social.label}
                rel={social.href.startsWith("https:") ? "noopener noreferrer" : undefined}
                target={social.href.startsWith("https:") ? "_blank" : undefined}
              >
                {social.label} ↗
              </a>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
