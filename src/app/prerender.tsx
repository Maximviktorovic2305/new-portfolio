import { renderToString } from "react-dom/server";
import App from "./App";
import { LEGAL_DOCUMENTS, LEGAL_ROUTES, type LegalDocument } from "@/shared/config";

export function renderPage(pathname: string) {
  const document = (Object.entries(LEGAL_ROUTES) as [LegalDocument, string][]).find(
    ([, path]) => path === pathname,
  )?.[0];
  const content = document ? LEGAL_DOCUMENTS[document] : null;
  return {
    html: renderToString(<App pathname={pathname} />),
    title: content ? `${content.title} — Max.dev` : "Максим Викторович — Fullstack-разработчик",
    description: content
      ? `${content.title} сайта портфолио Максима Викторовича: условия использования, обработка данных и связь с автором.`
      : "Портфолио Максима Викторовича: fullstack-разработка на React, Next.js, Node.js, NestJS, TypeScript, Python и Golang. Проекты, опыт и контакты.",
  };
}
