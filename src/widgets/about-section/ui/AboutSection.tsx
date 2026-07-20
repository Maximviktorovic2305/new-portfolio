import { motion } from "motion/react";
import { highlights, hobbies, stats } from "../model/data";

export function AboutSection() {
  return (
    <section className="immersive-about" id="about">
      <div className="immersive-section-number">02</div>
      <div className="immersive-about__intro">
        <p className="immersive-kicker">Мой подход</p>
        <motion.h2
          initial={{ opacity: 0, y: 70 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.35 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Создаю продукты, которые выглядят смело, работают быстро и решают реальные задачи бизнеса.
        </motion.h2>
      </div>

      <div className="immersive-about__body">
        <p className="immersive-about__lead">
          Меня зовут Максим. Я fullstack-разработчик с фокусом на сложные интерфейсы, масштабируемую
          архитектуру и цельный пользовательский опыт.
        </p>
        <p>
          Беру ответственность за весь продукт: исследование, визуальную систему, frontend, backend, базы
          данных и стабильный выпуск в production.
        </p>
      </div>

      <div className="immersive-stats" aria-label="Опыт в цифрах">
        {stats.map((stat, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            key={stat.label}
            transition={{ delay: index * 0.08, duration: 0.55 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span>{stat.value}</span>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="immersive-about__details">
        <div>
          <p className="immersive-kicker">Экспертиза</p>
          {highlights.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
        <div>
          <p className="immersive-kicker">За пределами кода</p>
          {hobbies.map((item) => (
            <p className="immersive-hobby" key={item.label}>
              {item.label}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
