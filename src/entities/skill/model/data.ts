import { colors } from "@/shared/config";
import type { Skill, SkillCategory } from "./types";

export const skills: Skill[] = [
  { name: "JavaScript", category: "Frontend", emoji: "🟡", description: "Основной язык разработки. ES2024+, замыкания, промисы, async/await — на уровне эксперта." },
  { name: "TypeScript", category: "Frontend", emoji: "💙", description: "Строгая типизация для всех проектов. Дженерики, utility types, type guards — must have." },
  { name: "React", category: "Frontend", emoji: "⚛️", description: "Основной фреймворк. Hooks, Context, SSR, Redux Toolkit, Zustand, TanStack Query." },
  { name: "Next.js", category: "Frontend", emoji: "▲", description: "Фулстек на React. SSR, ISR, API Routes, App Router. Оптимизация Core Web Vitals." },
  { name: "Vue.js", category: "Frontend", emoji: "💚", description: "Composition API, Pinia, реактивность. Опыт на крупных коммерческих проектах." },
  { name: "Nuxt.js", category: "Frontend", emoji: "🟩", description: "SSR/SSG на Vue.js. Модули, middleware, серверные маршруты, SEO-оптимизация." },
  { name: "React Native", category: "Frontend", emoji: "📱", description: "Кроссплатформенная мобильная разработка. Expo, навигация, нативные модули." },
  { name: "Tailwind CSS", category: "Frontend", emoji: "🎨", description: "Utility-first подход. Кастомные темы, анимации, адаптив. Основной инструмент стилизации." },
  { name: "Three.js / GSAP", category: "Frontend", emoji: "✨", description: "3D-графика и продвинутые анимации. Интерактивные интерфейсы и визуальные эффекты." },
  { name: "TanStack Query", category: "Frontend", emoji: "🔄", description: "Серверное состояние на клиенте. Кэширование, рефетчинг, оптимистичные обновления. Замена Redux для API-данных." },
  { name: "Node.js", category: "Backend", emoji: "🟢", description: "Серверная платформа. Неблокирующий I/O, стримы, кластеризация. Высоконагруженные API." },
  { name: "NestJS", category: "Backend", emoji: "🐈", description: "Enterprise-фреймворк. Модули, DI, Guards, Interceptors. Микросервисная архитектура." },
  { name: "Express", category: "Backend", emoji: "🚂", description: "Минималистичный фреймворк. REST API, middleware, маршрутизация. Быстрый старт проектов." },
  { name: "Golang", category: "Backend", emoji: "🐹", description: "Изучаю и применяю. Горутины, каналы, высокая производительность для микросервисов." },
  { name: "PostgreSQL", category: "Backend", emoji: "🐘", description: "Основная реляционная БД. Сложные запросы, индексы, оптимизация, пулы соединений." },
  { name: "MongoDB", category: "Backend", emoji: "🍃", description: "NoSQL для гибких схем. Агрегации, репликация, работа через Mongoose и нативный драйвер." },
  { name: "Redis", category: "Backend", emoji: "⚡", description: "In-memory кэширование. Pub/Sub, очереди, сессии. Ускорение эндпоинтов на 40–60%." },
  { name: "GraphQL", category: "Backend", emoji: "🔷", description: "Декларативные запросы данных. Apollo Server, Type-safe resolvers, подписки." },
  { name: "WebSockets", category: "Backend", emoji: "🔌", description: "Real-time коммуникации. Socket.io, чаты, уведомления, live-обновления данных." },
  { name: "RabbitMQ", category: "Backend", emoji: "🐰", description: "Брокер сообщений. Очереди задач, надёжная обработка транзакций при пиковых нагрузках." },
  { name: "Prisma / TypeORM", category: "Backend", emoji: "🗄️", description: "ORM для безопасного взаимодействия с БД. Миграции, генерация типов, query builder." },
  { name: "Jest / Vitest", category: "Backend", emoji: "🧪", description: "Юнит и интеграционное тестирование. Быстрая сборка проектов с Vite и Webpack." },
  { name: "Docker", category: "DevOps", emoji: "🐳", description: "Контейнеризация сервисов. Docker Compose, мульти-стейдж билды, унификация окружений." },
  { name: "CI/CD", category: "DevOps", emoji: "🔄", description: "GitHub Actions, GitLab CI. Автоматическое тестирование, деплой, ускорение релизов." },
  { name: "Git", category: "DevOps", emoji: "📦", description: "Контроль версий. Branching стратегии, code review, merge/rebase workflows." },
  { name: "Nginx", category: "DevOps", emoji: "🌀", description: "Reverse proxy, балансировка, SSL-терминация, кэширование статики." },
];

export const categories: SkillCategory[] = [
  { label: "Все", emoji: "🌟", color: colors.lavender },
  { label: "Frontend", emoji: "🎨", color: colors.pink },
  { label: "Backend", emoji: "⚙️", color: colors.teal },
  { label: "DevOps", emoji: "🛠️", color: colors.orange },
];

export const categoryColors: Record<string, string> = {
  Frontend: colors.pink,
  Backend: colors.teal,
  DevOps: colors.orange,
};
