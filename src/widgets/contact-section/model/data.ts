import { Mail, MessageCircle, MapPin, GitFork } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { colors } from "@/shared/config";

export interface ContactInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  color: string;
  emoji: string;
}

export interface SocialItem {
  icon: LucideIcon;
  label: string;
  href: string;
  color: string;
}

export const contactInfo: ContactInfoItem[] = [
  { icon: Mail, label: "Email", value: "Maximviktorovic@mail.ru", href: "mailto:Maximviktorovic@mail.ru", color: colors.pink, emoji: "📧" },
  { icon: MessageCircle, label: "Telegram", value: "@maximviktorovic2305", href: "https://t.me/maximviktorovic2305", color: colors.lavender, emoji: "💬" },
  { icon: MapPin, label: "Локация", value: "Россия, удалённо", href: "#", color: colors.orange, emoji: "📍" },
];

export const socials: SocialItem[] = [
  { icon: GitFork, label: "GitHub", href: "https://github.com/Maximviktorovic2305", color: colors.lime },
  { icon: MessageCircle, label: "Telegram", href: "https://t.me/maximviktorovic2305", color: colors.lavender },
  { icon: Mail, label: "Email", href: "mailto:Maximviktorovic@mail.ru", color: colors.pink },
];
