export interface Project {
  id: number;
  title: string;
  desc: string;
  image: string;
  tags: string[];
  emoji: string;
  category: "Fullstack" | "Frontend" | "Backend";
  site: string;
  github: string;
}
