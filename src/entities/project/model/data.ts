import { colors } from "@/shared/config";
import type { Project } from "./types";

export const projectColors = [
  colors.pink,
  colors.teal,
  colors.orange,
  colors.lavender,
  colors.lime,
  colors.sky,
  colors.pink,
  colors.teal,
  colors.orange,
  colors.lavender,
];

export const projects: Project[] = [
  {
    id: 1,
    title: "MaxMusic",
    desc: "Мой действующий сайт, где каждый может выложить свой уникальный трек, слушать треки других, обсуждать композиции и тд. На сайте указана моя музыка 🎵",
    image:
      "https://images.unsplash.com/photo-1511138743687-5c14e8cfcf47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0cmVhbWluZyUyMHBsYXRmb3JtJTIwZGFya3xlbnwxfHx8fDE3NzI1MzkzMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Next 15", "Tanstack", "Redux", "Nest.js", "Postgres", "CI/CD"],
    emoji: "🎵",
    category: "Fullstack",
    site: "https://maxmusic.site",
    github: "https://github.com/Maximviktorovic2305/my-songs-site",
  },
  {
    id: 2,
    title: "Ai Chat",
    desc: "Мой действующий сайт с нейросетью Mistral AI без VPN на русском языке 🤖",
    image:
      "https://images.unsplash.com/photo-1684493735679-359868df0e18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGNoYXRib3QlMjBhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDF8fHx8MTc3MjUzOTMxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Next 15", "Tailwind", "Shadcn", "Nest.js", "CI/CD"],
    emoji: "🤖",
    category: "Fullstack",
    site: "https://ai-contact.site",
    github: "https://github.com/Maximviktorovic2305/chat-gpt-app",
  },
  {
    id: 11,
    title: "Banya Digital",
    desc: "CRM и сервис онлайн-бронирования для банных комплексов 🧖",
    image: "https://banya.digital/og.png",
    tags: ["Next.js", "TypeScript", "CRM", "Онлайн-запись"],
    emoji: "🧖",
    category: "Fullstack",
    site: "https://banya.digital",
  },
  {
    id: 3,
    title: "Туристическая компания Bitomo",
    desc: "Сайт туристической компании Bitomo ✈️",
    image:
      "https://images.unsplash.com/photo-1738507062726-f41057479856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB0b3VyaXNtJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc3MjQ3NTUzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Next 15", "Nest.js", "Postgres", "Админка"],
    emoji: "✈️",
    category: "Fullstack",
    site: "https://bitomo.ru/",
  },
  {
    id: 4,
    title: "Telegram Presale Bot",
    desc: "Телеграм мини апп сайт компании 📲",
    image:
      "https://images.unsplash.com/photo-1654764450215-c37782b66dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlZ3JhbSUyMGJvdCUyMG1vYmlsZSUyMGFwcHxlbnwxfHx8fDE3NzI1MzkzMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["React 19", "Redux", "Tanstack"],
    emoji: "📲",
    category: "Frontend",
    site: "https://t.me/axiora_presale_bot",
  },
  {
    id: 5,
    title: "Мебель на заказ — Deco",
    desc: "Сайт мебельной компании Deco 🪑",
    image:
      "https://images.unsplash.com/photo-1719150006650-8255498a9faf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBpbnRlcmlvciUyMGRlc2lnbiUyMG1vZGVybnxlbnwxfHx8fDE3NzI1MzkzMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Nuxt 4", "Pinia", "Nest.js", "Postgres", "Админка"],
    emoji: "🪑",
    category: "Fullstack",
    site: "https://decomebel.com/",
  },
  {
    id: 6,
    title: "Сайт для путешествий",
    desc: "Сайт для путешествий на Сахалине 🏔️",
    image:
      "https://images.unsplash.com/photo-1718671418340-9f351ec40874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWtoYWxpbiUyMG5hdHVyZSUyMGxhbmRzY2FwZSUyMGhpa2luZ3xlbnwxfHx8fDE3NzI1MzkzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Next 15", "Redux", "Nest.js", "Админка"],
    emoji: "🏔️",
    category: "Fullstack",
    site: "https://pohodniki.net/",
  },
  {
    id: 7,
    title: "Сайт музея Сахалина",
    desc: "Сайт для музея на Сахалине 🏛️",
    image:
      "https://images.unsplash.com/photo-1569342380852-035f42d9ca41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBleGhpYml0aW9uJTIwYXJ0JTIwZ2FsbGVyeXxlbnwxfHx8fDE3NzI1MzkzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Next 15", "Zustand", "Nest.js", "Админка"],
    emoji: "🏛️",
    category: "Fullstack",
    site: "https://sakhalinmuseum.ru/",
  },
  {
    id: 8,
    title: "Сайт JB Rus",
    desc: "Сайт производственной компании 🏭",
    image:
      "https://images.unsplash.com/photo-1715783058283-2e31a1cb7684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZyUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzcyNDQzMzk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Next 15", "Redux", "Nest.js", "Админка"],
    emoji: "🏭",
    category: "Fullstack",
    site: "https://jbrus.ru/",
  },
  {
    id: 9,
    title: "Креветка Shop",
    desc: "Сайт компании поставщика морепродуктов 🦐",
    image:
      "https://images.unsplash.com/photo-1758184665571-6c64f6d19db6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwc2hyaW1wJTIwbWFya2V0JTIwZnJlc2h8ZW58MXx8fHwxNzcyNTM5MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Vue 3", "Pinia", "Nest.js", "Postgres", "Админка"],
    emoji: "🦐",
    category: "Fullstack",
    site: "https://krevetkasakhalina.com",
  },
  {
    id: 10,
    title: "Makromat",
    desc: "Современная финтех платформа для инвестиций 💰",
    image:
      "https://images.unsplash.com/photo-1768055104895-e6185762f2a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwaW52ZXN0bWVudCUyMGNyeXB0byUyMHBsYXRmb3JtfGVufDF8fHx8MTc3MjUzOTMyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Nuxt 3", "Pinia", "Nest.js", "Golang", "Postgres", "Админка", "Микросервисы"],
    emoji: "💰",
    category: "Fullstack",
    site: "https://makromat.pro",
  },
];
