import { Code2, Database, Globe, BookOpen, Music, Crown, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { colors } from "@/shared/config";

export interface StatItem {
  value: string;
  label: string;
  emoji: string;
  color: string;
}

export interface HighlightItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

export interface HobbyItem {
  icon: LucideIcon;
  label: string;
  color: string;
}

export const stats: StatItem[] = [
  { value: "5+", label: "Лет опыта", emoji: "🎯", color: colors.pink },
  { value: "40+", label: "Проектов", emoji: "📦", color: colors.teal },
  { value: "JS/TS", label: "Основной стек", emoji: "💻", color: colors.orange },
  { value: "Go", label: "Рабочий стек", emoji: "🚀", color: colors.lime },
];

export const highlights: HighlightItem[] = [
  { icon: Globe, title: "Frontend", desc: "React, Next.js, Vue.js, Nuxt, React Native, TypeScript, Tailwind, Redux, Zustand", color: colors.pink },
  { icon: Server, title: "Backend", desc: "Node.js, NestJS, Express, Golang, REST API, GraphQL, Socket.io", color: colors.teal },
  { icon: Database, title: "Базы данных & ORM", desc: "PostgreSQL, MongoDB, Redis, Prisma, Sequelize, TypeORM", color: colors.orange },
  { icon: Code2, title: "DevOps & Тулинг", desc: "Docker, CI/CD, Nginx, RabbitMQ, Git, Jest, Vitest, Webpack, Vite", color: colors.lavender },
];

export const hobbies: HobbyItem[] = [
  { icon: BookOpen, label: "1000+ книг прочитано", color: colors.pink },
  { icon: Music, label: "Пишу музыку", color: colors.teal },
  { icon: Crown, label: "Шахматы (I разряд)", color: colors.orange },
];
