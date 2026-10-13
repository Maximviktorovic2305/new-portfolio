export type SecureExternalUrl = `https://${string}`;

export interface Project {
  id: number;
  title: string;
  desc: string;
  image: SecureExternalUrl;
  preview?: {
    animation: `/previews/${string}.gif`;
    poster: `/previews/${string}.webp`;
  };
  tags: readonly string[];
  emoji: string;
  category: "Fullstack" | "Frontend" | "Backend";
  site: SecureExternalUrl;
  github?: SecureExternalUrl;
}
