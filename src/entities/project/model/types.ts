export type SecureExternalUrl = `https://${string}`;

export interface Project {
  id: number;
  title: string;
  desc: string;
  image: SecureExternalUrl;
  tags: readonly string[];
  emoji: string;
  category: "Fullstack" | "Frontend" | "Backend";
  site: SecureExternalUrl;
  github?: SecureExternalUrl;
}
